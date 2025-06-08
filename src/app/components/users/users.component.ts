import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {

  authService = inject(AuthService);
  users: any[] = [];

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.authService.getAllUsers().subscribe({
      next: (response) => {
        console.log('All users:', response);
        this.users = Array.isArray(response) ? response : [];
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }

  editUser(user:any) {
    // Logic to edit user
    console.log('Edit user:', user);
  }

  deleteUser(userId:any) {
    // Logic to edit user
    console.log('Delete user:', userId);
  }

}
