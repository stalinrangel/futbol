import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginModel } from '../models/login.model';
import { UserStorageService } from './user-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public e=environment;
  public user:any=this.uss.user;
  private url="https://api.ronnie.es/v1";
;
  constructor(private http:HttpClient, private uss:UserStorageService) { }

  signin(model: LoginModel): Observable<any> {
    return this.http.post(this.url+'/auth/signin', model)
  }

  players(): Observable<any> {
    let headers = new HttpHeaders();
    console.log(this.user);
    headers = headers.set('Authorization', 'Bearer '+this.user.token);
    return this.http.get(this.url+'/admin/user',{headers: headers})
  }

  clubs(): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer '+this.user.token);
    return this.http.get(this.url+'/admin/club',{headers: headers})
  }

  scootings(): Observable<any> {
    let headers = new HttpHeaders();
    console.log(this.user.token);
    headers = headers.set('Authorization', 'Bearer '+this.user.token);
    return this.http.get(this.url+'/admin/scout',{headers: headers})
  }

  signup_scooting(model: any): Observable<any> {
    console.log(model)
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer '+this.user.token);
    return this.http.post(this.url+'/admin/scout', model,{headers: headers})
  }
}
