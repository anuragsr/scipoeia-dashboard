import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.css']
})
export class ExplorerComponent implements OnInit {
	
	results:any[];
  searchCriteria:any[];
  showSideDiscipline:boolean;
  showSideCountries:boolean;
  showSideLanguage:boolean;
  showSideImpactFactor:boolean;
  showSideAccRate:boolean;

  constructor() {
    this.searchCriteria = [
      { 
        str: "", 
        searchTypeOpts : [
          { id:1, name:'item 1' },
          { id:2, name:'item 2' },
          { id:2, name:'item 3' },
        ]
      }
    ];

	  this.results = [
  		{ n: "Result 1", active: false, checked: false },
  		{ n: "Result 2", active: false, checked: false },
  		{ n: "Result 3", active: true, checked: false },
  		{ n: "Result 4", active: false, checked: false },
  		{ n: "Result 5", active: false, checked: false },
  		{ n: "Result 6", active: false, checked: false },
  		{ n: "Result 7", active: false, checked: false },
  		{ n: "Result 8", active: false, checked: false },
  	];

    this.showSideDiscipline = true;
    this.showSideCountries = true;
    this.showSideLanguage = true;
    this.showSideImpactFactor = true;
    this.showSideAccRate = true;
  }

  ngOnInit() {
  }

  addSearchCriteria(){
    this.searchCriteria.push({ 
      str: "", 
      searchTypeOpts : [
        { id:1, name:'item 1' },
        { id:2, name:'item 2' },
        { id:2, name:'item 3' },
      ]
    });
  }

  toggleSideDiscipline(){
    this.showSideDiscipline = !this.showSideDiscipline;
  }

  toggleSideCountries(){
    this.showSideCountries = !this.showSideCountries;
  }

  toggleSideLanguage(){
    this.showSideLanguage = !this.showSideLanguage;
  }

  toggleSideImpactFactor(){
    this.showSideImpactFactor = !this.showSideImpactFactor;
  }

  toggleSideAccRate(){
    this.showSideAccRate = !this.showSideAccRate;
  }

  showRow(r, $event){
    $event.stopPropagation();
    // console.log("CheckBox clicked")    
  }

  selectRow(r){
  	this.results.forEach(x => {
      if(x !== r)
  		  x.active = false;
  	})

  	r.active = !r.active;

  	// console.log(r)
  }

  isRowActive(r){
  	return r.active;
  }

}
