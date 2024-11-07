// src/app/services/tvmaze.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Show } from '../models/show';

@Injectable({
  providedIn: 'root',
})
export class TvMazeService {
  private apiUrl = 'https://api.tvmaze.com/search/shows?q=';

  constructor(private http: HttpClient) {}

  searchShows(query: string): Observable<Show[]> {
    return this.http.get<{ show: Show }[]>(`${this.apiUrl}${query}`).pipe(
      map(response => response.map(item => item.show)) // Extract show data
    );
  }
}
