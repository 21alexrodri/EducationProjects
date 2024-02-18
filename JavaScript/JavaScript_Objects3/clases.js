/*
These classes simplify the creation and manipulation of DOM elements:

    DomElement: Base class for creating a single DOM element with specified attributes and adding event listeners.
    CompoundElement: Extends DomElement to support adding child elements, allowing for more complex element structures.
    InlineElement: Specialized for creating elements that contain text content.
    ElementWithChildren: Facilitates the creation of nested elements in a streamlined manner.
    ElementTable: Specialized in generating tables dynamically based on given data.
*/

export class DomElement{
    constructor(tag, attributes) {
        this.tag = tag;
        this.attributes = attributes;
    }

    createElement() {
        if (typeof this.tag === "string") {
            this.nouElement = document.createElement(this.tag);
            if (typeof this.attributes === "object") {
                for (const key in this.attributes) {
                    if (this.attributes.hasOwnProperty(key)) {
                        this.nouElement.setAttribute(key, this.attributes[key]);
                    }
                }
            }
        }
        return this;
    }

    printElement(pos) {
        if (typeof pos === "object" && this.nouElement) {
            pos.appendChild(this.nouElement);
        }
        return this;
    }
    deleteElement(){
        this.nouElement.remove();
        return this;
    }
    addListener(action, func) {
        if (typeof action === 'string' && typeof func === 'function') {
            this.nouElement.addEventListener(action, func);
            return this;
        }
    }
    getId(){
        return this.nouElement.id;
    }
}

export class CompoundElement extends DomElement {
    constructor(tag, attributes) {
        super(tag, attributes);
    }

    addChildren(children) {
        if (Array.isArray(children)) {
            children.forEach(child => {
                let childElement;
    
                
                if (typeof child === 'string') {
                    childElement = document.createElement(child);
                } else if (child instanceof Node) {
                   
                    childElement = child;
                }else if (typeof child === 'object' && child instanceof DomElement) {
         
                    child.createElement(); 
                    childElement = child.nouElement;

                } 
                else {
                   
                    console.error("Invalid child type");
                    return;
                }

           
                this.nouElement.appendChild(childElement);
            });
            return this;
        }
    }
    
}
export class InlineElement extends DomElement {
    constructor(tag, attributes, text) {
        super(tag, attributes);
        this.text = text;
    }

    createElement() {
        super.createElement();

        if (typeof this.text === 'string') {
            const textNode = document.createTextNode(this.text);
            this.nouElement.appendChild(textNode);
        }

        return this;
    }
}
export class ElementWithChildren extends DomElement {
    constructor(elements) {
        super(elements[0], {});
        this.elements = elements;
    }

    createElements() {
        this.nouElement = this.createElement().nouElement; 
        let currentElement = this.nouElement;

        for (let i = 1; i < this.elements.length; i++) {
            const tagName = this.elements[i];

            if (typeof tagName === 'string') {
                const newElement = document.createElement(tagName);
                currentElement.appendChild(newElement);
                currentElement = newElement; 
            }
        }

        return this; 
    }
}
export class ElementTable extends DomElement {
    constructor(tag, attributes, tableData) {
        super(tag, attributes);
        this.tableData = tableData;
    }

    createElement() {
        super.createElement(); 

        this.tableData.forEach((rowData) => {
            
            const rowType = rowData.rowType === 'th' ? 'th' : 'td';
            const tr = document.createElement('tr');

          
            rowData.row.forEach((cellData) => {
                const cell = document.createElement(rowType);
                cell.textContent = cellData;
                tr.appendChild(cell);
            });

            
            this.nouElement.appendChild(tr);
        });

        return this;
    }
}