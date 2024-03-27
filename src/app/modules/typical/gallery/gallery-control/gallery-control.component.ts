import { Component, OnInit } from '@angular/core';
import {File} from "../../../../services/file/file";
import * as fileSaver from "file-saver";
import {HttpParams} from "@angular/common/http";
import {GalleryService} from "../../../../services/gallery/gallery.service";
import {Gallery} from "../gallery";
import {Router} from "@angular/router";

@Component({
  selector: 'app-gallery-control',
  templateUrl: './gallery-control.component.html',
  styleUrls: ['./gallery-control.component.css']
})
export class GalleryControlComponent implements OnInit {

  galleries: Gallery[] = [];

  target = {
    url: '',
    id: 1,
    name: '',
    active: '',
    caption: '',
    description: ''
  };

  searchField = {
    pageIndex: 1,
    pageSize: 20,
    totalElements: 0
  }
  totalPages: any;
  pageSizes = [20, 32, 44];

  constructor(private galleryService: GalleryService, private router: Router) { }

  ngOnInit(): void {
    this.getBySearch();
  }

  getBySearch(){
    const params = new HttpParams()
      .set('pageNo', this.searchField.pageIndex)
      .set('pageSize', this.searchField.pageSize)
    this.galleryService.pageableList(params).subscribe(data => {
      this.galleries = data.content;
      this.searchField.totalElements = data.totalElements;
      this.totalPages = data.totalPages;

      this.choose(this.galleries[0]);

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

  choose(e: any){
    this.target.url = e.image.pathUrl;
    this.target.name = e.image.name;
    this.target.id = e.id;
    this.target.active = e.active;
    this.target.description = e.description;
  }

  hideImage(id: number){
    this.galleryService.hide(id).subscribe(() => this.getBySearch())
  }

  show(id: number){
    this.galleryService.show(id).subscribe(() => this.getBySearch())
  }
}
