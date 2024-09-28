import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  http = inject(HttpClient);
  registerMode = false;
  users: any;

  ngOnInit() {
    this.getUsers();
  }

  registertoggle() {
    this.registerMode = !this.registerMode;
  }

  cancelRegisterModel(event: boolean) {
    this.registerMode = event;
  }

  getUsers() {
    this.http.get('http://localhost:5274/api/users').subscribe({
      next: (response) => {
        this.users = response;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('Request completed');
      },
    });
  }
}
