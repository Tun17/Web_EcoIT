import { Component, OnInit } from '@angular/core';
import {Blog} from "../../../core/model/blog/blog";
import {BlogService} from "../../../services/blog/blog.service";
import {Router} from "@angular/router";
import {FileService} from "../../../services/file/file.service";
import {HttpParams} from "@angular/common/http";
import * as fileSaver from "file-saver";
import {TokenStorageService} from "../../../services/token-storage/token-storage.service";

@Component({
  selector: 'app-blog-control',
  templateUrl: './blog-control.component.html',
  styleUrls: ['./blog-control.component.css']
})
export class BlogControlComponent implements OnInit {

  blogs: Blog[] = [];
  totalPages: any;
  pageSizes = [3, 6, 9];
  searchField = {
    pageIndex: 1,
    pageSize: 3,
    totalElements: 0,
    keyword: ''
  }

  role: any;

  constructor(private blogService: BlogService, private router: Router,
              private fileService: FileService, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    if(this.tokenStorageService.getToken()) {
      const user = this.tokenStorageService.getUser();
      this.role = user.roles;

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
    this.blogService.getSearchList(params).subscribe(data => {
      this.blogs = data.content;
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

  updateBlog(id: number){
    return this.router.navigate(['admin/blog/update', id]);
  }

  deleteBlog(id: number){
    let option = confirm("Bài đăng này sẽ bị xóa bỏ. Tiếp tục?");

    if(option){
      this.blogService.deleteBlog(id).subscribe(data =>{
        this.deleteControl();
      })
    }

  }

  deleteControl(){
    if(this.blogs.length-1 < 1 && this.searchField.pageIndex !== 1){
      this.searchField.pageIndex = this.searchField.pageIndex - 1;
    }
    this.getBySearch();
  }

  downloadImg(e: any){
    this.fileService.downloadFile(e).subscribe( (data:any) =>{
      let blob = new Blob([data.body], {type: data.body.type})
      fileSaver.saveAs(blob, e.name);
    })
  }

  deleteImg(e: any){
    let option = window.confirm("Bạn có chắc chắc sẽ xóa file này?")
    if(option === true){
      this.fileService.deleteFile(e[0]).subscribe( data =>{
        this.getBySearch();
      });
    }
  }

}
