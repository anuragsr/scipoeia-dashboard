import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-suggester',
  templateUrl: './suggester.component.html',
  styleUrls: ['./suggester.component.css']
})
export class SuggesterComponent implements OnInit {

  results:any[];
  cat:any[];
  sciBranch:any[];
  impFac:any;
  accRate:any;
	keywordStr:String;
  showSideSCIBr:boolean;
  showSideCate:boolean;
  showSideImpactFac:boolean;
  showSideAccRate:boolean;
  showSideCountries:boolean;
  searchTags: any = ['keyword 1', 'keyword 2'];

  constructor() {
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

    this.cat = [
      { name:  "Category 1", checked: false},
      { name:  "Category 2", checked: false},
      { name:  "Category 3", checked: false},
      { name:  "Category 4", checked: false},
      { name:  "Category 5", checked: false},
      { name:  "Category 6", checked: false},
      { name:  "Category 7", checked: false},
      { name:  "Category 8", checked: false},
    ];

    this.sciBranch = [
      { name:  "Metric 1", checked: false},
      { name:  "Metric 2", checked: false},
      { name:  "Metric 3", checked: false},
      { name:  "Metric 4", checked: false},
      { name:  "Metric 5", checked: false},
      { name:  "Metric 6", checked: false},
      { name:  "Metric 7", checked: false},
      { name:  "Metric 8", checked: false},
    ];

    this.impFac = { from: "", to: "" };  
    this.accRate = { from: "", to: "" };  

    this.showSideSCIBr = true;
    this.showSideCate = true;
    this.showSideImpactFac = true;
    this.showSideAccRate = true;
    this.showSideCountries = true;
  }

  ngOnInit() {
  }

  search(){
    console.log(this.searchTags)
  }

  onSelect(item) {
    console.log('tag selected: value is ' + item);
  }
  
  dataChanged(o){
    let spl = o.split(" ");
    console.log(spl)
    // let last = spl[spl.length - 1];
    // let arr;
    // if(last === ""){
    //   arr = spl;
    //   arr.splice(last, 1);
    // }
    // console.log(arr)
  }

  toggleSideSCIBr(){
    this.showSideSCIBr = !this.showSideSCIBr;
  }

  toggleSideCate(){
    this.showSideCate = !this.showSideCate;
  }

  toggleSideImpactFac(){
    this.showSideImpactFac = !this.showSideImpactFac;
  }

  toggleSideAccRate(){
    this.showSideAccRate = !this.showSideAccRate;
  }

  toggleSideCountries(){
    this.showSideCountries = !this.showSideCountries;
  }

  showRow(r, $event){
    $event.stopPropagation();
    // console.log("CheckBox clicked")    
  }

  selectRow(r){
  	// this.results.forEach(x => {
  	// 	if(x !== r)
   //      x.active = false;
  	// })
  	r.active = !r.active;

  	// console.log(r)
  }

  isRowActive(r){
  	return r.active;
  }

  clear(){
    this.cat.forEach(x => x.checked = false)
    this.sciBranch.forEach(x => x.checked = false)    
    this.impFac = { from: "", to: "" }
    this.accRate = { from: "", to: "" }
  }

}
