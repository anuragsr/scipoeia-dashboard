import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {
  
  cat:any[];
  accRate:any[];
	showSideCompSet:boolean;
	showSideSelJournal:boolean;
	showSideSelCate:boolean;
	showSideAccRate:boolean;
  compSet:any;
  selJour:any;

  constructor() { 
  	this.showSideCompSet = true;
		this.showSideSelJournal = true;
		this.showSideSelCate = true;
		this.showSideAccRate = true;
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
    this.accRate = [
      { name:  "Metric 1", checked: false},
      { name:  "Metric 2", checked: false},
      { name:  "Metric 3", checked: false},
      { name:  "Metric 4", checked: false},
      { name:  "Metric 5", checked: false},
      { name:  "Metric 6", checked: false},
      { name:  "Metric 7", checked: false},
      { name:  "Metric 8", checked: false},
    ];
    this.compSet = { from: "", to: "" };  
    this.selJour = { 
      str: "", res: [
        { name:  "Result 1"},
        { name:  "Result 2"},
      ]
    };  
  }

  ngOnInit() {
    let chart1 = new Chart("chart1", {
      type: 'line',
      data: {
        labels: ["2015", "2016", "2017", "2018"],
        datasets: [{
          lineTension: 0,
          data: [2.7, 1.7, 2, 1.8],
          backgroundColor: [ 'rgba(255, 99, 132, 0.2)' ],
          borderColor: [ 'rgba(255,99,132,1)' ],
          borderWidth: 1
        },{
          lineTension: 0,
          data: [1.2, 2.5, 1.7, 2.2],
          backgroundColor: [ 'rgba(54, 162, 235, 0.2)' ],
          borderColor: [ 'rgba(54, 162, 235, 1)' ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          xAxes: [{
            gridLines: {
              display:false
            }
          }],
          yAxes: [{
            gridLines: {
              display:false
            },   
            ticks: {
              suggestedMin: 1,
              suggestedMax: 3
            }  
          }]
        },
        legend: {
          display: false
        },
        tooltips: {
          callbacks: {
            label: tooltipItem => {
              return tooltipItem.yLabel;
            }
          }
        }
      }
    })

    let chart2 = new Chart("chart2", {
      type: 'line',
      data: {
        labels: ["2015", "2016", "2017", "2018"],
        datasets: [{
          lineTension: 0,
          data: [2.7, 1.7, 2, 1.8],
          backgroundColor: [ 'rgba(255, 99, 132, 0.2)' ],
          borderColor: [ 'rgba(255,99,132,1)' ],
          borderWidth: 1
        },{
          lineTension: 0,
          data: [1.2, 2.5, 1.7, 2.2],
          backgroundColor: [ 'rgba(54, 162, 235, 0.2)' ],
          borderColor: [ 'rgba(54, 162, 235, 1)' ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          xAxes: [{
            gridLines: {
              display:false
            }
          }],
          yAxes: [{
            gridLines: {
              display:false
            },   
            ticks: {
              suggestedMin: 1,
              suggestedMax: 3
            }  
          }]
        },
        legend: {
          display: false
        },
        tooltips: {
          callbacks: {
            label: tooltipItem => {
              return tooltipItem.yLabel;
            }
          }
        }
      }
    })

    let chart3 = new Chart("chart3", {
      type: 'line',
      data: {
        labels: ["2015", "2016", "2017", "2018"],
        datasets: [{
          lineTension: 0,
          data: [2, 1.9, 2.5, 1.8],
          backgroundColor: [ 'rgba(52, 206, 187, 0.2)' ],
          borderColor: [ 'rgba(52, 206, 187,1)' ],
          borderWidth: 1
        },{
          lineTension: 0,
          data: [1.7, 2.1, 1.7, 2.1],
          backgroundColor: [ 'rgba(49, 122, 175, 0.2)' ],
          borderColor: [ 'rgba(49, 122, 175, 1)' ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: false,
        scales: {
          xAxes: [{
            gridLines: {
              display:false
            }
          }],
          yAxes: [{
            gridLines: {
              display:false
            },   
            ticks: {
              suggestedMin: 1,
              suggestedMax: 3
            }
          }]
        },
        legend: {
          display: false
        },
        tooltips: {
          callbacks: {
            label: tooltipItem => {
              return tooltipItem.yLabel;
            }
          }
        }
      }
    })
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

  clearRes(r){
    let arr = this.selJour.res;
    arr.splice(arr.indexOf(r), 1);
  }

  clear(){
    this.cat.forEach(x => x.checked = false)
    this.accRate.forEach(x => x.checked = false)    
    this.compSet = { from: "", to: "" }
    this.selJour = { 
      str: "", res: []
    }  
  }
}
