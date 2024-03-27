import { Injectable } from '@angular/core';
import {Constant} from "../../core/config/constant";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Navigator} from "../../core/model/navigator/navigator";
import {Domain} from "../../core/domain/domain";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private baseURL = `${Constant.BASE_URL}`;
  private domain = `${Domain.NAVIGATION}`;

  constructor(private httpClient: HttpClient) { }

  getNavList(): Observable<Navigator[]>{
    return this.httpClient.get<Navigator[]>(`${this.baseURL}/home/${this.domain}`);
  }

  getNavGroup(): Observable<Navigator[]>{
    return this.httpClient.get<Navigator[]>(`${this.baseURL}/${this.domain}/group`);
  }

  searchNavList(param: HttpParams): Observable<any>{
    return this.httpClient.get(`${this.baseURL}/${this.domain}/search`, {params: param});
  }

  getById(id:any): Observable<Navigator>{
    return this.httpClient.get<Navigator>(`${this.baseURL}/${this.domain}/${id}`);
  }

  addNewNav(navigator: Navigator): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}/${this.domain}`, navigator);
  }

  updateNav(id: number, navigator: Navigator): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}/${this.domain}/${id}`, navigator);
  }

  deleteNav(id: number): Observable<Object>{
    return this.httpClient.get(`${this.baseURL}/${this.domain}/delete/${id}`);
  }

  deleteAllNav(formData: FormData): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}/${this.domain}/deleteAll`, formData);
  }
}
