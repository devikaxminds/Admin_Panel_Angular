import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../environments/environment';

export interface LoginRequest {
  username: string;
  password: string;
  device_token: string[];
}

export interface UserDetails {
  user_status: boolean;
  id: string;
  phone_number: string;
  avatar: string | null;
  username_update_status: boolean | null;
  profile_pic_url: string | null;
  device_token: string[];
  username: string;
  email: string;
  gst_number: string | null;
  coins: string;
  approval: string | null;
  role: string;
}

export interface LoginResponse {
  status: string;
  access_token: string;
  user_details: UserDetails;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'user_data';

  private readonly currentUserSubject = new BehaviorSubject<UserDetails | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    @Inject(PLATFORM_ID) private readonly platformId: Object
  ) {
    console.log('AuthService initialized');
    // Removed localStorage loading from constructor
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.baseUrl}/login`, credentials).pipe(
      map(response => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem(this.TOKEN_KEY, response.access_token);
          localStorage.setItem(this.USER_KEY, JSON.stringify(response.user_details));
        }
        this.currentUserSubject.next(response.user_details);
        return response;
      }),
      catchError(error => {
        console.error('Login error:', error);
        return throwError(() => error);
      })
    );
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.USER_KEY);
    }
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  getToken(): string | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getCurrentUser(): UserDetails | null {
    return this.currentUserSubject.value;
  }

  refreshToken(): Observable<any> {
    return this.http.post(`${environment.baseUrl}/auth/refresh`, {}).pipe(
      map((response: any) => {
        if (response.access_token && isPlatformBrowser(this.platformId)) {
          localStorage.setItem(this.TOKEN_KEY, response.access_token);
        }
        return response;
      }),
      catchError(error => {
        console.error('Refresh token error:', error);
        return throwError(() => error);
      })
    );
  }
}