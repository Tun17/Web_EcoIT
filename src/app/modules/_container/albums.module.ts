import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AlbumsComponent} from "../typical/albums/albums/albums.component";
import {AlbumsDetailsComponent} from "../typical/albums/albums-details/albums-details.component";

const routes: Routes = [
  {path: '', component: AlbumsComponent},
  {path: ':url', component: AlbumsDetailsComponent},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class AlbumsModule { }
