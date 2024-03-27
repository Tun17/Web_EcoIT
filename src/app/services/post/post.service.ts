import { Injectable } from '@angular/core';
import {Constant} from "../../core/config/constant";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "../../core/model/post/post";
import {Domain} from "../../core/domain/domain";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private baseURL = `${Constant.BASE_URL}`;
  private domain = `${Domain.POST}`;

  constructor(private httpClient: HttpClient) { }

  getNewsHome(param: HttpParams): Observable<any>{
    return this.httpClient.get(`${this.baseURL}/home/${this.domain}/page`, {params: param})
  }

  getNewsList(): Observable<Post[]>{
    return this.httpClient.get<Post[]>(`${this.baseURL}/home/${this.domain}`)
  }

  getNewsByUrl(url: string): Observable<Post>{
    return this.httpClient.get<Post>(`${this.baseURL}/home/${this.domain}/${url}`);
  }

  createNews(news: FormData): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}/${this.domain}`, news);
  }

  getNewsById(id: number): Observable<Post>{
    return this.httpClient.get<Post>(`${this.baseURL}/${this.domain}/d/${id}`);
  }

  updateNews(id: number, post: FormData):Observable<Object>{
    return this.httpClient.post(`${this.baseURL}/${this.domain}/${id}`,post);
  }

  deleteNews(id: number): Observable<Object>{
    return this.httpClient.get(`${this.baseURL}/${this.domain}/delete/${id}`);
  }

  removeNews(id: number): Observable<Object>{
    return this.httpClient.get(`${this.baseURL}/${this.domain}/remove/${id}`);
  }

  newsSearchList(param: HttpParams): Observable<any>{
    return this.httpClient.get(`${this.baseURL}/${this.domain}`,{params: param})
  }
}
