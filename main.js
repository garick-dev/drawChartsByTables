const btnFormOneAddEl = document.querySelector(".form-1__add");
const btnFormTwoAddEl = document.querySelector(".form-2__add");

const dataFormOneEl = document.querySelector(".form-1-data");
const dataFormTwoEl = document.querySelector(".form-2-data");
const dataFormThreeEl = document.querySelector(".form-3-data");

const contentBlockEl = document.querySelector(".table-block-outer");

const tableBlockEl = document.querySelectorAll(".table-block");


const calculateDataTableThreeEl = document.querySelector(".form-btn-calculate");


let counter1 = 1;
let counter2 = 1;
let scaleX = 30;
let scaleY = 30;

////////ADD ROWS//////////////

const addRowsForTableOne = () => {
    btnFormOneAddEl.addEventListener("click", (ev) => {
        ev.preventDefault();
       counter1++;
        const resultForHtml = `<div class="form-row table-1" data-id="${counter1}">
        <input type="number" class="form-input form__X">
          <input type="number" class="form-input form__Y">
          <button class="form-1__delete" data-id="${counter1}">Delete</button>
    </div>`;
    dataFormOneEl.insertAdjacentHTML("beforeend", resultForHtml);
    })
}

const addRowsForTableTwo = () => {
    btnFormTwoAddEl.addEventListener("click", (ev) => {
        ev.preventDefault();
        counter2++;
        const resultForHtml = `<div class="form-row table-2" data-id="${counter2}">
        <input type="number" class="form-input form__X">
          <input type="number" class="form-input form__Y">
          <button class="form-2__delete" data-id="${counter2}">Delete</button>
    </div>`;
    dataFormTwoEl.insertAdjacentHTML("beforeend", resultForHtml);
    }) 
}

////////ADD ROWS//////////////

///////////////DELETE ROWS//////////////////

const deleteRowsForTableOne = () => {
        document.addEventListener("click", (ev) => {
        ev.preventDefault();
        if(ev.target && ev.target.classList.contains(`form-1__delete`)) {
            const { id } = ev.target.dataset;
            const searchRow  = document.querySelector(`.form-row.table-1[data-id="${id}"]`);
            searchRow.remove(searchRow);
            counter1--;
        }
    });
}
const deleteRowsForTableTwo = () => {
        document.addEventListener("click", (ev) => {
        ev.preventDefault();
        if(ev.target && ev.target.classList.contains(`form-2__delete`)) {
            const { id } = ev.target.dataset;
            const searchRow  = document.querySelector(`.form-row.table-2[data-id="${id}"]`);
            searchRow.remove(searchRow);
            counter2--;
        }
    });
}
///////////////DELETE ROWS//////////////////


////////////////GET VALUE TABLE////////////////
const getValueTable1 = (counter) => {
    
    let arrXtable1 = [];
    let arrYtable1 = [];

    for (let i = 1; i <= counter; i++) {
        const searchRow  = document.querySelector(`.form-row.table-1[data-id="${i}"]`);
        const valX = searchRow.querySelector(".form__X").value;
        const valY = searchRow.querySelector(".form__Y").value;
        arrXtable1.push(valX);
        arrYtable1.push(valY);
    }
    return { arrXtable1, arrYtable1 };
    
}
const getValueTable2 = (counter) => {
 
    let arrXtable2 = [];
    let arrYtable2 = [];

    for (let i = 1; i <= counter; i++) {
        const searchRow  = document.querySelector(`.form-row.table-2[data-id="${i}"]`);
        const valX = searchRow.querySelector(".form__X").value;
        const valY = searchRow.querySelector(".form__Y").value;
        arrXtable2.push(valX);
        arrYtable2.push(valY);
    }
    return { arrXtable2, arrYtable2 };
  
}
const getValueTable3 = (arrXtable1, arrXtable2, arrYtable1, arrYtable2, counter) => {
    let arrXtable3 = [];
    let arrYtable3 = [];
    
    for (let i = 0; i < counter; i++) {

        let resX = (Number(arrXtable1[i]) + Number(arrXtable2[i])) / 2;
        let resY = (Number(arrYtable1[i]) + Number(arrYtable2[i])) / 2;
        arrXtable3.push(resX);
        arrYtable3.push(resY);
    }
    return { arrXtable3, arrYtable3};
}
////////////////GET VALUE TABLE////////////////


