import { Injectable } from '@angular/core';
import {Constant} from "../../core/config/constant";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Recruit} from "../../core/model/recruit/recruit";
import {Domain} from "../../core/domain/domain";

@Injectable({
  providedIn: 'root'
})
export class RecruitService {

  private baseURL = `${Constant.BASE_URL}`;
  private domain = `${Domain.RECRUIT}`;

  constructor(private httpClient: HttpClient) { }

  getBySearch(param: HttpParams): Observable<any>{
    return this.httpClient.get(`${this.baseURL}/${this.domain}`, {params: param});
  }

  getRecruitList(): Observable<Recruit[]>{
    return this.httpClient.get<Recruit[]>(`${this.baseURL}/home/${this.domain}`);
  }

  getDetails(url: string): Observable<any>{
    return this.httpClient.get(`${this.baseURL}/home/${this.domain}/${url}`);
  }

  getById(id: number): Observable<any>{
    return this.httpClient.get(`${this.baseURL}/${this.domain}/d/${id}`);
  }

  addRecruit(recruit: FormData): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}/${this.domain}`, recruit);
  }

  updateRecruit(id: number, recruit: FormData): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}/${this.domain}/${id}`, recruit);
  }

  deleteRecruit(id: number): Observable<Object>{
    return this.httpClient.get(`${this.baseURL}/${this.domain}/delete/${id}`);
  }
}
