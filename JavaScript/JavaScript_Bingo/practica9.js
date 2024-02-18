    //FUNCTIONS
    //Function to shuffle arrayNumbers
    // (Function to shuffle an array. It randomly rearranges the elements of the given array.)
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    //Function to generate sorted and unique random numbers.
    // (Generates a specified count of unique random numbers within a given range, ensuring no duplicates.)
    function generateUniqueRandomNumbers(min, max, count) {
        let numbers = [];
        while (numbers.length < count) {
            let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
            if (numbers.indexOf(randomNumber) === -1) {
                numbers.push(randomNumber);
            }
        }
        return numbers;
    }

    //Function to transpose
    // (Transposes a 2D array, swapping rows with columns, effectively rotating the array.)
    function transposeArray(array) {
        let newArray = [];
        for (let i = 0; i < array[0].length; i++) {
            newArray[i] = [];
            for (let j = 0; j < array.length; j++) {
                newArray[i][j] = array[j][i];
            }
        }
        return newArray;
    }
    //Function to save the state of the table
    // (Saves the current state of the Bingo game, including the HTML of the table, balls drawn, and various game status flags, to localStorage.)
    function saveTableState() {
        let tableHTML = table.innerHTML;
        localStorage.setItem('bingoTable', tableHTML);

        let balls = [];
        ballContainer.querySelectorAll(".bingo-ball").forEach(ball => {
            balls.push(ball.innerText);
        });
        localStorage.setItem('bingoBalls', JSON.stringify(balls));
    
        localStorage.setItem('shuffledArrayNumbers', JSON.stringify(shuffledArrayNumbers));

        localStorage.setItem('count',JSON.stringify(count));

        if(bingoController == true) {
            let countController = parseInt(localStorage.getItem('countRecord')) ? parseInt(localStorage.getItem('countRecord')) : Infinity;
            if(countController > count){
                localStorage.setItem('countRecord',JSON.stringify(count));
            }else{
                localStorage.setItem('countRecord',JSON.stringify(countController));
            }
        }
        localStorage.setItem('lineController', JSON.stringify(lineController));
    }

    //Function to load the state of the table
    // (Loads the saved state of the Bingo game from localStorage, including restoring the drawn balls and the Bingo table's HTML content.)
    function loadTableState() {
        let savedTableHTML = localStorage.getItem('bingoTable');
        if (savedTableHTML) {
            table.innerHTML = savedTableHTML;
        }

        let loadedBalls = JSON.parse(localStorage.getItem('bingoBalls'));
        if (loadedBalls) {
            loadedBalls.forEach(ballNumber => {
                let bingoBall = document.createElement("div");
                bingoBall.className = "bingo-ball";
                bingoBall.innerText = ballNumber;
                ballContainer.appendChild(bingoBall);
            });
        }

        let loadedArrayNumbers = JSON.parse(localStorage.getItem('shuffledArrayNumbers'));
        if (loadedArrayNumbers) {
            shuffledArrayNumbers = loadedArrayNumbers;
        }
        let loadedLineController = JSON.parse(localStorage.getItem('lineController'));
        if (loadedLineController != null) {
            lineController = loadedLineController;
        }
    }
    //Function for audio
    // (Plays a sound from the provided source unless the game is muted.)
    function playSound(src) {
        if (!isMuted) {
            let audio = new Audio(src);
            audio.play();
        }
    }

    // STEP 1. Create the table header
    // (Initial setup for the Bingo game UI, including creating elements for the Bingo balls container, the main table, and setting up a mute button for sounds.)
    const content = document.createElement("div");
    content.setAttribute("id", "content");
    document.body.appendChild(content);

    const ballContainer = document.createElement("div");
    ballContainer.setAttribute("id", "ball-container");
    document.body.appendChild(ballContainer);

    const table = document.createElement("table");
    table.setAttribute("id", "table");
    content.appendChild(table);

    const thead = document.createElement("thead");
    table.appendChild(thead);

    const trHead = document.createElement("tr");
    thead.appendChild(trHead);

    const thHead = document.createElement("th");
    thHead.setAttribute("colspan", "9");
    trHead.appendChild(thHead);
    thHead.innerHTML = "BINGO";

    let isMuted = false;
    const muteButton = document.createElement("img"); 
    muteButton.setAttribute("id", "muteButton");
    muteButton.src = "./multimedia/sound-on.png"; 
    muteButton.alt = "Enable Sound";
    muteButton.style.width = '30px'; 
    muteButton.style.height = '30px';
    content.appendChild(muteButton);

    muteButton.addEventListener("click", function() {
        isMuted = !isMuted;
        this.src = isMuted ? "./multimedia/sound-off.png" : "./multimedia/sound-on.png"; 
        this.alt = isMuted ? "Mute" : "Enable Sound";
    });

    let arrayBingo = [new Array(9), new Array(9), new Array(9)];

    // This loop fills the Bingo cards with unique, random numbers according to Bingo rules (e.g., the first column contains numbers from 1 to 9, the second from 10 to 19, etc.). It ensures that each column in a single row has a unique set of numbers and manages the distribution of "0" values to simulate empty spaces.
    for (let j = 0; j < 9; j++) {
        let min = j * 10 + 1;
        let max = min + 8;
        if(j === 0) {
            min = 1;
            max = 9;
        }
        let generatedNumbers;
        if (j % 2 != 0) {
            generatedNumbers = generateUniqueRandomNumbers(min, max, 3).sort((a, b) => b - a);
        } else {
            generatedNumbers = generateUniqueRandomNumbers(min, max, 3).sort((a, b) => a - b);
        }
        
        for (let i = 0; i < 3; i++) {
            arrayBingo[i][j] = generatedNumbers[i];
        }
    }
    // This part ensures that each row has four empty spaces by randomly assigning "0" values to some cells.
    for (let i = 0; i < 2; i++) {
        let zeroCount = 0;
        while (zeroCount < 4) {
            let randomCol = Math.floor(Math.random() * 9);
            if (arrayBingo[i][randomCol] !== 0) {
                arrayBingo[i][randomCol] = 0;
                zeroCount++;
            }
        }
    }

    // Prioritizes columns for empty spaces in the third row based on the distribution in the first two rows to maintain a balanced Bingo card.
    let zeroCount = 0;
    let priorityCols = []; 
    let otherCols = [];

    for (let j = 0; j < 9; j++) {
        if (arrayBingo[0][j] !== 0 && arrayBingo[1][j] !== 0) {
            priorityCols.push(j);
        } else if (arrayBingo[0][j] !== 0 || arrayBingo[1][j] !== 0) {
            otherCols.push(j);
        }
    }

    for (let col of priorityCols) {
        if (zeroCount < 4) {
            arrayBingo[2][col] = 0;
            zeroCount++;
        }
    }

    for (let col of otherCols) {
        if (zeroCount < 4) {
            arrayBingo[2][col] = 0;
            zeroCount++;
        }
    }

    // Fills the Bingo table with the numbers prepared in `arrayBingo`, marking empty spaces and setting up for gameplay.
    let temp = '';
    temp += `<tbody>`;
    arrayBingo.forEach(element => {
        temp += `<tr>`;
        for (let i = 0; i < 9; i++) {
            temp += `<td class="C_${element[i]}">${element[i]}</td>`;
        }
        temp += `</tr>`;
    });
    temp += `</tbody>`;
    table.insertAdjacentHTML("beforeend", temp);


    //Part 2

    // Initializes an array with numbers 1 to 89, then shuffles it to simulate the random draw of Bingo balls.
    let arrayNumbers = new Array(89);
    for(let i = 0; i<arrayNumbers.length; i++){
    arrayNumbers[i] = i+1;
    };
    let shuffledArrayNumbers = shuffleArray(arrayNumbers);

    // Setup for drawing Bingo balls and displaying the count of balls drawn, handling game logic for matching drawn numbers with the Bingo card, checking for "line" (a complete row matched) and "bingo" (the entire card matched) conditions.
    const button = document.createElement("button");
    button.innerHTML = "Draw a ball";  
    content.appendChild(button);

    let lineController = false;
    let bingoController = false;
    let count = localStorage.getItem('count') ? localStorage.getItem('count') : 0;
    const quantity = document.createElement("div");
    quantity.setAttribute("id","quantity");
    button.addEventListener("click", function() {
        let ball = shuffledArrayNumbers.pop();

        if (ball !== undefined) {
            if(bingoController == false){
                count++;
            quantity.innerHTML = "Balls drawn: " + count;
            content.appendChild(quantity);
            }
            playSound('./multimedia/canica.mp3');
    
            let bingoBall = document.createElement("div");
            bingoBall.className = "bingo-ball";
            bingoBall.innerText = ball;

            if (ballContainer.firstChild) {
                ballContainer.insertBefore(bingoBall, ballContainer.firstChild);
            } else {
                ballContainer.appendChild(bingoBall);
            }

    
            let matchingCell = document.querySelector(`.C_${ball}`);
            if (matchingCell) {
                matchingCell.classList.add("matched");
                bingoBall.classList.add("found");
                playSound('./multimedia/matched.mp3');
                let rows = table.querySelectorAll("tbody tr");
                rows.forEach(row => {
                    let cells = row.querySelectorAll("td:not(.C_0)");
                    if ([...cells].every(cell => cell.classList.contains("matched")) && lineController == false) {
                        playSound('./multimedia/linea.mp3');
                        setTimeout(function() {
                            alert("Line!");
                        }, 500);
                        lineController = true;
                    }
                });
            
                if (bingoController == false) {
                    let allCells = table.querySelectorAll("tbody td:not(.C_0)");
                    if ([...allCells].every(cell => cell.classList.contains("matched"))) {
                        playSound('./multimedia/bingo1.mp3');
                        playSound('./multimedia/bingo2.mp3');
                        setTimeout(function() {
                            alert("BINGO!");
                        }, 75);

                        bingoController = true;
                    }
                }
            }
        } else {
            alert("All balls have been drawn!");  
        }
    });

    // Buttons for saving the game state to localStorage, clearing localStorage data, and displaying the record for the least number of balls drawn to achieve Bingo, are added to enhance game functionality and user experience.
    const saveButton = document.createElement("button");
    saveButton.innerHTML = "Save table state";  
    content.appendChild(saveButton);
    saveButton.addEventListener("click", saveTableState);

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete data from localStorage";
    content.appendChild(deleteButton);
    deleteButton.addEventListener("click", function() {

        localStorage.removeItem('bingoTable');
        localStorage.removeItem('bingoBalls');
        localStorage.removeItem('shuffledArrayNumbers');
        localStorage.removeItem('count');
        localStorage.removeItem('lineController');
        alert("Data deleted from localStorage");
        location.reload();
    });
    let countRecord = parseInt(localStorage.getItem('countRecord')) ? parseInt(localStorage.getItem('countRecord')) : "--";
    const record = document.createElement("div");
    record.setAttribute("id","record");
    record.innerHTML = "Record of minimum balls drawn: " + countRecord;
    content.appendChild(record);


    loadTableState();

