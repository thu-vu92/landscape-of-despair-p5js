function SuicideByAgeGender() {

  // Name for the visualisation to appear in the menu bar.
  this.name = 'Suicide in the Netherlands by Age and Gender';

  // Each visualisation must have a unique ID with no special
  // characters.
  this.id = 'suicide-age-gender';

  // Layout object to store all common plot layout parameters and
  // methods.
  this.layout = {
    // Locations of margin positions. Left and bottom have double margin
    // size due to axis and tick labels.
    leftMargin: 80,
    rightMargin: width,
    topMargin: 120,
    bottomMargin: height - 100,
    pad: 5,

    plotWidth: function() {
      return this.rightMargin - this.leftMargin;
    },

    // Boolean to enable/disable background grid.
    grid: true,

    // Number of axis tick labels to draw so that they are not drawn on
    // top of one another.
    numXTickLabels: 7,
};

  // Default visualisation colours.
  this.femaleColour = color(245,106,121);   // pink red
  this.maleColour = color(103,155,155);     // greenish

  // Property to represent whether data has been loaded.
  this.loaded = false;

  // Preload the data. This function is called automatically by the
  // gallery when a visualisation is added.
  this.preload = function() {
    var self = this;
    this.data = loadTable(
      './data/suicide-netherlands/total-suicide-by-gender-age-2018.csv', 'csv', 'header',
      // Callback function to set the value
      // this.loaded to true.
      function(table) {
        self.loaded = true;
      });

  };

  this.setup = function() {
    // Font defaults.
    textSize(16);
	// Create a select DOM element.
	this.select = createSelect();
	this.select.position(this.layout.leftMargin + this.layout.plotWidth()/2 + 310, 50);
	
	let uniqueYears = [... new Set(this.data.getColumn('Year'))]
	
	// Create entries for selecting years
	for (let i = 0; i < uniqueYears.length; i++) {
	  this.select.option(uniqueYears[i]);
	}
  };

  this.destroy = function() {
 	 this.select.remove();
  };

  this.draw = function() {
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }
	  	  
	// Draw chart title
	this.drawTitle()
	  
    // Draw age group labels
    this.drawCategoryLabels();
	
	let uniqueYears = [... new Set(this.data.getColumn('Year'))]
	let uniqueAgeGroups = [... new Set(this.data.getColumn('Age'))]

	var lineHeight = (this.layout.bottomMargin - this.layout.topMargin) / this.data.getRowCount() * uniqueYears.length
	
	var selectedYear = this.select.value()
	// Get data for selected year from dropdown 
	var dataYear = this.data.findRows(selectedYear, 'Year')

	// Draw axis
	this.drawXAxisTickLabels(0, 35, this.layout, this.mapPercentToWidth.bind(this));
	this.drawAxisLabels()
	  
	// Draw text 'Age group' on top of the chart
	text('Age group', this.layout.leftMargin + this.layout.plotWidth()/2,100)  
	  
	// Draw text 'Select year' on top of the chart
	text('Select year:', this.layout.leftMargin + this.layout.plotWidth()/2 - 30, 60)  
	  
	for (var i = 0; i < uniqueAgeGroups.length; i++) {

		// Calculate the y position for each company.
		var lineY = (lineHeight * i) + this.layout.topMargin;
		
		// Draw the age groups in the center.
		fill(0);
		noStroke();
		textAlign('right', 'top');
		text(uniqueAgeGroups[i],
		   this.layout.leftMargin + this.layout.plotWidth()/2 - this.layout.pad,
		   lineY + (lineHeight)/2 - 10);
		
		// Create an object that stores data from the current row.
		var item = {
			// Convert strings to numbers.
			'age': dataYear[i].get('Year'),
			'men': dataYear[i].get('Men'),
			'women': dataYear[i].get('Women'),
		};
		
		
		// Draw female rectangle.
		fill(this.femaleColour);
		rect(this.layout.leftMargin + this.layout.plotWidth()/2 - this.mapPercentToWidth(item.women) - 80,
		   lineY,
		   this.mapPercentToWidth(item.women),
		   lineHeight - this.layout.pad);

		// Draw male rectangle.
		fill(this.maleColour);
		rect(this.layout.leftMargin + this.layout.plotWidth()/2 - this.layout.pad + 30,
		   lineY,
		   this.mapPercentToWidth(item.men),
		   lineHeight - this.layout.pad);
		
		
	};
   }
  
	this.drawCategoryLabels = function() {
		fill(0);
		noStroke();
		textAlign('left', 'top');
		text('Female',
			 this.layout.leftMargin,	
			 this.layout.topMargin - 20);
		textAlign('center', 'top');
		textAlign('right', 'top');
		text('Male',
			 this.layout.rightMargin,
			 this.layout.topMargin - 20);
	};

	this.mapPercentToWidth = function(percent) {
		return map(percent,
				   0,
				   35,
				   0,
				   (this.layout.plotWidth() - 80) /2);
	};
	
	this.drawXAxisTickLabels = function(min, max, layout, mapFunction, decimalPlaces) {
		// Map function must be passed with .bind(this).
		var range = max - min;
		var xTickStep = range / layout.numXTickLabels;

		fill(0);
		noStroke();
		textAlign('right', 'center');

		// Draw male axis
		var startDomain = layout.leftMargin + layout.plotWidth()/2 - layout.pad + 30 
		// Draw all axis tick labels and grid lines.
		for (i = 0; i <= layout.numXTickLabels; i++) {
			var value = min + (i * xTickStep);
			var x = mapFunction(value);

			// Add tick label.
			text(value.toFixed(decimalPlaces),
				 startDomain + x,
				 layout.bottomMargin + 40);

			if (layout.grid) {
			  // Add grid line.
			  stroke(200);
			  line(startDomain + x, layout.topMargin, startDomain + x, layout.bottomMargin + 20);
			}
		}
		
		line(startDomain, layout.bottomMargin + 10, startDomain + x, layout.bottomMargin + 10)

		// Draw female axis
		var startDomain = layout.leftMargin + layout.plotWidth()/2 - 80 
		// Draw all axis tick labels and grid lines.
		for (i = 0; i <= layout.numXTickLabels; i++) {
			var value = min + (i * xTickStep);
			var x = mapFunction(value);

			// Add tick label.
			if ((startDomain - x) >= layout.leftMargin) {
				text(value.toFixed(decimalPlaces),
					 startDomain - x,
					 layout.bottomMargin + 40);

				if (layout.grid) {
				  // Add grid line.
				  stroke(200);

				  line(startDomain - x, layout.topMargin, startDomain - x, layout.bottomMargin + 20);
				}
			}
		}
		
		line(startDomain, layout.bottomMargin + 10, layout.leftMargin, layout.bottomMargin + 10)

	};
	
	this.drawAxisLabels = function() {
		fill(0);
		noStroke();
		textAlign('left', 'bottom');
		text('Percent Female Suicides',
			 this.layout.leftMargin,	
			 height);
		textAlign('right', 'bottom');
		text('Percent Male Suicides',
			 this.layout.rightMargin,
			 height);
	};
	
	this.drawTitle = function() {
		fill(0);
		noStroke();
		textAlign('center', 'center');

		text("Suicides by Age and Gender in the Netherlands",
			 this.layout.leftMargin + this.layout.plotWidth()/2,
			 this.layout.pad*3);
	};


}

