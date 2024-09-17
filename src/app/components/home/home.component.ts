import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

import { TweenMax, TimelineMax, Linear, Power4 } from "gsap/TweenMax";
import * as WebFont from 'webfontloader';
import * as PIXI from 'pixi.js/dist/pixi.js';
import plConfig from './plConfig';

interface Dot{
	r:any;
	x:any;
	y:any;
	fill:any;
	posX:any;
	posY:any;
	position:any;
	beginFill:any;
	blendMode:any;
}

class Dot extends PIXI.Graphics {
  constructor(r, f) {
    super();
		this.r = r;
		this.fill = f;
		this.draw();
  }  

  draw() {
  	this
  	.beginFill(0xFFFFFF, this.fill)
		.drawCircle(this.x, this.y, this.r)
		.endFill()
  }
}

interface Line{
	points:any;
	lineSize:any;
	lineColor:any;
	op:any;
	lineWidth:any;
	lineStyle:any;
	blendMode:any;
	clear:any;
}

class Line extends PIXI.Graphics {
  constructor(points, lineSize, lineColor, op) {
    super();    
    var s = this.lineWidth = lineSize || 5;
    var c = this.lineColor = lineColor || "0x000000";
    var o = this.op = op || 1;
    this.points = points;
    this.draw(s, c, o, points);
  }
  
  draw(s, c, o, p){
    this
    .lineStyle(s, c, o)
    .moveTo(p[0], p[1])
    .lineTo(p[2], p[3])
  }

  update(p) {
   	var self = this;
    var points = this.points = p.map(function(val, index){ 
    	return val || self.points[index];
  	});
    var s = this.lineWidth, c = this.lineColor, o = this.op;    
    this.clear();
    this.draw(s, c, o, points);
  }
}

interface GradientLine{
	x:any;
	y:any;
	alpha:any;
	start:any;
	end:any;
	clear:any;
	beginFill:any;
	drawRect:any;
	endFill:any;
	rotation:any;
}

class GradientLine extends PIXI.Graphics {
  constructor(start, end) {
    super();
		this.start = start;
		this.end = end;
		this.draw();
  }  

  draw() {
		this.clear();
		this.x = this.start.x;
		this.y = this.start.y;

		let getRGBChannels = color => {
		  let colorText = color.toString(16);
		  if (colorText.length < 6) {
		    while (colorText.length < 6) {
		      colorText = "0" + colorText;
		    }
		  }

		  return {
		    red: parseInt(colorText.slice(0, 2), 16),
		    green: parseInt(colorText.slice(2, 4), 16),
		    blue: parseInt(colorText.slice(4, 6), 16)
		  }
		}
		, colorFromData = {
    	color: this.start.c.v,
	    alpha: this.start.c.o,
	    channels: getRGBChannels(this.start.c.v)
    }
    , colorToData = {
			color: this.end.c.v,
	    alpha: this.end.c.o,
	    channels: getRGBChannels(this.end.c.v)
		}
		, prepareRGBChannelColor = channelColor => {
		  let colorText = channelColor.toString(16);
		  if (colorText.length < 2) {
		    while (colorText.length < 2) {
		      colorText = "0" + colorText;
		    }
		  }
		  return colorText;
		}
		, getColorOfGradient = (from, to, coef) => {
		  if (!from.alpha && from.alpha !== 0) {
		    from.alpha = 1;
		  }
		  if (!from.alpha && from.alpha !== 0) {
		    to.alpha = 1;
		  }

		  let colorRed = Math.floor(from.channels.red + coef * (to.channels.red - from.channels.red));
		  colorRed = Math.min(colorRed, 255);
		  let colorGreen = Math.floor(from.channels.green + coef * (to.channels.green - from.channels.green));
		  colorGreen = Math.min(colorGreen, 255);
		  let colorBlue = Math.floor(from.channels.blue + coef * (to.channels.blue - from.channels.blue));
		  colorBlue = Math.min(colorBlue, 255);

		  let rgb = prepareRGBChannelColor(colorRed) + 
			  				prepareRGBChannelColor(colorGreen) + 
			  				prepareRGBChannelColor(colorBlue);

		  return {
		    color: parseInt(rgb, 16),
		    alpha: from.alpha + coef * (to.alpha - from.alpha)
		  }
		}
		, getDistance = (st, en) => {
			return Math.sqrt(Math.pow(st.x-en.x,2)+Math.pow(st.y-en.y,2))
		}
		, getAngle = (st, en) => {
			let a = Math.atan((en.x-st.x)/(en.y-st.y));
			if(st.y > en.y){
				return Math.PI - a;
			}else{
				return 2*Math.PI - a;
			}
		}
		, length = getDistance(this.start, this.end)
		, stepCoef, stepColor, stepsCount = 20
		, stepHeight = length / stepsCount		
		;
		
		for (let stepIndex = 0; stepIndex < stepsCount; stepIndex++) {
		  stepCoef = stepIndex / stepsCount;
		  stepColor = getColorOfGradient(colorFromData, colorToData, stepCoef);

		  this.beginFill(stepColor.color, stepColor.alpha);
		  this.drawRect(0, length * stepCoef, 2, stepHeight);
			this.endFill();
		}

		this.rotation = getAngle(this.start, this.end);
  }
  
