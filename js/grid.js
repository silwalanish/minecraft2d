"use strict";

class Grid {

	constructor (pos, dims, gridDims) {
		this.pos = pos;
		this.dims = dims;
		this.gridDims = gridDims;
		this.heights = [];

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

		playerPos = this.toGridPos(playerPos.rounded());

		for (let i = this.viewingDims.start.y; i < this.viewingDims.end.y; i++) {
			for(let j = this.viewingDims.start.x; j < this.viewingDims.end.x; j++) {
				let cell = this.cells[i][j];
				if(cell != 0){
					cell.isCollidingWithPlayer = false;
					cell.isMouseOver = false;
					cell.update(deltaTime);
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

					if(cell.gridPos.y <= this.heights[cell.gridPos.x] + 1){
						cell.isCulled = false;
					}else{
						cell.isCulled = true;
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

	addObj (obj) {
		if(this.isOnGrid(obj.gridPos) && !this.cellAt(obj.gridPos)){
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

}