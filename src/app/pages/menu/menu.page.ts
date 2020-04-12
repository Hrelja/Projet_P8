import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  pages = [
    {
      title: 'Message',
      url: '/menu/message'
    },
    {
      title: 'Notifications',
      url: '/menu/notifications'
    },
    {
      title: 'Home',
      url: '/menu/home'
    },
    {
      title: 'Settings',
      url: '/menu/settings'
    },
    {
      title: 'Add New Form',
      url: '/menu/homeform'
    }
  ];

  selectedPath= '';

  constructor(private router: Router) { 
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    });
  }

  ngOnInit() {
  }

}