  update(x1, y1, x2, y2) {
		this.start.x = x1 || this.start.x;
		this.start.y = y1 || this.start.y;
		this.end.x = x2 || this.end.x;
		this.end.y = y2 || this.end.y;
	  this.draw();
  }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
	
	tl:any = new TimelineMax({ 
		paused: true,
		onComplete: () => {
			this.env.animationDone = true;
		}
 	});
	w:Number = 1920;
	h:Number = 1080;
	c:any = { x: <any>this.w/2, y: <any>this.h/2 }; 
	cnf:any;
  pixiApp:any = new PIXI.Application( this.w, this.h, {
		transparent:true,
		antialias: true
	});
	ctn:any = new PIXI.Container();
	dotGrArr1:any = [];
	dotGrArr2:any = [];
	dotGrArr3:any = [];
	dotLineArr1:any = [];
	dotLineArr2:any = [];
	dotLineArr3:any = [];
	goldLineArr:any = [];
	goldLineGrArr:any = [];
	lineArr:any = [];
	lineGrArr:any = [];
	smPlGrArr:any = [];
	smPlPosArr:any = [];
	bigPlPosArr:any = [];
	bigPlScArr:any = [];
	bigPlGrArr:any = [];
	textGrArr:any = [];
	clicked:Boolean = false;
	mouseover:Boolean = false;
	hoverObj:any = {};
	grMouseOverTl:any;
	grClickTl:any;
	env:any;

  constructor(private router: Router) {
  	this.env = environment;
  	// console.log(this.env)
  }

  ngOnInit() {
  	WebFont.load({
	    custom: {
	      families: ['basic', 'lato-r']
	    },
	    active: () => {
	    	console.log("font loaded")
				this.createCanvas()
	    	this.createAnim()
				this.resize()
		  	if(!this.env.animationDone){
					this.tl.delay(2).play()
		  	}else{
		  		// this.tl.seek(this.tl.duration())
		  		this.tl.tweenTo(this.tl.duration()).duration(0)
		  	}
	    }
		});
  }

  resize(){
		this.w = window.innerWidth;
		this.h = window.innerHeight;
		this.c = { x: <any>this.w/2, y: <any>this.h/2 };

		this.pixiApp.renderer.resize(this.w, this.h);
		this.ctn.position.set(this.c.x, this.c.y);
		
		if(this.w <= 768){
			this.cnf.scrUpFactor = 2.5;
			this.cnf.pageTitleY = 625;
			this.ctn.scale.set(.4, .4);
		}else if(this.w <= 1024){
			this.cnf.scrUpFactor = 1.75;
			this.cnf.pageTitleY = 625;
			this.ctn.scale.set(.5, .5);
		}else if(this.w <= 1200){
			if(this.h <= 900){
				this.cnf.scrUpFactor = 1.55;
				this.cnf.pageTitleY = 675;
				this.ctn.scale.set(.7, .7);
			}else{
				this.cnf.scrUpFactor = 1.25;
				this.cnf.pageTitleY = 675;
				this.ctn.scale.set(.8, .8);
			}
		}else if(this.w <= 1400){	
			if(this.h <= 900){
				this.cnf.scrUpFactor = 1.45;
				this.cnf.pageTitleY = 650;
				this.ctn.scale.set(.7, .7);
			}else{
				this.cnf.scrUpFactor = 1.25;
				this.cnf.pageTitleY = 675;
				this.ctn.scale.set(.8, .8);
			}
		}else if(this.w <= 1700){
			if(this.h <= 900){				
				this.cnf.scrUpFactor = 1.2;
				this.cnf.pageTitleY = 600;
			}else{
				this.cnf.scrUpFactor = 1.1;
				this.cnf.pageTitleY = 600;
			}
			this.ctn.scale.set(.9, .9);
		}else {			
			this.cnf.scrUpFactor = 1;
			this.cnf.pageTitleY = 550;
			this.ctn.scale.set(1, 1);
		}
	}

  fastForward(){
  	if(this.tl.isActive()){
			this.tl.tweenTo(this.tl.duration()).duration(1)
		}
  }
	
