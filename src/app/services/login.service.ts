import { Injectable } from '@angular/core';
import axios, {AxiosResponse} from 'axios';

@Injectable()
export class AuthService {
  private _token: string | null = null;

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
  isUserAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    return !!token;
  }

}
