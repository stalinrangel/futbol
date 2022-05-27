import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginModel } from 'src/app/models/login.model';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public model:LoginModel= new LoginModel();
  constructor(private router: Router , private api: ApiService, private uss:UserStorageService ) {}

  ngOnInit() {}

  login(){
    console.log(this.model);
    let self = this;
    this.api.signin(this.model).subscribe({
      next(data){
        //console.log(data);
        self.uss.set(data);
        setTimeout(() => {
          self.router.navigate(['/dashboard']);
        }, 250);
      },error(err){
        console.log(err);
        if(err.error.err=='Inactive club'){
          self.router.navigate(['/activar']);
        }
      }
    })
  }

  ngOnDestroy() {

  }
}
