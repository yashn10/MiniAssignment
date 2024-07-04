import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServicesService } from '../services.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  employeeForm: FormGroup;

  constructor(private FormBuilder: FormBuilder, private backend: ServicesService) {
    this.employeeForm = this.FormBuilder.group(
      {
        email: [''],
        password: ['']
      }
    )
  }

  ngOnInit(): void {
  }


  clearlogin() {
    this.employeeForm.reset();
  }


  login(data: any) {
    this.backend.loginemployee(data).subscribe(
      (response) => {
        if (response) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Employee login successfully',
            showConfirmButton: false,
            timer: 1500
          })
          localStorage.setItem('Employee Token', JSON.stringify(response));
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
  }

}
