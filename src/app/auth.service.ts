import { User } from './user.model';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';
import { Profiles } from './profiles.model';
import { Appointments } from './appointments.model';

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
    return this.http.get<[Profiles]>(`${this.url}/profili`, { headers })
  }

  createProfile(profile: Profiles){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
    return this.http.post(`${this.url}/profili`, profile, { headers })
  }

  updateProfile(profile: Profiles, id: string){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
    return this.http.put(`${this.url}/profili/`+ id, profile, { headers })
  }

  deleteProfile(id: string){
    return this.http.delete(`${this.url}/profili/`+ id);
  }

  addAppointment(appoint: Appointments){
    return this.http.post(`${this.url}/appoint`, appoint)
  }

  getAllAppoint(){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
    return this.http.get<[Appointments]>(`${this.url}/appoint`, { headers })
  }

  deleteAppoint(id: string){
    return this.http.delete(`${this.url}/appoint/`+ id);
  }
}

