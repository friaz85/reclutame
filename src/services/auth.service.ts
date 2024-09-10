import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any> | any;
  public currentUser: Observable<any> | any;

  url = environment.url;


  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem("User")  || "[]")
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  async login(username: any, password: any) {
    return this.http
      .post<any>(`${this.url}login`, {
          "p_email": username,
          "p_password": password
      })
      .pipe(
        map((user) => {
          // console.log(user);
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          if (user) {
            localStorage.setItem("User", JSON.stringify(user));
            this.currentUserSubject.next(user);
          }
          return user;
        })
      );
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem("User");
    this.currentUserSubject.next([]);
    this.router.navigate([""]);
  }

}
