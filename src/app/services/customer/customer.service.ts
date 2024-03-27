import { Injectable } from '@angular/core';
import {Constant} from "../../core/config/constant";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../../core/model/customer/customer";
import {Domain} from "../../core/domain/domain";
import {TypicalCustomer} from "../../modules/typical/customer/typical-customer";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseURL = `${Constant.BASE_URL}`;
  private domain = `${Domain.CUSTOMER}`;

  constructor(private httpClient: HttpClient) { }

  getBySearch(param: HttpParams): Observable<any>{
    return this.httpClient.get(`${this.baseURL}/${this.domain}`, {params: param});
  }
  getCustomerList(): Observable<Customer[]>{
    return this.httpClient.get<Customer[]>(`${this.baseURL}/home/${this.domain}`);
  }

  getCusByUrl(url: string): Observable<Customer>{
    return this.httpClient.get<Customer>(`${this.baseURL}/home/${this.domain}/${url}`);
  }

  getCusById(id: number): Observable<Customer>{
    return this.httpClient.get<Customer>(`${this.baseURL}/${this.domain}/d/${id}`);
  }

  newCustomer(formData: FormData): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}/${this.domain}`, formData);
  }

  updateCustomer(id: number, formData: FormData):Observable<Object>{
    return this.httpClient.post(`${this.baseURL}/${this.domain}/${id}`,formData);
  }

  deleteCustomer(id: number): Observable<Object>{
    return this.httpClient.get(`${this.baseURL}/${this.domain}/delete/${id}`);
  }

  removeCustomer(id: number): Observable<Object>{
    return this.httpClient.get(`${this.baseURL}/${this.domain}/remove/${id}`);
  }

  getTrashList(): Observable<Customer[]>{
    return this.httpClient.get<Customer[]>(`${this.baseURL}/${this.domain}/recycle-bin`);
  }

  restoreItem(id: number): Observable<Object>{
    return this.httpClient.get(`${this.baseURL}/${this.domain}/restore/${id}`);
  }


  // TYPICAL CUSTOMER ======================================================================================
  getTypicalSearch(param: HttpParams): Observable<any>{
    return this.httpClient.get(`${this.baseURL}/${this.domain}/typical`, {params: param});
  }

  getTypicalList(): Observable<TypicalCustomer[]>{
    return this.httpClient.get<TypicalCustomer[]>(`${this.baseURL}/home/${this.domain}/typical`);
  }

  newTypical(formData: FormData): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}/${this.domain}/typical`, formData);
  }
}
