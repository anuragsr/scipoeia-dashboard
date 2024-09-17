export default class plConfig {

	getBigPlanets(){
		return [
			{
				base: { url: "assets/img/p1.png", d: 200 },
				border: { url: "assets/img/p1-b.png", d: 175 },
				glow: { url: "assets/img/p1-g.png", d: 200 },
				mesh: { url: "assets/img/p1-m.png", d: 175 },
				text: { v: "Spider", yOff: 70, clickY: 140 },
				subText: { v: "Little Description of this option.\nLorem Ipsum."},
				hitRadius: 40,
				x: -400,
				y: -110,
				clickX: -500,
				clickY: -190
			},{
				base: { url: "assets/img/p2.png", d: 175 },
				border: { url: "assets/img/p2-b-sm.png", d: 165 },
				glow: { url: "assets/img/p2-g.png", d: 175 },
				mesh: { url: "assets/img/p2-m.png", d: 175 },
				text: { v: "Suggester", yOff: 110, clickY: 230 },
				subText: { v: "Little Description of this option.\nLorem Ipsum." },
				hitRadius: 70,
				x: -220,
				y: 200,
				clickX: -320,
				clickY: 320
			},{
				base: { url: "assets/img/p3.png", d: 335 },
				border: { url: "assets/img/p3-b-sm.png", d: 250 },
				glow: { url: "assets/img/p3-g.png", d: 335 },
				mesh: { url: "assets/img/p3-m.png", d: 225 },
				text: { v: "Explorer", yOff: 150, clickY: 320 },
				subText: { v: "Little Description of this option.\nLorem Ipsum." },
				hitRadius: 95,
				x: 400,
				y: -120,
				clickX: 500,
				clickY: -200
			},{
				base: { url: "assets/img/p4.png", d: 135 },
				border: { url: "assets/img/p4-b-sm.png", d: 125 },
				glow: { url: "assets/img/p4-g.png", d: 135 },
				mesh: { url: "assets/img/p4-m.png", d: 125 },				
				text: { v: "Conf Seeker", yOff: 90, clickY: 180 },
				subText: { v: "Little Description of this option.\nLorem Ipsum." },
				hitRadius: 50,
				x: 250,
				y: 250,
				clickX: 350,
				clickY: 370
			}
		]
	}

	getSmallPlanets(c){
		return [
			{
				url: "assets/img/lp1.png",
				d: 50,
				x: -650,
				y: -200,
				init: {
					x: c.x - c.x - 50,
					y: c.y - 350
				}
			},{
				url: "assets/img/lp3.png",
				d: 50,
				x: 600,
				y: 150,
				init: {
					x: c.x + c.x + 50,
					y: c.y + 300
				}
			},{
				url: "assets/img/lp2.png",
				d: 40,
				x: -600,
				y: 50,
				init: {
					x: c.x - c.x - 50,
					y: c.y + 175
				}
			}
		]
	}

	getDots(c, groupNo){
		/*
			Groups are as follows:
			Gr 1 left
			Gr 2 right
			Gr 3 left
		*/
		switch(groupNo){
			case 1:
				return [
					//  Group 1
					{					
						r: 15, init:{x: -1*c.x - 15, y: -180}, x: -700, y: -300
					},{
						r: 7, init:{x: -1*c.x - 150, y: -80}, x: -800, y: -100
					},{
						r: 7, init:{x: -1*c.x - 250, y: -180}, x: -900, y: -220
					},{
						r: 5, init:{x: -1*c.x - 250, y: -280}, x: -880, y: -430
					},{
						r: 5, init:{x: -1*c.x - 300, y: -180}, x: -950, y: -250
					}
				]
			break;

			case 2:
				return [
					//  Group 2			
					{
						r: 15, init: {x: 1*c.x + 20, y: 350}, x: 700, y: 50						
					},{
						r: 17, init: {x: 1*c.x + 40, y: 350}, x: 650, y: 400				
					},{
						r: 10, init: {x: 1*c.x + 300, y: 350}, x: 1000, y: 250
					},{
						r: 7, init: {x: 1*c.x + 300, y: -350}, x: 1100, y: -250
					}
				]
			break;

			case 3: 
				return [
					//  Group 3
					{
						r: 15, init:{x: -1*c.x - 15, y: 300}, x: -650, y: 380							
					},{
						r: 5, init:{x: -1*c.x - 15, y: 350}, x: -775, y: 450							
					},{
						r: 5, init:{x: -1*c.x - 35, y: 350}, x: -850, y: 350							
					},{
						r: 10, init:{x: -1*c.x - 35, y: 150}, x: -825, y: 100							
					},{
						r: 10, init:{x: -1*c.x - 50, y: 350}, x: -1100, y: 400							
					},{
						r: 10, init:{x: -1*c.x, y: 700}, x: -1*c.x + 100, y: 700							
					}
				]
			break;
		}
	}

	getDotLines(dotArr, groupNo){
		switch(groupNo){
			// Group 1 lines
			case 1:
				return [
					{
						f: dotArr[0], t: dotArr[1], line: {}
					},{
						f: dotArr[0], t: dotArr[2], line: {}
					},{
						f: dotArr[0], t: dotArr[4], line: {}
					},{
						f: dotArr[1], t: dotArr[2], line: {}
					},{
						f: dotArr[2], t: dotArr[4], line: {}
					},{
						f: dotArr[3], t: dotArr[4], line: {}
					}			
				];
			break;

			// Group 2 lines
			case 2:
				return [
					{
						f: dotArr[0], t: dotArr[2], line: {}
					},{
						f: dotArr[1], t: dotArr[2], line: {}
					},{
						f: dotArr[0], t: dotArr[3], line: {}
					},{
						f: dotArr[1], t: dotArr[3], line: {}
					}
				];
			break;

			// Group 3 lines
			case 3:
				return [
					{
						f: dotArr[0], t: dotArr[1], line: {}
					},{
						f: dotArr[0], t: dotArr[2], line: {}
					},{
						f: dotArr[1], t: dotArr[4], line: {}
					},{
						f: dotArr[2], t: dotArr[5], line: {}
					},{
						f: dotArr[3], t: dotArr[4], line: {}
					}
				];
			break;
		}
	}

	getGoldLines(cDot, c, bigPlArr){
		return [
			{
				s:{
					x: cDot.position.x,
					y: cDot.position.y,
					c: { v: 0xFFFF00, o: 0}
				},
				e:{
					x: c.x + bigPlArr[0].x,
					y: c.y + bigPlArr[0].y,
					c: { v: 0xFFFF00, o: .7}
				},
				a: .6
			},{
				s:{
					x: cDot.position.x,
					y: cDot.position.y,
					c: { v: 0xFFFF00, o: 0}
				},
				e:{
					x: c.x + bigPlArr[1].x,
					y: c.y + bigPlArr[1].y,
					c: { v: 0xFFFF00, o: .7}
				},
				a: .6
			},{
				s:{
					x: cDot.position.x,
					y: cDot.position.y,
					c: { v: 0xFFFF00, o: 0}
				},
				e:{
					x: c.x + bigPlArr[2].x,
					y: c.y + bigPlArr[2].y,
					c: { v: 0xFFFF00, o: .7}
				},
				a: .6
			},{
				s:{
					x: cDot.position.x,
					y: cDot.position.y,
					c: { v: 0xFFFF00, o: 0}
				},
				e:{
					x: c.x + bigPlArr[3].x,
					y: c.y + bigPlArr[3].y,
					c: { v: 0xFFFF00, o: .7}
				},
				a: .6
			}
		];
	}
	getPlanetLines(c, smPlArr, bigPlArr){
		return [
			{
				s:{
					x: c.x + bigPlArr[1].x,
					y: c.y + bigPlArr[1].y,
					c: { v: 0xFFFFFF, o: .2}
				},
				e:{
					x: c.x + bigPlArr[0].x,
					y: c.y + bigPlArr[0].y,
					c: { v: 0xFFFFFF, o: 0}
				},
				a: 1
			},{
				s:{
					x: c.x + bigPlArr[2].x,
					y: c.y + bigPlArr[2].y,
					c: { v: 0xFFFFFF, o: .2}
				},
				e:{
					x: c.x + bigPlArr[3].x,
					y: c.y + bigPlArr[3].y,
					c: { v: 0xFFFFFF, o: 0}
				},
				a: .7, d: .7
			},{
				s:{
					x: c.x + bigPlArr[2].x,
					y: c.y + bigPlArr[2].y,
					c: { v: 0xFFFFFF, o: .2}
				},
				e:{
					x: c.x + smPlArr[1].x,
					y: c.y + smPlArr[1].y,
					c: { v: 0xFFFFFF, o: .2}
				},
				a: .5, d: 1.5
			},{
				s:{
					x: c.x + smPlArr[1].x,
					y: c.y + smPlArr[1].y,
					c: { v: 0xFFFFFF, o: .2}
				},
				e:{
					x: c.x + bigPlArr[3].x,
					y: c.y + bigPlArr[3].y,
					c: { v: 0xFFFFFF, o: 0}
				},
				a: .5, d: 1
			},{
				s:{
					x: c.x + bigPlArr[0].x,
					y: c.y + bigPlArr[0].y,
					c: { v: 0xFFFFFF, o: .2}
				},
				e:{
					x: c.x + smPlArr[2].x,
					y: c.y + smPlArr[2].y,
					c: { v: 0xFFFFFF, o: .2}
				},
				a: .3, d: .2
			},{
				s:{
					x: c.x + smPlArr[2].x,
					y: c.y + smPlArr[2].y,
					c: { v: 0xFFFFFF, o: .2}
				},
				e:{
					x: c.x + smPlArr[0].x,
					y: c.y + smPlArr[0].y,
					c: { v: 0xFFFFFF, o: .2}
				},
				a: .7, d: 1
			},{
				s:{
					x: c.x + bigPlArr[1].x,
					y: c.y + bigPlArr[1].y,
					c: { v: 0xFFFFFF, o: .2}
				},
				e:{
					x: c.x + smPlArr[2].x,
					y: c.y + smPlArr[2].y,
					c: { v: 0xFFFFFF, o: .2}
				},
				a: .5, d: 1.3
			}
		];
	}
}