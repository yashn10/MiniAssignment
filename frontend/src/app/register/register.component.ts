import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServicesService } from '../services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  employeeForm: FormGroup;


  countries: string[] = ['India', 'USA', 'Mexico'];
  states: { [key: string]: string[] } = {
    India: ['Maharashtra', 'Uttar Pradesh', 'Uttarakhand', 'Punjab'],
    USA: ['New York', 'California', 'Florida', 'Texas'],
    Mexico: ['Jalisco', 'Nuevo León', 'Puebla']
  };
  selectedStates: string[] = [];


  onCountryChange() {
    this.employeeForm.get('country')?.valueChanges.subscribe((country: string) => {
      this.selectedStates = this.states[country] || [];
      this.employeeForm.get('state')?.setValue('');
    });
  }


  constructor(private FormBuilder: FormBuilder, private backend: ServicesService) {
    this.employeeForm = this.FormBuilder.group(
      {
        name: [''],
        email: [''],
        password: [''],
        mobile: [''],
        country: [''],
        state: ['']
      }
    )
    this.onCountryChange();
  }

  ngOnInit(): void {
  }


  clearregister() {
    this.employeeForm.reset();
  }


  register(data: any) {
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

    this.clearregister();
  }

}
