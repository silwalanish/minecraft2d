/**
 *
 * Copyright 2019 Anish Silwal Khatri
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of 
 * this software and associated documentation files (the "Software"), to deal in 
 * the Software without restriction, including without limitation the rights to use, 
 * copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the 
 * Software, and to permit persons to whom the Software is furnished to do so, subject 
 * to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies 
 * or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR 
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE 
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR 
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
 * DEALINGS IN THE SOFTWARE.
 */

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