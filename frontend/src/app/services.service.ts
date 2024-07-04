import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) { }


  addemployee(data: any) {
    return this.http.post('http://localhost:8000/employee', data);
  }

  addcountry(data: any) {
    return this.http.post('http://localhost:8000/country', data);
  }

  addstate(data: any) {
    return this.http.post('http://localhost:8000/state', data);
  }

  loginemployee(data: any) {
    return this.http.post('http://localhost:8000/employeelogin', data)
  }

  getemployee() {
    return this.http.get('http://localhost:8000/employee');
  }

  getcountry() {
    return this.http.get('http://localhost:8000/country');
  }

  getstate() {
    return this.http.get('http://localhost:8000/state');
  }

  deleteemployee(id: any) {
    return this.http.delete(`http://localhost:8000/employee/${id}`);
  }

  deletecountry(id: any) {
    return this.http.delete(`http://localhost:8000/country/${id}`);
  }

  deletestate(id: any) {
    return this.http.delete(`http://localhost:8000/state/${id}`);
  }

  updateestate(data: any) {
    return this.http.patch(`http://localhost:8000/state/${data._id}`, data);
  }

  updatecountry(data: any) {
    return this.http.patch(`http://localhost:8000/country/${data._id}`, data);
  }

  updateemployee(data: any) {
    return this.http.patch(`http://localhost:8000/employee/${data._id}`, data);
  }

}
