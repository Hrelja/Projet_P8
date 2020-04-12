import { Component, OnInit } from '@angular/core';
import { Form, FormService } from './../../services/form/form.service';
import { Register, RegisterService } from './../../services/register/register.service'

@Component({
  selector: 'app-homeform',
  templateUrl: './homeform.page.html',
  styleUrls: ['./homeform.page.scss'],
})
export class HomeformPage implements OnInit {
  forms: Form[];
  registers: Register[];


  constructor(private formService: FormService, private registerService: RegisterService) { }

  ngOnInit() {
    this.formService.getForms().subscribe(res =>{
      this.forms = res;
    })
  }

  remove(item){
    this.formService.removeForm(item.id);
  }

}
