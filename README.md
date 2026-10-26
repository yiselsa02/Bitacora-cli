# Bitácora CLI

Aplicación de consola para registrar notas de aprendizaje usando Node.js.

Permite agregar, listar, buscar y borrar notas. También permite hacer respaldos y exportar las notas a un archivo de texto.

## Instalación

Primero instala las dependencias:

```bash
npm install
```

Para ejecutar el programa:

```bash
npm start
```

## Comandos

| Comando | Para qué sirve | Ejemplo |
|---|---|---|
| `agregar "<texto>" [etiqueta]` | Agrega una nota. | `npm start agregar "Aprendí Node.js" programación` |
| `listar [N]` | Muestra las últimas notas. | `npm start listar 3` |
| `buscar <palabra>` | Busca una palabra en las notas. | `npm start buscar Node` |
| `borrar <id>` | Borra una nota por su id. | `npm start borrar 68187106` |
| `respaldar` | Crea una copia de las notas. | `npm start respaldar` |
| `exportar [carpeta]` | Exporta las notas a otra carpeta. | `npm start exportar C:\Users\Lenovo\Documentos` |
| `ayuda` | Muestra los comandos disponibles. | `npm start ayuda` |

## Reflexión

### 1. ¿Por qué elegiste CommonJS o ES Modules?

Elegí ES Modules porque quería trabajar usando `import` y `export`.  
En el `package.json` se usa `"type": "module"` para poder trabajar de esta forma.

### 2. ¿Por qué se importan diferente `fs`, `object-hash`, `fechas` y `notas.js`?

`object-hash` y `fechas-bitacora-karenn` son paquetes instalados, mientras que `notas.js` es un archivo del proyecto.  
Por eso los paquetes se escriben por su nombre y `notas.js` lleva `./`.

### 3. ¿Por qué `data/notas.json` puede cambiar de ubicación?

Porque una ruta escrita directamente puede depender de la carpeta desde donde se ejecuta el programa.  
En este proyecto se toma como referencia la ubicación del propio proyecto.

### 4. ¿Por qué `node_modules/` no se sube a Git?

Porque ocupa mucho espacio y se puede volver a crear fácilmente.  
Si otra persona descarga el proyecto, solo necesita ejecutar `npm install`.

### 5. ¿Qué diferencia viste al importar tu paquete CommonJS?

Mi proyecto usa una forma diferente para importar porque está hecho con ES Modules.  
El paquete de fechas usa CommonJS, así que lo importé como un módulo completo y de ahí tomé la función que necesitaba.