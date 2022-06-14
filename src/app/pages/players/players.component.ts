import { Component, OnInit } from '@angular/core';
import { PlayerModel } from 'src/app/models/player.model';
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
  public players:any=[];
  public player:PlayerModel= new PlayerModel();
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

    this.api.players().subscribe({
      next(data){
        console.log(data)
        self.players=data;
        for (let i = 0; i < self.players.length; i++) {
          if (self.players[i].picture!=null) {
            self.players[i].imagen="https://api.ronnie.es/uploads/user/"+self.players[i].id+"/profile/"+self.players[i].picture;
          }else{
            self.players[i].imagen="assets/img/theme/team-4-800x800.jpg";
          }
          if (self.players[i].birthday) {
            self.players[i].edad=self.calculateAge(self.players[i].birthday);
          }
          if (self.players[i].genre=='M') {
            self.players[i].sexo='Masculino';
          }else{
            self.players[i].sexo='Femenino';
          }
        }
      },error(err){
        console.log(err);
      }
    })
  }

  calculateAge(date) {
    const today: Date = new Date();
    const birthDate: Date = new Date(date);
    let age: number = today.getFullYear() - birthDate.getFullYear();
    const month: number = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
  }

  info(player){
    console.log(player)
    this.player=player;

  }
}
