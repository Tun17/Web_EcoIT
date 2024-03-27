import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Constant} from "../../core/config/constant";
import {Address} from "../../core/model/address/address";

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private baseURL = `${Constant.BASE_URL}`;

  private headers = new HttpHeaders()
    .append('Access-Control-Allow-Origin', '*')
    .append('Access-Control-Allow-Methods', 'DELETE, POST, GET, OPTIONS')
    .append('Access-Control-Allow-Credentials', 'true')
    .append('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');


  constructor(private httpClient: HttpClient) { }

  getProvinces(): Observable<any>{
    return this.httpClient.get(`${this.baseURL}/open/api/p/`);
  }

  getProvincesByCode(code: number): Observable<any>{
    return this.httpClient.get(`${this.baseURL}/open/api/p/${code}`);
  }

  getDistricts(): Observable<any>{
    return this.httpClient.get(`${this.baseURL}/open/api/d/`);
  }

  getDistrictsByCode(code: number): Observable<any>{
    return this.httpClient.get(`${this.baseURL}/open/api/d/${code}`);
  }

  getWards(): Observable<any>{
    return this.httpClient.get(`${this.baseURL}/open/api/w/`);
  }
}
