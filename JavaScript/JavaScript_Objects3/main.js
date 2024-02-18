/*
This file integrates the previously defined classes to create a functional image manipulation tool. It includes functions for loading images onto a canvas, 
applying various filters, and saving the edited image. The script also sets up interactive elements for user input, 
such as buttons and sliders for filter adjustments, and event listeners for real-time image processing.

    draw(objecte_img, x, y): Draws the selected image on the canvas and prepares it for editing.
    bright(brightnessValue), blackWhite(), negative(), mirror(), sepia(), temperature(temperatureValue): Functions to apply specific filters based on user 
    interaction.
    saveImage(): Saves the edited image to the user's device.
    del(): Clears the canvas for a new image to be loaded.

This modular approach not only organizes the code into manageable segments but also enhances reusability and scalability. Each class and function is 
designed to perform a specific task, facilitating easy updates and maintenance.
*/
import * as Clases from "./clases.js";
import * as ClasesCanvas from "./canvas.js";
import * as Filtres from "./filtre.js";
let resultatFinal = null;
let imagenActual = null;
let comparadortemp = 0;
let comparadorbright = 0;
function draw(objecte_img, x, y) {
    imagenActual = objecte_img;
    miCanvas.originalWidth = objecte_img.width * 2 + 40;
    miCanvas.originalHeight = objecte_img.height + 30;
    miCanvas.ctx.canvas.setAttribute("width", miCanvas.originalWidth);
    miCanvas.ctx.canvas.setAttribute("height", miCanvas.originalHeight);
    miCanvas.ctx.clearRect(0, 0, miCanvas.originalWidth, miCanvas.originalHeight);
    miCanvas.drawImageCanvas(objecte_img, x + 10, y + 10);
    miCanvas.drawImageCanvas(imagenActual, x + imagenActual.width + 20, y + 10);
}
function bright(brightnessValue) {
    draw(imagenActual, 0, 0);
    var x = imagenActual.width + 20;
    var y = 10;
    var imageData = miCanvas.ctx.getImageData(x, y, imagenActual.width, imagenActual.height);
    let filtroBrillo = new Filtres.FiltreBright();
    filtroBrillo.funcio(imageData, brightnessValue);
    miCanvas.applyFilterCanvas(imageData, x, y);
    resultatFinal = miCanvas.ctx.canvas.toDataURL();
}
function saveImage() {
    if (resultatFinal) {
        const a = document.createElement('a');
        a.href = resultatFinal;
        a.download = 'imagen-ajustada.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    } else {
        console.log('No hay imagen para guardar');
    }
}
function brightYES() {
    const sliderValue = document.getElementById('bar_bright').value;
    const brightnessValue = sliderValue / 100;
    bright(brightnessValue);
}
function tempYES() {
    const sliderValue = document.getElementById('bar_temp').value;
    const temperatureValue = sliderValue / 100;
    temperature(temperatureValue);
}
function openRange() {
    if(comparadorbright == 0){
        elementbar_brightness.printElement(buttonBox).addListener("change", brightYES);
        comparadorbright = 1;
    }
   else if(comparadorbright == 1){
        elementbar_brightness.deleteElement();
        comparadorbright = 0;
   }
   if(comparadortemp == 1){
    elementbar_temperatura.deleteElement();
    comparadortemp = 0;
   }
}
function openRange2() {
    if(comparadortemp == 0){
        elementbar_temperatura.printElement(buttonBox).addListener("change", tempYES);
        comparadortemp = 1;
    }
    else if(comparadortemp == 1){
        elementbar_temperatura.deleteElement();
        comparadortemp = 0;
    }
    if(comparadorbright == 1){
        elementbar_brightness.deleteElement();
        comparadorbright = 0;
       }
}
function blackWhite() {
    draw(imagenActual, 0, 0);
    var x = imagenActual.width + 20;
    var y = 10;
    var imageData = miCanvas.ctx.getImageData(x, y, imagenActual.width, imagenActual.height);
    let filtroBlackWhite = new Filtres.FiltreBlackWhite();
    filtroBlackWhite.funcio(imageData);
    miCanvas.applyFilterCanvas(imageData, x, y);
    resultatFinal = miCanvas.ctx.canvas.toDataURL();
}
function negative() {
    draw(imagenActual, 0, 0);
    var x = imagenActual.width + 20;
    var y = 10;
    var imageData = miCanvas.ctx.getImageData(x, y, imagenActual.width, imagenActual.height);
    let filtroNegativo = new Filtres.FiltreNegative();
    filtroNegativo.funcio(imageData);
    miCanvas.applyFilterCanvas(imageData, x, y);
    resultatFinal = miCanvas.ctx.canvas.toDataURL();
}
function mirror() {
    draw(imagenActual, 0, 0);
    var x = imagenActual.width + 20;
    var y = 10;
    var imageData = miCanvas.ctx.getImageData(x, y, imagenActual.width, imagenActual.height);
    let filtroEspejo = new Filtres.FiltreMirror();
    filtroEspejo.funcio(imageData);
    miCanvas.applyFilterCanvas(imageData, x, y);
    resultatFinal = miCanvas.ctx.canvas.toDataURL();
}
function del() {
    if (miCanvas.ctx) {
        miCanvas.ctx.clearRect(0, 0, miCanvas.ctx.canvas.width, miCanvas.ctx.canvas.height);
        miCanvas.ctx.canvas.width = 1000;
        miCanvas.ctx.canvas.height = 750;
        imagenActual = null;
        resultatFinal = null;
    } else {
        console.error("Contexto de canvas no definido");
    }
}
function sepia() {
    draw(imagenActual, 0, 0);
    var x = imagenActual.width + 20;
    var y = 10;
    var imageData = miCanvas.ctx.getImageData(x, y, imagenActual.width, imagenActual.height);
    let filtroSepia = new Filtres.FiltreSepia();
    filtroSepia.funcio(imageData);
    miCanvas.applyFilterCanvas(imageData, x, y);
    resultatFinal = miCanvas.ctx.canvas.toDataURL();
}
function temperature(brightnessValue) {
    draw(imagenActual, 0, 0);
    var x = imagenActual.width + 20;
    var y = 10;
    var imageData = miCanvas.ctx.getImageData(x, y, imagenActual.width, imagenActual.height);
    let filtroTemperatura = new Filtres.FiltreTemperature();
    filtroTemperatura.funcio(imageData, brightnessValue);
    miCanvas.applyFilterCanvas(imageData, x, y);
    resultatFinal = miCanvas.ctx.canvas.toDataURL();
}
//Contenidors
const elementcontent = new Clases.DomElement("div", { id: "content", class: "content" }).createElement().printElement(document.body);
const elementbuttonContent = new Clases.DomElement("div", { id: "buttonContent", class: "buttonContent" }).createElement();
const elementimgContent = new Clases.DomElement("div", { id: "imgContent", class: "imgContent" }).createElement();
//Botons
const elementbuttonBrightness = new Clases.DomElement('input', { type: 'button', id: 'bright' }).createElement().addListener("click", openRange);
const elementbutton_BW = new Clases.DomElement('input', { type: 'button', id: 'black_white' }).createElement().addListener("click", blackWhite);
const elementbutton_neg = new Clases.DomElement('input', { type: 'button', id: 'negative' }).createElement().addListener("click", negative);
const elementbutton_mirror = new Clases.DomElement('input', { type: 'button', id: 'mirror' }).createElement().addListener("click", mirror);
const elementbutton_del = new Clases.DomElement('input', { type: 'button', id: 'del' }).createElement().addListener("click", del);
const elementbutton_save = new Clases.DomElement('input', { type: 'button', id: 'save' }).createElement().addListener("click", saveImage);
const elementbar_brightness = new Clases.DomElement('input', { type: 'range', id: 'bar_bright', value: '50', min: '1', max: '100' }).createElement();
const elementbar_temperatura = new Clases.DomElement('input', { type: 'range', id: 'bar_temp', value: '50', min: '1', max: '100' }).createElement();
const elementbutton_sepia = new Clases.DomElement('input', { type: 'button', id: 'sepia' }).createElement().addListener("click", sepia);
const elementbutton_temperature = new Clases.DomElement('input', { type: 'button', id: 'temperature' }).createElement().addListener("click", openRange2);;
//Canvas
const elementCanva = new Clases.DomElement('canvas', { id: 'myCanvas', width: '200px', height: '150px', style: "background-color:green" }).createElement();
//Fotos
const elementImg1 = new Clases.DomElement('img', { id: 'foto1', src: 'img/imagen1.jpg', height: '70px', width: 'auto' }).createElement();
const elementImg2 = new Clases.DomElement('img', { id: 'foto2', src: 'img/imagen2.jpg', height: '70px', width: 'auto' }).createElement();
const elementImg3 = new Clases.DomElement('img', { id: 'foto3', src: 'img/imagen3.jpg', height: '70px', width: 'auto' }).createElement();
const elementImg4 = new Clases.DomElement('img', { id: 'foto4', src: 'img/imagen4.jpg', height: '70px', width: 'auto' }).createElement();
const elementImg5 = new Clases.DomElement('img', { id: 'foto5', src: 'img/imagn5.jpg', height: '70px', width: 'auto' }).createElement();

let content = document.getElementById("content");
elementbuttonContent.printElement(content);
let buttonBox = document.getElementById("buttonContent");
elementbuttonBrightness.printElement(buttonBox);
elementbutton_BW.printElement(buttonBox);
elementbutton_neg.printElement(buttonBox);
elementbutton_mirror.printElement(buttonBox);
elementbutton_sepia.printElement(buttonBox);
elementbutton_temperature.printElement(buttonBox)
elementbutton_del.printElement(buttonBox);
elementbutton_save.printElement(buttonBox);
elementCanva.printElement(content);
elementimgContent.printElement(content);
let imgBox = document.getElementById("imgContent");
elementImg1.printElement(imgBox);
elementImg2.printElement(imgBox);
elementImg3.printElement(imgBox);
elementImg4.printElement(imgBox);
elementImg5.printElement(imgBox);
let miCanvas = new ClasesCanvas.Canvas("myCanvas");
console.log(miCanvas);
let imagenes = document.querySelectorAll("img");
imagenes.forEach(imagen => {
    document.getElementById(imagen.id).onclick = function () {
        let imagen_a_canvas = new Image();
        imagen_a_canvas.src = imagen.src;
        draw(imagen_a_canvas, 0, 0);
    };
});

