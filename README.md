# Ecommerce - Plant Green

API REST de comercio electrónico con funciones de administración de productos, usuarios, carrito de compras, autenticación basada en roles y generación de comprobantes.

## Tabla de contenidos

- [Requisitos Previos](#item1)
- [Instalación](#item2)
- [Uso](#item3)
- [Estructura del Proyecto](#item4)
- [Configuración](#item4)
- [Postman](#item5)

<a id="item1"></a>

## Requisitos previos

- Node.js: Asegúrate de tener Node.js instalado en tu máquina.
- MongoDB

  [Subir](#top)

<a id="item2"></a>

## Instalación

- Clona este repositorio en tu máquina local utilizando el siguiente comando:

```
   $ git clone https://github.com/maurogarro73/proyectoFinal2-Backend-MauroGarro
```

- Ingresa al directorio del proyecto:

```
   $ cd tu-repo
```

- Instala las dependencias:

```
   $ npm install
```

- Configura las variables de entorno en un archivo .env:

```
   .env.example
```

[Subir](#top)

<a id="item3"></a>

## Uso

1. Rutas que devuelven información en formato JSON:

- API de Productos: Accede a las rutas relacionadas con la gestión de productos en

  ```
  /api/products
  ```

- API de Carritos: para gestionar los carritos de compras y realizar operaciones relacionadas.
  ```
  /api/carts
  ```
- API de Usuarios: están diseñadas para la gestión de usuarios, lo que incluye autenticación y funciones relacionadas.
  ```
  /api/users
  ```

2. Rutas que devuelven vistas HTML:

- Vistas de Productos: Accede a las rutas relacionadas con la gestión de productos que pueden incluir detalles de productos y otras vistas relacionadas en:
  ```
  /products
  ```
- Carritos de Compras: Accede a las páginas de carritos de compras para visualizar y gestionar los elementos en el carrito.
  ```
  /carts
  ```
- Productos en Tiempo Real: la carga de productos se realiza en tiempo real utilizando WebSockets.
  ```
  /realtimeproducts
  ```
- Chat en Vivo: Accede al chat en vivo para interactuar con otros usuarios en tiempo real:
  ```
  /chat
  ```
- Ruta de Autenticación: Accede a la ruta de autenticación para iniciar sesión y registrarse en la aplicación:
  ```
  /auth
  ```
  [Subir](#top)

<a id="item4"></a>

## Estructura del Proyecto

La estructura del proyecto se organiza de la siguiente manera:

```
  ├── /src
  │   ├── config
  │   ├── controllers
  │   ├── DAO
  │   │    ├── classes
  │   │    ├── DTO
  │   │    ├── fileSystem
  │   │    ├── models
  │   ├── data
  │   ├── docs
  │   │     ├── Carts
  │   │     ├── Producs
  │   ├── middleware
  │   ├── public
  │   │       ├── css
  │   │       ├── img
  │   │       ├── js
  │   ├── routes
  │   ├── services
  │   │       ├── errors
  │   ├── utils
  │   ├── views
  │   │       ├── layouts
  │   ├── app.js
  │   ├── testFaker.js
  │   ├── utils.js
  ├── /test
  ├── package.json
  ├── package-lock.json
  ├── .env.example
```

[Subir](#top)

<a id="item4"></a>

## Configuración

En el archivo .env.example encontraras las variables de entorno que deberas configurar en un archivo .env para poder ejecutar el proyecto.

[Subir](#top)

<a id="item5"></a>

## Postman

Link de la coleccion de postman para probar las rutas de la api

[![Run in Postman](https://run.pstmn.io/button.svg)](https://documenter.getpostman.com/view/27127581/2s93sdZBu3)

[Subir](#top)
