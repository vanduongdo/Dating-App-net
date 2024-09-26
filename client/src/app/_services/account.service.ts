import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' 
  // This service is a singleton that is shared across the entire application
  // And is injected into any class that asks for it, instance of the service is created when the app is bootstrapped
  // And they're destroyed when the app is closed, disposed of when the app is closed
})
export class AccountService {
  private http = inject(HttpClient);
  baseUrl = 'http://localhost:5274/api/';

  login(model: any) {
    return this.http.post(this.baseUrl + 'account/login', model);
  }
}
