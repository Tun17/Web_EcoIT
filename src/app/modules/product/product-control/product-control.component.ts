import { Component, OnInit } from '@angular/core';
import {Product} from "../../../core/model/product/product";
import {ProductService} from "../../../services/product/product.service";
import {Router} from "@angular/router";
import {FileService} from "../../../services/file/file.service";
import {TokenStorageService} from "../../../services/token-storage/token-storage.service";
import {HttpParams} from "@angular/common/http";
// @ts-ignore
import * as fileSaver from "file-saver";

@Component({
  selector: 'app-product-control',
  templateUrl: './product-control.component.html',
  styleUrls: ['./product-control.component.css']
})
export class ProductControlComponent implements OnInit {

  id: any;
  products: Product[] = [];
  totalPages: any;
  pageSizes = [4, 8, 12];

  searchField = {
    pageIndex: 1,
    pageSize: 4,
    totalElements: 0,
    keyword: ''
  }

  constructor(private productService: ProductService,
              private router: Router, private fileService: FileService,
              private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.getProduct()
  }

  getProduct(){
    const params = new HttpParams()
      .set('pageNo', this.searchField.pageIndex)
      .set('pageSize', this.searchField.pageSize)
      .set('keyword', this.searchField.keyword);
    this.productService.searchProductList(params).subscribe(data => {
      this.products = data.content;
      this.searchField.totalElements = data.totalElements;
      this.totalPages = data.totalPages;
    });
  }

  search(){
    this.searchField.pageIndex = 1;
    this.getProduct();
  }

  pageChanged(event: any){
    this.searchField.pageIndex = event;
    this.getProduct();
  }

  changePageSize(event: any) {
    this.searchField.pageSize = event.target.value;
    this.searchField.pageIndex = 1;
    this.getProduct();
  }

  updateProduct(id: number){
    return this.router.navigate(['/admin/product/update', id]);
  }

  deleteProduct(id: number){
    let option = confirm("Dữ liệu sẽ bị xóa. Bạn có muốn tiếp tục?");

    if(option == true){
      this.productService.deleteProduct(id).subscribe(data =>{
        this.deleteControl();
      })
    }
  }

  deleteControl(){
    if(this.products.length-1 < 1 && this.searchField.pageIndex !== 1){
      this.searchField.pageIndex = this.searchField.pageIndex - 1;
    }
    this.getProduct();
  }

  downloadImg(e: any){
    this.fileService.downloadFile(e).subscribe( (data:any) =>{
      let blob = new Blob([data.body], {type: data.body.type})
      fileSaver.saveAs(blob, e.name);
    })
  }

  deleteImg(e: any){
    var option = window.confirm("Bạn có chắc chắc sẽ xóa file này?")
    if(option === true){
      this.fileService.deleteFile(e).subscribe( data =>{
        this.getProduct();
      });
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.router.navigate(['']);
  }

}
