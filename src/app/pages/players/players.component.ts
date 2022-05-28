import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {
  page = 2;
  page1 = 3;
  active = 1;
  active1 = 1;
  active2 = 1;
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
      },error(err){
        console.log(err);
      }
    })
  }
}
