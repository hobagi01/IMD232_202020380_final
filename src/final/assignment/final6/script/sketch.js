// 사용자 조절 가능한 매개변수
let sizeSlider, speedSlider;
let song, fft;

function preload() {
  // 음악 파일 로드
  song = loadSound('your_music_file.mp3');
}

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

  // FFT 객체 초기화
  fft = new p5.FFT();
  fft.setInput(song);

  // 음악 재생
  song.play();
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

  // FFT 주파수 분석
  let spectrum = fft.analyze();

  noStroke();
  for (let i = 0; i < spectrum.length; i++) {
    let sizeValue = map(spectrum[i], 0, 255, 0, 200);
    let brightnessValue = map(sin(frameCount / 3), -1, 1, 100, 255);
    let r = brightnessValue;
    let g = map(i, 0, spectrum.length, 100, 200);
    let b = map(cos(frameCount), -1, 1, 150, 255);

    // Set a dynamic color for each cube based on noise
    fill(
      r + noise(frameCount * 0.05 + i) * 50,
      g + noise(frameCount * 0.05 + i) * 50,
      b + noise(frameCount * 0.05 + i) * 50,
      200
    );

    // Vary rotation speed and direction
    let rotationSpeed = sin(frameCount / 20 + i) * 5 * speedSlider.value();
    rotate(rotationSpeed);

    // Use size to control the size of each cube
    let cubeSize = sizeValue * 0.5;

    for (let j = 0; j < 360; j += 30) {
      let rad = i * 20;
      let x = rad * cos(j);
      let y = rad * sin(j);

      // Add a pulsating effect to the cubes with vertical oscillation
      let oscillation = sin(frameCount * 0.1 + i) * sizeValue;
      let z =
        oscillation * cos(frameCount * 0.1 + i) +
        sin(frameCount * 4 + i * 5 + noise(i)) * 60;

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