	createCanvas(){
		// Init canvas
		this.pixiApp.view.style.position  = "absolute";
		this.pixiApp.view.style.top = this.pixiApp.view.style.left = 0;
		document.querySelector(".canvas-ctn").appendChild(this.pixiApp.view);			

		this.pixiApp.stage.addChild(this.ctn);
		this.ctn.pivot.set(this.c.x, this.c.y);
		this.ctn.position.set(this.c.x, this.c.y);

		// Dot in the center of O
		let centerDot = new Dot(2, 0);
		centerDot.position.x = this.c.x + 21;
		centerDot.position.y = this.c.y + 47;	
		this.ctn.addChild(centerDot);

		const cnf = new plConfig();
		this.cnf = cnf;

		// Data for big planets
		let bigPlArr = cnf.getBigPlanets()
		// Data for small planets
		, smPlArr = cnf.getSmallPlanets(this.c)
		;

		// Dots
		let dotArr1 = cnf.getDots(this.c, 1);
		let dotArr2 = cnf.getDots(this.c, 2);
		let dotArr3 = cnf.getDots(this.c, 3);

		// Adding dots
		dotArr1.forEach(obj => {
			let circ = new Dot(obj.r, .1);
			// circ.position.x = c.x + obj.init.x + 500;
			circ.position.x = this.c.x + obj.init.x;
			circ.position.y = this.c.y + obj.init.y;
			circ.posX = this.c.x + obj.x;
			circ.posY = this.c.y + obj.y;
			circ.blendMode = PIXI.BLEND_MODES["ADD"];
			this.ctn.addChild(circ);
			this.dotGrArr1.push(circ);
		})

		dotArr2.forEach(obj => {
			let circ = new Dot(obj.r, .1);
			// circ.position.x = c.x + obj.init.x - 500;
			circ.position.x = this.c.x + obj.init.x;
			circ.position.y = this.c.y + obj.init.y;
			circ.posX = this.c.x + obj.x;
			circ.posY = this.c.y + obj.y;
			circ.blendMode = PIXI.BLEND_MODES["ADD"];
			this.ctn.addChild(circ);
			this.dotGrArr2.push(circ);
		})

		dotArr3.forEach(obj => {
			let circ = new Dot(obj.r, .1);
			// circ.position.x = c.x + obj.init.x - 500;
			circ.position.x = this.c.x + obj.init.x;
			circ.position.y = this.c.y + obj.init.y;
			circ.posX = this.c.x + obj.x;
			circ.posY = this.c.y + obj.y;
			circ.blendMode = PIXI.BLEND_MODES["ADD"];
			this.ctn.addChild(circ);
			this.dotGrArr3.push(circ);
		})

		// Dot lines
		this.dotLineArr1 = cnf.getDotLines(this.dotGrArr1, 1);
		this.dotLineArr2 = cnf.getDotLines(this.dotGrArr2, 2);
		this.dotLineArr3 = cnf.getDotLines(this.dotGrArr3, 3);

		// Drawing lines between dots
		this.dotLineArr1.forEach(obj => {
			let connLine = new Line([
				obj.f.position.x, obj.f.position.y,
				obj.t.position.x, obj.t.position.y
			], 1, 0xffffff, .07);			
			connLine.blendMode = PIXI.BLEND_MODES["ADD"];
			this.ctn.addChild(connLine);
			obj.line = connLine;
		})

		this.dotLineArr2.forEach(obj => {
			let connLine = new Line([
				obj.f.position.x, obj.f.position.y,
				obj.t.position.x, obj.t.position.y
			], 1, 0xffffff, .07);			
			connLine.blendMode = PIXI.BLEND_MODES["ADD"];
			this.ctn.addChild(connLine);
			obj.line = connLine;
		})

		this.dotLineArr3.forEach(obj => {
			let connLine = new Line([
				obj.f.position.x, obj.f.position.y,
				obj.t.position.x, obj.t.position.y
			], 1, 0xffffff, .07);			
			connLine.blendMode = PIXI.BLEND_MODES["ADD"];
			this.ctn.addChild(connLine);
			obj.line = connLine;
		})

		// Gold lines between planets and center
		this.goldLineArr = cnf.getGoldLines(centerDot, this.c, bigPlArr);

		// Adding gold lines
		this.goldLineArr.forEach(obj => {
			let line = new GradientLine({
				x: obj.s.x,
				y: obj.s.y,
				c: obj.s.c
			},{
				x: obj.s.x,
				y: obj.s.y,
				c: obj.e.c
			});
			line.alpha = obj.a;
			this.ctn.addChild(line);
			this.goldLineGrArr.push(line);
		});

		// Start and end positions, color, alpha for the lines between planets
		this.lineArr = cnf.getPlanetLines(this.c, smPlArr, bigPlArr);		

		// Adding lines between planets
		this.lineArr.forEach(obj => {
			let line = new GradientLine({
				x: obj.s.x,
				y: obj.s.y,
				c: obj.s.c
			},{
				x: obj.s.x,
				y: obj.s.y,
				c: obj.e.c
			});
			line.alpha = obj.a;
			obj.line = line;
			this.ctn.addChild(line);
			this.lineGrArr.push(line);
		});

		// Adding small planets
		smPlArr.forEach(obj => {
			let img = new PIXI.Sprite( new PIXI.Texture.fromImage(obj.url) );
			img.anchor.set(0.5);
			img.width = img.height = obj.d;
			img.x = obj.init.x;
			img.y = obj.init.y;	
			img.posX = this.c.x + obj.x;
			img.posY = this.c.y + obj.y;
			this.ctn.addChild(img);
			this.smPlGrArr.push(img);
			this.smPlPosArr.push(img.position);
		})

		// Adding big planets
		bigPlArr.forEach(obj => {
			
			// Main container containing the planet discs, text, subtext
			let mainGr = new PIXI.Container();
			
			// Container for the different images of a single planet
			let gr = new PIXI.Container();
			
			// Base
			let img = new PIXI.Sprite( new PIXI.Texture.fromImage(obj.base.url) );
			img.width = img.height = obj.base.d;
			img.anchor.set(0.5);
			img.name = "base";
			gr.addChild(img);

			// Border
			img = new PIXI.Sprite( new PIXI.Texture.fromImage(obj.border.url) );
			img.width = img.height = obj.border.d;
			img.anchor.set(0.5);
			img.name = "border";
			gr.addChild(img);

			// Glow
			img = new PIXI.Sprite( new PIXI.Texture.fromImage(obj.glow.url) );
			img.width = img.height = obj.glow.d;
			img.anchor.set(0.5);
			img.alpha = 0;
			img.name = "glow";
			gr.addChild(img);

			// Mesh
			img = new PIXI.Sprite( new PIXI.Texture.fromImage(obj.mesh.url) );
			img.width = img.height = obj.mesh.d;
			img.anchor.set(0.5);
			img.alpha = 0;
			img.name = "mesh";
			gr.addChild(img);			

			// Adding main text for each planet
			let text = new PIXI.Text(obj.text.v, new PIXI.TextStyle({
			  fontFamily: "basic",
			  fontWeight: "bold",
			  fill: "#fff"
			}));
			text.name = "text";
			text.alpha = 0;
			text.anchor.set(0.5);			
			text.position.set(0, obj.text.yOff);
			text.clickY = obj.text.clickY;
			mainGr.addChild(text);
			this.textGrArr.push(text);

			// Adding separator
			let sep = new PIXI.Graphics();
			sep.beginFill(0xFFFF00);			
			sep.drawRect(0, 0, 70, 2);
			sep.alpha = 0;
			sep.name = "sep";
			sep.position.set(-35, obj.text.yOff + 25);
			mainGr.addChild(sep);			

			// Adding sub-text for each planet
			text = new PIXI.Text(obj.subText.v, new PIXI.TextStyle({
			  fontFamily: "lato-r",
			  align: "center",
			  fontSize: 14,
			  fill: "#fff"
			}));
			text.name = "subtext";
			text.alpha = 0;
			text.anchor.set(0.5);
			text.position.set(0, obj.text.yOff + 50);
			mainGr.addChild(text);

			// Move group to center of screen (center of letter o)			
			mainGr.position.set(centerDot.position.x, centerDot.position.y);
			this.bigPlPosArr.push(mainGr.position);

			// Set scale to 0, 0
			gr.scale.set(0, 0);
			this.bigPlScArr.push(gr.scale);

			// Final positions to animate to
			mainGr.posX = this.c.x + obj.x;
			mainGr.posY = this.c.y + obj.y;

			// Click positions to animate to
			mainGr.clickX = this.c.x + obj.clickX;
			mainGr.clickY = this.c.y + obj.clickY;

			gr.name = "discs";
			mainGr.addChild(gr);
			this.ctn.addChild(mainGr);
	
			// For further manipulation
			this.bigPlGrArr.push(mainGr);			

			// Set disc group in rotation			
			TweenMax.to(gr, 100, {
				rotation: 2*Math.PI,
				repeat: -1,
				ease: Linear.easeNone
			});

			// Mouse Events
			gr.hitArea = new PIXI.Circle(0, 0, obj.hitRadius);

			gr.mouseover = e => {
				if(!this.clicked){
					let hoverObj = this.hoverObj;

					let discs = hoverObj.discs = e.target;
					let currGr = hoverObj.currGr = discs.parent;
					let idx = hoverObj.idx = this.bigPlGrArr.indexOf(currGr);
					let remGr = hoverObj.remGr = this.bigPlGrArr.filter((obj, i) => {
						return idx !== i;
					});
					// l(remGr)

					let toHide = hoverObj.toHide = discs.children.filter(x => {
						return x.name == "border";
					})
					let toShow = hoverObj.toShow = discs.children.filter(x => {
						return x.name == "mesh" || x.name == "glow";
					})
					let textGr = hoverObj.textGr = discs.parent.children.filter(x => {
						return x.name == "text";
					})[0];
					let sepGr = hoverObj.sepGr = discs.parent.children.filter(x => {
						return x.name == "sep";
					})[0];
					let subTextGr = hoverObj.subTextGr = discs.parent.children.filter(x => {
						return x.name == "subtext";
					})[0];
					// var lineObj = hoverObj.lineObj = $.extend({}, goldLineArr[idx]);
					let lineObj = hoverObj.lineObj = Object.assign({}, this.goldLineArr[idx]);
					let lineGr = hoverObj.lineGr = this.goldLineGrArr[idx];									

					this.grMouseOverTl = new TimelineMax({
						paused: true,
						onReverseComplete: () => {
							this.clicked = false;
							this.mouseover = false;
						}
					});

					this.grMouseOverTl
					.to(discs.scale, .2, { x: 1.15, y: 1.15 }, "lb0")
					.to(toHide, .3, { alpha: 0 }, "lb0")
					.to(textGr.scale, .3, { x: 1.05, y: 1.05 }, "lb0")
					.to(textGr, .3, { alpha: 1 }, "lb0")
					.to(sepGr, .3, { alpha: .6 }, "lb0")
					.to(subTextGr, .3, { alpha: .3 }, "lb0")
					.to(subTextGr.position, .3, { y: "+=10" }, "lb0")
					.to(lineObj.s, .5, {
						x: lineObj.e.x,
						y: lineObj.e.y,
						onUpdate: function(){
							lineGr.update(null, null, this.target.x, this.target.y)
						}
					}, "lb0")					
					.add("lb1", "lb0+=0.1")
					.to(toShow, .3, { alpha: 1, rotation: "+=.1" }, "lb1")

					if(!this.mouseover){
						// l("Timeline started")
						this.mouseover = true;
						this.grMouseOverTl.play();
					}else{
						// l("Timeline not started")
						this.grMouseOverTl.delay(.1).play();					
					}
				}
			}

			gr.mouseout = e => {
				if(!this.clicked){
					this.grMouseOverTl.reverse().timeScale(3);
				}
			}

			gr.mousedown = e => {
				if(!this.clicked){
					this.clicked = true;
					this.mouseover = true;
					this.grClickTl = new TimelineMax({
						onComplete: () => {
							this.navigateToPage();
						},
						onReverseComplete: () => {
							TweenMax.to(this.hoverObj.discs.scale, .3, { x: 1, y: 1 })
							this.grMouseOverTl.reverse().timeScale(3)
						}
					});
					if(!this.grClickTl.isActive()){
						let hoverObj = this.hoverObj;
						let currGr = hoverObj.currGr;
						let discs = hoverObj.discs;
						let textGr = hoverObj.textGr;
						let sepGr = hoverObj.sepGr;
						let subTextGr = hoverObj.subTextGr;
						let lineObj = hoverObj.lineObj = Object.assign({}, this.goldLineArr[hoverObj.idx]);
						let lineGr = hoverObj.lineGr;
						let remGr = hoverObj.remGr;
						let remGrPos = [];
						remGr.forEach(function(obj){
							remGrPos.push(obj.position)						
						})
						let self = this;

						this.grClickTl
							// DOM Elements
							.to(".txt-ctn .title, .txt-ctn .sub-title", .5, {scaleX:.8, scaleY:.8, opacity: .5}, "lb0")
							.to(".txt-ctn .logo, .txt-ctn .logo-txt", .5, {scaleX:.5, scaleY:.5, opacity: 0}, "lb0")
							.to(".txt-ctn .sub-title", .5, {y: "-=20"}, "lb0")
							// Canvas Elements
							.to(discs.scale, .5, { x: 2.5, y: 2.5 }, "lb0")				
							.to(currGr.position, .5, { 
								x: centerDot.position.x, 
								y: centerDot.position.y,
								onUpdate: function(){
									if(hoverObj.idx == 0){
										self.lineArr[0].line.update(null, null, this.target.x, this.target.y)
										self.lineArr[4].line.update(this.target.x, this.target.y, null, null)
									}else if(hoverObj.idx == 1){
										self.lineArr[0].line.update(this.target.x, this.target.y, null, null)
										self.lineArr[6].line.update(this.target.x, this.target.y, null, null)
									}else if(hoverObj.idx == 2){
										self.lineArr[1].line.update(this.target.x, this.target.y, null, null)
										self.lineArr[2].line.update(this.target.x, this.target.y, null, null)
									}else if(hoverObj.idx == 3){
										self.lineArr[1].line.update(null, null, this.target.x, this.target.y)									
										self.lineArr[3].line.update(null, null, this.target.x, this.target.y)									
									}
								}
							}, "lb0")
							.to(textGr.position, .5, { 
								y: textGr.clickY
							}, "lb0")
							.to(sepGr.position, .5, { 
								y: textGr.clickY + 30
							}, "lb0")
							.to(subTextGr.position, .5, { 
								y: textGr.clickY + 70
							}, "lb0")
							.to(lineGr, .2, { alpha: 0 }, "lb0")
							.to(remGrPos[0], .5, {
								x: remGr[0].clickX,
								y: remGr[0].clickY,
								onUpdate: function(){
									if(hoverObj.idx == 0){
										self.lineArr[0].line.update(this.target.x, this.target.y, null, null)
										self.lineArr[6].line.update(this.target.x, this.target.y, null, null)
									}else if(hoverObj.idx == 1){
										self.lineArr[0].line.update(null, null, this.target.x, this.target.y)
										self.lineArr[4].line.update(this.target.x, this.target.y, null, null)
									}else if(hoverObj.idx == 2){
										self.lineArr[0].line.update(null, null, this.target.x, this.target.y)
										self.lineArr[4].line.update(this.target.x, this.target.y, null, null)
									}else if(hoverObj.idx == 3){
										self.lineArr[0].line.update(null, null, this.target.x, this.target.y)
										self.lineArr[4].line.update(this.target.x, this.target.y, null, null)
									}
								}
							}, "lb0")
							.to(remGrPos[1], .5, {
								x: remGr[1].clickX,
								y: remGr[1].clickY,
								onUpdate: function(){
									if(hoverObj.idx == 0){
										self.lineArr[1].line.update(this.target.x, this.target.y, null, null)
										self.lineArr[2].line.update(this.target.x, this.target.y, null, null)
									}else if(hoverObj.idx == 1){
										self.lineArr[1].line.update(this.target.x, this.target.y, null, null)
										self.lineArr[2].line.update(this.target.x, this.target.y, null, null)
									}else if(hoverObj.idx == 2){
										self.lineArr[0].line.update(this.target.x, this.target.y, null, null)
										self.lineArr[6].line.update(this.target.x, this.target.y, null, null)
									}else if(hoverObj.idx == 3){
										self.lineArr[0].line.update(this.target.x, this.target.y, null, null)
										self.lineArr[6].line.update(this.target.x, this.target.y, null, null)
									}
								}
							}, "lb0")
							.to(remGrPos[2], .5, {
								x: remGr[2].clickX,
								y: remGr[2].clickY,
								onUpdate: function(){
									if(hoverObj.idx == 0){
										self.lineArr[1].line.update(null, null, this.target.x, this.target.y)
										self.lineArr[3].line.update(null, null, this.target.x, this.target.y)
									}else if(hoverObj.idx == 1){
										self.lineArr[1].line.update(null, null, this.target.x, this.target.y)
										self.lineArr[3].line.update(null, null, this.target.x, this.target.y)
									}else if(hoverObj.idx == 2){
										self.lineArr[1].line.update(null, null, this.target.x, this.target.y)
										self.lineArr[3].line.update(null, null, this.target.x, this.target.y)
									}else if(hoverObj.idx == 3){
										self.lineArr[2].line.update(this.target.x, this.target.y, null, null)
									}
								}
							}, "lb0")
							.staggerTo(this.ctn.children, .5, {
								y: "-=" + (this.cnf.scrUpFactor * <any>this.h)
							}, 0, "lb1")
							.to(currGr.children[0].position, .5, {
								y: this.cnf.pageTitleY/window.devicePixelRatio
							}, "lb1")
							.to(currGr.children[1].position, .5, {
								y: this.cnf.pageTitleY/window.devicePixelRatio + 25
							}, "lb1")
							.to(currGr.children[2].position, .5, {
								y: this.cnf.pageTitleY/window.devicePixelRatio + 60
							}, "lb1")
							.to(".canvas-ctn", .5, {
								backgroundColor: "rgba(0,0,0,.7)"
							}, "lb1")
							.add("lb2", "lb1+=.1")					
							.to(".txt-ctn .inner", .5, {
								y: "-=" + <any>this.h/2
							}, "lb2")
							// .to(".test", .5, {left: 0}, "lb2")
						
						// Moving small planets and lines
						if(hoverObj.idx == 0){
							this.grClickTl
								.to(self.lineArr[0].line, .5, { alpha:0 }, "lb0")
								.to(this.smPlPosArr[0], .5, {
									x:"+=150", y: "+=25",
									onUpdate: function(){
										self.lineArr[5].line.update(null, null, this.target.x, this.target.y)
									}
								}, "lb0")
								.to(this.smPlPosArr[1], .5, {
									x:"+=150", y: "+=100",
									onUpdate: function(){
										self.lineArr[2].line.update(null, null, this.target.x, this.target.y)
										self.lineArr[3].line.update(this.target.x, this.target.y, null, null)
									}
								}, "lb0")
								.to(this.smPlPosArr[2], .5, {
									x:"-=50", y: "+=50",
									onUpdate: function(){
										self.lineArr[4].line.update(null, null, this.target.x, this.target.y)
										self.lineArr[5].line.update(this.target.x, this.target.y, null, null)
										self.lineArr[6].line.update(null, null, this.target.x, this.target.y)
									}
								}, "lb0")
						}else if(hoverObj.idx == 1){
							this.grClickTl
								.to(self.lineArr[0].line, .5, { alpha:0 }, "lb0")
								.to(this.smPlPosArr[0], .5, {
									x:"-=150", y: "-=25",
									onUpdate: function(){
										self.lineArr[5].line.update(null, null, this.target.x, this.target.y)
									}
								}, "lb0")
								.to(this.smPlPosArr[1], .5, {
									x:"+=150", y: "+=150",
									onUpdate: function(){
										self.lineArr[2].line.update(null, null, this.target.x, this.target.y)
										self.lineArr[3].line.update(this.target.x, this.target.y, null, null)
									}
								}, "lb0")
								.to(this.smPlPosArr[2], .5, {
									x:"-=150", y: "+=100",
									onUpdate: function(){
										self.lineArr[4].line.update(null, null, this.target.x, this.target.y)
										self.lineArr[5].line.update(this.target.x, this.target.y, null, null)
										self.lineArr[6].line.update(null, null, this.target.x, this.target.y)
									}
								}, "lb0")
						}else if(hoverObj.idx == 2){
							this.grClickTl
								.to(self.lineArr[1].line, .5, { alpha:0 }, "lb0")
								.to(this.smPlPosArr[0], .5, {
									x:"-=150", y: "+=50",
									onUpdate: function(){
										self.lineArr[5].line.update(null, null, this.target.x, this.target.y)
									}
								}, "lb0")
								.to(this.smPlPosArr[1], .5, {
									x:"+=50", y: "-=250",
									onUpdate: function(){
										self.lineArr[2].line.update(null, null, this.target.x, this.target.y)
										self.lineArr[3].line.update(this.target.x, this.target.y, null, null)
									}
								}, "lb0")
								.to(this.smPlPosArr[2], .5, {
									x:"-=75", y: "+=150",
									onUpdate: function(){
										self.lineArr[4].line.update(null, null, this.target.x, this.target.y)
										self.lineArr[5].line.update(this.target.x, this.target.y, null, null)
										self.lineArr[6].line.update(null, null, this.target.x, this.target.y)
									}
								}, "lb0")
						}else if(hoverObj.idx == 3){
							this.grClickTl
								.to(self.lineArr[1].line, .5, { alpha:0 }, "lb0")
								.to(this.smPlPosArr[0], .5, {
									x:"-=150", y: "+=50",
									onUpdate: function(){
										self.lineArr[5].line.update(null, null, this.target.x, this.target.y)
									}
								}, "lb0")
								.to(this.smPlPosArr[1], .5, {
									x:"+=100", y: "+=150",
									onUpdate: function(){
										self.lineArr[2].line.update(null, null, this.target.x, this.target.y)
										self.lineArr[3].line.update(this.target.x, this.target.y, null, null)
									}
								}, "lb0")
								.to(this.smPlPosArr[2], .5, {
									x:"-=75", y: "+=150",
									onUpdate: function(){
										self.lineArr[4].line.update(null, null, this.target.x, this.target.y)
										self.lineArr[5].line.update(this.target.x, this.target.y, null, null)
										self.lineArr[6].line.update(null, null, this.target.x, this.target.y)
									}
								}, "lb0")
						}

						// Moving dot groups and ilnes
						this.dotGrArr1.forEach(obj => {
							this.grClickTl.to(obj, .5, {
								x: "-=100",
								y: "-=50",
								onUpdate: () => {
									this.moveDotLines(this.dotLineArr1)
								}
							}, "lb0")
						})

						this.dotGrArr2.forEach(obj => {
							this.grClickTl.to(obj, .5, {
								x: "+=100",
								y: "+=50",
								onUpdate: () => {
									this.moveDotLines(this.dotLineArr2)
								}
							}, "lb0")
						})

						this.dotGrArr3.forEach(obj => {
							this.grClickTl.to(obj, .5, {
								x: "-=100",
								y: "+=100",
								onUpdate: () => {
									this.moveDotLines(this.dotLineArr3)
								}
							}, "lb0")
						})
					}
				}
			}

		})
	}

