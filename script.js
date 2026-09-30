"use strict";

/* =========================================================
   ELEMENTOS DE LA PÁGINA
   ========================================================= */

const formulario = document.getElementById("formulario-calculadora");
const botonLimpiar = document.getElementById("boton-limpiar");
const seccionResultados = document.getElementById("seccion-resultados");

const nombreTrabajador = document.getElementById("nombre-trabajador");
const nombreEmpresa = document.getElementById("nombre-empresa");
const cargoTrabajador = document.getElementById("cargo-trabajador");
const salarioMensual = document.getElementById("salario-mensual");
const fechaIngreso = document.getElementById("fecha-ingreso");
const fechaFinalizacion = document.getElementById("fecha-finalizacion");

const horasDiurnas = document.getElementById("horas-diurnas");
const horasNocturnas = document.getElementById("horas-nocturnas");
const diasDescanso = document.getElementById("dias-descanso");
const diasAsueto = document.getElementById("dias-asueto");

const noAplicaDiurnas = document.getElementById("no-aplica-diurnas");
const noAplicaNocturnas = document.getElementById("no-aplica-nocturnas");
const noAplicaDescanso = document.getElementById("no-aplica-descanso");
const noAplicaAsueto = document.getElementById("no-aplica-asueto");

const contenidoDiurnas = document.getElementById("contenido-diurnas");
const contenidoNocturnas = document.getElementById("contenido-nocturnas");
const contenidoDescanso = document.getElementById("contenido-descanso");
const contenidoAsueto = document.getElementById("contenido-asueto");

const advertenciaCoincidencia = document.getElementById(
    "advertencia-coincidencia"
);

const detalleCoincidencia = document.getElementById(
    "detalle-coincidencia"
);

const notaCompensatoria = document.getElementById(
    "nota-compensatoria"
);

/* =========================================================
   FUNCIONES AUXILIARES
   ========================================================= */

function convertirNumero(valor) {
    const numero = Number.parseFloat(valor);

    if (Number.isNaN(numero)) {
        return 0;
    }

    return numero;
}

function convertirEntero(valor) {
    const numero = Number.parseInt(valor, 10);

    if (Number.isNaN(numero)) {
        return 0;
    }

    return numero;
}

function formatearMoneda(valor) {
    return new Intl.NumberFormat("es-SV", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(valor);
}

function formatearCantidad(valor) {
    return new Intl.NumberFormat("es-SV", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    }).format(valor);
}

function formatearFecha(fecha) {
    if (fecha === "") {
        return "";
    }

    const partes = fecha.split("-");

    const fechaLocal = new Date(
        Number(partes[0]),
        Number(partes[1]) - 1,
        Number(partes[2])
    );

    return fechaLocal.toLocaleDateString("es-SV", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });
}

function limpiarErrores() {
    const mensajes = document.querySelectorAll(".mensaje-error");
    const campos = document.querySelectorAll("input");

    mensajes.forEach(function (mensaje) {
        mensaje.textContent = "";
    });

    campos.forEach(function (campo) {
        campo.classList.remove("campo-invalido");
    });
}

function mostrarError(campo, idMensaje, mensaje) {
    campo.classList.add("campo-invalido");
    document.getElementById(idMensaje).textContent = mensaje;
}

function obtenerCoincidencia() {
    const opcionSeleccionada = document.querySelector(
        'input[name="coincidencia"\]:checked'
    );

    if (opcionSeleccionada) {
        return opcionSeleccionada.value;
    }

    return "no";
}

/* =========================================================
   FUNCIONAMIENTO DE NO APLICA
   ========================================================= */

function configurarNoAplica(
    casilla,
    campo,
    contenedor,
    idMensajeError
) {
    casilla.addEventListener("change", function () {
        if (casilla.checked) {
            campo.value = "";
            campo.disabled = true;
            campo.classList.remove("campo-invalido");

            contenedor.classList.add("contenido-deshabilitado");

            document.getElementById(idMensajeError).textContent = "";
        } else {
            campo.disabled = false;
            contenedor.classList.remove("contenido-deshabilitado");
            campo.focus();
        }
    });
}

configurarNoAplica(
    noAplicaDiurnas,
    horasDiurnas,
    contenidoDiurnas,
    "error-horas-diurnas"
);

