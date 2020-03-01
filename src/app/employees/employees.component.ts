import { Component, OnInit } from '@angular/core';
import { EmployeesService } from './employees.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  constructor(
    private employeesService: EmployeesService,
    private router: Router
  ) { }

  //contain list of employees
  employeeList: any
  filterList: any

  //search input
  searchFilter: string

  ngOnInit(): void {
    var sessionData = JSON.parse(sessionStorage.getItem('empData'))
    if (sessionData != undefined) {
      this.employeeList = sessionData.data
      this.filterList = sessionData.data
    } else {
      this.employeesService.getJson().subscribe(data => {
        this.employeeList = data.data;
        this.filterList = data.data;
        sessionStorage.setItem('empData', JSON.stringify(data))
      })
    }
    this.formatPhoneNumber();
  }

  formatPhoneNumber() {
    for (var i = 0; i < this.filterList.length; i++) {
      if (!this.filterList[i].phone.match(/^[0-9]+$/)) {
        this.filterList[i].phone = 'NA'
      }
    }
  }

  searchFunction(): void {
    //create temporary array for 
    var filterArray = []
    this.filterList = JSON.parse(JSON.stringify(this.employeeList))
    var searchText = this.searchFilter.trim().toLowerCase()
    if (searchText.length > 0) {
      this.filterList.forEach((element: any) => {
        element.name = element.name.toLowerCase();
        element.address.city = element.address.city.toLowerCase();
        //check if name or city matches
        if (element.name.includes(searchText) || element.address.city.includes(searchText)) {
          filterArray.push(element);
        }
      });
      //to avoid duplicate
      this.filterList = JSON.parse(JSON.stringify(filterArray))
      filterArray = []
    } else {
      this.filterList = this.employeeList;
    }
    this.formatPhoneNumber();
  }

  onClickAddNew() {
    this.router.navigate(['/employees/add'])
  }
}
