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

	copy () {
		return new Vector(this.x, this.y);
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
	
	invert () {
		return new Vector(-this.x, -this.y);
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