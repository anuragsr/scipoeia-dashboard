import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spider',
  templateUrl: './spider.component.html',
  styleUrls: ['./spider.component.css']
})
export class SpiderComponent implements OnInit {

  results:any[];
	showSideResults:boolean;
  
  constructor() {
    this.results = [
      {value: "Result 1", active: false, checked: false},
      {value: "Result 2", active: true, checked: false},
      {value: "Result 3", active: false, checked: false},
      {value: "Result 4", active: false, checked: false},
      {value: "Result 5", active: false, checked: false},
      {value: "Result 6", active: false, checked: false},
    ];
    
    this.showSideResults = false;
  }

  ngOnInit() {
  }

  toggleSideResults(){
    this.showSideResults = !this.showSideResults;
    // console.log(this.showSideResults)
  }

  uncheck(r){
    r.checked = false;
    // console.log("CheckBox unchecked")    
  }

  showRow(r, $event){
    $event.stopPropagation();
    // console.log("CheckBox clicked")    
  }

  selectRow(r){    
    // this.results.forEach(x => {
    //   if(r !== x)
    //     x.active = false;
    // })

    r.active = !r.active;
    
    // console.log("Row clicked")    
  }

  isRowActive(r){
  	return r.active;
  }

  clear(){
    this.results.forEach(x => x.checked = false)
  }

}
