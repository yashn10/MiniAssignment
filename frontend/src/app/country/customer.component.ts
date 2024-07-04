import { Component, OnInit, ViewChild } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2'
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServicesService } from '../services.service';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  @ViewChild('template1') template1!: TemplateRef<any>;
  selectedCountry: any;


  ngOnInit(): void {
    this.loadcountries();
  }

  loadcountries() {
    this.backend.getcountry().subscribe(
      (response) => {
        this.countrylist = response;
      }
    )
  }

  countryForm: FormGroup;
  countrylist: any = [];
  iseditclicked1 = false;
  indexselected1 = "";
  issubmitted = false;


  clear() {
    this.countryForm.reset();
  }


  submit(data: any) {
    this.backend.addcountry(data).subscribe(
      (response) => {
        if (response) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your data has been saved',
            showConfirmButton: false,
            timer: 1500
          })
          this.loadcountries();
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
    const selectedCountry = this.countrylist.find((country: { _id: string; }) => country._id === id);

    if (selectedCountry) {
      this.iseditclicked1 = true;
      this.selectedCountry = selectedCountry;
      this.countryForm.patchValue({
        id: selectedCountry.id,
        name: selectedCountry.name,
      });
      // this.openModal(template);
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
    this.openEditModal(this.template1, index);
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
        this.backend.deletecountry(id).subscribe(
          (response) => {
            Swal.fire(
              'Deleted!',
              'Your data has been deleted.',
              'success'
            )
            this.loadcountries();
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
    this.iseditclicked1 = false;

    const updatedData = {
      _id: this.selectedCountry._id,
      id: this.countryForm.value.id,
      name: this.countryForm.value.name
    };

    this.backend.updatecountry(updatedData).subscribe(
      (response) => {
        if (response) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your data has been updated',
            showConfirmButton: false,
            timer: 1500
          })
          this.loadcountries();
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
    this.countryForm = this.FormBuilder.group(
      {
        id: [''],
        name: ['']
      }
    )
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}