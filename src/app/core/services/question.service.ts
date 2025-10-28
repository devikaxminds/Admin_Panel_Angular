import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map, tap, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface RawQuestionItem {
  id: string;
  question?: string;
  title?: string;
  match_title?: string;
  type?: string;
  status?: string;
  date?: string;         // e.g. 24/Oct/2025
  created_at?: string;
  updated_at?: string;
  [key: string]: any;
}

interface QuestionGroup {
  match_date: string;
  match_name?: string;
  match_time?: string;
  questions: any[];
}

export interface RawQuestionResponse {
  status: string;
  response: {
    total_items: number;
    current_page: number;
    total_pages: number;
    result: QuestionGroup[];
  };
}

export interface Question {
  id: string;
  question: string;
  type: string;
  createdOn: string;
  status: string;
  raw: RawQuestionItem; // keep full original if needed
}

export interface QuestionResultMeta {
  total: number;
  page: number;
  totalPages: number;
  data: Question[];
}

@Injectable({ providedIn: 'root' })
export class QuestionService {
  private readonly baseUrl = `${environment.baseUrl}/v2/datewise_question_list`;

  constructor(private http: HttpClient) {}

  getQuestions(opts: {
    page?: number;
    size?: number;
    type?: string;
    status?: string;
    date_from_?: string;
    date_to_?: string;
    search?: string;
  } = {}): Observable<QuestionResultMeta> {
    const params = new HttpParams()
      .set('page', String(opts.page ?? 1))
      .set('size', String(opts.size ?? 10))
      .set('type', opts.type ?? 'match')
      .set('status', opts.status ?? '')
      .set('date_from_', opts.date_from_ ?? '')
      .set('date_to_', opts.date_to_ ?? '')
      .set('search', opts.search ?? '');

    console.log('[QuestionService] Fetching questions', params.toString());

    return this.http.get<RawQuestionResponse>(this.baseUrl, { params }).pipe(
      tap(raw => console.log('[QuestionService] Raw API response', raw)),
      map(api => {
        const groups = api.response.result || [];
        const flat = groups.flatMap(g =>
          (g.questions || []).map(q => ({
            id: q.id,
            question: q.question_text || q.question || q.title || q.match_name || '(No Title)',
            type: q.type || opts.type || 'match',
            createdOn: q.created_date_time || g.match_date || '',
            status: q.action || (q.delete_status === false ? 'Active' : 'Inactive'),
            raw: q
          }))
        );
        const mapped: QuestionResultMeta = {
          total: api.response.total_items,      // or flat.length if you want actual question count
          page: api.response.current_page,
          totalPages: api.response.total_pages,
          data: flat
        };
        console.log('[QuestionService] Flattened questions count', mapped.data.length);
        return mapped;
      }),
      catchError(err => {
        console.error('[QuestionService] Error fetching questions', err);
        return throwError(() => err);
      })
    );
  }
}