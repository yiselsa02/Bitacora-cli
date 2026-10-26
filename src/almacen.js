import fs from 'fs';
import path from 'path';
import os from 'os';

function obtenerRutaDatos() {
    const carpetaDatos = path.join(import.meta.dirname, '..', 'data');

    if (!fs.existsSync(carpetaDatos)) {
        fs.mkdirSync(carpetaDatos);
    }

    return carpetaDatos;
}

function leerNotas() {
    const carpetaDatos = obtenerRutaDatos();
    const archivoNotas = path.join(carpetaDatos, 'notas.json');

    if (!fs.existsSync(archivoNotas)) {
        fs.writeFileSync(archivoNotas, '[]');
        return [];
    }

    try {
        const contenido = fs.readFileSync(archivoNotas, 'utf8');
        return JSON.parse(contenido);
    } catch (error) {
        console.log(`El archivo notas.json está dañado o no contiene un formato válido.`);
        return [];
    }
}

function guardarNotas(notas) {
    const carpetaDatos = obtenerRutaDatos();
    const archivoNotas = path.join(carpetaDatos, 'notas.json');

    fs.writeFileSync(archivoNotas, JSON.stringify(notas, null, 2));
}

function registrarAccion(comando, resultado) {
    const carpetaDatos = obtenerRutaDatos();
    const archivoLog = path.join(carpetaDatos, 'bitacora.log');
    const fecha = Date.now();

    fs.appendFileSync(
        archivoLog,
        `${fecha} | ${comando} | ${resultado}\n`
    );
}

function respaldarNotas() {
    const carpetaDatos = obtenerRutaDatos();
    const archivoNotas = path.join(carpetaDatos, 'notas.json');
    const carpetaRespaldos = path.join(import.meta.dirname, '..', 'respaldos');

    if (!fs.existsSync(carpetaRespaldos)) {
        fs.mkdirSync(carpetaRespaldos);
    }

    const fecha = Date.now();
    const archivoRespaldo = path.join(
        carpetaRespaldos,
        `notas_${fecha}.json`
    );

    const contenido = fs.readFileSync(archivoNotas, 'utf8');
    fs.writeFileSync(archivoRespaldo, contenido);

    return archivoRespaldo;
}

function exportarNotas(carpetaDestino) {
    if (!carpetaDestino) {
        carpetaDestino = os.homedir();
    }

    if (!path.isAbsolute(carpetaDestino)) {
        return {
            ok: false,
            mensaje: `La ruta de destino debe ser absoluta.`
        };
    }

    if (!fs.existsSync(carpetaDestino)) {
        return {
            ok: false,
            mensaje: `La carpeta de destino no existe.`
        };
    }

    const carpetaSalida = path.join(import.meta.dirname, '..', 'salida');

    if (!fs.existsSync(carpetaSalida)) {
        fs.mkdirSync(carpetaSalida);
    }

    const archivoNotas = path.join(obtenerRutaDatos(), 'notas.json');
    const notas = JSON.parse(fs.readFileSync(archivoNotas, 'utf8'));

    let contenido = '';

    notas.forEach(nota => {
        contenido += `ID: ${nota.id}\n`;
        contenido += `Texto: ${nota.texto}\n`;
        contenido += `Etiqueta: ${nota.etiqueta}\n`;
        contenido += `Fecha: ${nota.fecha}\n`;
        contenido += `\n`;
    });

    const archivoExportacion = path.join(
        carpetaSalida,
        'exportacion.txt'
    );

    fs.writeFileSync(archivoExportacion, contenido);

    const archivoDestino = path.join(
        carpetaDestino,
        'exportacion.txt'
    );

    try {
        fs.renameSync(archivoExportacion, archivoDestino);
    } catch (error) {
        if (error.code === 'EXDEV') {
            fs.copyFileSync(archivoExportacion, archivoDestino);
            fs.unlinkSync(archivoExportacion);
        } else {
            throw error;
        }
    }

    return {
        ok: true,
        mensaje: `Exportación realizada correctamente en ${archivoDestino}.`
    };
}

export {
    leerNotas,
    guardarNotas,
    registrarAccion,
    respaldarNotas,
    exportarNotas
};