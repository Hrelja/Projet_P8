import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public folder: string;


  constructor(private activatedRoute: ActivatedRoute, public afAuth: AngularFireAuth, public router: Router) {}

  ngOnInit() {
      //this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }

  async logout(){
      const res = await this.afAuth.auth.signOut();
  }

}