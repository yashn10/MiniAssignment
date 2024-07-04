import { Component, OnInit, ViewChild } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2'
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServicesService } from '../services.service';


@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {

  @ViewChild('template3') template3!: TemplateRef<any>;
  selectedState: any;


  ngOnInit(): void {
    this.load();
  }

  load() {
    this.backend.getstate().subscribe(
      (response) => {
        this.statelist = response;
      }
    )
  }

  stateForm: FormGroup;

  statelist: any = [];
  iseditclicked2 = false;
  indexselected2 = "";
  issubmitted = false;


  clear() {
    this.stateForm.reset();
  }


  submit(data: any) {
    this.backend.addstate(data).subscribe(
      (response) => {
        if (response) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your data has been saved',
            showConfirmButton: false,
            timer: 1500
          })
          this.load();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: 'Please try again later'
          })
        }
      }, (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: 'Please fill valid data'
        })
      }
    )

    this.issubmitted = true;
    this.clear();
    this.modalRef?.hide();
  }


  openEditModal(template: TemplateRef<any>, id: string) {
    // Find the item by ID
    const selectedState = this.statelist.find((country: { _id: string; }) => country._id === id);

    if (selectedState) {
      this.iseditclicked2 = true;
      this.selectedState = selectedState;
      this.stateForm.patchValue({
        id: selectedState.id,
        name: selectedState.name,
        countryId: selectedState.countryId,
      });
    } else {
      console.error('Invalid ID:', id);
      Swal.fire({
        icon: 'error',
        title: 'Invalid selection',
        text: 'Selected item does not exist.',
      });
    }
  }


  edit(index: string) {
    this.openEditModal(this.template3, index);
  }


  delete(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.backend.deletestate(id).subscribe(
          (response) => {
            Swal.fire(
              'Deleted!',
              'Your data has been deleted.',
              'success'
            )
            this.load();
            console.log(response);
          }
        )
      }
    }).catch((error) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: 'your product has not deleted try again later'
      })
      console.log(error);
    })
  }


  update() {
    this.iseditclicked2 = false;

    const updatedData = {
      _id: this.selectedState._id,
      id: this.stateForm.value.id,
      name: this.stateForm.value.name,
      countryId: this.stateForm.value.countryId
    };

    this.backend.updateestate(updatedData).subscribe(
      (response) => {
        if (response) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your data has been updated',
            showConfirmButton: false,
            timer: 1500
          })
          this.load();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: 'Your product details was not updated please try again later'
          })
        }
      }
    )

    this.clear();
    this.modalRef?.hide();

  }


  modalRef?: BsModalRef;
  constructor(private modalService: BsModalService, private FormBuilder: FormBuilder, private backend: ServicesService) {
    this.stateForm = this.FormBuilder.group(
      {
        id: [''],
        name: [''],
        countryId: ['']
      }
    )
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}