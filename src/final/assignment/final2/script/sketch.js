// 사용자 조절 가능한 매개변수
let amplitudeSlider, speedSlider, colorSlider;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);

  // 슬라이더 초기화 및 설정
  amplitudeSlider = createSlider(0, 200, 100); // 진폭 (amplitude)
  speedSlider = createSlider(0, 300, 150); // 속도 (speed)
  colorSlider = createSlider(0, 255, 150); // 기본 색상 (brightness)

  // 슬라이더 및 제목 위치 설정
  let sliderX = 20;
  let sliderY = height - 120;
  amplitudeSlider.position(sliderX, sliderY);
  createP('Amplitude (진폭)').position(sliderX + 160, sliderY);

  speedSlider.position(sliderX, sliderY + 40);
  createP('Speed (속도)').position(sliderX + 160, sliderY + 40);

  colorSlider.position(sliderX, sliderY + 80);
  createP('Base Color (기본 색상)').position(sliderX + 160, sliderY + 80);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // 슬라이더 위치 다시 설정
  let sliderX = 20;
  let sliderY = height - 120;
  amplitudeSlider.position(sliderX, sliderY);
  speedSlider.position(sliderX, sliderY + 40);
  colorSlider.position(sliderX, sliderY + 80);

  // 슬라이더 제목 위치 다시 설정
  select('p').position(sliderX + 160, sliderY);
  select('p', 1).position(sliderX + 160, sliderY + 40);
  select('p', 2).position(sliderX + 160, sliderY + 80);
}

function draw() {
  background(30);

  rotateX(60);

  // Adjust the noise parameters for a smoother animation
  var noiseFactor = 0.005;
  var noiseZ = frameCount * noiseFactor;

  noStroke();
  for (var i = 0; i < 50; i++) {
    var brightnessValue = colorSlider.value();
    var r = map(sin(frameCount / 3), -1, 1, 100, 300);
    var g = map(i, 0, 50, 100, 400);
    var b = map(cos(frameCount), -1, 1, 200, 100);

    fill(r, g, b, 150); // Add alpha for a translucent effect

    // Vary rotation speed and direction
    var rotationSpeed = sin(frameCount / 20 + i) * 5 * speedSlider.value();
    rotate(rotationSpeed);

    for (var j = 0; j < 360; j += 30) {
      var rad = i * 20;
      var x = rad * cos(j);
      var y = rad * sin(j);

      // Add a pulsating effect to the spheres with vertical oscillation
      var oscillation = sin(frameCount * 0.1 + i) * amplitudeSlider.value();
      var z =
        oscillation * cos(frameCount * 0.1 + i) +
        sin(frameCount * 4 + i * 5 + noise(noiseZ)) * 60;

      push();
      translate(x, y, z);
      fill(r, g, b, 150); // Use the color variables for each sphere
      sphere(8); // Draw spheres instead of vertices
      pop();
    }
  }
}
