import * as Clases from "./clases.js";

/*
This script handles creating a user interface for entering card information, including uploading images, entering text data, and displaying a preview of the created card. It includes functions for resetting the form, obtaining card data from the form, saving card data to localStorage, and handling image uploads and text input events.

    reset(): Clears the form and preview content.
    obtenerDatosDeLaCarta(): Retrieves and returns data from the form fields.
    guardarEnLocalStorage(): Saves the current card data to localStorage.
    imatge(e): Handles image file input, reads the file, and updates the preview with the uploaded image.
    escriu(e) and afegeix(e): Update the preview based on text input and select fields.

*/

function reset() {
   
    const formulario = document.getElementById('mainForm');
    if (formulario) {
        formulario.reset();
    }

    
    const previewCarta = document.getElementById('card');
    if (previewCarta) {
        previewCarta.innerHTML = '';
    }

   
    const imageDiv = document.getElementById('card_fimage');
    if (imageDiv) {
        imageDiv.innerHTML = '';
    }


}
function obtenerDatosDeLaCarta() {
    return {
        image: document.getElementById('card_fimage').innerHTML, 
        name: document.getElementById('card_fcharactname') ? document.getElementById('card_fcharactname').textContent : '',
        description: document.getElementById('card_fcharactdesc') ? document.getElementById('card_fcharactdesc').textContent : '',
        origin: document.getElementById('card_fcharactorigin') ? document.getElementById('card_fcharactorigin').textContent : '',
        kind: document.getElementById('card_fcharactkind') ? document.getElementById('card_fcharactkind').textContent : '',
        home: document.getElementById('card_fhome') ? document.getElementById('card_fhome').textContent : '',
        state: document.getElementById('card_fcharactstate') ? document.getElementById('card_fcharactstate').textContent : ''
        
    };
}
function guardarEnLocalStorage() {
    const nuevaCarta = obtenerDatosDeLaCarta();

   
    const cartasGuardadas = JSON.parse(localStorage.getItem('cartas')) || [];

 
    cartasGuardadas.push(nuevaCarta);


    localStorage.setItem('cartas', JSON.stringify(cartasGuardadas));
}

function imatge(e){
    if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();

        reader.onload = function(event) {
          
            const base64Image = event.target.result;
            
           
            const imageDiv = document.getElementById('card_fimage') || document.createElement('div');
            imageDiv.id = 'card_fimage';
            imageDiv.innerHTML = `<img src="${base64Image}" alt="Uploaded Image"/>`;
            document.getElementById('card').appendChild(imageDiv);
        };

        
        reader.readAsDataURL(e.target.files[0]);
    }
}

function escriu(e) {
    const inputId = e.target.id;
    let cardInputDiv = document.getElementById(`card_${inputId}`);
    if (!cardInputDiv) {
        cardInputDiv = document.createElement('div');
        cardInputDiv.id = `card_${inputId}`;
        document.getElementById('card').appendChild(cardInputDiv);
    }
    cardInputDiv.textContent = e.target.value; 
}
function afegeix(e) {
    const selectId = e.target.id;
    const selectedValue = e.target.value;

    let cardSelectDiv = document.getElementById(`card_${selectId}`);
    if (!cardSelectDiv) {
        cardSelectDiv = document.createElement('div');
        cardSelectDiv.id = `card_${selectId}`;
        document.getElementById('card').appendChild(cardSelectDiv);
    }

    cardSelectDiv.textContent = `${selectedValue}`;
}
const backgrnd = new Clases.DomElement("div",{id:"backgrnd"});
backgrnd.createElement().printElement(document.body);
let backID = document.getElementById("backgrnd");
const  element = new Clases.DomElement("div",{id: "content", class: "blueC"});
element.createElement().printElement(backID);

const elementC = new Clases.CompoundElement("form",{id:"mainForm",class:"form"});
let arrayy = ['output', 'hola','adeu'];
let parentID = document.getElementById("content");
elementC.createElement().printElement(parentID);

