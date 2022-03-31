import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from "rxjs/operators";
import { IAdmin, IFbAuth } from 'src/app/shared/interface';
import { environment } from 'src/environments/environment';


@Injectable()
export class AuthService {

  error1$:Subject<string> = new Subject<string>()

  constructor(private http: HttpClient) { }

  login(admin: IAdmin): Observable<any> {
    return this.http.post<IFbAuth>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, admin)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError)
      )
  }

  handleError = (error: HttpErrorResponse) => {
    const message = error.error.error.message
    switch (message) {
      case 'EMAIL_NOT_FOUND':
        this.error1$.next('Неверный email')
        setTimeout(() => {this.error1$.next('')},5000)
        break
      case 'INVALID_PASSWORD':
        this.error1$.next('Неверный пароль')
        setTimeout(() => {this.error1$.next('')},5000)
        break
    }
    return throwError(message)
  }

  logout() {
    this.setToken(null)
  }

  get token():string | null {
    const expDateOld = localStorage.getItem('fb-token-exp')!
    if (+expDateOld > new Date().getTime()) {
      return localStorage.getItem('fb-token')
    } else {
      this.logout()
      return null
    }
  }

  private setToken(res: IFbAuth | null) {
    if(res) {
      const expDate = new Date(Date.now() + +res!.expiresIn*1000) //возвращается строка в секундах и мы преобразуем в миллисекунды    
      localStorage.setItem('fb-token-exp', JSON.stringify(expDate.getTime()))
      localStorage.setItem('fb-token', res!.idToken) 
    } else {
      localStorage.clear()
    }
  }

  isAuth():boolean {
    return !!this.token
  }

}
