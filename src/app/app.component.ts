import { Component } from '@angular/core';
import { TestComponent } from './components/test-component/test-component.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { ListComponent } from "./components/list/list.component";

import { RouterOutlet } from '@angular/router';
import { LoginPageComponent } from "./components/login-page/login-page.component";
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [RouterOutlet, CommonModule, LoginPageComponent, TestComponent, SearchPageComponent, ListComponent, LoginPageComponent, NavBarComponent],  // Import your standalone components
})
export class AppComponent {

  constructor(private router: Router) {}

  get isLoginPage(): boolean {
    return this.router.url === '/login'; // Assuming '/login' is your login route
  }

}
