import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginModel } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public e=environment;

  constructor(private http:HttpClient) { }

  signin(model: LoginModel): Observable<any> {
    return this.http.post('https://api.ronnie.es/v1/auth/signin', model)
  }
}
