import { HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {


  constructor() {
  }

  intercept(req, next) {

    var token = localStorage.getItem('token');
    var authRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    })
    return next.handle(authRequest);
  }

}
