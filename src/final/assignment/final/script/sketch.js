function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
function draw() {
  background(30);

  rotateX(60);

  noFill();
  stroke(255);
  for (var i = 0; i < 50; i++) {
    var r = map(sin(frameCount / 3), -1, 1, 100, 300);
    var g = map(i, 0, 50, 100, 200);
    var b = map(cos(frameCount), -1, 1, 200, 100);

    stroke(r, g, b);

    rotate(frameCount / 10);

    beginShape();
    for (var j = 0; j < 360; j += 60) {
      var rad = i * 6;
      var x = rad * cos(j);
      var y = rad * sin(j);
      var z = sin(frameCount * 2 + i * 5) * 50;

      vertex(x, y, z);
    }
    endShape(CLOSE);
  }
}
