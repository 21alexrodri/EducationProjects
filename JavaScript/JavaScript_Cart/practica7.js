
// Funcions (Functions)

// Funció per carregar el carreto (Function to load the cart)
function carregarCarretoDesdelLocalStorage() {
  const carretoGuardat = localStorage.getItem("carreto");
  if (carretoGuardat) {
    const carreto = JSON.parse(carretoGuardat);

    carreto.forEach((item) => {
      const codi = item.codi;
      const quantitat = item.quantitat;

      
      const fila = Array.from(document.querySelectorAll('tbody tr')).find(tr => tr.querySelector('td:first-child').textContent === codi);

      if (fila) {
        
        const inputQuantitat = fila.querySelector("td:nth-child(4) input");
        inputQuantitat.value = quantitat;

        
        const preu = parseFloat(fila.querySelector("td:nth-child(5)").textContent);
        const importCelda = fila.querySelector("td:nth-child(6)");
        const importTotalCelda = quantitat * preu;
        importCelda.textContent = importTotalCelda.toFixed(2);
      } else {
        
        const index = carreto.findIndex(item => item.codi === codi);
        if (index !== -1) {
          carreto.splice(index, 1);
          localStorage.setItem('carreto', JSON.stringify(carreto));
        }
      }
    });

    calcularImportTotal();
  }
}

// Funció per desar el carreto (Function to save the cart)
function desarCarretoAlLocalStorage() {
  const carreto = Array.from(document.querySelectorAll('tbody tr')).map(tr => {
    const codi = tr.querySelector('td:first-child').textContent;
    const quantitat = tr.querySelector('td:nth-child(4) input').value;
    return { codi, quantitat };
  });
  
  localStorage.setItem('carreto', JSON.stringify(carreto));
}

// Función per calcular l'import de cada producte (Function to calculate the import for each product)
function calcularImport() {
  const quantitatInputs = document.querySelectorAll("tbody input[type='number']");

  quantitatInputs.forEach((input) => {
    input.addEventListener("input", () => {
      const fila = input.closest("tr");
      const preuCelda = fila.querySelector("td:nth-child(5)");
      const importCelda = fila.querySelector("td:nth-child(6)");

      const quantitat = parseInt(input.value, 10);
      const preu = parseFloat(preuCelda.textContent);
      const importTotalCelda = quantitat * preu;

      importCelda.textContent = importTotalCelda;

      if (quantitat === 0) {
        fila.remove();
      }

      calcularImportTotal();

      desarCarretoAlLocalStorage();
    });
  });
}

// Funció per calcular l'import total (Function to calculate the total import)
function calcularImportTotal() {
  const importCeldas = document.querySelectorAll("tbody td:nth-child(6)");
  let importTotal = 0;

  importCeldas.forEach((celda) => {
    importTotal += parseFloat(celda.textContent);
  });

  // Actualiza el valor de la fila de "Import total" (This updates the value of the row of "Import total")
  const importTotalRow = document.querySelector("table b");
  importTotalRow.textContent = `Import total: ${importTotal.toFixed(2)}`;
}



//1. A partir del següent Array. Crea el <thead> de la taula utilitzant el mètode createElement()
// (1. From the following Array. Create the <thead> of the table using the createElement() method)

const headItem = ['Codi','Imatge', 'Descripció', 'Quantitat', 'Preu',
'Import'];

// Crea el <thead> de la taula utilitzant el mètode createElement()
// (Create the <thead> of the table using the createElement() method)
const content = document.createElement("div");
content.setAttribute("id","content");
document.body.appendChild(content);
const table = document.createElement("table");
table.setAttribute("id","table");
content.appendChild(table);
const thead = document.createElement("thead");
table.appendChild(thead);
const tr = document.createElement("tr");
thead.appendChild(tr);
for (let i = 0; i < headItem.length; i++) {
  const th = document.createElement("th");
  th.innerHTML = headItem[i]; 
  tr.appendChild(th); 
}
  


