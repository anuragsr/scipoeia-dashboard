import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-conf-seeker',
  templateUrl: './conf-seeker.component.html',
  styleUrls: ['./conf-seeker.component.css']
})
export class ConfSeekerComponent implements OnInit {

  results:any = [];
  
  constructor() {
  	this.results = [
  		{p: "< NAME Surname 1 >", d: "< DETAILS >", dl: "< DEADLINE DATE >" },
  		{p: "< NAME Surname 2 >", d: "< 01.01.2018 USA >", dl: "< Thu 03.12.2018 >" },
  		{p: "< NAME Surname 3 >", d: "< 01.01.2018 UK >", dl: "< Thu 03.12.2018 >" },
  		{p: "< NAME Surname 4 >", d: "< 01.01.2018 USA >", dl: "< Thu 03.12.2018 >" },
  		{p: "< NAME Surname 5 >", d: "< 01.01.2018 UK >", dl: "< Thu 03.12.2018 >" },
  		{p: "< NAME Surname 6 >", d: "< 01.01.2018 USA >", dl: "< Thu 03.12.2018 >" },
  	];
  }

  ngOnInit() {
  }

}
