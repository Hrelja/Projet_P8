import { Component, OnInit } from '@angular/core';
import { MessageService, Message } from './../../services/message/message.service';
import { LoadingController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {
  message: Message = {
    userId: '',
    text: '',
    date: new Date()
  }

  messageId: null;
  
  constructor( private messageservice: MessageService, private loadingController: LoadingController, private route: ActivatedRoute,
     public afAuth: AngularFireAuth ) { }

  ngOnInit() {
  this.messageId = this.route.snapshot.params['id'];
  if (this.messageId){
    this.loadMessage();
  }
}

async loadMessage(){
  const loading = await this.loadingController.create({
    message: 'Loading Message..'
  });
  await loading.present();

  this.messageservice.getMessage(this.messageId).subscribe(res => {
    loading.dismiss();
    this.message = res;
  });
}

  async sendMessage() {
    const entreredMessage = (<HTMLInputElement>document.getElementById("input-text")).value;
    this.message.date.getDate()
    this.message.userId = this.afAuth.auth.currentUser.uid
    if(entreredMessage.trim().length <= 0){
        this.presentAlert();
    }else{
    const loading = await this.loadingController.create({
      message: 'Sending Message..'
    });
    await loading.present();
    if (this.messageId){
      this.messageservice.updateMessage(this.message, this.messageId).then(() =>{
        loading.dismiss();
        //this.nav.back('home');
      });
    } else{
      this.messageservice.addMessage(this.message).then(() =>{
        loading.dismiss();
        //this.nav.back('home');
      });
    }
    this.confirmAlert();
    }
    this.message.text = '';
  }

  async confirmAlert() {
    const alert = document.createElement('ion-alert');
    alert.header = 'Success';
    alert.message = 'Message Sent';
    alert.buttons = ['OK'];

    document.body.appendChild(alert);
    return alert.present();
  }

  async presentAlert() {
    const alert = document.createElement('ion-alert');
    alert.header = 'Alert';
    alert.subHeader = 'Invalid inputs';
    alert.message = 'Message cannot be empty!';
    alert.buttons = ['OK'];

    document.body.appendChild(alert);
    return alert.present();
  }

   remove(message){
    this.messageservice.removeMessage(message.id);
  }
}
