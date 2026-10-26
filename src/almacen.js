import fs from 'fs';
import path from 'path';

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

export {
    leerNotas,
    guardarNotas,
    registrarAccion
};