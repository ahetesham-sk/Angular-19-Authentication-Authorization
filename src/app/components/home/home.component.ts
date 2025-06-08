import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  authService = inject(AuthService);
  users: any[] = [];
  currentUser: any;

  ngOnInit() {
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
  }
}
