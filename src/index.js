import {
    agregarNota,
    listarNotas,
    buscarNotas,
    borrarNota
} from './notas.js';

import {
    registrarAccion
} from './almacen.js';

const argumentos = process.argv.slice(2);
const comando = argumentos[0];

function mostrarAyuda() {
    console.log(`
Uso de Bitácora CLI:

agregar "<texto>" [etiqueta]  Guarda una nueva nota.
listar [N]                    Muestra las últimas N notas.
buscar <palabra>              Busca notas por palabra.
borrar <id>                   Elimina una nota por su id.
ayuda                         Muestra esta ayuda.
`);
}

switch (comando) {
    case 'agregar': {
        const texto = argumentos[1];
        const etiqueta = argumentos[2] || 'general';

        const resultado = agregarNota(texto, etiqueta);
        console.log(`${resultado.mensaje}`);

        registrarAccion('agregar', resultado.mensaje);
        break;
    }

    case 'listar': {
        let cantidad = argumentos[1];

        if (cantidad === undefined) {
            cantidad = 5;
        } else {
            cantidad = Number(cantidad);

            if (!Number.isInteger(cantidad) || cantidad <= 0) {
                console.log(`La cantidad indicada no es válida. Se usarán 5 notas.`);
                cantidad = 5;
            }
        }

        const notas = listarNotas(cantidad);

        if (notas.length === 0) {
            console.log(`No hay notas para mostrar.`);
        } else {
            notas.forEach(nota => {
                console.log(`${nota.id} | ${nota.texto} | ${nota.etiqueta} | ${nota.fecha}`);
            });
        }

        registrarAccion('listar', `Se mostraron ${notas.length} notas.`);
        break;
    }

    case 'buscar': {
        const palabra = argumentos[1];

        if (!palabra) {
            console.log(`Debes indicar una palabra para buscar.`);
            registrarAccion('buscar', 'Palabra no indicada.');
            break;
        }

        const notas = buscarNotas(palabra);

        if (notas.length === 0) {
            console.log(`No se encontraron notas que contengan "${palabra}".`);
        } else {
            notas.forEach(nota => {
                console.log(`${nota.id} | ${nota.texto} | ${nota.etiqueta} | ${nota.fecha}`);
            });
        }

        registrarAccion('buscar', `Se encontraron ${notas.length} notas.`);
        break;
    }

    case 'borrar': {
        const id = argumentos[1];

        if (!id) {
            console.log(`Debes indicar el id de la nota que quieres borrar.`);
            registrarAccion('borrar', 'Id no indicado.');
            break;
        }

        const resultado = borrarNota(id);
        console.log(`${resultado.mensaje}`);

        registrarAccion('borrar', resultado.mensaje);
        break;
    }

    case 'ayuda':
    case undefined:
        mostrarAyuda();
        registrarAccion(comando || 'ninguno', 'Se mostró la ayuda.');
        break;

    default:
        console.log(`El comando "${comando}" no existe.`);
        mostrarAyuda();
        registrarAccion(comando, 'Comando no reconocido.');
        break;
}