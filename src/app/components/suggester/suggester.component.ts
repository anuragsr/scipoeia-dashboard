import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-suggester',
  templateUrl: './suggester.component.html',
  styleUrls: ['./suggester.component.css']
})
export class SuggesterComponent implements OnInit {

	results: any = [];

  constructor() {
	  this.results = [
  		{ n: "Result 1", active: false },
  		{ n: "Result 2", active: false },
  		{ n: "Result 3", active: true },
  		{ n: "Result 4", active: false },
  		{ n: "Result 5", active: false },
  		{ n: "Result 6", active: false },
  		{ n: "Result 7", active: false },
  		{ n: "Result 8", active: false },
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
