import { Injectable } from '@angular/core';
import {Constant} from "../../core/config/constant";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Blog} from "../../core/model/blog/blog";
import {Domain} from "../../core/domain/domain";

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private baseURL = `${Constant.BASE_URL}`;
  private domain = `${Domain.BLOG}`;

  constructor(private httpClient: HttpClient) { }

  getSearchList(param: HttpParams): Observable<any>{
    return this.httpClient.get(`${this.baseURL}/${this.domain}`,{params: param})
  }

  getBlogList(): Observable<Blog[]>{
    return this.httpClient.get<Blog[]>(`${this.baseURL}/home/${this.domain}`)
  }

  getBlogByUrl(url: string): Observable<Blog>{
    return this.httpClient.get<Blog>(`${this.baseURL}/home/${this.domain}/${url}`);
  }

  getBlogById(id: number): Observable<Blog>{
    return this.httpClient.get<Blog>(`${this.baseURL}/${this.domain}/d/${id}`);
  }

  writeBlog(blog: FormData): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}/${this.domain}`, blog);
  }

  updateBlog(id: number, blog: FormData):Observable<Object>{
    return this.httpClient.post(`${this.baseURL}/${this.domain}/${id}`,blog);
  }

  deleteBlog(id: number): Observable<Object>{
    return this.httpClient.get(`${this.baseURL}/${this.domain}/delete/${id}`);
  }

  removeBlog(id: number): Observable<Object>{
    return this.httpClient.get(`${this.baseURL}/${this.domain}/remove/${id}`);
  }
}