	reverseAnim(){
		this.grClickTl.reverse().timeScale(2)
	}

	navigateToPage(){
		// console.log()
		switch(this.hoverObj.idx){
			case 0: this.router.navigate(['/spider']);	break;
			case 1: this.router.navigate(['/suggester']);	break;
			case 2: this.router.navigate(['/explorer']);	break;
			case 3: this.router.navigate(['/conf-seeker']);	break;
		}
	}

	moveDotLines(arr){
		if(!arr.length) return;
		arr.forEach(function(obj){
			obj.line.update([
				obj.f.position.x, obj.f.position.y, 
				obj.t.position.x, obj.t.position.y
			])
		})
	}

	createAnim(){
		let logoImgs = document.querySelectorAll(".logo-txt-inner .anim");
		let oNorm = document.querySelectorAll(".logo-txt-inner")[1];
		let oGlow = document.querySelectorAll(".logo-txt-inner")[2];
		let lineTl = new TimelineMax();
		let smPlTl = new TimelineMax();
		let dotsTl1 = new TimelineMax({
			onUpdate: () => {
				this.moveDotLines(this.dotLineArr1)
			}
		})

		let dotsTl2 = new TimelineMax({
			onUpdate: () => {
				this.moveDotLines(this.dotLineArr2)
			}
		})

		let dotsTl3 = new TimelineMax({
			onUpdate: () => {
				this.moveDotLines(this.dotLineArr3)
			}
		})

		this.tl
			.to([oNorm, oGlow], 1, {scaleX:1, scaleY:1})
			.to(oGlow, 1, {opacity: 1}, "lb0")
			.to(logoImgs[0], 1.2, {x:".5%"}, "lb0")
			.to(logoImgs[1], 1.2, {x:"-56%"}, "lb0")
			.set([oNorm, oGlow], {css:{zIndex: 0}})
			.add("lb1", "lb0+=.5")
			.to(".logo img", .8, {
				x: 0,
				y: 0,
				rotationZ: 0,
				filter: "blur(0px)",
				opacity: 1
			}, "lb1")
			.to(".txt-ctn hr", .5, {
				width: 796,
				opacity: 1
			}, "lb2")
			.to(".title .inner, .sub-title .inner", 1, {
				top: 0
			}, "lb3")
			.to(".txt-ctn hr", 1.5, {
				width: 0,
				opacity: 0
			}, "lb3+=.5")
			.staggerTo(this.bigPlScArr, 2, {
				x: 1,
				y: 1,
				ease: Power4.easeOut
			}, .1, "lb4")
			.staggerTo(this.bigPlPosArr, 4, {
				cycle:{				
					x: i => {
						return this.bigPlGrArr[i].posX;
					},
					y: i => {
						return this.bigPlGrArr[i].posY;
					},
					ease: [Power4.easeOut]
				}
			}, .1, "lb4")
			.add("lb5", "lb4+=2.5")
			.staggerTo(this.textGrArr, .4, {
				alpha: .2
			}, 0, "lb5", () => {
				// Add event listeners now
				this.bigPlGrArr.forEach(gr => {
					gr.children.filter(x => {
						return x.name == "discs";
					})[0].interactive = true;
				})
			})
			.add("lb6", "lb4+=2")
			.add(smPlTl, "lb6")
			.add("lb7", "lb5+=.1")
			.add(lineTl, "lb7")		
			.add("lb8", "lb6+=1")
			.add(dotsTl1, "lb8")
			.add("lb9", "lb8+=.5")
			.add(dotsTl2, "lb9")
			.add("lb10", "lb9+=.5")
			.add(dotsTl3, "lb10")
		.stop()

		this.lineArr.forEach((obj, idx) => {
			if(idx > 0){
				lineTl.add("lb"+idx, "lb"+(idx-1)+"+="+obj.d)
			}else{
				lineTl.add("lb"+idx)
			}

			let self = this;

			lineTl
			.to(obj.s, 1, {
				x: obj.e.x,
				y: obj.e.y,
				onUpdate: function(){
					// From point constant, to point changing
					self.lineGrArr[idx].update(null, null, this.target.x, this.target.y)
				}
			}, "lb"+idx)
		})
		// lineTl.stop();

		smPlTl
			.add("lb0")
			.to(this.smPlPosArr[0], 6, {
				x: this.smPlGrArr[0].posX,
				y: this.smPlGrArr[0].posY,
				ease: Power4.easeOut
			}, "lb0")
			.add("lb1", "lb0+=1")
			.to(this.smPlPosArr[1], 6, {
				x: this.smPlGrArr[1].posX,
				y: this.smPlGrArr[1].posY,
				ease: Power4.easeOut
			}, "lb1")
			.add("lb2", "lb1+=1")
			.to(this.smPlPosArr[2], 6, {
				x: this.smPlGrArr[2].posX,
				y: this.smPlGrArr[2].posY,
				ease: Power4.easeOut
			}, "lb2")
		// .stop()

		dotsTl1
			.add("lb0")
			.to(this.dotGrArr1[0].position, 15, {
				x: this.dotGrArr1[0].posX,
				y: this.dotGrArr1[0].posY,
				ease: Power4.easeOut
			}, "lb0")
			.to(this.dotGrArr1[1].position, 15, {
				x: this.dotGrArr1[1].posX,
				y: this.dotGrArr1[1].posY,
				ease: Power4.easeOut
			}, "lb0")
			.to(this.dotGrArr1[2].position, 15, {
				x: this.dotGrArr1[2].posX,
				y: this.dotGrArr1[2].posY,
				ease: Power4.easeOut
			}, "lb0")
			.add("lb1", "lb0+=.5")
			.to(this.dotGrArr1[3].position, 15, {
				x: this.dotGrArr1[3].posX,
				y: this.dotGrArr1[3].posY,
				ease: Power4.easeOut
			}, "lb1")
			.add("lb2", "lb1+=.5")
			.to(this.dotGrArr1[4].position, 15, {
				x: this.dotGrArr1[4].posX,
				y: this.dotGrArr1[4].posY,
				ease: Power4.easeOut
			}, "lb2")
		// .stop()

		dotsTl2
			.add("lb0")
			.to(this.dotGrArr2[0].position, 15, {
				x: this.dotGrArr2[0].posX,
				y: this.dotGrArr2[0].posY,
				ease: Power4.easeOut
			}, "lb0")
			.add("lb1", "lb0+=0.3")
			.to(this.dotGrArr2[1].position, 15, {
				x: this.dotGrArr2[1].posX,
				y: this.dotGrArr2[1].posY,
				ease: Power4.easeOut
			}, "lb1")
			.to(this.dotGrArr2[2].position, 15, {
				x: this.dotGrArr2[2].posX,
				y: this.dotGrArr2[2].posY,
				ease: Power4.easeOut
			}, "lb1")
			.add("lb2", "lb1+=0.3")
			.to(this.dotGrArr2[3].position, 15, {
				x: this.dotGrArr2[3].posX,
				y: this.dotGrArr2[3].posY,
				ease: Power4.easeOut
			}, "lb2")
		// .stop()

		dotsTl3
			.add("lb0")
			.to(this.dotGrArr3[0].position, 15, {
				x: this.dotGrArr3[0].posX,
				y: this.dotGrArr3[0].posY,
				ease: Power4.easeOut
			}, "lb0")
			.to(this.dotGrArr3[1].position, 15, {
				x: this.dotGrArr3[1].posX,
				y: this.dotGrArr3[1].posY,
				ease: Power4.easeOut
			}, "lb0")			
			.to(this.dotGrArr3[2].position, 15, {
				x: this.dotGrArr3[2].posX,
				y: this.dotGrArr3[2].posY,
				ease: Power4.easeOut
			}, "lb0")
			.to(this.dotGrArr3[3].position, 15, {
				x: this.dotGrArr3[3].posX,
				y: this.dotGrArr3[3].posY,
				ease: Power4.easeOut
			}, "lb0")
			.to(this.dotGrArr3[4].position, 15, {
				x: this.dotGrArr3[4].posX,
				y: this.dotGrArr3[4].posY,
				ease: Power4.easeOut
			}, "lb0")
			.to(this.dotGrArr3[5].position, 15, {
				x: this.dotGrArr3[5].posX,
				y: this.dotGrArr3[5].posY,
				ease: Power4.easeOut
			}, "lb0")
		// .stop()
	}

}
