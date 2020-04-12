import { Component, OnInit } from '@angular/core';
import { Form, FormService } from './../../services/form/form.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {

  form: Form = {
    article: '',
    quantity: null,
    price: null
  }

  formId = null;
  constructor(private formService: FormService, private route: ActivatedRoute,
     private loadingController: LoadingController, public router: Router) { }

  ngOnInit() {
    this.formId = this.route.snapshot.params['id'];
    if (this.formId){
      this.loadForm();
    }
  }

  async loadForm(){
    const loading = await this.loadingController.create({
      message: 'Loading Form..'
    });
    await loading.present();

    this.formService.getForm(this.formId).subscribe(res => {
      loading.dismiss();
      this.form = res;
    });
  }

  async saveForm(){
    const enteredArticle = (<HTMLInputElement>document.getElementById("input-article")).value;
    const enteredQuantity = (<HTMLInputElement>document.getElementById("input-quantity")).value;
    const enteredPrice = (<HTMLInputElement>document.getElementById("input-price")).value;
    const enteredQuantityNum = <number><unknown>enteredQuantity;
    const enteredPriceNum = <Number><unknown>enteredPrice;


    if(
      enteredArticle.trim().length <= 0 ||
      enteredQuantityNum <= 0 ||
      enteredPriceNum <= 0 ||
      enteredQuantity.trim().length <= 0 ||
      enteredPrice.trim().length <= 0
      ){
        this.presentAlert();
      }else
      {
        const loading = await this.loadingController.create({
          message: 'Saving Form..'
        });
        await loading.present();
        if (this.formId){
          this.formService.updateForm(this.form, this.formId).then(() =>{
            loading.dismiss();
            //this.nav.back('home');
          });
        } else{
          this.formService.addForm(this.form).then(() =>{
            loading.dismiss();
            //this.nav.back('home');
          });
        }
        this.confirmAlert();
        this.router.navigateByUrl("/menu/homeform")
      }
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
      (<HTMLInputElement>document.getElementById("input-article")).value='';
      (<HTMLInputElement>document.getElementById("input-quantity")).value='';
      (<HTMLInputElement>document.getElementById("input-price")).value='';
    }
}