////////////////RENDER TABLE 3////////////////


const renderTable3 = (arrXtable1, arrXtable2, arrYtable1, arrYtable2, counter) => {
    let arrXtable3 = [];
    let arrYtable3 = [];
    for (let i = 0; i < counter; i++) {

        let resX = (Number(arrXtable1[i]) + Number(arrXtable2[i])) / 2;
        let resY = (Number(arrYtable1[i]) + Number(arrYtable2[i])) / 2;
        arrXtable3.push(resX);
        arrYtable3.push(resY);
            const resultForHtml = `<div class="form-row table-3" data-id="${i}">
        <input type="number" class="input-result" value ="${resX}">
          <input type="number" class="input-result" value="${resY}">
    </div>`;
    dataFormThreeEl.insertAdjacentHTML("beforeend", resultForHtml);
    }
    return { arrXtable3, arrYtable3};
}

////////////////RENDER TABLE 3///////////////

////////////////CALCULATE AND DRAW CHARTS/////////////////

const calculateDataTable = () => {
    calculateDataTableThreeEl.addEventListener("click", (ev) => {
        ev.preventDefault();           
        
        let minCounter = 0;
        // Find min counter for 2 tables
        if (counter1 > counter2) {
            minCounter = counter2;
        }
        else {
            minCounter = counter1;
        }

        // Сheck block on empty
         if (!dataFormThreeEl.hasChildNodes()) {
            const { arrXtable1, arrYtable1  } = getValueTable1(minCounter);
            const { arrXtable2,  arrYtable2 } = getValueTable2(minCounter);
            // Check value on empty
            if (arrXtable1[0] === "" || arrYtable1[0] === "" || arrXtable2[0] === "" || arrYtable2[0] === "" || counter1 === 0 || counter2 === 0)  {
                let resultHtml = `<h3 class="message"> Введите пожалуйста данные </h3>`; 
                // Add a message if there is none  (there once)
                 if (!contentBlockEl.classList.contains("message")) {              
                contentBlockEl.classList.add("message");
                contentBlockEl.insertAdjacentHTML("beforeend", resultHtml);
                }
                else {
                    return;
                }
      
            }
            else {
            tableBlockEl.forEach( (element) => {
                element.classList.remove("hidden");
            })    
            //  Get value table 3 and draw charts       
            const { arrXtable3 , arrYtable3  } = renderTable3(arrXtable1, arrXtable2, arrYtable1, arrYtable2, minCounter);

            const objTable = { 
                arrXtable : {
                  1: arrXtable1,
                  2:  arrXtable2, 
                  3: arrXtable3               
                },
                arrYtable: {
                    1: arrYtable1,
                    2:  arrYtable2, 
                    3: arrYtable3               
                  },    
             }
            for (let i = 1; i <= 3; i++) {
                
               drawTable(objTable.arrXtable[i], objTable.arrYtable[i], scaleX, scaleY, i);
               zoomTable(objTable.arrXtable[i], objTable.arrYtable[i], scaleX, scaleY, i);
            }
            
          
           }
        }   
        else { 
            return;
        }
    })
}

////////////////CALCULATE AND DRAW CHARTS////////////////


/////////////////////////CANVAS////////////////////


