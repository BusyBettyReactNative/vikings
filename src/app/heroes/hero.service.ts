import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Hero, ToastService } from '../core';

const api = '/api';

@Injectable()
export class HeroService {
  constructor(private http: HttpClient, private toastService: ToastService) {}

  logout() {
    return this.http.get(`${api}/logout`);
  }

  getProfile() {
    return this.http.get<any>(`${api}/profile`);
  }

  getHeroes() {
    const url = `${api}/heroes`;
    const msg = 'Heroes retrieved successfully!';
    return this.http
      .get<Hero[]>(url)
      .pipe(
        tap(() => this.toastService.openSnackBar(msg, 'GET')),
        catchError(this.handleError)
      );
  }

  private handleError(res: HttpErrorResponse) {
    console.error(res.error);
    return Observable.throw(res.error || 'Server error');
  }

  deleteHero(hero: Hero) {
    return this.http
      .delete(`${api}/hero/${hero.id}`)
      .pipe(
        tap(() =>
          this.toastService.openSnackBar(`Hero ${hero.name} deleted`, 'DELETE')
        )
      );
  }

  addHero(hero: Hero) {
    return this.http
      .post<Hero>(`${api}/hero/`, hero)
      .pipe(
        tap(() =>
          this.toastService.openSnackBar(`Hero ${hero.name} added`, 'POST')
        )
      );
  }

  updateHero(hero: Hero) {
    return this.http
      .put<Hero>(`${api}/hero/${hero.id}`, hero)
      .pipe(
        tap(() =>
          this.toastService.openSnackBar(`Hero ${hero.name} updated`, 'PUT')
        )
      );
  }
}