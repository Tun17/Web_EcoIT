import { Component, OnInit } from '@angular/core';
import {CustomerService} from "../../../services/customer/customer.service";
import {Router} from "@angular/router";
import {HttpParams} from "@angular/common/http";
import {TokenStorageService} from "../../../services/token-storage/token-storage.service";

@Component({
  selector: 'app-customer-control',
  templateUrl: './customer-control.component.html',
  styleUrls: ['./customer-control.component.css']
})
export class CustomerControlComponent implements OnInit {

  customer: any;
  totalPages: any;
  pageSizes = [4, 8, 12];

  searchField = {
    pageIndex: 1,
    pageSize: 4,
    totalElements: 0,
    keyword: ''
  }

  constructor(private cusService: CustomerService, private tokenStorageService: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    this.getCustomer();
  }

  getCustomer(){
    const params = new HttpParams()
      .set('pageNo', this.searchField.pageIndex)
      .set('pageSize', this.searchField.pageSize)
      .set('keyword', this.searchField.keyword);
    this.cusService.getBySearch(params).subscribe(data => {
      this.customer = data.content;
      this.searchField.totalElements = data.totalElements;
      this.totalPages = data.totalPages;
    });
  }

  search(){
    this.searchField.pageIndex = 1;
    this.getCustomer();
  }

  pageChanged(event: any){
    this.searchField.pageIndex = event;
    this.getCustomer();
  }

  changePageSize(event: any) {
    this.searchField.pageSize = event.target.value;
    this.searchField.pageIndex = 1;
    this.getCustomer();
  }

  deleteControl(){
    if(this.customer.length-1 < 1){
      if(this.searchField.pageIndex !== 1){
        this.searchField.pageIndex = this.searchField.pageIndex - 1;
      }
    }
    this.getCustomer()
  }

  deleteCustomer(id: number){
    let option = confirm("Bạn có chắc chắn xóa khách hàng này?");

    if(option){
      this.cusService.deleteCustomer(id).subscribe(data =>{
        this.deleteControl();
      })
    }
  }

}
