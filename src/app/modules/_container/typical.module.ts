import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {GalleryControlComponent} from "../typical/gallery/gallery-control/gallery-control.component";
import {GalleryAddComponent} from "../typical/gallery/gallery-add/gallery-add.component";

const routes: Routes = [
  {path: 'image', title: 'Admin - Ảnh nổi bật', component: GalleryControlComponent},
  {path: 'image/new', component: GalleryAddComponent},
  {path: 'image/update/:id', component: GalleryAddComponent},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class TypicalModule { }
