import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

	menuO:boolean;
  items:any[];
  
  constructor(){
    this.menuO = false;
    this.items = [
      { date: "15.06.2018", n: "Search Word or Abstract", active: false },
      { date: "15.06.2018", n: "Search Word or Abstract", active: false },
      { date: "15.06.2018", n: "Search Word or Abstract", active: true },
      { date: "15.06.2018", n: "Search Word or Abstract", active: false },
    ];
  }

  ngOnInit() {
  }
  
  openMenu(){
  	this.menuO = true;
  }

  closeMenu(){
  	this.menuO = false;
  }

  selectItem(r){
    r.active = !r.active;
  }

}
