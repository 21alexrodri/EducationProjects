import * as Clases from "./clases.js";
/*
This script focuses on displaying saved cards from localStorage in a gallery and providing functionalities to load and delete these cards.

    del(): Deletes all saved cards from localStorage and clears the gallery.
    load(): Loads and displays cards from localStorage into the gallery.

*/
function del() {
  
    localStorage.removeItem('cartas');


    const galleryCardsDiv = document.getElementById('galleryCards');
    galleryCardsDiv.innerHTML = '';
}
function load() {
    const galleryCardsDiv = document.getElementById('galleryCards');
    galleryCardsDiv.innerHTML = ''; 


    const storedCards = JSON.parse(localStorage.getItem('cartas')) || [];

   
    storedCards.forEach((card) => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.innerHTML = `
            <div class='image'>${card.image}</div>
            <div class='name'> ${card.name}</div>
            <div class='desc'>${card.description}</div>
            <div class='origin'>${card.origin}</div>
            <div class='kind'>${card.kind}</div>
            <div class='home'>${card.home}</div>
            <div class='state'>${card.state}</div>
           
        `;
        galleryCardsDiv.appendChild(cardDiv);
    });
}

const elementbuttons = new Clases.DomElement('div',{id: "galleryButtons"}).createElement().printElement(document.body);
let buttonsID = document.getElementById("galleryButtons");
const elementbuttonLoad = new Clases.DomElement('input',{type:'button',id:'load',value:'Load Cards'}).createElement().printElement(buttonsID).addListener('click',load);
const elementbuttonDel = new Clases.DomElement('input',{type:'button',id:'delete',value:'Delete Cards'}).createElement().printElement(buttonsID).addListener('click',del);
const elementCards = new Clases.DomElement('div',{id: "galleryCards"}).createElement().printElement(document.body);

