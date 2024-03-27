import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Constant} from "../../core/config/constant";

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  private baseURL = `${Constant.BASE_URL}`;

  constructor(private httpClient: HttpClient) { }

  filterList(param: HttpParams): Observable<any>{
    return this.httpClient.get(`${this.baseURL}/banner`,{params: param})
  }

  addBanner(banner: FormData): Observable<any>{
    return this.httpClient.post(`${this.baseURL}/banner`, banner);
  }
}
