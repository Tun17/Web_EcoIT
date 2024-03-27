import { Component, OnInit } from '@angular/core';
import {RecruitService} from "../../../services/recruit/recruit.service";
import {TokenStorageService} from "../../../services/token-storage/token-storage.service";
import {Router} from "@angular/router";
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-recruit-control',
  templateUrl: './recruit-control.component.html',
  styleUrls: ['./recruit-control.component.css']
})
export class RecruitControlComponent implements OnInit {

  recruits: any;
  totalPages: any;
  pageSizes = [3, 6, 9];

  url: any;
  role: any;

  searchField = {
    pageIndex: 1,
    pageSize: 3,
    totalElements: 0,
    keyword: ''
  }

  constructor(private recruitService: RecruitService, private tokenStorageService: TokenStorageService,
              private router: Router) { }

  ngOnInit(): void {
    if(this.tokenStorageService.getToken()) {
      const user = this.tokenStorageService.getUser();
      this.role = user.roles;

      if(this.role.includes("ROLE_USER")){
        this.router.navigate(['/home']);
      }

      this.getBySearch();
    }else{
      this.router.navigate(['/login']);
    }
  }

  getBySearch(){
    const params = new HttpParams()
      .set('pageNo', this.searchField.pageIndex)
      .set('pageSize', this.searchField.pageSize)
      .set('keyword', this.searchField.keyword);
    this.recruitService.getBySearch(params).subscribe(data => {
      this.recruits = data.content;
      this.searchField.totalElements = data.totalElements;
      this.totalPages = data.totalPages;
    });
  }

  search(){
    this.searchField.pageIndex = 1;
    this.getBySearch();
  }

  pageChanged(event: any){
    this.searchField.pageIndex = event;
    this.getBySearch();
  }

  changePageSize(psize: any) {
    this.searchField.pageSize = psize.target.value;
    this.searchField.pageIndex = 1;
    this.getBySearch();
  }

  updateNews(id: number){
    return this.router.navigate(['admin/recruit/update', id]);
  }

  deleteControl(){
    if(this.recruits.length-1 < 1 && this.searchField.pageIndex !== 1){
      this.searchField.pageIndex = this.searchField.pageIndex - 1;
    }
    this.getBySearch();
  }

  deleteNews(id: number){
    let option = confirm("Bạn có chắc chắn xóa tin này?");

    if(option == true){
      this.recruitService.deleteRecruit(id).subscribe(data =>{
        this.deleteControl();
      })
    }

  }

}
