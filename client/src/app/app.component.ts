import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./nav/nav.component";
import { AccountService } from './_services/account.service';
import { HomeComponent } from "./home/home.component";
import { NgxSpinnerComponent } from 'ngx-spinner';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, NavComponent, NgxSpinnerComponent],
})
export class AppComponent {
    private accountService = inject(AccountService);
    title = 'DatingApp-SPA';

    ngOnInit(): void {
        this.setCurrentUser();
    }

    setCurrentUser() {
        const userString = localStorage.getItem('user');
        if(!userString) return;
        const user = JSON.parse(userString);
        this.accountService.currentUser.set(user);
    }
}
