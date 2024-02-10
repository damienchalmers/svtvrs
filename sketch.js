let W = 16717;
let pageNumber;
let customFont; // Variable to hold the custom font

function preload() {
  // Load the custom font (replace 'your_font_file.ttf' with your actual font file)
  customFont = loadFont('Inalphabet-y112.ttf');
}

function setup() {
  createCanvas(300, 424);
  pixelDensity(2);
  //background(255);  // Set a white background
  
   // Create a background color with a subtle yellowing effect
  background(random(240, 255), random(220, 240), random(180, 200));

  const marginX = 10; // Left and right margin
  const marginY = 10; // Top and bottom margin
  const linesCount = Math.floor(random(20, 40)); // Random number of lines between 20 and 40

  strokeWeight(0.2);
  noFill();

  const totalHeight = height - 2 * marginY;
  const lineSpacing = totalHeight / linesCount; // Adjusted spacing

  for (let line = 0; line < linesCount; line++) {
    let I = 0;
    noiseDetail(80, 0.2);
    noiseSeed(random(1000)); // Change the noise seed for each line randomly

    while (I < W) {
      let i = 0.0123456789 * I;
      stroke(0, 0, 0, 1000 * noise(i / 3));

      let x = (I % W / 14 + noise(i + W) * 12) * 0.8 + marginX;
      let y = (I / W * 60 + 60 - sq(noise(i) * 8 - 6) + 29 * noise(i / 5) * 1.5) * 0.4 + marginY;
      y += line * lineSpacing; // Adjust y for each line 

      // Ensure that the last line fits within the canvas
      if (line === linesCount - 1) {
        y = height - marginY;
      }

      if (x >= marginX && x <= width - marginX && y >= marginY && y <= height - marginY) {
        point(x, y);
      }

      I++;
    }
  }

  // Add Roman numeral page number with custom font
  textSize(5);
  textFont(customFont); // Set the custom font
  fill(0, 0, 0); // Set the text color/opacity
  pageNumber = generateRomanNumeral(Math.floor(random(1, 1000))); // Generate a random page number between 1 and 100 in Roman numerals
  text(pageNumber, width / 2, height - 5);
}

function generateRomanNumeral(number) {
  const romanNumerals = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1
  };

  let result = '';

  for (let key in romanNumerals) {
    while (number >= romanNumerals[key]) {
      result += key;
      number -= romanNumerals[key];
    }
  }

  return result;
}

//function mousePressed() {
//  saveFrames('écrisuture', 'png', 1, 1);
//}
