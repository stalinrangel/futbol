import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.scss']
})
export class ClubsComponent implements OnInit {

  page = 2;
  page1 = 3;
  active = 1;
  active1 = 1;
  active2 = 1;
  public clubs:any=[];
  public club:UserModel= new UserModel();
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getDatos();
  }

  getDatos(){
    let self=this;
    setTimeout(() => {
      self.users();
    }, 250);
  }

  users(){
    let self=this;

    this.api.clubs().subscribe({
      next(data){
        console.log(data)
        self.clubs=data;
        for (let i = 0; i < self.clubs.length; i++) {
          if (self.clubs[i].logo!=null) {
            self.clubs[i].imagen="https://api.ronnie.es/uploads/club/"+self.clubs[i].id+"/profile/"+self.clubs[i].logo;
          }else{
            self.clubs[i].imagen="assets/img/theme/club.jpg";
          }
        }
      },error(err){
        console.log(err);
      }
    })
  }

  info(club){
    console.log(club)
    this.club=club;
  }

}
