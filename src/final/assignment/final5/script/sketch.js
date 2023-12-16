// 사용자 조절 가능한 매개변수
let sizeSlider, speedSlider;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);

  // 슬라이더 초기화 및 설정
  sizeSlider = createSlider(0, 200, 100); // 크기 (size)
  speedSlider = createSlider(0, 300, 150); // 속도 (speed)

  // 슬라이더 및 제목 위치 설정
  let sliderX = 20;
  let sliderY = height - 80;
  sizeSlider.position(sliderX, sliderY);
  createP('Size (크기)').position(sliderX + 160, sliderY);

  speedSlider.position(sliderX, sliderY + 40);
  createP('Speed (속도)').position(sliderX + 160, sliderY + 40);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // 슬라이더 위치 다시 설정
  let sliderX = 20;
  let sliderY = height - 80;
  sizeSlider.position(sliderX, sliderY);
  speedSlider.position(sliderX, sliderY + 40);

  // 슬라이더 제목 위치 다시 설정
  select('p').position(sliderX + 160, sliderY);
  select('p', 1).position(sliderX + 160, sliderY + 40);
}

function draw() {
  background(30);

  rotateX(frameCount * 0.5);
  rotateY(frameCount * 0.5);

  // Adjust the noise parameters for a smoother animation
  var noiseFactor = 0.005;
  var noiseZ = frameCount * noiseFactor;

  // Point light for dynamic lighting effect
  pointLight(255, 255, 255, 0, 0, 200);

  noStroke();
  for (var i = 0; i < 50; i++) {
    var sizeValue = sizeSlider.value();
    var brightnessValue = map(sin(frameCount / 3), -1, 1, 100, 255);
    var r = brightnessValue;
    var g = map(i, 0, 50, 100, 200);
    var b = map(cos(frameCount), -1, 1, 150, 255);

    // Set a dynamic color for each cube based on noise
    fill(
      r + noise(frameCount * 0.05 + i) * 50,
      g + noise(frameCount * 0.05 + i) * 50,
      b + noise(frameCount * 0.05 + i) * 50,
      200
    );

    // Vary rotation speed and direction
    var rotationSpeed = sin(frameCount / 20 + i) * 5 * speedSlider.value();
    rotate(rotationSpeed);

    // Use size to control the size of each cube
    var cubeSize = sizeValue * 0.5;

    for (var j = 0; j < 360; j += 30) {
      var rad = i * 20;
      var x = rad * cos(j);
      var y = rad * sin(j);

      // Add a pulsating effect to the cubes with vertical oscillation
      var oscillation = sin(frameCount * 0.1 + i) * sizeValue;
      var z =
        oscillation * cos(frameCount * 0.1 + i) +
        sin(frameCount * 4 + i * 5 + noise(noiseZ)) * 60;

      push();
      translate(x, y, z);

      // Apply emissive material for a glowing effect
      emissiveMaterial(
        r + noise(frameCount * 0.05 + i) * 50,
        g + noise(frameCount * 0.05 + i) * 50,
        b + noise(frameCount * 0.05 + i) * 50
      );

      box(cubeSize);
      pop();
    }
  }
}
