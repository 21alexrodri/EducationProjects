/*
A collection of classes designed to apply different filters to image data:

    Filtre: An abstract base class representing a filter. It throws errors if instantiated directly or if the derived class does not implement the funcio method.
    FiltreBright: Adjusts the brightness of an image.
    FiltreBlackWhite: Converts an image to grayscale.
    FiltreNegative: Inverts the colors of an image to create a negative effect.
    FiltreMirror: Creates a mirror effect by flipping the image horizontally.
    FiltreSepia: Applies a sepia tone to the image.
    FiltreTemperature: Adjusts the color temperature of the image.
*/


// Clase base Filtre
export class Filtre {
    constructor() {
        if (new.target === Filtre) {
            throw new Error("Clase abstracta 'Filtre' no puede ser instanciada directamente.");
        }
    }

    funcio(ctx, imageData, ...params) {
        throw new Error("Método 'funcio' debe ser implementado por clases derivadas.");
    }
}

// Clase FiltreBright
export class FiltreBright extends Filtre {
    funcio(imageData, brightnessValue) {
        let data = imageData.data;
        brightnessValue = brightnessValue * 2;
        for (let i = 0; i < data.length; i += 4) {
            data[i] = Math.min(255, data[i] * brightnessValue);
            data[i + 1] = Math.min(255, data[i + 1] * brightnessValue);
            data[i + 2] = Math.min(255, data[i + 2] * brightnessValue);
        }
        
    }
}

// Clase FiltreBlackWhite
export class FiltreBlackWhite extends Filtre {
    funcio(imageData) {
        let data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
            let luminosidad = parseInt((data[i] + data[i + 1] + data[i + 2]) / 3);
            data[i] = data[i + 1] = data[i + 2] = luminosidad;
        }
        
    }
}

// Clase FiltreNegative
export class FiltreNegative extends Filtre {
    funcio(imageData) {
        let data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
            data[i] = 255 - data[i];
            data[i + 1] = 255 - data[i + 1];
            data[i + 2] = 255 - data[i + 2];
        }
      
    }
}

// Clase FiltreMirror
export class FiltreMirror extends Filtre {
    funcio(imageData) {
        let width = imageData.width;
        let height = imageData.height;
        let data = imageData.data;
        let buffer = new Uint8ClampedArray(data);
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let index = (y * width + x) * 4;
                let mirrorIndex = (y * width + (width - x - 1)) * 4;
                data[index] = buffer[mirrorIndex];
                data[index + 1] = buffer[mirrorIndex + 1];
                data[index + 2] = buffer[mirrorIndex + 2];
            }
        }
        
    }
}

// Clase FiltreSepia
export class FiltreSepia extends Filtre {
    funcio(imageData) {
        let data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
            let luminosidad = 0.3 * data[i] + 0.59 * data[i + 1] + 0.11 * data[i + 2];
            data[i] = Math.min(luminosidad + 40, 255);
            data[i + 1] = Math.min(luminosidad + 15, 255);
            data[i + 2] = luminosidad;
        }
       
    }
}

// Clase FiltreTemperature
export class FiltreTemperature extends Filtre {
    funcio(imageData, temperatureValue) {
        let data = imageData.data;
        temperatureValue = temperatureValue * 2;
        for (let i = 0; i < data.length; i += 4) {
            data[i] = Math.min(255, data[i] * temperatureValue);
        }
        
    }
}
