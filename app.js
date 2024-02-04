//Variables
const pantallaDni = document.querySelector(".documento");
const inputDni = document.querySelector(".ingreseDni");
const btnDni = document.querySelector(".documento__btn");

const pantallaActivy = document.querySelector(".actividad");
const salirTodo = document.querySelector(".btn-reset");

const btnConsultarSaldo = document.querySelector(".actividad__consulta");
const consultaS = document.querySelector(".consulta");
const mostrarSaldoBtn = document.querySelector(".consulta__ver");
const saldoActual = document.querySelector(".consulta__saldo");
const btnVolverDeVerSalso = document.querySelector(".consulta__btn");

const btnTranferir = document.querySelector(".actividad__transferir");
const transferirCash = document.querySelector(".enviarCash");
const inputMonto = document.querySelector(".enviarCash__input");
const volverTransBtn = document.querySelector(".enviarCash__btn");
const enviarCashBtn = document.querySelector(".enviarCash__depo");
const modalEnvioCash = document.querySelector(".enviarCash__modal");

const btnRetiro = document.querySelector(".actividad__retiro");
const pantallaRetiro = document.querySelector(".retiro");
const verSaldoRetiro = document.querySelector(".retiro__sald");
const retiroVerSal = document.querySelector(".retiro__ver");
const confirmarRetiro = document.querySelector(".retiro__btn");
const retiroInput = document.querySelector(".retiro__input");
const volverDeRetiro = document.querySelector(".retirar__btn");

const pantallaVoucher = document.querySelector(".voucher");
const montoVoucher = document.querySelector(".voucher__monto");
const retirarYverSalso = document.querySelector(".voucher__retirar_saldo");
const retirarSinVerSaldo = document.querySelector(
  ".voucher__retirar--sinsaldo"
);
const pantallaClave = document.querySelector(".clave");
const inputClave = document.querySelector(".inputClave");

const alerta = document.querySelector(".alert");

let saldo = 0;
let pass;

let cuentas = [
  { nombre: "Mali", saldo: 200, password: "1234", dni: 44788834 },
  { nombre: "Gera", saldo: 150, password: "5678", dni: 10247439 },
  { nombre: "Sabi", saldo: 60, password: "9102", dni: 98005362 },
];

function ocultarPantalla(seccionOcultar) {
  seccionOcultar.classList.remove("view");
  seccionOcultar.classList.add("notView");
}

function mostrarPantalla(seccionMostrar) {
  seccionMostrar.classList.add("view");
  seccionMostrar.classList.remove("notView");
}

//PRIMERA PARTE DNI
btnDni.addEventListener("click", (e) => {
  e.preventDefault();
  let valorDni = inputDni.value;

  const cliente = cuentas.find((cta) => {
    return parseInt(valorDni) === cta.dni;
  });

  if (cliente) {
    saldo = cliente.saldo;
    pass = cliente.password;

    ocultarPantalla(pantallaDni);
    mostrarPantalla(pantallaActivy);
  } else {
    alerta.textContent = "DNI Inválido";
  }
});

//SEGUNDA PARTE VER SALDO
btnConsultarSaldo.addEventListener("click", () => {
  ocultarPantalla(pantallaActivy);
  mostrarPantalla(consultaS);
  mostrarSaldoBtn.addEventListener("click", mostrarSaldoActual);
});

function mostrarSaldoActual(e) {
  e.preventDefault();

  const dniIngresado = document.querySelector(".ingreseDni").value;
  const saldo = cuentas.find((cta) => parseInt(dniIngresado) === cta.dni);
  if (saldo) {
    saldoActual.textContent = `S/${saldo.saldo}`;
  } else {
    alert("DNI no encontrado. Por favor, ingrese un DNI válido.");
  }
}

btnVolverDeVerSalso.addEventListener("click", (e) => {
  e.preventDefault();
  mostrarPantalla(pantallaActivy);
  ocultarPantalla(consultaS);
});

//ESTO ES PARA TRANFERIR DINERO
btnTranferir.addEventListener("click", () => {
  mostrarPantalla(transferirCash);
  ocultarPantalla(pantallaActivy);
});

enviarCashBtn.addEventListener("click", () => {
  let montoInput = parseInt(inputMonto.value);
  saldo += montoInput;
  saldoActual.textContent = `S/${saldo}`;

  inputMonto.value = "";

  modalEnvioCash.classList.add("modal__view");
  setTimeout(() => {
    modalEnvioCash.classList.remove("modal__view");
  }, 3000);
});

volverTransBtn.addEventListener("click", (e) => {
  e.preventDefault();
  mostrarPantalla(pantallaActivy);
  ocultarPantalla(transferirCash);
});

//TERCER PASO RETIRAR EFECTIVO
btnRetiro.addEventListener("click", () => {
  mostrarPantalla(pantallaRetiro);
  ocultarPantalla(pantallaActivy);
});

retiroVerSal.addEventListener("click", () => {
  verSaldoRetiro.textContent = `S/${saldo}`;
});

confirmarRetiro.addEventListener("click", () => {
  let valorInputRetiro = parseInt(retiroInput.value);
  if (saldo < 0 || saldo < valorInputRetiro) {
    alert("Fondos insuficientes");
  } else {
    saldo -= valorInputRetiro;
    saldoActual.textContent = `S/${saldo}`;

    montoVoucher.textContent = `S/ ${valorInputRetiro}`;
    mostrarPantalla(pantallaClave);
    ocultarPantalla(pantallaRetiro);
  }
});

retirarYverSalso.addEventListener("click", () => {
  mostrarPantalla(consultaS);
  ocultarPantalla(pantallaVoucher);
});

retirarSinVerSaldo.addEventListener("click", () => {
  mostrarPantalla(pantallaActivy);
  ocultarPantalla(pantallaVoucher);
});

volverDeRetiro.addEventListener("click", () => {
  mostrarPantalla(pantallaActivy);
  ocultarPantalla(pantallaRetiro);
});

//PARTE DE CLAVE
inputClave.addEventListener("keyup", () => {
  const clave = inputClave.value;
  if (pass == clave) {
    mostrarPantalla(pantallaActivy);
    ocultarPantalla(pantallaClave);
  }
});

//Salir del todo en menu de operaciones
salirTodo.addEventListener("click", () => {
  document.location.reload();
});
