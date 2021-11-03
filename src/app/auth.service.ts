import { User } from './user.model';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';
import { Profiles } from './profiles.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost/provaAPI/api';
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  constructor(private http: HttpClient) { 
    this.loadToken();
  }

  register(user: User) {
    return this.http.post(`${this.url}/register`, user);
  }

  login(credentials: User): Observable<string> {
    return this.http.post<{ token: string }>(`${this.url}/login`, credentials).pipe(
      map(response => response.token),
    tap(_ => {
      this.isAuthenticated.next(true);
    }))
  }
  async loadToken() {
    const token = await localStorage.getItem('token');    
    if (token) {
      console.log('set token: ', token);
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }
  getProfiles(){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
    return this.http.get(`${this.url}/profili`, { headers })
  }

  createProfile(profile: Profiles){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
    return this.http.post(`${this.url}/profili`, profile, { headers })
  }

  onCreate() {
    // Do this on service. But for this demo lets do here
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });

    //this.http.get(`http://localhost/provaAPI/api/profili`, { headers }).subscribe(console.log);
  }

}

