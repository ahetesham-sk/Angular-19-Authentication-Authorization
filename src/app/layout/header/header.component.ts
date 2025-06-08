import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  router = inject(Router);
  authService = inject(AuthService);

  ngOnInit() {

  }

  logout() {
    // Clear user data from local storage or service
    sessionStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

}
