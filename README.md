# PROTOTIPO DE SISTEMA DE GESTIÓN DE COMERCIO

## Descripción

El sistema será una webapp que permitirá gestionar un pequeño negocio. En este caso utilizo como ejemplo un local que comercializa productos de librería.

Este prototipo solo es el Front-end de la app. Sin embargo he incluído los datos y funcionalidades de modo tal que pueda probarse el funcionamiento del sistema.

Es posible acceder como 3 usuarios distintos (en la página de LogIn está automatizado el seteo de las credenciales).
Cada uno de esos usuarios tiene un rol distinto que le brinda acceso a mas niveles de la app, siendo 'usuario' el que 
menos acceso tiene y 'admin' el que tiene todas las funciones disponibles.

La vista de la aplicación no está adaptada para dispositivos móviles porque no es el target del proyecto. No está pensada para usarse en celulares.

## La aplicación tiene varias funcionalidades:

### Home
- Muestra el día de negocio actual, su estado (abierto o cerrado) y permite realizar apertura y cierre del día.
Al realizar el cierre agregará los datos de ventas del día en curso al historial de ventas general.

### Ventas
- Registrar ventas: búsqueda de productos, vista previa del detalle de la venta, selección de medio de pago, toast notification al confirmar venta.
- Ventas de hoy: muestra una tabla con las ventas del día en curso.
- Historial de ventas: muestra las ventas del intervalo de tiempo seleccionado.

### Inventario
- Lista de productos: muestra todos los productos disponibles, indicando descripción, proveedor, precio de compra, precio de venta, stock actual y cantidad por caja.
- Conteo de inventario: permite imprimir una ficha para facilitar el conteo de inventario de forma física, a la vez que permite ingresar dichos datos.
- Diferencia de stock: si se han registrado datos de conteo de inventario el sistema compara los datos de stock según ventas registradas con los ingresados por conteo y muestra las diferencias.

### Proveedores
- Agenda: una lista con todos los proveedores activos
- Realizar pedido: permite la confección de un pedido para proveedores, mostrando el costo de dicho pedido. Al finalizar descarga un pdf mostrando el pedido.
- Historial de pedidos

### Reportes
- Dashboard: un panel donde el personal autorizado puede ver algunos indicadores del día de negocio en curso

### Configuración
- Productos: una tabla similar a la lista de productos, pero con la diferencia de que se pueden modificar productos, eliminarlos o agregar nuevos.
- Proveedores: tabla similar a la de agenda de proveedores, pero que también permite modificarlos, eliminarlos o agregar uno nuevo.
- Usuarios: en este apartado se pueden ver los usuarios disponibles en el sistema, modificarlos, editarlos o eliminarlos.

## Tecnologías utilizadas:
- Vite
- React
- React Router Dom
- React Icons
- Tailwind
- Framer Motion
- html2pdf
- Lenguaje utilizado: Javascript