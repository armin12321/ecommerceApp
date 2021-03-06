import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../services/server.service';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  title: string = 'register page.';
  name: string;
  surname: string;
  username: string;
  email: string;
  password: string;
  repeatedPassword: string;
  address: string;
  type: string;
  img: File;
  imgUrl: any;

  constructor(
    private serverService: ServerService,
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    if (this.tokenService.expiredToken() === false) {
      this.router.navigate(['/public/home']);
    }
  }
  
  onSubmit(){
    var fdata = new FormData();

    const user = {
      name: this.name,
      surname: this.surname,
      email: this.email,
      username: this.username,
      password: this.password,
      address: this.address,
      type: this.type,
      repeatedPassword: this.repeatedPassword
    }

    if (!this.validateService.validateRegisterForm(user)){
      this.flashMessage.show('Please fill in all fields!', { cssClass: 'flashMessages alert-danger', timeout: 1500 });
      return false;
    }

    if (!this.validateService.validateEmail(user.email)){
      this.flashMessage.show('Please provide valid email!', { cssClass: 'flashMessages alert-danger', timeout: 1500 });
      return false;
    }

    if (!this.validateService.validatePasswords(user.password, user.repeatedPassword)){
      this.flashMessage.show("Passwords don't match!", { cssClass: 'flashMessages alert-danger', timeout: 1500 });
      return false;
    }
    
    for (let key in user){
      fdata.append(key, user[key]);
    }

    fdata.append('file', this.img);

    this.serverService.postRegisterData(fdata).subscribe(data => {
      if (data.success){
        this.flashMessage.show('Registered successfully', { cssClass: 'flashMessages alert-success', timeout: 1500 });
        this.router.navigate(['user/login']);
      }else {
        this.flashMessage.show(data.msg, { cssClass: 'flashMessages alert-danger', timeout: 1500 });
      }
    });
  }

  fileSelected(event){
    if (event.target.files.length > 0){
      const file = <File>event.target.files[0];
      this.img = file;
    }
    let reader = new FileReader();
    reader.readAsDataURL(this.img);
    reader.onload = (_event) => {
      this.imgUrl = reader.result;
    }
  }

}
