/*
p5 Sketch
*/
import TWEEN from '@tweenjs/tween.js';
import { CLASSES } from './constants';
import startImage from './img/empty.png';

const importAllImages = r => {
  return r.keys().map(r);
}

const preDrawnImages = importAllImages(require.context('./img/items/', false, /\.(png|jpe?g|svg)$/));
window.preDrawnImages = preDrawnImages;

let canvas;
let startImg;
let width = 0;
let height = 0;
let status;
let isComparing;
let brushSize;
let menuWidth;
let isMenuActive;
let objects;
let preloadObjects = [];
let updateMakeStatus;
let shouldMakeNewImage = false;
let isDraggingAnObject;
let clearSketch;
<<<<<<< HEAD
let mousePressed = false;
=======
let clearObjects;
>>>>>>> 4ca65623b9e964e0ce2b8ebc331ab1f742e0af42

let currentColor;
let currentId;

const sketch = p => {

  p.myCustomRedrawAccordingToNewPropsHandler = props => {
    width = props.width;
    height = props.height;
    status = props.status;
    isComparing = props.isComparing;
    brushSize = props.brushSize;
    menuWidth = props.menuWidth;
    isMenuActive = props.isMenuActive;
    objects = props.objects;
    currentColor = props.currentColor;
    currentId = props.currentId;
    shouldMakeNewImage = props.shouldMakeNewImage;
    updateMakeStatus = props.updateMakeStatus;
    isDraggingAnObject = props.isDraggingAnObject;
    clearObjects = props.clearObjects;
  };

  p.preload = () => {
    preDrawnImages.forEach(name => {
      preloadObjects.push(p.loadImage(name))
    });
    startImg = p.loadImage(startImage)
  };

  p.setup = () => {
    canvas = p.createCanvas(width, height);
    p.noStroke();
    p.pixelDensity(1);
    p.smooth();
    p.background(0, 0, 0);
    p.copy(startImg, 0, 0, width, height, 0, 0, width, height);
  };

  p.draw = () => {
    TWEEN.update();

    p.fill(currentColor[0], currentColor[1], currentColor[2]);
    p.noStroke();
    // User draw
    if (mousePressed && !isComparing && !isDraggingAnObject) {
      p.ellipse(p.mouseX, p.mouseY, parseInt(brushSize));
    }

    // When shouldMakeNewImage is true, copy all the <img> to the canvas
    if (shouldMakeNewImage) {
      objects.forEach(object => {
        p.image(preloadObjects[object.key], object.x, object.y, object.width, object.height);
      });
      updateMakeStatus(); 
    }
  }

  p.mousePressed = (e) => {
    if (e.target !== canvas.elt) return;
    mousePressed = true;
  }

  p.mouseReleased = () => {
    mousePressed = false;
  }

  clearSketch = () => {
    p.clear();
    p.copy(startImg, 0, 0, width, height, 0, 0, width, height);
    clearObjects()
  }
};

export {
  sketch,
  clearSketch,
  preDrawnImages
}