let multiCircles = [];
let multiCircleNum = 20;// Number of multiCircles
let innerMultiCircleNum = 10; // Number of inner concentric circles
let layerNum = 5; // Number of outer layers
let dotSize = 10; // Size of the dots
let dotDensity = 30; // Density of the dots
let myImage; // 声明一个变量来存储图片
function preload() {
  myImage = loadImage('2.png'); // 加载图片，请替换为图片的实际路径
}


class MultiCircle {
// Constructor to initialize the properties of multiCircle
constructor(x, y, maxRadius, innerMultiCircleNum, layerNum) {
this.x = x;
this.y = y;
this.maxRadius = maxRadius;
this.innerMultiCircleNum = innerMultiCircleNum;
this.layerNum = layerNum;
this.innerRadius = maxRadius / 2;
this.dotRadius = 5;
// Allowed colors for inner concentric circles
this.innerAllowedColors = [
color(87, 98, 100),
color(180, 172, 153),
color(128, 128, 98),
color(175, 146, 116),
color(145, 73, 63)
];
// Allowed colors for outer dots
this.outerAllowedColors = [
color(221, 211, 143),
color(198, 177, 107),
color(124, 167, 195),
color(141, 164, 189),
color(228, 122, 77),
];
// Generate random colors for inner circles and outer dots
this.innerColors = this.generateRandomColors(innerMultiCircleNum, this.innerAllowedColors);
this.outerColor = this.generateRandomColors(1, this.outerAllowedColors)[0];

}
update() {
let timeFactor = frameCount * 0.002; // 根据需要调整时间因子
this.x += (noise(timeFactor) - 0.5) * 5; // 使用 Perlin 噪声更新 x 位置
this.y += (noise(timeFactor + 100) - 0.5) * 5; // 使用 Perlin 噪声更新 y 位置
this.maxRadius = 100 + (noise(timeFactor + 200) - 0.5) * 5; // 更新半径大小
// this.x += random(0, 0.1) * noise(timeFactor) * 100; // 根据Perlin噪声更新x位置
// this.y += random(-0.2, 0.2) * noise(timeFactor + 100) * 100; // 根据Perlin噪声更新y位置
// this.maxRadius = random(100, 200) * noise(timeFactor + 200); // 更新半径大小
// this.innerColors = this.generateRandomColors(this.innerMultiCircleNum, this.innerAllowedColors);
// this.outerColor = this.generateRandomColors(1, this.outerAllowedColors)[0];
}
  // Generate an array of random colors from the allowed colors
generateRandomColors(num, allowedColors = []) {
let colors = [];
for (let i = 0; i < num; i++) {
if (allowedColors.length > 0) {
colors.push(allowedColors[int(random(allowedColors.length))]);
} else {
colors.push(color(random(255), random(255), random(255)));
}
}
return colors;
}
  // Display the multiCircle
display() {
// Calculate the outermost radius
let outerRadius = this.innerRadius + this.layerNum * this.dotRadius * 2;
    // Draw the background circle with no stroke
fill(231, 231, 224);
noStroke();
ellipse(this.x, this.y, outerRadius * 2);
    // Draw inner concentric circles
noFill();
for (let i = this.innerColors.length - 1; i >= 0; i--) {
stroke(this.innerColors[i]);
strokeWeight(5);
ellipse(this.x, this.y, this.innerRadius * (i + 1) / this.innerColors.length * 2);
}

    // Draw outer circle dots
fill(this.outerColor);
noStroke();
for (let i = 0; i < 360; i += 10) {
let angle = radians(i);
for (let j = 0; j < this.layerNum; j++) {
let radius = this.innerRadius + j * this.dotRadius * 2;
let x = this.x + cos(angle) * radius;
let y = this.y + sin(angle) * radius;
ellipse(x, y, this.dotRadius * 2);
let imageScale = outerRadius / 2200; // 根据需要调整比例因子
image(myImage, this.x-10 , this.y -10, outerRadius * 2 * imageScale, outerRadius * 2 * imageScale);


}
}
}
}
function setup() {
createCanvas(windowWidth, windowHeight);
  // Generate multiCircles at random positions
for (let i = 0; i < multiCircleNum; i++) {
let x = random(width);
let y = random(height);
let maxRadius = random(100, 200);
multiCircles.push(new MultiCircle(x, y, maxRadius, innerMultiCircleNum, layerNum));
}
}
function initializeMultiCircles() {
  for (let i = 0; i < multiCircleNum; i++) {
    let x = random(width);
    let y = random(height);
    let maxRadius = random(100, 200);
    multiCircles.push(new MultiCircle(x, y, maxRadius, innerMultiCircleNum, layerNum));
  }
}

function draw() {
background(255);

drawPolkaDotBackground();

if (windowWidth !== width || windowHeight !== height) {
  windowResized(); // 重新初始化multiCircles
}


// Display all multiCircles

for (let mc of multiCircles) {
mc.update();
mc.display();


}

}
// function drawPolkaDotBackground() {
// // Draw polka dot background
// fill(193, 110, 74);
// noStroke();
// for (let y = 0; y < height; y += dotDensity) {
// for (let x = 0; x < width; x += dotDensity) {
// ellipse(x, y, dotSize);
// }
// }
// }

function drawPolkaDotBackground() {
  fill(193, 110, 74);
  noStroke();
  let waveOffset = frameCount * 0.02; // 根据需要调整波浪的速度
  for (let y = 0; y < height; y += dotDensity) {
    for (let x = 0; x < width; x += dotDensity) {
      // 使用正弦函数来调整点的垂直位置
      let waveHeight = sin(x * 0.02 + waveOffset) * 10; // 振幅和频率可调
      ellipse(x, y + waveHeight, dotSize);
      ellipse(x, y + waveHeight, dotSize + waveHeight / 2);

      let colorBrightness = map(waveHeight, -10, 10, 0, 120); // 根据波形调整亮度
      fill(176, 86, colorBrightness);
      // 176, 86, 54
    }
  }
}

function windowResized() {
resizeCanvas(windowWidth, windowHeight);
// initializeMultiCircles();
}

function mouseClicked() {
  if (mouseX < width && mouseY < height) {
    // 创建一个新的 multiCircle
    let x = mouseX;
    let y = mouseY;
    let maxRadius = random(100, 200);
    multiCircles.push(new MultiCircle(x, y, maxRadius, innerMultiCircleNum, layerNum));
  } else {
    // 删除最后一个 multiCircle
    multiCircles.pop();
  }
}