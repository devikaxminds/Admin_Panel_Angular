import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  coins: number;
  createdOn: string;
  status: string;          // 'Active' | 'Inactive'
  location?: string;
  profilePic?: string | null;
}

export interface UsersResultMeta {
  total: number;
  page: number;
  totalPages: number;
  data: User[];
}

interface UsersApiItem {
  id: string;
  username: string;
  profile_pic_url: string | null;
  user_status: boolean;
  location: string | null;
  phone_number: string | null;
  email: string;
  gst_number: string | null;
  coins: string;
  delete_status: string;     // 'active' | ...
  bank_details: any;
  date: string;              // e.g. 24/Oct/2025
}

interface UsersApiResponse {
  status: string;
  response: {
    total_items: number;
    current_page: number;
    total_pages: number;
    result: UsersApiItem[];
  };
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly baseUrl = `${environment.baseUrl}/v2/users_admin_panel`;

  constructor(private http: HttpClient) {}

  getUsers(opts: {
    page?: number;
    size?: number;
    status?: string;
    coin_from_?: string;
    coin_to_?: string;
    date_from_?: string;
    date_to_?: string;
    search?: string;
  } = {}): Observable<UsersResultMeta> {
    let params = new HttpParams()
      .set('page', String(opts.page ?? 1))
      .set('size', String(opts.size ?? 10))
      .set('status', opts.status ?? '')
      .set('coin_from_', opts.coin_from_ ?? '')
      .set('coin_to_', opts.coin_to_ ?? '')
      .set('date_from_', opts.date_from_ ?? '')
      .set('date_to_', opts.date_to_ ?? '')
      .set('search', opts.search ?? '');

    return this.http.get<UsersApiResponse>(this.baseUrl, { params }).pipe(
      map(api => {
        const meta: UsersResultMeta = {
          total: api.response.total_items,
            page: api.response.current_page,
          totalPages: api.response.total_pages,
          data: api.response.result.map(r => ({
            id: r.id,
            name: r.username,
            email: r.email,
            phone: r.phone_number || undefined,
            coins: parseInt(r.coins, 10) || 0,
            createdOn: r.date,
            status: r.delete_status === 'active' ? 'Active' : 'Inactive',
            location: r.location || undefined,
            profilePic: r.profile_pic_url
          }))
        };
        return meta;
      })
    );
  }
}
