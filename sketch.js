
// Global variable to store the gallery object. The gallery object is
// a container for all the visualisations.
var gallery;
const canvasWidth = 1024;
const canvasHeight = 576;

function setup() {
  // Create a canvas to fill the content div from index.html.
  canvasContainer = select('#app');
  var c = createCanvas(canvasWidth*1.1, canvasHeight*1.1);
  c.parent('app');

  noLoop();

  // Create a new gallery object.
  gallery = new Gallery();

  // Add the visualisation objects here.
  gallery.addVisual(new Suicide());
  gallery.addVisual(new SuicideByAgeGender())
}

function draw() {
  background(240);
  fill(50);
  textAlign(CENTER, CENTER);
  textSize(20);
  text("Please select visual on the left!", canvasWidth*1.1/2, canvasHeight*1.1/2);
  
  if (gallery.selectedVisual != null) {
    background(255);
    gallery.selectedVisual.draw();
  }
}
