import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.css']
})
export class ExplorerComponent implements OnInit {
	
	results:any[];
  searchCriteria:any[];
  disc:any[];
  countries:any[];
  lang:any[];
  impFac:any;
  accRate:any;

  showSideDiscipline:boolean;
  showSideCountries:boolean;
  showSideLanguage:boolean;
  showSideImpactFactor:boolean;
  showSideAccRate:boolean;

  constructor() {
    this.searchCriteria = [
      { 
        str: "",
        searchType: "",
        searchTypeOpts : [
          { id:1, name:'item 1' },
          { id:2, name:'item 2' },
          { id:2, name:'item 3' },
        ],
        toDel: false
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

    this.disc = [
      { name:  "Discipline 1", checked: false},
      { name:  "Discipline 2", checked: false},
      { name:  "Discipline 3", checked: false},
      { name:  "Discipline 4", checked: false},
      { name:  "Discipline 5", checked: false},
      { name:  "Discipline 6", checked: false},
      { name:  "Discipline 7", checked: false},
      { name:  "Discipline 8", checked: false},
    ];
    this.countries = [
      { name:  "Country / Region 1", checked: false},
      { name:  "Country / Region 2", checked: false},
      { name:  "Country / Region 3", checked: false},
      { name:  "Country / Region 4", checked: false},
      { name:  "Country / Region 5", checked: false},
      { name:  "Country / Region 6", checked: false},
      { name:  "Country / Region 7", checked: false},
      { name:  "Country / Region 8", checked: false},
    ];
    this.lang = [
      { name:  "English", checked: false},
      { name:  "German", checked: false},
      { name:  "French", checked: false},
    ];
    this.impFac = { from: "", to: "" };
    this.accRate = { from: "", to: "" };
  }

  ngOnInit() {
  }

  addSearchCriteria(){    
    
    let arr = this.searchCriteria;
    if(arr.length <= 3){
      arr.push({ 
        str: "",
        searchType: "",
        searchTypeOpts : [
          { id:1, name:'item 1' },
          { id:2, name:'item 2' },
          { id:2, name:'item 3' },
        ],
        toDel: true
      })
    }else{
      alert('A maximum of 4 criteria is allowed.')
    }

  }

  removeSearchCriteria(c){
    let arr = this.searchCriteria;
    // console.log(arr.indexOf(c))
    arr.splice(arr.indexOf(c), 1);
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
  	// this.results.forEach(x => {
   //    if(x !== r)
  	// 	  x.active = false;
  	// })

  	r.active = !r.active;

  	// console.log(r)
  }

  isRowActive(r){
  	return r.active;
  }

  clear(){
    this.disc.forEach(x => x.checked = false)
    this.countries.forEach(x => x.checked = false)
    this.lang.forEach(x => x.checked = false)
    this.impFac = { from: "", to: "" }
    this.accRate = { from: "", to: "" }
  }

}
