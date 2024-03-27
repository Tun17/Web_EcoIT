import { Injectable } from '@angular/core';
import {Constant} from "../../core/config/constant";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Number} from "../../modules/typical/number/number";
import {Domain} from "../../core/domain/domain";

@Injectable({
  providedIn: 'root'
})
export class NumberService {

  private baseURL = `${Constant.BASE_URL}`;
  private domain = `${Domain.NUMBER}`;

  constructor(private httpClient: HttpClient) { }

  getAllNumber(): Observable<Number[]>{
    return this.httpClient.get<Number[]>(`${this.baseURL}/home/${this.domain}`);
  }

  getById(id: number): Observable<Number>{
    return this.httpClient.get<Number>(`${this.baseURL}/${this.domain}/${id}`);
  }

  createNumber(number: Number): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}/${this.domain}`, number);
  }

  updateTypicalNum(id: number, number: Number): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}/${this.domain}/${id}`, number);
  }

  deleteTypicalNum(id: number): Observable<any>{
    return this.httpClient.get(`${this.baseURL}/${this.domain}/delete/${id}`);
  }
}