// 2. A partir del següent Array
// (2. From the following Array)
const products = [
  [101,'steelseires-arctis-5-rgb-negros.webp', 'Steelseires Arctis 5 Auriculars Gaming RGB Negres', 108.59],
  [102,'1202-agfa-photo-ac7000-camara-deportiva-16mp.webp', 'AgfaPhoto AC7000 Càmera Esportiva 16MP', 119.50],
  [103,'1920-xiaomi-poco-m3-pro-5g-4-64gb-amarillo-libre.webp', 'Xiaomi POCO M3 Pro 5G 4/64GB Groc LLiure', 315.99],
  [104,'logitech.webp', 'Logitech G Saitek X52 Flight Control System Sistema de Control de Vol', 158.60],
  [105,'115-msi-raider.webp', 'MSI Raider GE77HX 12UGS-020ES Intel Core i9-12900HX/64GB/2TB SSD/RTX 3070Ti/17.3"', 3599.00]
];
//Mitjancant Template string i algun métode per afegir HTML al document, per exemple insertAdjacentHTML()
//Crea un <tr> pera a cada producte i els <td> - corresponents per a cada camp.
//El contingut de la cel·la preu és un <input type="number"> que accepta valors enters entre 0 i
//10 i té com a valor per defecte 1.
//La cel·la import inicialment té el mateix valor que la cel·la preu. Posteriorment serà el valor
//calculat.

// (Using Template string and some method to add HTML to the document, for example insertAdjacentHTML()
// Create a <tr> for each product and the corresponding <td> for each field.
// The content of the price cell is an <input type="number"> that accepts whole values between 0 and 10 and has a default value of 1.
// The import cell initially has the same value as the price cell. It will later be the calculated value.)
let temp = '';
let valor = 0;
temp += `<tbody>`;
products.forEach(element =>{
  temp += `<tr>`;
  temp += `<td>${element[0]}</td>`;
  temp += `<td><img src="./img/${element[1]}" alt="${element[2]}" width="100"></td>`;
  temp += `<td>${element[2]}</td>`;
  temp += `<td><input type="number" min="0" max="10" value="1"></td>`;
  temp += `<td>${element[3]}</td>`;
  temp += `<td>${element[3]}</td>`;
  temp += `<td><button style="background-color: red; border-radius: 70%; color: white; padding: 4px 6px; border-color: red;">X</button></td>`; // part de l'apartat 3
  temp += `</tr>`;
});
temp += `</tbody>`;
table.insertAdjacentHTML("beforeend", temp);
//3. Crea una columna més per a les icones d'eliminar
// (3. Create an additional column for delete icons)
const imprt = document.querySelectorAll("thead tr");

imprt.forEach(element => {
  const celdaImport = element.querySelector("th:last-child");
  celdaImport.setAttribute("colspan", "2");
});
//4. Crea una fila més per a l'import total
// (4. Create an additional row for the total import)
table.insertAdjacentHTML("beforeend", "<b>Import total: </b>");
table.insertAdjacentHTML("afterend", "<br/><button id=\"buidar\">Buidar Carretó</button>");

//6. Quan es clica la icona eliminar l'element <tr> pare se suprimeix del DOM
// (6. When the delete icon is clicked, the parent <tr> element is removed from the DOM)
const botoBorrar = document.querySelectorAll("td button");
botoBorrar.forEach((button) => {
  button.addEventListener("click", () => {
    const lineaElimina = button.closest("tr");
    lineaElimina.remove();
    
    const filesRestants = document.querySelectorAll("tbody tr");
    if (filesRestants.length === 0) {
      let buidarCarretoButton = document.getElementById('buidar');
      table.remove();
      buidarCarretoButton.remove();
      const noProductMessage = document.createElement('p');
      noProductMessage.textContent = 'No hi ha productes al carretó';// (There are no products in the cart)
      content.appendChild(noProductMessage);
    }
  });
});
// 7. Quan es clica el botó Buidar carretó tota la taula desapareix i es mostra:
// (7. When the Empty cart button is clicked, the entire table disappears and shows:)
let buidarCarretoButton = document.getElementById('buidar');
buidarCarretoButton.addEventListener('click', () => {
  table.remove();
  buidarCarretoButton.remove();

  const noProductMessage = document.createElement('p');
  noProductMessage.textContent = 'No hi ha productes al carretó'; // (There are no products in the cart)
  
  content.appendChild(noProductMessage);
});


