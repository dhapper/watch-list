import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Show } from '../models/show';

@Injectable({
  providedIn: 'root',
})
export class TvMazeService {
  private apiUrl = 'https://api.tvmaze.com';

  constructor(private http: HttpClient) {}

  searchShows(query: string): Observable<Show[]> {
    return this.http.get<{ show: Show }[]>(`${this.apiUrl}/search/shows?q=${query}`).pipe(
      map(response => response.map(item => item.show))
    );
  }

  getShowById(id: number): Observable<Show> {
    return this.http.get<Show>(`${this.apiUrl}/shows/${id}`).pipe(
      map(response => ({
        id: response.id,
        name: response.name,
        genres: response.genres,
        summary: response.summary,
        rating: response.rating,
        image: response.image
        // Map additional fields as needed
      }))
    );
  }
}
