import { Component, OnInit } from '@angular/core';
import { ScootingModel } from 'src/app/models/scooting.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  page = 2;
  page1 = 3;
  active = 1;
  active1 = 1;
  active2 = 1;
  public scootings:any=[];
  public model: ScootingModel= new ScootingModel();
  public formData = new FormData();
  public imagen:any="assets/img/theme/upload.png";
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
    this.api.scootings().subscribe({
      next(data){
        console.log(data)
        self.scootings=data;
        for (let i = 0; i < self.scootings.length; i++) {
          if (self.scootings[i].picture!=null) {
            self.scootings[i].imagen="https://api.ronnie.es/uploads/scout/"+self.scootings[i].id+"/profile/"+self.scootings[i].picture;
            console.log(self.scootings)
          }else{
            self.scootings[i].imagen="../assets/img/theme/usuario.jpg";
          }
        }
      },error(err){
        console.log(err);
      }
    })
  }

  info(scooting){
    console.log(scooting)
    this.model=scooting;
    this.imagen=scooting.imagen;
  }



  register(){

    this.formData.append("email", this.model.email);
    this.formData.append("password", this.model.password);
    //this.formData.append("user_type", this.model.user_type);
    this.formData.append("firstname", this.model.firstname);
    this.formData.append("lastname", this.model.lastname);
    this.formData.append("phone", this.model.phone);
    this.formData.append("enabled", this.model.enabled);
    console.log(this.formData);

    let self = this;
    this.api.signup_scooting(this.formData).subscribe({
      next(data){
        console.log(data);
        console.log(self.model)
        self.scootings.push(self.model);
        //self.router.navigate(['/activar']);
      },error(err){
        console.log(err);
      }
    })
   }

   onFileChange(event){
    //console.log(event);
    if(event[0]){
      let files = event[0];
      var file:File = files;
      console.log(files);
      this.formData.append("picture", file, file.name);
    }else if(event.target.files){
      let files = event.target.files[0];
      console.log(files);
      var file:File = files;
      this.formData.append("picture", file, file.name);
    }

    //console.log(URL.createObjectURL(file));

    var myReader:FileReader = new FileReader();
    let self =this;
    myReader.onloadend = function(e){

      //console.log(myReader.result);
      self.imagen=myReader.result;

    }

    myReader.readAsDataURL(file);
 }

}


