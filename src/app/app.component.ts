import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  menuO:boolean;
  items:any[];
  items2:any[];
  
  constructor(public router:Router){
    this.menuO = false;
    this.items = [
      { date: "15.06.2018", n: "Search Word or Abstract", active: false },
      { date: "15.06.2018", n: "Search Word or Abstract", active: false },
      { date: "15.06.2018", n: "Search Word or Abstract", active: true },
      { date: "15.06.2018", n: "Search Word or Abstract", active: false },
    ];
  }

  openMenu(){
  	this.menuO = true;
  }

  closeMenu(){
  	this.menuO = false;
  }

  selectItem(r){
    // this.results.forEach(x => {
   //    if(x !== r)
    //     x.active = false;
    // })

    r.active = !r.active;

    // console.log(r)
  }
}
