import { Injectable } from '@angular/core';
import {Constant} from "../../core/config/constant";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../../core/model/product/product";
import {Domain} from "../../core/domain/domain";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseURL = `${Constant.BASE_URL}`;
  private domain = `${Domain.PRODUCT}`;

  constructor(private httpClient: HttpClient) { }

  getProductList(): Observable<Product[]>{
    return this.httpClient.get<Product[]>(`${this.baseURL}/home/${this.domain}`);
  }
  searchProductList(param: HttpParams): Observable<any>{
    return this.httpClient.get(`${this.baseURL}/${this.domain}`, {params: param});
  }

  getProductById(id:number): Observable<Product>{
    return this.httpClient.get<Product>(`${this.baseURL}/${this.domain}/d/${id}`);
  }

  getProductByUrl(url: string): Observable<Product>{
    return this.httpClient.get<Product>(`${this.baseURL}/home/${this.domain}/${url}`);
  }

  addNewProduct(newProduct: FormData): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}/${this.domain}`, newProduct);
  }

  updateProduct(id: number, product: FormData): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}/${this.domain}/${id}`, product);
  }

  deleteProduct(id: number): Observable<Object>{
    return this.httpClient.get(`${this.baseURL}/${this.domain}/remove/${id}`);
  }
}