configurarNoAplica(
    noAplicaNocturnas,
    horasNocturnas,
    contenidoNocturnas,
    "error-horas-nocturnas"
);

configurarNoAplica(
    noAplicaDescanso,
    diasDescanso,
    contenidoDescanso,
    "error-dias-descanso"
);

configurarNoAplica(
    noAplicaAsueto,
    diasAsueto,
    contenidoAsueto,
    "error-dias-asueto"
);

/* =========================================================
   COINCIDENCIA ENTRE ASUETO Y DESCANSO
   ========================================================= */

const opcionesCoincidencia = document.querySelectorAll(
    'input[name="coincidencia"]'
);

opcionesCoincidencia.forEach(function (opcion) {
    opcion.addEventListener("change", function () {
        advertenciaCoincidencia.hidden =
            obtenerCoincidencia() !== "si";
    });
});

/* =========================================================
   VALIDACIÓN
   ========================================================= */

function validarFormulario() {
    limpiarErrores();

    let formularioValido = true;

    if (nombreTrabajador.value.trim() === "") {
        mostrarError(
            nombreTrabajador,
            "error-nombre",
            "Ingrese el nombre completo del trabajador."
        );

        formularioValido = false;
    }

    if (nombreEmpresa.value.trim() === "") {
        mostrarError(
            nombreEmpresa,
            "error-empresa",
            "Ingrese el nombre de la empresa."
        );

        formularioValido = false;
    }

    if (cargoTrabajador.value.trim() === "") {
        mostrarError(
            cargoTrabajador,
            "error-cargo",
            "Ingrese el cargo del trabajador."
        );

        formularioValido = false;
    }

    if (convertirNumero(salarioMensual.value) <= 0) {
        mostrarError(
            salarioMensual,
            "error-salario",
            "Ingrese un salario mensual mayor que cero."
        );

        formularioValido = false;
    }

    if (fechaIngreso.value === "") {
        mostrarError(
            fechaIngreso,
            "error-fecha-ingreso",
            "Seleccione la fecha de ingreso."
        );

        formularioValido = false;
    }

    if (fechaFinalizacion.value === "") {
        mostrarError(
            fechaFinalizacion,
            "error-fecha-finalizacion",
            "Seleccione la fecha de finalización."
        );

        formularioValido = false;
    }

    if (
        fechaIngreso.value !== "" &&
        fechaFinalizacion.value !== "" &&
        fechaFinalizacion.value < fechaIngreso.value
    ) {
        mostrarError(
            fechaFinalizacion,
            "error-fecha-finalizacion",
            "La fecha de finalización no puede ser anterior a la fecha de ingreso."
        );

        formularioValido = false;
    }

    if (
        !noAplicaDiurnas.checked &&
        convertirNumero(horasDiurnas.value) <= 0
    ) {
        mostrarError(
            horasDiurnas,
            "error-horas-diurnas",
            "Ingrese las horas diurnas o marque No aplica."
        );

        formularioValido = false;
    }

    if (
        !noAplicaNocturnas.checked &&
        convertirNumero(horasNocturnas.value) <= 0
    ) {
        mostrarError(
            horasNocturnas,
            "error-horas-nocturnas",
            "Ingrese las horas nocturnas o marque No aplica."
        );

        formularioValido = false;
    }

    if (
        !noAplicaDescanso.checked &&
        convertirEntero(diasDescanso.value) <= 0
    ) {
        mostrarError(
            diasDescanso,
            "error-dias-descanso",
            "Ingrese los días de descanso o marque No aplica."
        );

        formularioValido = false;
    }

    if (
        !noAplicaAsueto.checked &&
        convertirEntero(diasAsueto.value) <= 0
    ) {
        mostrarError(
            diasAsueto,
            "error-dias-asueto",
            "Ingrese los días de asueto o marque No aplica."
        );

        formularioValido = false;
    }

    if (
        obtenerCoincidencia() === "si" &&
        (noAplicaDescanso.checked || noAplicaAsueto.checked)
    ) {
        window.alert(
            "Para indicar una coincidencia deben existir días de descanso y días de asueto laborados."
        );

        formularioValido = false;
    }

    return formularioValido;
}

