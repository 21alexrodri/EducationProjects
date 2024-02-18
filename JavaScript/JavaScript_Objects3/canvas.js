/*

This class manages a canvas element for drawing images and applying filters. It encapsulates the canvas ID and context (ctx), providing methods to draw images, apply filters, and clear the canvas.

    constructor(canvasId): Initializes the canvas with the given ID.
    drawImageCanvas(image, x, y): Draws an image onto the canvas at the specified coordinates.
    applyFilterCanvas(imageData, x, y): Applies an image data filter at the specified coordinates.
    restartCanvas(): Clears the entire canvas to reset it.
    
*/
export class Canvas {
    #canvasId;
    #ctx;

    constructor(canvasId) {
        this.#canvasId = canvasId;
        this.#ctx = undefined;
        this.#getContextCanvas();
    }

    #getContextCanvas() {
        const canvas = document.getElementById(this.#canvasId);
        if (canvas) {
            this.#ctx = canvas.getContext("2d");
        } else {
            console.error("Canvas no encontrado con ID:", this.#canvasId);
        }
    }

    drawImageCanvas(image, x, y) {
        if (this.#ctx) {
            this.#ctx.drawImage(image, x, y);
        } else {
            console.error("Contexto no definido");
        }
    }

    applyFilterCanvas(imageData, x, y) {
        if (this.#ctx) {
            this.#ctx.putImageData(imageData, x, y);
        } else {
            console.error("Contexto no definido");
        }
    }

    restartCanvas() {
        if (this.#ctx) {
            this.#ctx.clearRect(0, 0, 1000, 750);
            const canvas = this.#ctx.canvas;
        } else {
            console.error("Contexto no definido");
        }
    }

    // Getters
    get canvasId() {
        return this.#canvasId;
    }

    get ctx() {
        return this.#ctx;
    }

    // Setters
    set canvasId(value) {
        this.#canvasId = value;
        this.#getContextCanvas();
    }
 
}