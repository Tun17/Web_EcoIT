import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {BlogControlComponent} from "../blog/blog-control/blog-control.component";
import {BlogAddComponent} from "../blog/blog-add/blog-add.component";

const routes: Routes = [
  {path: '', component: BlogControlComponent},
  {path: 'new', component: BlogAddComponent},
  {path: 'update/:id', component: BlogAddComponent},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class BlogModule { }
