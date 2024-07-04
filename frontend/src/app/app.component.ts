import { first, last } from 'rxjs';
import { Component, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  employeelist: any = [];
  customerlist: any = [];
  stafflist: any = [];
  statementlist: any = [];

  firstname = "";
  lastname = "";
  email = "";
  contact = "";

  firstname1 = "";
  lastname1 = "";
  email1 = "";
  contact1 = "";

  firstname2 = "";
  lastname2 = "";
  email2 = "";
  contact2 = "";

  firstname3 = "";
  lastname3 = "";
  email3 = "";
  contact3 = "";

  iseditclicked = "no";
  iseditclicked1 = "no";
  iseditclicked2 = "no";
  iseditclicked3 = "no";

  indexselected = "";
  indexselected1 = "";
  indexselected2 = "";
  indexselected3 = "";

  username = "";
  password = "";
  username1 = "";
  password1 = "";

  clearlogin() {
    this.username = "";
    this.password = "";
  }

  clearregister() {
    this.username1 = "";
    this.password1 = "";
  }

  login1() {
    let var1 = {
      username: this.username,
      password: this.password,
    }
    console.log("User is", var1);
    this.clearlogin();
  }

  register() {
    let var2 = {
      username1: this.username1,
      password1: this.password1,
    }
    console.log("Register user is", var2);
    this.clearregister();
  }

  clear() {
    this.firstname = "";
    this.lastname = "";
    this.email = "";
    this.contact = "";
  }

  clear1() {
    this.firstname1 = "";
    this.lastname1 = "";
    this.email1 = "";
    this.contact1 = "";
  }

  clear2() {
    this.firstname2 = "";
    this.lastname2 = "";
    this.email2 = "";
    this.contact2 = "";
  }

  clear3() {
    this.firstname3 = "";
    this.lastname3 = "";
    this.email3 = "";
    this.contact3 = "";
  }

  submit() {
    let obj = {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      contact: this.contact,
    }

    console.log("employee is", obj);
    this.employeelist.push(obj);
    this.clear();
    this.modalRef?.hide();
  }

  submit1() {
    let obj1 = {
      firstname1: this.firstname1,
      lastname1: this.lastname1,
      email1: this.email1,
      contact1: this.contact1,
    }

    console.log("customer is", obj1);
    this.customerlist.push(obj1);
    this.clear1();
    this.modalRef?.hide();
  }

  submit2() {
    let obj2 = {
      firstname2: this.firstname2,
      lastname2: this.lastname2,
      email2: this.email2,
      contact2: this.contact2,
    }

    this.stafflist.push(obj2);
    this.clear2();
    this.modalRef?.hide();
  }

  submit3() {
    let obj3 = {
      firstname3: this.firstname3,
      lastname3: this.lastname3,
      email3: this.email3,
      contact3: this.contact3,
    }

    this.statementlist.push(obj3);
    this.clear3();
    this.modalRef?.hide();
  }

  edit(i: any) {
    this.iseditclicked = "yes";
    this.indexselected = i;
    this.firstname = this.employeelist[i].firstname;
    this.lastname = this.employeelist[i].lastname;
    this.email = this.employeelist[i].email;
    this.contact = this.employeelist[i].contact;
  }

  edit1(i: any) {
    this.iseditclicked1 = "yes";
    this.indexselected1 = i;
    this.firstname1 = this.customerlist[i].firstname1;
    this.lastname1 = this.customerlist[i].lastname1;
    this.email1 = this.customerlist[i].email1;
    this.contact1 = this.customerlist[i].contact1;
  }

  edit2(i: any) {
    this.iseditclicked2 = "yes";
    this.indexselected2 = i;
    this.firstname2 = this.stafflist[i].firstname2;
    this.lastname2 = this.stafflist[i].lastname2;
    this.email2 = this.stafflist[i].email2;
    this.contact2 = this.stafflist[i].contact2;
  }

  edit3(i: any) {
    this.iseditclicked3 = "yes";
    this.indexselected3 = i;
    this.firstname3 = this.statementlist[i].firstname3;
    this.lastname3 = this.statementlist[i].lastname3;
    this.email3 = this.statementlist[i].email3;
    this.contact3 = this.statementlist[i].contact3;
  }

  delete(i: any) {
    this.employeelist.splice(i,1);
  }

  delete1(i: any) {
    this.customerlist.splice(i,1);
  }

  delete2(i: any) {
    this.stafflist.splice(i,1);
  }

  delete3(i: any) {
    this.statementlist.splice(i,1);
  }

  update() {
    this.iseditclicked = "no";
    this.employeelist[this.indexselected].firstname = this.firstname;
    this.employeelist[this.indexselected].lastname = this.lastname;
    this.employeelist[this.indexselected].email = this.email;
    this.employeelist[this.indexselected].contact = this.contact;
    this.clear();
    this.modalRef?.hide();
  }

  update1() {
    this.iseditclicked1 = "no";
    this.customerlist[this.indexselected1].firstname1 = this.firstname1;
    this.customerlist[this.indexselected1].lastname1 = this.lastname1;
    this.customerlist[this.indexselected1].email1 = this.email1;
    this.customerlist[this.indexselected1].contact1 = this.contact1;
    this.clear1();
    this.modalRef?.hide();
  }

  update2() {
    this.iseditclicked2 = "no";
    this.stafflist[this.indexselected2].firstname2 = this.firstname2;
    this.stafflist[this.indexselected2].lastname2 = this.lastname2;
    this.stafflist[this.indexselected2].email2 = this.email2;
    this.stafflist[this.indexselected2].contact2 = this.contact2;
    this.clear2();
    this.modalRef?.hide();
  }

  update3() {
    this.iseditclicked3 = "no";
    this.statementlist[this.indexselected3].firstname3 = this.firstname3;
    this.statementlist[this.indexselected3].lastname3 = this.lastname3;
    this.statementlist[this.indexselected3].email3 = this.email3;
    this.statementlist[this.indexselected3].contact3 = this.contact3;
    this.clear3();
    this.modalRef?.hide();
  }

  modalRef?: BsModalRef;
  constructor(private modalService: BsModalService) { }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}