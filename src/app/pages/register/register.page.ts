import { Component, OnInit } from '@angular/core';
import { Register, RegisterService } from './../../services/register/register.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  register: Register = {
    username: '',
    password: '',
    confirmPassword: '',
    name: '',
    company: '',
    email: ''
  }

  registerId = null;
  constructor(private registerService: RegisterService, private route: ActivatedRoute,
     private loadingController: LoadingController, private nav: NavController, public afAuth: AngularFireAuth, public router: Router) { }

  ngOnInit() {
    this.registerId = this.route.snapshot.params['id'];
    if (this.registerId){
      this.loadRegister();
    }
  }

  async loadRegister(){
    const loading = await this.loadingController.create({
      message: 'Loading Register..'
    });
    await loading.present();

    this.registerService.getRegister(this.registerId).subscribe(res => {
      loading.dismiss();
      this.register = res;
    });
  }

  async saveRegister(){
    const enteredUsername = (<HTMLInputElement>document.getElementById("input-username")).value;
    const enteredPassword = (<HTMLInputElement>document.getElementById("input-password")).value;
    const enteredName = (<HTMLInputElement>document.getElementById("input-name")).value;
    const enteredCompany = (<HTMLInputElement>document.getElementById("input-company")).value;
    const enteredEmail = (<HTMLInputElement>document.getElementById("input-email")).value;
    const enteredConfirmPassword = (<HTMLInputElement>document.getElementById("input-confirm-password")).value;

    try{
    if(
      enteredUsername.trim().length <= 0 ||
      enteredPassword.trim().length <= 0 ||
      enteredName.trim().length <= 0 ||
      enteredCompany.trim().length <= 0 ||
      enteredEmail.trim().length <= 0 ||
      enteredConfirmPassword.trim().length <= 0 ||
      enteredPassword != enteredConfirmPassword
      ){
        this.presentAlert();
      }else{
        const res = await this.afAuth.auth.createUserWithEmailAndPassword(this.register.email, this.register.password)
        const loading = await this.loadingController.create({
          message: 'Registering..'
        });
        await loading.present();
        this.router.navigateByUrl("welcome/login")
        /*if (this.registerId){
          this.registerService.updateRegister(this.register, this.registerId).then(() =>{
            loading.dismiss();
            //this.nav.back('home');
          });
        } else{
          this.registerService.addRegister(this.register).then(() =>{
            loading.dismiss();
            //this.nav.back('home');
          });
        }*/
        this.confirmAlert();
      }
      }catch(err){
        if (err.code === "auth/invalid-email"){
            this.alertEmail();
        }else if (err.code === "auth/weak-password") {
            this.alertPassword();
        }
      }
  }

    async alertPassword(){
      const alert = document.createElement('ion-alert');
      alert.message = 'You have entered an invalid password (must be more than 6 characters)!';
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

    async presentAlert() {
      const alert = document.createElement('ion-alert');
      alert.header = 'Alert';
      alert.subHeader = 'Invalid inputs';
      alert.message = 'Please enter valid arguments!';
      alert.buttons = ['OK'];

      document.body.appendChild(alert);
      return alert.present();
    }

    async confirmAlert() {
      const alert = document.createElement('ion-alert');
      alert.header = 'Success';
      alert.message = 'Informations updated';
      alert.buttons = ['OK'];

      document.body.appendChild(alert);
      return alert.present();
    }

    async clear() {
      (<HTMLInputElement>document.getElementById("input-username")).value='';
      (<HTMLInputElement>document.getElementById("input-password")).value='';
      (<HTMLInputElement>document.getElementById("input-name")).value='';
      (<HTMLInputElement>document.getElementById("input-company")).value='';
      (<HTMLInputElement>document.getElementById("input-email")).value='';
      (<HTMLInputElement>document.getElementById("input-confirm-password")).value='';
    }
}
