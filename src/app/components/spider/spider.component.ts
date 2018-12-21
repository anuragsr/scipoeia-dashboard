import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spider',
  templateUrl: './spider.component.html',
  styleUrls: ['./spider.component.css']
})
export class SpiderComponent implements OnInit {

	results:any = [];
  
  constructor() {
  	this.results = [
  		{value: "Result 1", active: false},
  		{value: "Result 2", active: true},
  		{value: "Result 3", active: false},
  		{value: "Result 4", active: false},
  		{value: "Result 5", active: false},
  		{value: "Result 6", active: false},
  	];
  }

  ngOnInit() {
  }

  selectRow(r){
  	this.results.forEach(x => {
  		x.active = false;
  	})
  	r.active = true;

  	console.log(r)
  }

  isRowActive(r){
  	return r.active;
  }

}