/* =========================================================
   CÁLCULOS
   ========================================================= */

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    if (!validarFormulario()) {
        const primerCampoInvalido = document.querySelector(
            ".campo-invalido"
        );

        if (primerCampoInvalido) {
            primerCampoInvalido.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

            primerCampoInvalido.focus();
        }

        return;
    }

    const salarioBasicoMensual = convertirNumero(
        salarioMensual.value
    );

    /*
        Salario básico diario =
        salario básico mensual dividido entre 30.
    */

    const salarioBasicoDiario =
        salarioBasicoMensual / 30;

    /*
        Valor de la hora ordinaria =
        salario básico diario dividido entre 8.
    */

    const valorHoraOrdinaria =
        salarioBasicoDiario / 8;

    /*
        Valor de la hora extra diurna =
        valor de la hora ordinaria multiplicado por 2.
    */

    const valorHoraExtraDiurna =
        valorHoraOrdinaria * 2;

    /*
        Valor de la hora extra nocturna =
        valor de la hora extra diurna multiplicado por 1.25.
    */

    const valorHoraExtraNocturna =
        valorHoraExtraDiurna * 1.25;

    /*
        Día de descanso semanal laborado =
        salario básico diario multiplicado por 1.5.
    */

    const valorDiaDescanso =
        salarioBasicoDiario * 1.5;

    /*
        Día de asueto laborado =
        salario básico diario multiplicado por 2.
    */

    const valorDiaAsueto =
        salarioBasicoDiario * 2;

    const cantidadHorasDiurnas =
        noAplicaDiurnas.checked
            ? 0
            : convertirNumero(horasDiurnas.value);

    const cantidadHorasNocturnas =
        noAplicaNocturnas.checked
            ? 0
            : convertirNumero(horasNocturnas.value);

    const cantidadDiasDescanso =
        noAplicaDescanso.checked
            ? 0
            : convertirEntero(diasDescanso.value);

    const cantidadDiasAsueto =
        noAplicaAsueto.checked
            ? 0
            : convertirEntero(diasAsueto.value);

    let diasCoincidentes = 0;

    if (obtenerCoincidencia() === "si") {
        diasCoincidentes = Math.min(
            cantidadDiasDescanso,
            cantidadDiasAsueto
        );
    }

    /*
        Los días coincidentes se eliminan del descanso semanal
        y se calculan únicamente como días de asueto.
    */

    const diasDescansoCalculados =
        cantidadDiasDescanso - diasCoincidentes;

    const totalHorasDiurnas =
        cantidadHorasDiurnas * valorHoraExtraDiurna;

    const totalHorasNocturnas =
        cantidadHorasNocturnas * valorHoraExtraNocturna;

    const totalDescanso =
        diasDescansoCalculados * valorDiaDescanso;

    const totalAsueto =
        cantidadDiasAsueto * valorDiaAsueto;

    const totalGeneral =
        totalHorasDiurnas +
        totalHorasNocturnas +
        totalDescanso +
        totalAsueto;

    mostrarResultados({
        salarioBasicoMensual,
        salarioBasicoDiario,
        valorHoraOrdinaria,
        valorHoraExtraDiurna,
        valorHoraExtraNocturna,
        valorDiaDescanso,
        valorDiaAsueto,
        cantidadHorasDiurnas,
        cantidadHorasNocturnas,
        cantidadDiasAsueto,
        diasDescansoCalculados,
        diasCoincidentes,
        totalHorasDiurnas,
        totalHorasNocturnas,
        totalDescanso,
        totalAsueto,
        totalGeneral
    });
});

/* =========================================================
   MOSTRAR RESULTADOS
   ========================================================= */

