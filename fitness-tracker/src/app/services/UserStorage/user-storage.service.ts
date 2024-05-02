import { Injectable } from '@angular/core';
import { UserDetailsDTO } from 'src/app/model/UserDTOs/UserDetailsDTO';
import { UserDTO } from 'src/app/model/UserDTOs/UserDTO';

@Injectable({
  providedIn: 'root',
})
export class UserStorageService {
  private loggedInUser?: UserDetailsDTO;

  constructor() {
    const token = localStorage.getItem('access_token');
    if (token) {
      this.setLoggedInUser();
    }
  }

  getLoggedInUser(): UserDetailsDTO | undefined {
    this.setLoggedInUser();
    return this.loggedInUser;
  }

  setLoggedInUser() {
    const token = localStorage.getItem('access_token');
    if (token && !this.loggedInUser) {
      const json = JSON.parse(atob(token.split('.')[1]));
      this.loggedInUser = {
        role: json.role,
        email: json.email,
        firstName: json.firstName,
        lastName: json.lastName,
      };
    }
  }

  clearLoggedInUser() {
    this.loggedInUser = undefined;
  }

  isLoggedIn() {
    return this.loggedInUser !== undefined && this.loggedInUser !== null;
  }

  isClient(): boolean {
    return this.loggedInUser?.role === 'CLIENT';
  }
}
