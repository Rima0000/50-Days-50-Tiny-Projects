const numColorsInput = document.querySelector('#num-colors-input');
const colorFormatInput = document.querySelector('#color-format-input');
const colorSchemeInput = document.querySelector('#color-scheme-input');
const generateButton = document.querySelector('#generate-btn');
const colorPalette = document.querySelector('#color-palette');

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const getMonochromaticColors = (baseColor) => {
  const lightnessValues = [10, 30, 50, 70, 90];
  return lightnessValues.map(lightness => {
    return `hsl(${baseColor.hue}, ${baseColor.saturation}%, ${lightness}%)`;
  });
};

const getAnalogousColors = (baseColor) => {
  const hueValues = [(baseColor.hue - 30 + 360) % 360, baseColor.hue, (baseColor.hue + 30) % 360];
  return hueValues.map(hue => {
    return `hsl(${hue}, ${baseColor.saturation}%, ${baseColor.lightness}%)`;
  });
};

const getComplementaryColors = (baseColor) => {
  const complementaryHue = (baseColor.hue + 180) % 360;
  return [`hsl(${baseColor.hue}, ${baseColor.saturation}%, ${baseColor.lightness}%)`, 
          `hsl(${complementaryHue}, ${baseColor.saturation}%, ${baseColor.lightness}%)`];
};

const getSplitComplementaryColors = (baseColor) => {
  const splitComplementaryHues = [(baseColor.hue - 150 + 360) % 360, baseColor.hue, (baseColor.hue + 150) % 360];
  return splitComplementaryHues.map(hue => {
    return `hsl(${hue}, ${baseColor.saturation}%, ${baseColor.lightness}%)`;
  });
};

const getTriadicColors = (baseColor) => {
  const triadicHues = [(baseColor.hue - 120 + 360) % 360, baseColor.hue, (baseColor.hue + 120) % 360];
  return triadicHues.map(hue => {
    return `hsl(${hue}, ${baseColor.saturation}%, ${baseColor.lightness}%)`;
  });
};

const getTetradicColors = (baseColor) => {
  const tetradicHues = [(baseColor.hue - 60 + 360) % 360, baseColor.hue, (baseColor.hue + 60) % 360, (baseColor.hue + 180) % 360];
  return tetradicHues.map(hue => {
    return `hsl(${hue}, ${baseColor.saturation}%, ${baseColor.lightness}%)`;
  });
};

const generateColorPalette = () => {
  const numColors = numColorsInput.value;
  const colorFormat = colorFormatInput.value;
  const colorScheme = colorSchemeInput.value;
  let baseColor = null;
  let colors = [];

  switch (colorScheme) {
    case 'random':
      for (let i = 0; i < numColors; i++) {
        const color = getRandomColor();
        colors.push(color);
      }
      break;
    case 'monochromatic':
      baseColor = {
        hue: Math.floor(Math.random() * 361),
        saturation: Math.floor(Math.random() * 101),
        lightness: Math.floor(Math.random() * 101)
      };
      colors = getMonochromaticColors(baseColor);
      break;
    case 'analogous':
      baseColor = {
        hue: Math.floor(Math.random() * 361),
        saturation: Math.floor(Math.random() * 101),
        lightness: Math.floor(Math.random() * 101)
      };
      colors = getAnalogousColors(baseColor);
      break;
    case 'complementary':
      baseColor = {
        hue: Math.floor(Math.random() * 361),
        saturation: Math.floor(Math.random() * 101),
        lightness: Math.floor(Math.random() * 101)
      };
      colors = getComplementaryColors(baseColor);
      break;
    case 'split-complementary':
      baseColor = {
        hue: Math.floor(Math.random() * 361),
        saturation: Math.floor(Math.random() * 101),
        lightness: Math.floor(Math.random() * 101)
      };
      colors = getSplitComplementaryColors(baseColor);
      break;
    case 'triadic':
      baseColor = {
        hue: Math.floor(Math.random() * 361),
        saturation: Math.floor(Math.random() * 101),
        lightness: Math.floor(Math.random() * 101)
      };
      colors = getTriadicColors(baseColor);
      break;
    case 'tetradic':
      baseColor = {
        hue: Math.floor(Math.random() * 361),
        saturation: Math.floor(Math.random() * 101),
        lightness: Math.floor(Math.random() * 101)
      };
      colors = getTetradicColors(baseColor);
      break;
  }
  
  colorPalette.innerHTML = '';
  colors.forEach((color, index) => {
  const colorBox = document.createElement('div');
  colorBox.classList.add('color-box');
  colorBox.style.backgroundColor = color;
  colorBox.addEventListener('click', () => {
    navigator.clipboard.writeText(colors[index]).then(() => {
      console.log('Copied color value to clipboard:', colors[index]);
    });
  });

  const colorValue = document.createElement('div');
  colorValue.classList.add('color-value');
  colorValue.textContent = colors[index];
  colorValue.style.color = isLightColor(color) ? '#000' : '#fff';
  colorBox.appendChild(colorValue);

  colorPalette.appendChild(colorBox);
});


  console.log(colors);
};

generateButton.addEventListener('click', generateColorPalette);

const isLightColor = (color) => {
  const rgbValues = color
    .substring(4, color.length - 1)
    .replace(/ /g, '')
    .split(',')
    .map(Number);

  const [r, g, b] = rgbValues;
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

  return luminance > 186; // A threshold value between 0 and 255
};
