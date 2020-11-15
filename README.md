## BandNames backend

Servidor para el proyecto BandNames. El proyecto fue migrado a `typescript` .

### Levantar el servidor

``` shell_script
    npm run dev
```


## Inicializar un entorno de desarrollo para express con `typescript`

### Crear un proyecto de express en typescript:

1. Ininicializar el entorno

``` shell_script
    npm init
    tsc init
```

2. Instalar dependencias

``` shell_script
npm install express && npm install --save-dev typescript nodemon @types/node @types/express
```


2. Configurar el `package.json` de la siguiente forma:

``` json
{
    "main": "dist/index.js",
    "scripts": {
    "build": "tsc",
    "start": "tsc & node .",
    "dev": "tsc -w & nodemon .",
    }
}
```

3. El archivo `tsconfig.json` debe estar configurado de la siguiente manera:

``` json
{
  "compilerOptions": {
    "module": "commonjs",
    "esModuleInterop": true,
    "target": "es6",
    "noImplicitAny": true,
    "moduleResolution": "node",
    "sourceMap": true,
    "outDir": "dist",
    "baseUrl": ".",
    "paths": {
      "*": ["node_modules/*"]
    }
  },
  "include": ["src/**/*"]
}
```

4. Crear el archivo principal del servidor:

``` shell_script
mkdir src && touch src/index.ts
```
