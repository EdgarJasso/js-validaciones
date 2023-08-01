export function validar(input){
    const tipoDeInput = input.dataset.tipo;
    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input);
    }
    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    }else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeError(tipoDeInput, input);
    }
}

const mensajes = {
    nombre : {
        valueMissing : "el campo nombre no puede estar vacio"
    }, 
    email : {
        valueMissing : "nop!, email no puede estar vacio",
        typeMismatch : "El correo no es valido"
    },
    password : {
        valueMissing : "password! no puede estar vacio",
        patternMismatch : "no cumple validacion, soquete!"
    },
    nacimiento : {
        valueMissing : "Este cmapo no puede estar vacio",
        customError : "debes ser mayor de edad!"
    },
    numero : {
        valueMissing : "Este campo no puede estar vacio",
        patternMismatch : "el formato requierido es xxxxxxxxxx es 10 numeros"
    },
    direccion : {
        valueMissing : "Este campo no puede estar vacio",
        patternMismatch : "la direccion debe de teer de 10 a 40 caracteres"
    },
    ciudad : {
        valueMissing : "Este campo no puede estar vacio",
        patternMismatch : "la ciudad debe de teer de 10 a 40 caracteres"
    },
    estado : {
        valueMissing : "Este campo no puede estar vacio",
        patternMismatch : "la estado debe de teer de 10 a 40 caracteres"
    },
};

const validadores = {
    nacimiento: (input) => validarNaciemiento(input),
}

const tipoDeError = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
];

function mostrarMensajeError(tipoDeInput, input) {
    let mensaje = "";
    console.log(tipoDeInput, input);
    console.log(input.validity);
    tipoDeError.forEach((error) => {
        if(input.validity[error]){
            console.log(error);
            console.log(input.validity[error]); 
            console.log(mensajes[tipoDeInput][error]);
            mensaje = mensajes[tipoDeInput][error];
        }
    });
    return mensaje;
}

function validarNaciemiento(input){
    const fecha = new Date(input.value);
    let mensaje = "";
    if(!mayorDeEdad(fecha)){
        mensaje = "debes ser mayor de edad!";
    }
    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha){
    const fechaActual = new Date();
    const direnciaFechas = new Date(fecha.getUTCFullYear()+18, fecha.getUTCMonth(), fecha.getUTCDate()); 
    return fechaActual > direnciaFechas;
}