const elementLabelImg = new Clases.InlineElement('label',{for: 'fimage',id:'label1',class:'label'},"Image:").createElement();
const elementInputImg = new Clases.DomElement('input', {name: 'fimage',id:'fimage',type:'file',accept:'image/*'}).createElement().addListener('change',imatge);
const elementLabelCN = new Clases.InlineElement('label',{for: 'fcharactname',id:'label2',class:'label'},"Character Name:").createElement();
const elementInputCN = new Clases.DomElement('input',{name: 'fcharactname',id:'fcharactname',type:'text', placeholder:'Enter a character name'}).createElement().addListener('input', escriu);
const elementLabelCD = new Clases.InlineElement('label',{for: 'fcharactdesc',id:'label3',class:'label'},"Description:").createElement();
const elementInputCD = new Clases.DomElement('input',{name: 'fcharactdesc',id:'fcharactdesc',type:'text', placeholder:'Enter a character description'}).createElement().addListener('input',escriu);
const elementLabelCO = new Clases.InlineElement('label',{for: 'fcharactorigin',id:'label4',class:'label'},"Origin:").createElement();
const elementInputCO = new Clases.DomElement('input',{name: 'fcharactorigin',id:'fcharactorigin',type:'text', placeholder:'Origin'}).createElement().addListener('input',escriu);
const elementLabelKND = new Clases.InlineElement('label',{for: 'fcharactkind',id:'label5',class:'label'},"Kind:").createElement();
const elementInputKND_O1 = new Clases.InlineElement('option',{},'God').createElement();
const elementInputKND_O2 = new Clases.InlineElement('option',{},'Human').createElement();
const elementInputKND_O3 = new Clases.InlineElement('option',{},'Monster').createElement();
const elementInputKND = new Clases.CompoundElement('select',{name: 'fcharactkind',id:'fcharactkind'}).createElement();
const elementLabelHome = new Clases.InlineElement('label',{for: 'fhome',id:'label6',class:'label'},"Home:").createElement();
const elementInputHome = new Clases.DomElement('input',{name: 'fhome',id:'fhome',type:'text', placeholder:'Enter home'}).createElement().addListener('input',escriu);
const elementLabelState = new Clases.InlineElement('label',{for: 'fcharactstate',id:'label7',class:'label'},"State:").createElement();
const elementInputSTT_O1 = new Clases.InlineElement('option',{},'Alive').createElement();
const elementInputSTT_O2 = new Clases.InlineElement('option',{},'Dead').createElement();
const elementInputState = new Clases.CompoundElement('select',{name: 'fcharactstate',id:'fcharactstate'}).createElement().addListener('change',afegeix);
const elementbuttonSave = new Clases.DomElement('input',{type:'button',id:'save',value:'save'}).createElement();
const elementbuttonReset = new Clases.DomElement('input',{type:'button',id:'reset',value:'reset'}).createElement();

const elementCard = new Clases.DomElement("div",{id:"card", class:"card"})
elementCard.createElement().printElement(backID);

elementInputKND.createElement().addChildren([elementInputKND_O1.nouElement, elementInputKND_O2.nouElement, elementInputKND_O3.nouElement]);
elementInputState.createElement().addChildren([elementInputSTT_O1.nouElement, elementInputSTT_O2.nouElement]);
elementInputKND.addListener('change',afegeix);
elementInputState.addListener('change',afegeix);


let arrayElement= [elementLabelImg.nouElement,elementInputImg.nouElement,elementLabelCN.nouElement, elementInputCN.nouElement,elementLabelCD.nouElement,elementInputCD.nouElement,elementLabelCO.nouElement, elementInputCO.nouElement,elementLabelKND.nouElement,  elementInputKND.nouElement, elementLabelHome.nouElement, elementInputHome.nouElement,elementLabelState.nouElement, elementInputState.nouElement, elementbuttonSave.nouElement,elementbuttonReset.nouElement];
elementC.addChildren(arrayElement).printElement(parentID);

document.getElementById('save').addEventListener('click', guardarEnLocalStorage);
document.getElementById('reset').addEventListener('click',reset);

const tableData = [
    {rowType: 'th', row: ['Codi','Article','Preu']},
    {row: [1001,'Entrepa de pernil xs','3,55€']},
    {row: [1002,'Hamburguesa xxl','8,75€']},
    {row: [1003,'Bikini','2,10€']}
];

const table = new Clases.ElementTable('table', {id: 'table-element', class: 'table'}, tableData);
table.createElement().printElement(document.body);