function mostrarResultados(resultados) {
    document.getElementById("resultado-nombre").textContent =
        nombreTrabajador.value.trim();

    document.getElementById("resultado-empresa").textContent =
        nombreEmpresa.value.trim();

    document.getElementById("resultado-cargo").textContent =
        cargoTrabajador.value.trim();

    document.getElementById("resultado-periodo").textContent =
        formatearFecha(fechaIngreso.value) +
        " al " +
        formatearFecha(fechaFinalizacion.value);

    document.getElementById(
        "resultado-salario-mensual"
    ).textContent = formatearMoneda(
        resultados.salarioBasicoMensual
    );

    document.getElementById(
        "resultado-salario-diario"
    ).textContent = formatearMoneda(
        resultados.salarioBasicoDiario
    );

    document.getElementById(
        "resultado-hora-ordinaria"
    ).textContent = formatearMoneda(
        resultados.valorHoraOrdinaria
    );

    actualizarFilaResultado(
        "cantidad-diurnas",
        "valor-diurna",
        "total-diurnas",
        noAplicaDiurnas.checked,
        resultados.cantidadHorasDiurnas,
        resultados.valorHoraExtraDiurna,
        resultados.totalHorasDiurnas,
        " horas"
    );

    actualizarFilaResultado(
        "cantidad-nocturnas",
        "valor-nocturna",
        "total-nocturnas",
        noAplicaNocturnas.checked,
        resultados.cantidadHorasNocturnas,
        resultados.valorHoraExtraNocturna,
        resultados.totalHorasNocturnas,
        " horas"
    );

    actualizarFilaResultado(
        "cantidad-descanso",
        "valor-descanso",
        "total-descanso",
        noAplicaDescanso.checked,
        resultados.diasDescansoCalculados,
        resultados.valorDiaDescanso,
        resultados.totalDescanso,
        " días"
    );

    actualizarFilaResultado(
        "cantidad-asueto",
        "valor-asueto",
        "total-asueto",
        noAplicaAsueto.checked,
        resultados.cantidadDiasAsueto,
        resultados.valorDiaAsueto,
        resultados.totalAsueto,
        " días"
    );

    document.getElementById(
        "resultado-total-general"
    ).textContent = formatearMoneda(
        resultados.totalGeneral
    );

    if (resultados.diasCoincidentes > 0) {
        detalleCoincidencia.hidden = false;

        detalleCoincidencia.innerHTML =
            "<strong>Coincidencia aplicada:</strong> " +
            formatearCantidad(resultados.diasCoincidentes) +
            " día(s) coincidieron como descanso semanal y asueto. " +
            "Estos días se calcularon únicamente como asueto laborado.";
    } else {
        detalleCoincidencia.hidden = true;
        detalleCoincidencia.innerHTML = "";
    }

    notaCompensatoria.hidden =
        resultados.diasDescansoCalculados <= 0;

    seccionResultados.hidden = false;

    seccionResultados.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

function actualizarFilaResultado(
    idCantidad,
    idValor,
    idTotal,
    noAplica,
    cantidad,
    valorUnitario,
    total,
    unidad
) {
    const elementoCantidad = document.getElementById(idCantidad);
    const elementoValor = document.getElementById(idValor);
    const elementoTotal = document.getElementById(idTotal);

    if (noAplica) {
        elementoCantidad.textContent = "No aplica";
        elementoValor.textContent = "$0.00";
        elementoTotal.textContent = "$0.00";

        return;
    }

    elementoCantidad.textContent =
        formatearCantidad(cantidad) + unidad;

    elementoValor.textContent =
        formatearMoneda(valorUnitario);

    elementoTotal.textContent =
        formatearMoneda(total);
}

/* =========================================================
   LIMPIAR FORMULARIO
   ========================================================= */

botonLimpiar.addEventListener("click", function () {
    formulario.reset();
    limpiarErrores();

    const configuraciones = [
        {
            casilla: noAplicaDiurnas,
            campo: horasDiurnas,
            contenedor: contenidoDiurnas
        },
        {
            casilla: noAplicaNocturnas,
            campo: horasNocturnas,
            contenedor: contenidoNocturnas
        },
        {
            casilla: noAplicaDescanso,
            campo: diasDescanso,
            contenedor: contenidoDescanso
        },
        {
            casilla: noAplicaAsueto,
            campo: diasAsueto,
            contenedor: contenidoAsueto
        }
    ];

    configuraciones.forEach(function (configuracion) {
        configuracion.casilla.checked = false;
        configuracion.campo.disabled = false;

        configuracion.contenedor.classList.remove(
            "contenido-deshabilitado"
        );
    });

    advertenciaCoincidencia.hidden = true;
    detalleCoincidencia.hidden = true;
    detalleCoincidencia.innerHTML = "";
    notaCompensatoria.hidden = true;
    seccionResultados.hidden = true;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
``