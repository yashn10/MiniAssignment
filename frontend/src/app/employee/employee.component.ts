import { Component, OnInit, ViewChild } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2'
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  @ViewChild('template2') template2!: TemplateRef<any>;
  selectedemployee: any;


  ngOnInit(): void {
    // this.load();
  }

  load() {
    this.backend.getemployee().subscribe(
      (response) => {
        this.employeelist = response;
      }
    )
  }

  employeeForm: FormGroup;
  employeelist: any = [];
  iseditclicked = false;
  indexselected = "";
  issubmitted = false;


  clear() {
    this.employeeForm.reset();
  }


  submit(data: any) {
    this.backend.addemployee(data).subscribe(
      (response) => {
        if (response) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your data has been saved',
            showConfirmButton: false,
            timer: 1500
          })
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
    const selectedemployee = this.employeelist.find((country: { _id: string; }) => country._id === id);

    if (selectedemployee) {
      this.iseditclicked = true;
      this.selectedemployee = selectedemployee;
      this.employeeForm.patchValue({
        id: selectedemployee.id,
        name: selectedemployee.name,
        email: selectedemployee.email,
        mobile: selectedemployee.mobile,
        password: selectedemployee.password,
        countryId: selectedemployee.countryId,
        stateId: selectedemployee.stateId,
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
    this.openEditModal(this.template2, index);
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
        this.backend.deleteemployee(id).subscribe(
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
    this.iseditclicked = false;

    const updatedData = {
      _id: this.selectedemployee._id,
      id: this.employeeForm.value.id,
      name: this.employeeForm.value.name,
      email: this.employeeForm.value.email,
      mobile: this.employeeForm.value.mobile,
      password: this.employeeForm.value.password,
      countryId: this.employeeForm.value.countryId,
      stateId: this.employeeForm.value.stateId
    };

    this.backend.updateemployee(updatedData).subscribe(
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
    this.employeeForm = this.FormBuilder.group(
      {
        id: [''],
        name: [''],
        email: [''],
        mobile: [''],
        password: [''],
        countryId: [''],
        stateId: ['']
      }
    )
  }


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}