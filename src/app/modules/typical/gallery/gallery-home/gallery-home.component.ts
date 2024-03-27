import { Component, OnInit } from '@angular/core';
import {Gallery} from "../gallery";
import {GalleryService} from "../../../../services/gallery/gallery.service";

@Component({
  selector: 'app-gallery-home',
  templateUrl: './gallery-home.component.html',
  styleUrls: ['./gallery-home.component.css']
})
export class GalleryHomeComponent implements OnInit {

  galleries: Gallery[] = [];
  firstImage = {
    url: '',
    caption: '',
    description: ''
  }

  constructor(private galleryService: GalleryService) { }

  ngOnInit(): void {
    this.galleryService.getAll().subscribe(data => {
      this.galleries = data;
      this.firstImage.url = this.galleries[0].image.pathUrl;
    })
  }

}
