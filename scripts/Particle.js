function Particle(pos){
	this.pos = (typeof pos === "undefined") ? new Vector() : pos;
	this.speed = new Vector();

	this.accel = null;
	this.applyRandForce();

	this.strength = 1;
	this.friction = 0.98;

	this.decay = Math.random() * 0.005 + 0.003;
	this.radius = Math.random() * 4 + 3;

	this.randomPush = 0.1;

	this.canvas = this.prototype.canvas;
	this.context = this.prototype.context;
};

Particle.prototype.radius = 3;

Particle.prototype.color = {
	r: 225,
	g: 225,
	b: Math.floor(Math.random() * 50 + 150)
};

Particle.prototype.update = function() {

	if(Math.random() < this.randomPush)
		this.applyRandForce();

	this.speed = this.speed.add(this.accel);
	this.pos = this.pos.add(this.speed);
	this.speed = this.speed.multiply(this.friction);
	this.accel.zeroify();

	if(this.pos.x < 0) {
	    this.pos.x = 0;
	    this.speed.x *= -1;
	} else if(this.pos.x > this.canvas.width) {
	    this.pos.x = this.canvas.width;
	    this.speed.x *= -1;
	} else if(this.pos.y < 0) {
	    this.pos.y = 0;
	    this.speed.y *= -1;
	} else if(this.pos.y > this.canvas.height) {
	    this.pos.y = this.canvas.height;
	    this.speed.y *= -1;
	}

	this.strength -= this.decay;
};

Particle.prototype.draw = function() {
	if(this.strength <= 0)
		return;

	this.context.fillStyle = "rgba(" + this.color.r + ", " + this.color.g + ", " + this.color.b + ", " + this.strength + ")";
	this.context.beginPath();
	this.context.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
	this.context.fill();
	this.context.closePath();
};

Particle.prototype.applyRandForce = function(){
	this.accel = new Vector(Math.random() * 4 - 2, Math.random() * 4 - 2);
};