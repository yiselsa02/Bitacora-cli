import objectHash from 'object-hash';
import fechas from 'fechas-bitacora-karenn';

import {
    leerNotas,
    guardarNotas,
} from './almacen.js';

const {
    getTimeStamp
} = fechas;

function agregarNota(texto, etiqueta = 'general') {
    if (!texto || !texto.trim()) {
        return {
            ok: false,
            mensaje: `El texto de la nota no puede estar vacío.`
        };
    }

    const notas = leerNotas();
    const textoLimpio = texto.trim();
    const id = objectHash(textoLimpio).slice(0, 8);

    const notaExistente = notas.find(nota => nota.id === id);

    if (notaExistente) {
        return {
            ok: false,
            mensaje: `La nota ya existe. Su id es ${id}.`
        };
    }

    const nuevaNota = {
        id,
        texto: textoLimpio,
        etiqueta,
        fecha: getTimeStamp()
    };

    notas.push(nuevaNota);
    guardarNotas(notas);

    return {
        ok: true,
        mensaje: `Nota guardada correctamente con el id ${id}.`,
        nota: nuevaNota
    };
}

function listarNotas(cantidad = 5) {
    const notas = leerNotas();

    if (!Number.isInteger(cantidad) || cantidad <= 0) {
        cantidad = 5;
    }

    return notas.slice(-cantidad).reverse();
}

function buscarNotas(palabra) {
    const notas = leerNotas();
    const palabraBuscada = palabra.toLowerCase();

    return notas.filter(nota =>
        nota.texto.toLowerCase().includes(palabraBuscada)
    );
}

function borrarNota(id) {
    const notas = leerNotas();
    const indice = notas.findIndex(nota => nota.id === id);

    if (indice === -1) {
        return {
            ok: false,
            mensaje: `No existe una nota con el id ${id}.`
        };
    }

    notas.splice(indice, 1);
    guardarNotas(notas);

    return {
        ok: true,
        mensaje: `La nota con id ${id} fue eliminada correctamente.`
    };
}

export {
    agregarNota,
    listarNotas,
    buscarNotas,
    borrarNota
};