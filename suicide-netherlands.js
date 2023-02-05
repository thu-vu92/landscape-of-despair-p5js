function Suicide() {
	  // Name for the visualisation to appear in the menu bar.
	this.name = 'Landscape of Despair in the Netherlands';

	// Each visualisation must have a unique ID with no special
	// characters.
	this.id = 'landscape-of-despair-netherlands';

	// Property to represent whether data has been loaded.
	this.loaded = false;
	
	// Graph properties.
	this.pad = 20;
	
	// Preload the data. This function is called automatically by the
	// gallery when a visualisation is added.
	this.preload = function() {
		var self = this;
		this.data = loadTable(
			'./data/suicide-netherlands/total-suicide-number-2018.csv', 'csv', 'header',
			// Callback function to set the value
			// this.loaded to true.
			function(table) {
			self.loaded = true;
		});
		
		this.infoIcon = loadImage('infoIcon.png');
	};
	
	
	// Ground height
	this.ground_pos_y = height *5/6;
	
	// Properties of different elements in the pictures:
	this.infoIconSize = 20;
			
	this.minBuildingWidth = 5;
	this.maxBuildingWidth = 30;
	this.minBuildingHeight = 7;
	this.maxBuildingHeight = 50;
	
	this.minCloudSize = 5;
	this.maxCloudSize = 30;
	this.minCloudHeight = height*1/5;
	this.maxCloudHeight = height*5/8;
	
	this.minStarHeight = this.pad;
	this.maxStarHeight = height*1/2 - 150;
	
	this.minStarSize = 1;
	this.maxStarSize = 3;
	
	this.minLightSize = 1;
	this.maxLightSize = 5;
	
	this.minWavesHeight = this.ground_pos_y + height*1/15 + 10;
	this.minWavesWidth = 10;
	this.maxWavesWidth = 20;
	
	// Gradient variables
	this.Y_AXIS = 1;
	this.X_AXIS = 2;

	function setup(){
		
	};
	
	this.destroy = function() {
	};

	this.draw = function()
	{
		noLoop();
		
		this.init();

		// Draw background graphics
		// Define colors
		noStroke();
		c1_sky = color(	20,	30,	48);
		c2_sky = color(	192,	108,	132);
		this.setGradient(this.pad, 0, width - this.pad, height + 100, c1_sky, c2_sky, this.Y_AXIS, 1);
		
		// river
		c1_river = color(	115,	200,	169);
		c2_river = color(		55,	59,	68);
		this.setGradient(this.pad, this.ground_pos_y, width - this.pad, height, c1_river, c2_river, this.Y_AXIS, 5);
		
		// Draw ground
		noStroke();
		//fill(	64,	59,	74);
		c1_ground = color(60,	60,	51);
		c2_ground = color(64,	59,	74);
		
		this.setGradient(this.pad, this.ground_pos_y, width - this.pad, height*1/15, c1_ground, c2_ground, this.Y_AXIS, 1);
		
		filter(BLUR, 2);
		
		
		// Draw clouds.
		this.drawClouds();

		// Draw mountains.
		this.drawBuildings();

		// Draw mountains.
		this.drawLights();
		
		// Draw trees.
//		this.drawTrees();
		
		// Draw grass.
		this.drawStars();
		
		// Draw waves
		this.drawWaves();
		
		// create info title
		var info_sec = select('h2');
		
		// if null, create info title
		if(info_sec == null) {
			var info = createElement('h2', 'Click me for explanation!');
		}	
		// if user click on the info, show the explanation para
		info.mouseClicked(function(e)
			{
			//create info paragraph
			createElement('p', 'This landscape, each element in it represents a person who committed suicide in the Netherlands in the year 2018. <br> Each category of suicide is represented by certain element:  <br> - Buildings: Jumping from height <br> - Clouds: Taking drugs/ medicine/ alcolhol <br>- Waves: Drowning <br> - Stars: Strangulation <br> - Lights: Jumping in front of trains/ metros.' );

			info.remove();	
			});
		}

	// Set gradient function
	// https://editor.p5js.org/REAS/sketches/S1TNUPzim
	this.setGradient = function(x, y, w, h, c1, c2, axis, step) {
	  noFill();

	  if (axis === this.Y_AXIS) {
		// Top to bottom gradient
		for (let i = y; i <= y + h; i++) {
		  let inter = map(i, y, y + h, 0, step);
		  let c = lerpColor(c1, c2, inter);
		  stroke(c);
		  line(x, i, x + w, i);
		}
	  } else if (axis === this.X_AXIS) {
		// Left to right gradient
		for (let i = x; i <= x + w; i++) {
		  let inter = map(i, x, x + w, 0, step);
		  let c = lerpColor(c1, c2, inter);
		  stroke(c);
		  line(i, y, i, y + h);
		}
	  }
	}
	
	// Functions for drawing background objects
	this.drawClouds = function() {
		for (var i=0; i< this.data.length; i++) {
		noStroke();
		fill(255);
		ellipse(clouds[i].x_pos, clouds[i].y_pos, 60, 60);
		ellipse(clouds[i].x_pos - 40, clouds[i].y_pos, 40, 40);
		ellipse(clouds[i].x_pos + 40, clouds[i].y_pos, 40, 40);

		ellipse(clouds[i].x_pos - 100, clouds[i].y_pos - 50, 80, 80);
		ellipse(clouds[i].x_pos - 140, clouds[i].y_pos - 50, 60, 60);
		ellipse(clouds[i].x_pos - 60, clouds[i].y_pos - 50, 60, 60);
		};	
		
	}
	this.drawTrees = function(){
		// tree 1
	  noStroke();
	  fill(67, 51, 8); // tree brown
	  rect(320,194,10,20); // trunk
	  fill(23, 69, 29);
	  ellipse(326,172,20,20);// tree top
	  ellipse(324,192,30,20);
	  ellipse(330,182,20,20);

	  // tree 2
	  push();
		translate(-40,-40);
		scale(1.5);
		fill(67, 51, 8); // tree brown
		rect(320,194,10,20); // trunk
		fill(23, 69, 29);
		ellipse(326,192,20,20);// tree top
		ellipse(324,172,30,20);
		ellipse(330,182,20,20);
	  pop();
	};
	
	// Function to draw buildings
	this.drawBuildings = function() {
		stroke(	231,	233,	187)
		strokeWeight(3);
		c1_building = color(0);
		c2_building = color(	60,	60,	51);
		for (var i=0; i<this.buildings.length; i++) {
			this.setGradient(this.buildings[i].x_pos,
				this.buildings[i].y_pos, 
				this.buildings[i].width, 
				this.buildings[i].height, c1_building, c2_building, 
			    this.Y_AXIS,
				1
			 );
			
			// Draw windows:
			fill('YELLOW');
			for (j=0; j<2; j++) {			
				rect(this.buildings[i].x_pos + this.buildings[i].width/4*(2*j + 1), this.buildings[i].y_pos + 2, 2, 0.5);
				rect(this.buildings[i].x_pos + this.buildings[i].width/4*(2*j + 1), this.buildings[i].y_pos + this.buildings[i].height*1/4, 2, 1)
			}
			
		}
	};
	
	// Function to draw clouds
	this.drawClouds = function() {
		fill(170);
		noStroke();
		for (var i=0; i<this.clouds.length; i++) {
			
			arc(this.clouds[i].x_pos, this.clouds[i].y_pos, this.clouds[i].size, this.clouds[i].size, PI, 0);

			arc(this.clouds[i].x_pos + this.clouds[i].size*1/2, this.clouds[i].y_pos, this.clouds[i].size, this.clouds[i].size*3/4, -PI, PI)
			};
		filter(BLUR, 2);
	}
	
	// Function to draw clouds
	this.drawLights = function() {
		fill("YELLOW");
		noStroke();
		for (var i=0; i<this.lights.length; i++) {
			ellipse(this.lights[i].x_pos, this.lights[i].y_pos, this.lights[i].size)
		}
	};
	
	// Function to draw stars
	this.drawStars = function() {
		strokeWeight(1);
		stroke(	255,	210,	190)
		fill(	255,	210,	125)
//		stroke(	255,	210,	125)
//		fill(	250,	253,	236)
		for (var i=0; i<this.stars.length; i++) {
			ellipse(this.stars[i].x_pos, this.stars[i].y_pos, this.stars[i].size)
		}
	};
	
	this.drawWaves = function() {
		noFill();
		stroke(	147,	237,	199);
		for (var i=0; i<this.waves.length; i++) {
			ellipse(this.waves[i].x_pos, this.waves[i].y_pos, this.waves[i].size, 1)
		}
		
	}
	
	// Function to generate a random integer between 2 values.
	this.getRndInteger = function(min, max) {	
	  return Math.floor(Math.random() * (max - min) ) + min;
	};
	
	this.getMouse = function() {
		console.log(mouseX)
	}
	
	// Function to initialize arrays for objects:
	this.init = function() {
		randomSeed(99);
		// Define buildings array
		var numBuildings = this.data.getColumn("Jump_from_high")[0];
		this.buildings = [];
		for (var i=0; i < numBuildings; i++){
			let randX = this.getRndInteger(this.pad, width - this.pad);
			let randHeight = this.getRndInteger(this.minBuildingHeight, this.maxBuildingHeight);
			let randWidth = this.getRndInteger(this.minBuildingWidth, this.maxBuildingWidth);
			this.buildings.push({x_pos: randX, y_pos: this.ground_pos_y - randHeight, width: randWidth, height: randHeight})
		};
		
		// Define clouds array
		var numClouds = this.data.getColumn("Medicine")[0];
		this.clouds = [];
		for (var i=0; i < numClouds; i++){
			let randX = this.getRndInteger(this.pad + this.maxCloudSize/2, width - this.pad);
			let randY = this.getRndInteger(this.minCloudHeight, this.maxCloudHeight);
			let randSize = map(randY, this.minCloudHeight, this.maxCloudHeight, this.minCloudSize, this.maxCloudSize);
			this.clouds.push({x_pos: randX, y_pos: randY, size: randSize})
		};
		
		// Define lights array
		var numLights = this.data.getColumn("Train_jumping")[0];
		this.lights = [];
		for (var i=0; i < numLights; i++){
			let randX = this.getRndInteger(this.pad, width - this.pad);
			let randY = this.getRndInteger(this.ground_pos_y, this.ground_pos_y + 15);
			let randSize = this.getRndInteger(this.minLightSize, this.maxLightSize);
			this.lights.push({x_pos: randX, y_pos: randY, size: randSize})
		};
		
		// Define stars array
		var numStars = this.data.getColumn("Strangling")[0];
		this.stars = [];
		for (var i=0; i < numStars; i++){
			let randX = this.getRndInteger(this.pad, width);
			let randY = this.getRndInteger(this.minStarHeight, this.maxStarHeight);
			let randSize = this.getRndInteger(this.minStarSize, this.maxStarSize);
			this.stars.push({x_pos: randX, y_pos: randY, size: randSize})
		};
		
		// Define waves array
		var numWaves = this.data.getColumn("Drowning")[0];
		this.waves = [];
		for (var i=0; i < numWaves; i++){
			let randX = this.getRndInteger(this.pad, width);
			let randY = this.getRndInteger(this.minWavesHeight, height - 5);
			let randSize = this.getRndInteger(this.minWavesWidth, this.maxWavesWidth);
			this.waves.push({x_pos: randX, y_pos: randY, size: randSize})
		};
	};
};