// 8. Crea una funció per calcular l'Import
// (8. Create a function to calculate the Import)
calcularImport();
// 9. Crea una funció per calcular l'Import total
// (9. Create a function to calculate the total Import)


calcularImportTotal();

// 10. Quan hi hagi un canvi, en els següents casos:
//- S'elimina un producte
//- Canvia la quantitat
//- Es buida el carretó
// Es desen i/o actualitzen les dades del carretó a localStorage de manera que quan es recarregui la pàgina es recuperi el contingut del carretó

// (10. When there is a change, in the following cases:)
// (- A product is removed
// - The quantity changes
// - The cart is emptied
// The cart data is saved and/or updated in localStorage so that when the page is reloaded, the cart content is retrieved)

botoBorrar.forEach((button) => {
  button.addEventListener("click", () => {
    const lineaElimina = button.closest("tr");
    lineaElimina.remove();
    
    const filesRestants = document.querySelectorAll("tbody tr");
    if (filesRestants.length === 0) {
      let buidarCarretoButton = document.getElementById('buidar');
      table.remove();
      buidarCarretoButton.remove();
      const noProductMessage = document.createElement('p');
      noProductMessage.textContent = 'No hi ha productes al carretó';
      content.appendChild(noProductMessage);
    }

    desarCarretoAlLocalStorage();

    carregarCarretoDesdelLocalStorage();
  });
});


const quantitatInputs = document.querySelectorAll("tbody input[type='number']");
quantitatInputs.forEach((input) => {
  input.addEventListener("input", () => {
    const fila = input.closest("tr");
    const preuCelda = fila.querySelector("td:nth-child(5)");
    const importCelda = fila.querySelector("td:nth-child(6)");

    const quantitat = parseInt(input.value, 10);
    const preu = parseFloat(preuCelda.textContent);
    const importTotalCelda = quantitat * preu;

    importCelda.textContent = importTotalCelda.toFixed(2);

    if (quantitat === 0) {
      fila.remove();
    }

    desarCarretoAlLocalStorage();

    calcularImportTotal();
  });
});

buidarCarretoButton = document.getElementById('buidar');
buidarCarretoButton.addEventListener('click', () => {
  table.remove();
  buidarCarretoButton.remove();


  desarCarretoAlLocalStorage();

  carregarCarretoDesdelLocalStorage();
});
carregarCarretoDesdelLocalStorage();

//Millores
//Com a millora, he pensat en afegir un verificador de la quantita afegida, ja que com a minim pot ser 1, i maxim 10, el verificador comprova que el numero estigui en aquest rang i que el valor no sigui NaN

// (Improvements
// As an improvement, I thought of adding a checker for the added quantity, since it can be at least 1, and at most 10, the checker verifies that the number is within this range and that the value is not NaN)

const quantInputs = document.querySelectorAll("tbody input[type='number']");

quantInputs.forEach((input) => {
  input.addEventListener("blur", () => {
    const fila = input.closest("tr");
    const preuCelda = fila.querySelector("td:nth-child(5)");
    const importCelda = fila.querySelector("td:nth-child(6)");

    let quantitat = parseInt(input.value, 10);
    const min = parseInt(input.getAttribute("min"));
    const max = parseInt(input.getAttribute("max"));

    if (isNaN(quantitat) || quantitat < min) {
      input.value = 1;
      quantitat = 1;
    } else if (quantitat > max) {
      input.value = 10;
      quantitat = 10;
    }

    const preu = parseFloat(preuCelda.textContent);

    const importTotalCelda = quantitat * preu;

    importCelda.textContent = importTotalCelda.toFixed(2);

    calcularImportTotal();

    desarCarretoAlLocalStorage();

  });
});