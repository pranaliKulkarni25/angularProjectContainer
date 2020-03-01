import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-employees-add',
  templateUrl: './employees-add.component.html',
  styleUrls: ['./employees-add.component.css']
})
export class EmployeesAddComponent implements OnInit {

  constructor(private router: Router) { }

  addForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^[- +()]*[0-9][- +()0-9]*$/)]),
    address: new FormGroup({
      city: new FormControl(''),
      address_line1: new FormControl(''),
      address_line2: new FormControl(''),
      postal_code: new FormControl('')
    })
  })

  get id() { return this.addForm.get('id') }
  get name() { return this.addForm.get('name') }
  get phone() { return this.addForm.get('phone') }
  get city() { return this.addForm.get('address').get('city') }
  get address_line1() { return this.addForm.get('address').get('address_line1') }
  get address_line2() { return this.addForm.get('address').get('address_line2') }
  get postal_code() { return this.addForm.get('address').get('postal_code') }

  sessionData: any


  ngOnInit(): void {
    this.sessionData = JSON.parse(sessionStorage.getItem('empData'))
    if (this.sessionData != undefined) {
      var count = this.sessionData.data.length + 1
      this.id.setValue(count)
    } else {
      this.id.setValue(1)
    }
  }

  onSubmit() {
    this.sessionData.data.push(this.addForm.value)
    sessionStorage.setItem('empData', JSON.stringify(this.sessionData))
    setTimeout(() => {
      this.router.navigate(['/employees'])
    }, 200);
  }

}
