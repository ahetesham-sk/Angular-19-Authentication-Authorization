import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = 'http://localhost:3000/'

  constructor(private http:HttpClient) { }

  //Register a new user
  registerUser(user: any) {
    return this.http.post(`${this.apiUrl}users`, user);
  }

  //Login a user
  loginUser(email: string, password: string) {
    return this.http.get(`${this.apiUrl}users?email=${email}&password=${password}`);
  }

  //Get all users
  getAllUsers() {
    return this.http.get(`${this.apiUrl}users`);
  }

  //Get a user by email
  getUserByEmail(email: string) {
    return this.http.get(`${this.apiUrl}users?email=${email}`);
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('currentUser');
  }

  getUserRole() {
    const user = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
    return user.role;
  }

  //Generate a random user ID
  generateRandomUserId(): string {
    return crypto.randomUUID().substring(0, 4);;
  }
}
