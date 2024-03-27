import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut(): void {
    localStorage.clear();
  }

  public saveToken(token: string): void{
    // localStorage.removeItem(TOKEN_KEY);
    let now = new Date();

    const item = {
      value: token,
      expiry: now.getTime() + (1000 * 60 * 60 * 12),
    }
    localStorage.setItem(TOKEN_KEY, JSON.stringify(item));
    // localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): any{
    const itemStr = localStorage.getItem(TOKEN_KEY)
    if (!itemStr) {
      return null
    }
    const item = JSON.parse(itemStr)
    let now = new Date()
    // compare the expiry time of the item with the current time
    if (now.getTime() > item.expiry) {
      localStorage.removeItem(TOKEN_KEY)
      return null
    }
    return item.value
  }

  public saveUser(user: Object): void{
    localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    // @ts-ignore
    return JSON.parse(localStorage.getItem(USER_KEY));
  }
}
