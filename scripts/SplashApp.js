// SplashApp.js - Sunmock Yang Aug. 2016

// App singleton
function SplashApp(canvas) {
	this.canvas = canvas;
	this.context = this.canvas.getContext("2d");

	// Base draw object class
	var DrawObject = {
		canvas: this.canvas,
		context: this.context,
		draw: function(){},
		update: function(){}
	};
	Splash.prototype.prototype = DrawObject;
	Particle.prototype.prototype = DrawObject;

	this.splashes = [];
	this.particles = [];
	this.lastSplashFrame = 0;

	// this.mouse = new LibraryMouse(this.canvas);
	// this.mouse.addEventListener("mousemove", this.onmousemove.bind(this));
	// this.mouse.addEventListener("mousedown", this.onmousemove.bind(this));

	this.onresize();
	this.run();
};

SplashApp.prototype.MIN_PARTICLES_IN_SPLASH = 3;
SplashApp.prototype.MAX_PARTICLES_IN_SPLASH = 7;
SplashApp.prototype.SPAWN_CHANCE = 0.01;

SplashApp.prototype.update = function() {
	if(Math.random() < this.SPAWN_CHANCE && this.splashes.length < 3 && this.lastSplashFrame > 45 || this.particles.length === 0){
		this.spawnSplash();
	}

	var deathList = [];
	for (var i = 0; i < this.splashes.length; i++) {
		this.splashes[i].update();
		if (this.splashes[i].strength <= 0) {
			deathList.push(i);
		}
	}

	for (var i = 0; i < deathList.length; i++) {
		this.splashes.splice(deathList[i], 1);
	};

	this.lastSplashFrame++;

	deathList = [];
	for (var i = 0; i < this.particles.length; i++) {
		this.particles[i].update();

		if(this.particles[i].strength <= 0)
			deathList.push(i);
	};

	for (var i = 0; i < deathList.length; i++) {
		this.particles.splice(deathList[i], 1);
	};
};

SplashApp.prototype.draw = function() {
	this.context.clearRect(0,0,this.canvas.width, this.canvas.height);

	for(var i = 0; i < this.splashes.length; i++){
		this.splashes[i].draw();
	}

	for(var i = 0; i < this.particles.length; i++){
		this.particles[i].draw();
	}
};

SplashApp.prototype.spawnSplash = function(origin) {
	if (this.splashes.length > 20) {
		return;
	}

	if(this.lastSplashFrame > 30){
		origin = origin ? origin : new Vector(Math.random() * this.canvas.width, Math.random() * this.canvas.height);

		this.splashes.push(new Splash(Math.ceil(Math.random() * 2), origin));
		this.lastSplashFrame = 0;

		var numParticles = Math.floor(Math.random() * (this.MAX_PARTICLES_IN_SPLASH - this.MIN_PARTICLES_IN_SPLASH)) + this.MIN_PARTICLES_IN_SPLASH;

		for (var i = 0; i < numParticles; i++) {
			this.particles.push(new Particle(origin));
		};
	}
};

SplashApp.prototype.onresize = function() {
	var w = window.innerWidth;
	var h = window.innerHeight;

	this.canvas.width = w;
	this.canvas.height = h;

    for (var i = 0; i < this.splashes.length; i++) {
    	this.splashes[i].onresize();
    };
};

SplashApp.prototype.onmousemove = function() {
	this.spawnSplash(new Vector(this.mouse.x, this.mouse.y));
};

SplashApp.prototype.onmouseclick = function() {
	this.spawnSplash(new Vector(this.mouse.x, this.mouse.y));
};

SplashApp.prototype.run = function() {
	this.update();
	this.draw();
	window.requestAnimationFrame(this.run.bind(this));
};
