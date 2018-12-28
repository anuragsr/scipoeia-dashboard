import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {

	showSideCompSet:boolean;
	showSideSelJournal:boolean;
	showSideSelCate:boolean;
	showSideAccRate:boolean;

  constructor() { 
  	this.showSideCompSet = true;
		this.showSideSelJournal = true;
		this.showSideSelCate = true;
		this.showSideAccRate = true;
  }

  ngOnInit() {
  }

	toggleSideCompSet(){
    this.showSideCompSet = !this.showSideCompSet;
  }

  toggleSideSelJournal(){
    this.showSideSelJournal = !this.showSideSelJournal;
  }

  toggleSideSelCate(){
    this.showSideSelCate = !this.showSideSelCate;
  }

  toggleSideAccRate(){
    this.showSideAccRate = !this.showSideAccRate;
  }
}
