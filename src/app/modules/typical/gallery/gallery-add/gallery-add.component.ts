import { Component, OnInit } from '@angular/core';
import {GalleryService} from "../../../../services/gallery/gallery.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Gallery} from "../gallery";

@Component({
  selector: 'app-gallery-add',
  templateUrl: './gallery-add.component.html',
  styleUrls: ['./gallery-add.component.css']
})
export class GalleryAddComponent implements OnInit {

  id: any;
  url: any;
  gallery: Gallery = new Gallery();
  fileToUpload: any;

  constructor(private galleryService: GalleryService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if(this.id){
      this.galleryService.getById(this.id).subscribe(data => {
        this.gallery = data;
        this.url = this.gallery.image.url;
      })
    }
  }

  goToTypicalList(){
    this.router.navigate(['admin/typical/image']);
  }

  prepareFormData(gallery: Gallery): FormData {
    const formData = new FormData();
    formData.append(
      'typicalImage',
      new Blob([JSON.stringify(gallery)], {type: 'application/json'})
    );

    formData.append(
      'image',
      this.fileToUpload
    )

    return formData;
  }

  onSubmit(){
    const galleryForm = this.prepareFormData(this.gallery)
    if(this.id){
      this.galleryService.update(this.id, galleryForm).subscribe(() => this.goToTypicalList())
    }else{
      this.galleryService.addNew(galleryForm).subscribe( () => this.goToTypicalList())
    }
  }

  onChange(event: any) {
    const files = event.target.files;
    if (files.length === 0)
      return;

    const reader = new FileReader();
    this.fileToUpload = files[0];

    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.url = reader.result;
    }
  }

  notNeedFile(){
    // @ts-ignore
    document.getElementById("file-in").value = null;
    this.url = null;
    this.fileToUpload = null;
  }

}
