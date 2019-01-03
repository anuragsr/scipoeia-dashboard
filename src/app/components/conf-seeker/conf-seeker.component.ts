import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-conf-seeker',
  templateUrl: './conf-seeker.component.html',
  styleUrls: ['./conf-seeker.component.css']
})
export class ConfSeekerComponent implements OnInit {

  results:any[];
  countries:any[];
  pub:any[];
  showSideCountries:boolean;
  showSidePub:boolean;
  showSideConfTime:boolean;

  constructor() {
    this.results = [
      {p: "< NAME Surname 1 >", d: "< DETAILS >", dl: "< DEADLINE DATE >" },
      {p: "< NAME Surname 2 >", d: "< 01.01.2018 USA >", dl: "< Thu 03.12.2018 >" },
      {p: "< NAME Surname 3 >", d: "< 01.01.2018 UK >", dl: "< Thu 03.12.2018 >" },
      {p: "< NAME Surname 4 >", d: "< 01.01.2018 USA >", dl: "< Thu 03.12.2018 >" },
      {p: "< NAME Surname 5 >", d: "< 01.01.2018 UK >", dl: "< Thu 03.12.2018 >" },
      {p: "< NAME Surname 6 >", d: "< 01.01.2018 USA >", dl: "< Thu 03.12.2018 >" },
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
    this.pub = [
      { name:  "Publisher 1", checked: false},
      { name:  "Publisher 2", checked: false},
      { name:  "Publisher 3", checked: false},
      { name:  "Publisher 4", checked: false},
      { name:  "Publisher 5", checked: false},
      { name:  "Publisher 6", checked: false},
      { name:  "Publisher 7", checked: false},
      { name:  "Publisher 8", checked: false},
    ];
    this.showSideCountries = true;
    this.showSidePub = true;
    this.showSideConfTime = false;
  }

  ngOnInit() {
  }

  toggleSideCountries(){
    this.showSideCountries = !this.showSideCountries;
  }

  toggleSidePub(){
    this.showSidePub = !this.showSidePub;
  }

  toggleSideConfTime(){
    this.showSideConfTime = !this.showSideConfTime;
  }

  clear(){
    this.countries.forEach(x => x.checked = false)
    this.pub.forEach(x => x.checked = false)
  }

}
