import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.css']
})
export class ExplorerComponent implements OnInit {
	
	results: any = [];
	searchType: any = "";
  searchTypeOpts: any = [];

  constructor() { 
		this.searchTypeOpts = [{
	    id:1,
	    name:'item 1'
	  },{
	    id:2,
	    name:'item 2'
	  },{
	    id:2,
	    name:'item 3'
	  }];

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
