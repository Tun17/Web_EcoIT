import {HTTP_INTERCEPTORS, HttpEvent} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenStorageService} from "../../services/token-storage/token-storage.service";

const TOKEN_HEADER_KEY = "Authorization";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  constructor(private token: TokenStorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let  authReq = req;
    const token = this.token.getToken();
    // const headerConfig = {
    //   'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    //   'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
    //   'Access-Control-Allow-Origin': '*',
    //   'Access-Control-Allow-Credentials': 'true',
    // };
    // if (token) {
    //   // @ts-ignore
    //   headerConfig['Authorization'] = `Bearer ${token}`;
    // }
    // req = req.clone({
    //   setHeaders: headerConfig,
    // });
    if(token != null){
      authReq = req.clone({headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token)});
    }

    return next.handle(authReq);
  }
}

export const authInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
]
