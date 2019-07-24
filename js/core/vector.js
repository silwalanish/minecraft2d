"use strict";

class Vector{

	constructor(x, y){
		this.x = x || 0;
		this.y = y || 0;
	}
	
	mul (f){
		this.x *= f;
		this.y *= f;
	}
	
	add (v) {
		this.x += v.x;
		this.y += v.y;
	}

	dot (v) {
		return ((this.x * v.x) + (this.y * v.y));
	}

	distance (v) {
		return Math.sqrt(Math.pow(v.x - this.x, 2) + Math.pow(v.y - this.y, 2));
	}

	copy () {
		return new Vector(this.x, this.y);
	}

	invert () {
		return new Vector(-this.x, -this.y);
	}

	rounded () {
		return new Vector(Math.round(this.x), Math.round(this.y));
	}

	static mul (v, f) {
		return new Vector(v.x * f, v.y * f);
	}

	static dot(v1, v2){
		return ((v1.X * v2.X) + (v1.Y * v2.Y));
	}

	static add(v1, v2){
		return new Vector(v1.X + v2.X, v1.Y + v2.Y);
	}

	static sub(v1, v2){
		return new Vector(v1.X - v2.X, v1.Y - v2.Y);
	}

	static distance(v1, v2){
		return Math.sqrt(Math.pow(v2.x - v1.x, 2) + Math.pow(v2.y - v1.y, 2));
	}
	
	static invert (v) {
		return new Vector(-v.x, -v.y);
	}

	get X(){
		return this.x;
	}

	get Y(){
		return this.y;
	}

	set X(val){
		this.x = val;
	}

	set Y(val){
		this.y = val;
	}

}