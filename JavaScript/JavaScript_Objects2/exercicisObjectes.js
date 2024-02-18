// Functions
function fullName(){
    return this.firstName + " " + this.lastName;
}

// Based on the following Object, perform the exercises.

const product = {
    S124234G: {
    Description: "T-shirt",
    price: 45,
    colors: ["blue", "black", "white"],
    stock: {
        "M":{"blue":5,"black":10,"white":7},
        "L":{"blue":2,"black":5,"white":1},
        "XL":{"blue":4,"black":7,"white":0}
    }
    },
    P785745Y: {
    Description: "Pants",
    price: 84,
    colors: ["blue", "black"],
    stock: {
        "M":{"blue":5,"black":10},
        "L":{"blue":2,"black":5},
        "XL":{"blue":4,"black":7}
    }
    },
    A234578W: {
    Description: "Coat",
    price: 129,
    colors: ["blue", "green"],
    stock: {
        "M":{"blue":1,"green":0},
        "L":{"blue":7,"green":15},
        "XL":{"blue":4,"green":3}
    }
    }
};

// 1. Retrieve the following information:
// 1.1 In how many colors is the item S124234G available.
let colorsOfProduct = product.S124234G.colors.length;
console.log(colorsOfProduct);

// 1.2 The number of white T-shirts of size M from the item S124234G
let whiteM = product.S124234G.stock.M.white;
console.log(whiteM);

// 1.3 The sum of size L blue units of the three items.
let blueL = product.S124234G.stock.L.blue + product.A234578W.stock.L.blue + product.P785745Y.stock.L.blue;
console.log(blueL);

// 2. Create the method fullName() that returns the first name and last name of the client object.

const firstName = "Peter";
const lastName = "Garcia";
const client = {
    firstName: 'Ramon',
    lastName: 'Llull',
    birthYear: '1232',
    fullName: fullName,
};
console.log(client.fullName());

// 3. Given this object:
const cars = {
    brands: ["Maserati", "Ferrari", "BMW"],
    category: "Sport",
    message: function() {
        let result = [];
        this.brands.forEach(brand => {
            let sentence = brand + " is a " + this.category; 
            result.push(sentence);
        });
        return result.join('\n');
    }
}
console.log(cars.message());
// Create the code for the message method so it displays in the console:
// Maserati is a Sport
// Ferrari is a Sport
// BMW is a Sport

// 4. Repeat the previous exercise, this time using the arrow function (=>) to define the method
const cars2 = {
    brands: ["Maserati", "Ferrari", "BMW"],
    category: "Sport",
    message: () => {
        let result = [];
        // Note: 'this' keyword won't work as expected with arrow functions in this context.
        cars2.brands.forEach(brand => {
            let sentence = brand + " is a " + cars2.category; 
            result.push(sentence);
        });
        return result.join('\n');
    }
}
console.log(cars2.message());
