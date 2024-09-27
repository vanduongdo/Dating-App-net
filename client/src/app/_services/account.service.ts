import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../_models/user';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root' 
  // This service is a singleton that is shared across the entire application
  // And is injected into any class that asks for it, instance of the service is created when the app is bootstrapped
  // And they're destroyed when the app is closed, disposed of when the app is closed
})
export class AccountService {
  private http = inject(HttpClient);
  baseUrl = 'http://localhost:5274/api/';
  currentUser = signal<User | null>(null);

  login(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((user) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUser.set(user);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }
}
