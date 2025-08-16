

//DOM manipulation :)
//Cambio de tema - tutorial de coding2go
let darkmode = localStorage.getItem('darkmode');
const themeSwitch = document.getElementById("theme");

const enableDarkMode = () => {
    document.body.classList.add('darkmode');
    localStorage.setItem(darkmode, "active");
}

const disableDarkMode = () => {
    document.body.classList.remove('darkmode');
    localStorage.setItem(darkmode, null)
}

themeSwitch.addEventListener(
    "click", () => {
        darkmode !== "active" ? enableDarkMode() : disableDarkMode();
        darkmode = localStorage.getItem(darkmode);
    })


//Definir constantes
const botones = document.querySelectorAll('.num, .operador, .equal, .dot');
const operacionDisplay = document.querySelector('.operacion');
const resultadoDisplay = document.querySelector('.resultado');
const clearBtn = document.getElementById('ac');
const themeBtn = document.getElementById('theme');
const delBtn = document.getElementById('del');
const historialDiv = document.querySelector('.historial');
const acHistorial = document.getElementById('limpiar-hist');
const operadores = ['+', '-', 'x', '/', '%'];

//Definir variables
let operacion = '';
let resultado = '';
let historial = [];

function actualizarDisplay() {
    operacionDisplay.textContent = operacion;
    resultadoDisplay.textContent = resultado;
}


const updHistorial = function(operation, res) {
    const nuevo = document.createElement("div");
    
    nuevo.textContent = (operation + ' = ' + res);
    historialDiv.appendChild(nuevo);
}


function puedeAgregarPunto() {
    if (operacion === '') return true;
    let ultimoNumero = '';
    let i = operacion.length - 1;
    
    while (i >= 0 && !operadores.includes(operacion[i])) {
        ultimoNumero = operacion[i] + ultimoNumero;
        i--;
    }
    return !ultimoNumero.includes('.');
}
botones.forEach(boton => {
    boton.addEventListener('click', () => {
        const valor = boton.textContent;
        let lastDigit = operacion.slice(-1);

        if(resultado =='Error'){
            resultado = '';
        }

        if(resultado.length > 0){
            if(boton.classList.contains('operador')){
                operacion = resultado;
                resultado = '';
                operacion += valor;
                actualizarDisplay();    
            } else {
                operacion = '';
                resultado = '';

            }
            
        } 
        
        if(boton.classList.contains('dot')){
            if (puedeAgregarPunto()) {
                if (operacion === '' || operadores.includes(operacion.slice(-1))) {
                    operacion += '0.';
                } else {
                    operacion += valor;
                }
                actualizarDisplay();
            }
        } else if (boton.classList.contains('num')) {
            operacion += valor;
            console.log(boton.textContent);
            actualizarDisplay();
        } else if(boton.classList.contains('operador') && operacion.length > 0){
            if(operadores.includes(operacion.slice(-1))){
                operacion = operacion.slice(0, -1) + valor;
                actualizarDisplay(); 
            } else {
                operacion += valor;
                actualizarDisplay();
            }
        } else if (boton.classList.contains('equal')) {
            try {
                let operacionEval = operacion.replace(/x/g, '*');
                resultado = eval(operacionEval).toString();
                if(resultado == "NaN" || resultado == "Infinity"){
                    resultado = 'Error - division por cero';
                }
                updHistorial(operacion, resultado);    
                actualizarDisplay();
            } catch (error) {
                resultado = 'Error de sintaxis';
                actualizarDisplay();
            }
        }
    });
});


clearBtn.addEventListener('click', () => {
    operacion = '';
    resultado = '';
    actualizarDisplay();
});

delBtn.addEventListener('click', () => {
    operacion = operacion.slice(0,-1);
    actualizarDisplay();
});

acHistorial.addEventListener('click', () => {
    while(historialDiv.lastChild) {
    historialDiv.removeChild(historialDiv.lastChild);
    }
});


