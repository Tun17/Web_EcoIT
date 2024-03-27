import { Injectable } from '@angular/core';
import {Constant} from "../../core/config/constant";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Gallery} from "../../modules/typical/gallery/gallery";
import {Params} from "@angular/router";
import {Domain} from "../../core/domain/domain";

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  private baseURL = `${Constant.BASE_URL}`;
  private domain = `${Domain.GALLERY}`;

  constructor(private httpClient: HttpClient) { }

  pageableList(param: Params): Observable<any>{
    return this.httpClient.get(`${this.baseURL}/${this.domain}`, {params: param});
  }

  getAll(): Observable<Gallery[]>{
    return this.httpClient.get<Gallery[]>(`${this.baseURL}/home/${this.domain}`);
  }

  getById(id: number): Observable<Gallery>{
    return this.httpClient.get<Gallery>(`${this.baseURL}/${this.domain}/${id}`)
  }

  addNew(formData: FormData): Observable<any>{
    return this.httpClient.post(`${this.baseURL}/${this.domain}`, formData);
  }

  addAlready(formData: FormData): Observable<any>{
    return this.httpClient.post(`${this.baseURL}/${this.domain}/already`, formData);
  }

  addAlreadyById(id: number): Observable<any>{
    return this.httpClient.get(`${this.baseURL}/${this.domain}/already/${id}`);
  }

  update(id: number, gallery: FormData): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}/${this.domain}/${id}`, gallery);
  }

  hide(id: number): Observable<Object>{
    return this.httpClient.get(`${this.baseURL}/${this.domain}/hide/${id}`);
  }

  show(id: number): Observable<Object>{
    return this.httpClient.get(`${this.baseURL}/${this.domain}/show/${id}`);
  }
}