///////////////////////DRAW TABLE //////////////////////////
const drawTable = (arrX, arrY, scaleX, scaleY, id) => {

    
    const canvasPlot = document.querySelector(`.canvas-plot-${id}`);
    const ctx = canvasPlot.getContext("2d");
     ctx.clearRect(0, 0, canvasPlot.width, canvasPlot.height);

     const canvasPlotWidth = canvasPlot.width;
     const canvasPlotHeight = canvasPlot.height;    
     

     const xAxis = Math.round( canvasPlotWidth / scaleX  / 2) * scaleX ;
     const yAxis = Math.round( canvasPlotHeight / scaleY  / 2) * scaleY;

        const shiftNumberNames = 5;
        const shiftAxisNames = 20;
       
        ctx.font = `${Math.round(scaleX / 2)}px Arial`;
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
    
        
// Background grid
    ctx.beginPath();
    ctx.strokeStyle = "#f5f0e8";
    for (let i = 0; i <= canvasPlotWidth; i = i + scaleX) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvasPlotHeight);
        ctx.fillText((i - xAxis) / scaleX, i + shiftNumberNames, yAxis + shiftNumberNames);
        ctx.fillRect(i - shiftNumberNames / 4, yAxis - shiftNumberNames, 2, 10);
    }
    
    for (let i = 0; i <= canvasPlotHeight; i = i + scaleY) {
        ctx.moveTo(0 , i);
        ctx.lineTo( canvasPlotWidth , i);
        ctx.fillText((yAxis - i ) / scaleY, xAxis + shiftNumberNames , i + shiftNumberNames);
        ctx.fillRect(xAxis - shiftNumberNames , i - shiftNumberNames / 4, 10, 2);
    }
    ctx.stroke();
    ctx.closePath();


// Main line 

    ctx.beginPath();
    ctx.strokeStyle = "#000000";
    ctx.moveTo(xAxis, 0);
    ctx.lineTo(xAxis, canvasPlotHeight);
    ctx.fillText("y", xAxis - shiftAxisNames, 0);

    ctx.moveTo(0, yAxis);
    ctx.lineTo(canvasPlotWidth, yAxis);
    ctx.fillText("x", canvasPlotWidth - shiftAxisNames, yAxis-shiftAxisNames);

    ctx.stroke();
    ctx.closePath();



// Draw line 

    let x, y, xNext, yNext  = "";

    ctx.fillStyle = "#000000"
    for (let j = 0; j < arrX.length; j++) {

    x = Number(arrX[j]);
    y = Number(arrY[j]);
    xNext = Number(arrX[j + 1]);
    yNext = Number(arrY[j + 1]);
    ctx.fillRect((x * scaleX) + xAxis, yAxis - (scaleY * y), 1, 1); 
    ctx.moveTo(x * scaleX + xAxis, yAxis - scaleY * y);   
    ctx.lineTo( xNext * scaleX + xAxis, yAxis - scaleY * yNext);
    ctx.stroke();

    }
}
///////////////////////DRAW TABLE //////////////////////////



///////////////////////ZOOM TABLE//////////////////////////////
const zoomTable = (arrX, arrY, scaleX, scaleY, id) => {
          
    const canvasPlot = document.querySelector(`.canvas-plot-${id}`);

    canvasPlot.addEventListener("wheel", (ev) => {
        ev.preventDefault();    

        canvasPlot.scrollIntoView( { block: "center"} );    
         
            
          ev = ev || window.event;
    
        let delta = ev.deltaY || ev.detail || ev.wheelDelta;
        console.log(scaleX, scaleY);
        if (delta < 0 && scaleX < 100 && scaleY < 100) {
             scaleX += 1;
             scaleY += 1;
        }
      else if (delta > 0 && scaleX > 10 && scaleY > 10) {
          scaleX -= 1;
          scaleY -= 1;
      }

        drawTable(arrX, arrY, scaleX, scaleY, id);
    
    });
}
///////////////////////ZOOM TABLE//////////////////////////////


/////////////////////////CANVAS////////////////////


addRowsForTableOne();
addRowsForTableTwo();
deleteRowsForTableOne();
deleteRowsForTableTwo();
calculateDataTable();

