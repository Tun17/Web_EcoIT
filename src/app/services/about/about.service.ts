import { Injectable } from '@angular/core';
import {Constant} from "../../core/config/constant";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {About} from "../../core/model/about/about";
import {Domain} from "../../core/domain/domain";

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  private baseURL = `${Constant.BASE_URL}`;
  private domain = `${Domain.ABOUT}`;

  constructor(private httpClient: HttpClient) { }

  getInfo(): Observable<About>{
    return this.httpClient.get<About>(`${this.baseURL}/home/${this.domain}`);
  }

  saveInfo(about: FormData): Observable<any>{
    return this.httpClient.post(`${this.baseURL}/${this.domain}`, about);
  }

  addAddress(id: number, formData: FormData): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}/${this.domain}/address/${id}`, formData);
  }

  unlinkAdd(id: number): Observable<any>{
    return this.httpClient.get(`${this.baseURL}/${this.domain}/address/d/${id}`);
  }
}
