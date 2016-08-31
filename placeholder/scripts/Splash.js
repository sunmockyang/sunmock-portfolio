function Splash(level, origin, secondary, speed, decay){
	this.radius = 0;
	this.strength = 1;
	this.speed = (typeof speed === "undefined") ? Math.random() * 1 + 1 : speed;

	this.decay = (typeof decay === "undefined") ? 0.002 + Math.random() * 0.004 : decay;

	this.origin = origin;

	this.secondary = secondary;

	this.level = level;

	this.secondaries = [];

	this.canvas = this.prototype.canvas;
	this.context = this.prototype.context;

	this.init();
};

Splash.prototype.MAXLEVEL = 5;

Splash.prototype.init = function(){
	if(this.level <= 0)
		return;

	// Top
	if(this.secondary != "top")
		this.secondaries.push(new Splash(this.level - 1, new Vector(this.origin.x, -this.origin.y), "top", this.speed, this.decay));

	// Bottom
	if(this.secondary != "bottom"){
		var _bottom = this.canvas.height*2 - this.origin.y;
		this.secondaries.push(new Splash(this.level - 1, new Vector(this.origin.x, _bottom), "bottom", this.speed, this.decay));
	}

	// Left
	if(this.secondary != "left"){
		this.secondaries.push(new Splash(this.level - 1, new Vector(-this.origin.x, this.origin.y), "left", this.speed, this.decay));
	}

	// Right
	if(this.secondary != "right"){
		var _right = this.canvas.width*2 - this.origin.x;
		this.secondaries.push(new Splash(this.level - 1, new Vector(_right, this.origin.y), "right", this.speed, this.decay));
	}
};

Splash.prototype.update = function() {
	this.radius += this.speed;
	this.strength -= this.decay;

	if(this.strength <= 0)
		return;

	for (var i = 0; i < this.secondaries.length; i++) {
		this.secondaries[i].update();
	};
};

Splash.prototype.draw = function() {
	if(this.strength <= 0)
		return;

	var _c = Math.floor(255 * this.strength);

	this.context.strokeStyle = "rgba(0,155,155, " + this.strength + ")";

	this.context.lineWidth = (this.level + 1) * 5 * this.strength;
	this.context.beginPath();
	this.context.arc(this.origin.x, this.origin.y, this.radius, 0, 2 * Math.PI, false);
	// this.context.rect(this.origin.x - this.radius, this.origin.y - this.radius, this.radius*2, this.radius*2);
	this.context.stroke();
	this.context.closePath();

	for (var i = 0; i < this.secondaries.length; i++) {
		this.secondaries[i].draw();
	};
};

Splash.prototype.onresize = function() {
	if(this.level <= 0)
		return;

	for (var i = 0; i < this.secondaries.length; i++) {
		
		// Top
		if(this.secondaries[i].secondary != "top")
			this.secondaries[i].origin = new Vector(this.origin.x, -this.origin.y);

		// Bottom
		if(this.secondaries[i].secondary != "bottom"){
			var _bottom = this.canvas.height*2 - this.origin.y;
			this.secondaries[i].origin = new Vector(this.origin.x, _bottom);
		}

		// Left
		if(this.secondaries[i].secondary != "left"){
			this.secondaries[i].origin = new Vector(-this.origin.x, this.origin.y);
		}

		// Right
		if(this.secondaries[i].secondary != "right"){
			var _right = this.canvas.width*2 - this.origin.x;
			this.secondaries[i].origin = new Vector(_right, this.origin.y);
		}
	};
};