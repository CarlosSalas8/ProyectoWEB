import { Injectable } from '@angular/core';
import axios, {AxiosError, AxiosResponse} from 'axios';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  private _token: string | null = null;
  constructor(private router: Router) { }

  get token(): string | null {
    return this._token;
  }

  set token(value: string | null) {
    this._token = value;
  }

  login(username: string, password: string): Promise<void> {
    return axios.post('http://localhost:8000/api-user-login/', {
      username, password
    })
      .then((response: AxiosResponse) => {
        this._token = response.data.token;
        if (typeof this._token === "string") {
          localStorage.setItem('authToken', this._token);
        }
        return response.data;
      });
  }
  logout(): void {
    const token = this._token;
    this._token = null;
    localStorage.removeItem('authToken');
    // Aquí hacemos una petición al servidor para invalidar el token
    axios.post('http://localhost:8000/api-logout/', {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response: AxiosResponse) => {
        console.log('Logout successful');
      })
      .catch((error: AxiosError) => {
        console.error('Logout failed', error);
      });

    this.router.navigate(['login']);
  }
  isUserAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    return !!token;
  }

}
