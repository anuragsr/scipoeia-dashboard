import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  menuO: boolean = false;
  
  constructor(public router:Router){

  }

  openMenu(){
  	this.menuO = true;
  }

  closeMenu(){
  	this.menuO = false;
  }
}
