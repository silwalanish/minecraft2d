/**
 *
 * Copyright 2019 Anish Silwal Khatri
 *
 * Permission is hereby granted, free of charge, to any person obtaining 
 * a copy of this software and associated documentation files (the "Software"), 
 * to deal in the Software without restriction, including without limitation the 
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or 
 * sell copies of the Software, and to permit persons to whom the Software is 
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all 
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS 
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR 
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER 
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION 
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */

"use strict";

class Grid {

	constructor (map, pos, dims, gridDims) {
		this.pos = pos;
		this.dims = dims;
		this.gridDims = gridDims;
		this.map = map;

		this.viewingDims = {
			start: new Vector(),
			end: dims
		};

		this.cells = new Array(this.dims.y);
		for (let i = 0; i < this.dims.y; i++){
			this.cells[i] = new Array(this.dims.x).fill(0);
		}
	}

	render (ctx) {
		for (let i = this.viewingDims.start.y; i < this.viewingDims.end.y; i++) {
			for(let j = this.viewingDims.start.x; j < this.viewingDims.end.x; j++) {
				let cell = this.cells[i][j];
				if(cell){
					cell.draw(ctx);
				}
			}
		}
	}

	update (deltaTime, camera, playerPos) {
		this.viewingDims.start = this.toGridPos(camera.pos);
		this.viewingDims.start.x = Math.max(0, this.viewingDims.start.x - 1);
		this.viewingDims.start.y = Math.max(0, this.viewingDims.start.y - 1);
		
		this.viewingDims.end = this.toGridPos(Vector.add(camera.pos, camera.viewport));
		this.viewingDims.end.x = Math.min(this.dims.x, this.viewingDims.end.x + 1);
		this.viewingDims.end.y = Math.min(this.dims.y, this.viewingDims.end.y + 1);

		if(playerPos){
			playerPos = this.toGridPos(playerPos.rounded());
		}
		
		for (let i = this.viewingDims.start.y; i < this.viewingDims.end.y; i++) {
			for(let j = this.viewingDims.start.x; j < this.viewingDims.end.x; j++) {
				let cell = this.cells[i][j];
				if(cell != 0){
					cell.isMouseOver = false;
					cell.update(deltaTime);

					if(playerPos){
						let dist = Math.round(Vector.distance(playerPos, cell.gridPos));
						if(dist < 2){
							cell.canMineCell = true;
							cell.isNearPlayer = true;
						}else if(dist <= 3){
							cell.isNearPlayer = true;
							cell.canMineCell = false;
						}else{
							cell.isNearPlayer = false;
							cell.canMineCell = false;
						}

						if(cell.gridPos.y <= this.map.heights[cell.gridPos.x] + 1){
							cell.isCulled = false;
						}else{
							cell.isCulled = true;
						}
					}else{
						cell.isNearPlayer = true;
						cell.canMineCell = true;
						cell.isCulled = false;
					}
				}
			}
		}
	}

	onMouseOver (mouseGridPos) {
		if(this.isOnVisibleGrid(mouseGridPos)){
			let cell = this.cells[mouseGridPos.y][mouseGridPos.x];
			if(cell){
				cell.isMouseOver = true;
			}
		}
	}

	setObj (obj) {
		if(this.isOnGrid(obj.gridPos)) {
			this.cells[obj.gridPos.y][obj.gridPos.x] = obj;
		}
	}

	addObj (obj) {
		if(this.isOnGrid(obj.gridPos) && !this.cellAt(obj.gridPos)){
			if(this.map.heights[obj.gridPos.x] > obj.gridPos.y && obj.isGround){
				this.map.heights[obj.gridPos.x] = obj.gridPos.y;
			}
			this.cells[obj.gridPos.y][obj.gridPos.x] = obj;
		}
	}

	hasGround (gridPos) {
		if(!this.isOnGrid(gridPos)){
			return false;
		}
		
		if(this.cells[gridPos.y][gridPos.x].isGround){
			return true;
		}else{
			return false;
		}
	}

	cellAt (gridPos) {
		if(!this.isOnGrid(gridPos)){
			return false;
		}
		return this.cells[gridPos.y][gridPos.x];
	}

	removeAt (gridPos) {
		if(this.isOnGrid(gridPos)){
			if(this.map.heights[gridPos.x] == gridPos.y && this.cells[gridPos.y][gridPos.x] && this.cells[gridPos.y][gridPos.x].isGround){
				this.map.heights[gridPos.x] = gridPos.y + 1;
			}
			this.cells[gridPos.y][gridPos.x] = 0;
		}
	}

	hasTreeAt (gridPos) {
		let cell = this.cellAt(gridPos);
		return cell && cell instanceof Trunk;
	}

	isEmpty (gridPos) {
		return this.cells[gridPos.y][gridPos.x] == 0;
	}

	cellIsNearPlayer (gridPos) {
		if (this.isOnGrid(gridPos)){
			let cell = this.cells[gridPos.y][gridPos.x];
			if(cell){
				cell.isNearPlayer = true;
			}
		}
	}

	isOnGrid (gridPos) {
		return (gridPos.x >= 0 && gridPos.x < this.dims.x) && 
					 (gridPos.y >= 0 && gridPos.y < this.dims.y);
	}

	isOnVisibleGrid (gridPos) {
		return (gridPos.x >= this.viewingDims.start.x && gridPos.x < this.viewingDims.end.x) && 
					 (gridPos.y >= this.viewingDims.start.y && gridPos.y < this.viewingDims.end.y);
	}

	toWorldPos (gridPos) {
		return new Vector(this.gridDims.x * gridPos.x, this.gridDims.y * gridPos.y);
	}

	toGridPos (worldPos) {
		return new Vector(Math.floor(worldPos.x / this.gridDims.x), Math.floor(worldPos.y / this.gridDims.y));
	}

	asArray () {
		let grid = [];
		for (let i = 0; i < this.dims.y; i++) {
			grid[i] = [];
			for(let j = 0; j < this.dims.x; j++) {
				let value = 0;
				let cell = this.cells[i][j];
				if(cell instanceof GrassGround) {
					value = 1;
				}else if(cell instanceof DirtGround) {
					value = 2;
				}else if(cell instanceof StoneGround) {
					value = 3;
				}else if(cell instanceof SandGround) {
					value = 4;
				}else if(cell instanceof WoodGround) {
					value = 5;
				}else if(cell instanceof GoldGround) {
					value = 6;
				}else if(cell instanceof Trunk) {
					value = 7;
				}else if(cell instanceof Leaves) {
					value = 8;
				}
				grid[i].push(value);
			}
		}
		return grid;
	}

}