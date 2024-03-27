import { Component, OnInit } from '@angular/core';
import {HttpParams} from "@angular/common/http";
import {BannerService} from "../../../services/banner/banner.service";
import {Banner} from "../../../core/model/banner/banner";
import * as fileSaver from "file-saver";
import {FileService} from "../../../services/file/file.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NgbModalRef} from "@ng-bootstrap/ng-bootstrap/modal/modal-ref";
import {BannerAddComponent} from "../banner-add/banner-add.component";

@Component({
  selector: 'app-banner-control',
  templateUrl: './banner-control.component.html',
  styleUrls: ['./banner-control.component.css']
})
export class BannerControlComponent implements OnInit {

  modalRef?: NgbModalRef;
  bannerList: Banner[] = [];

  totalPages: any;
  pageSizes = [4, 8, 12];
  searchField = {
    pageIndex: 1,
    pageSize: 4,
    totalElements: 0,
    target: '',
    sortField: '',
    sortDir: ''
  }

  constructor(private bannerService: BannerService, private fileService: FileService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getBySearch();
  }

  getBySearch(){
    const params = new HttpParams()
      .set('pageNo', this.searchField.pageIndex)
      .set('pageSize', this.searchField.pageSize)
      .set('sortField', this.searchField.sortField)
      .set('sortDir', this.searchField.sortDir)
      .set('target', this.searchField.target);
    this.bannerService.filterList(params).subscribe(data => {
      this.bannerList = data.content;
      this.searchField.totalElements = data.totalElements;
      this.totalPages = data.totalPages;
    });
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

  create(){
    this.modalRef = this.modalService.open(BannerAddComponent, {
      centered: false,
      backdrop: false,
      animation: true,
    })

    this.modalRef.result.then(item => {
      if (item){
        this.getBySearch();
      }
    })
  }

  downloadImg(e: any){
    this.fileService.downloadFile(e).subscribe( (data:any) =>{
      let blob = new Blob([data.body], {type: data.body.type})
      fileSaver.saveAs(blob, e.name);
    })
  }

  deleteImg(e: any){
    // var option = window.confirm("Bạn có chắc chắc sẽ xóa file này?")
    // if(option === true){
    //   this.fileService.deleteFile(e[0]).subscribe( data =>{
    //     this.getBySearch();
    //   });
    // }
  }

}
