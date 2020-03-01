import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-employees-edit',
  templateUrl: './employees-edit.component.html',
  styleUrls: ['./employees-edit.component.css']
})
export class EmployeesEditComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }
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
  editData: any


  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.sessionData = JSON.parse(sessionStorage.getItem('empData'))
    if (this.sessionData != undefined) { 
      this.editData = this.sessionData.data.find(obj => {
        return obj.id == id
      })
      this.addForm.setValue({
        id: this.editData.id,
        name: this.editData.name,
        phone: this.editData.phone,
        address: {
          city: this.editData.address.city,
          address_line1: this.editData.address.address_line1,
          address_line2: this.editData.address.address_line2,
          postal_code: this.editData.address.postal_code
        }
      });
    }
  }

  onSubmit() {
    this.sessionData.data[this.editData.id - 1] = this.addForm.value;
    sessionStorage.setItem('empData', JSON.stringify(this.sessionData))
    setTimeout(() => {
      this.router.navigate(['/employees'])
    }, 200);
  }

}
