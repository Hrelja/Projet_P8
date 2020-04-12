import { Component, OnInit } from '@angular/core';
import { Login } from './../../services/login/login.service';
import { AngularFireAuth } from '@angular/fire/auth';


import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  login: Login = {
    email: '',
    password: '',
  }

  constructor(public afAuth: AngularFireAuth, public router: Router ) { }

  ngOnInit() {

  }
  async alertUserNotFound(){
    const alert = document.createElement('ion-alert');
    alert.message = 'User not found';
    alert.buttons = ['OK'];

    document.body.appendChild(alert);
    return alert.present();
  }

  async alertEmail() {
    const alert = document.createElement('ion-alert');
    alert.message = 'You have entered an invalid email address!';
    alert.buttons = ['OK'];

    document.body.appendChild(alert);
    return alert.present();
  }

  async wrongPassword(){
    const alert = document.createElement('ion-alert');
    alert.message = 'Wrong Password!';
    alert.buttons = ['OK'];

    document.body.appendChild(alert);
    return alert.present();
  }

  async log(){
    try{
      const res = await this.afAuth.auth.signInWithEmailAndPassword(this.login.email, this.login.password)
      this.router.navigateByUrl('/menu/home')
    }catch(err){
      console.dir(err)
      if (err.code === "auth/user-not-found"){
         this.alertUserNotFound();
        
      }else if (err.code === "auth/invalid-email"){
          this.alertEmail();
      }else if (err.code === "auth/wrong-password") {
          this.wrongPassword();
      }


    }
  }
}