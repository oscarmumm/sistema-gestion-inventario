export const db = {
    productos: [
        {
            id: 1,
            descripcion: 'Lapicera Azul',
            proveedor: 'Pelikan',
            precioUnitarioCompra: 1.2,
            precioUnitarioVenta: 2,
            cantidadPorCaja: 50,
            stockActual: 55
        },
        {
            id: 2,
            descripcion: 'Lapicera Negra',
            proveedor: 'Pelikan',
            precioUnitarioCompra: 1.2,
            precioUnitarioVenta: 2,
            cantidadPorCaja: 50,
            stockActual: 110
        },
        {
            id: 3,
            descripcion: 'Lapiz hb',
            proveedor: 'Pelikan',
            precioUnitarioCompra: 0.7,
            precioUnitarioVenta: 1.5,
            cantidadPorCaja: 50,
            stockActual: 75
        },
        {
            id: 4,
            descripcion: 'Goma',
            proveedor: 'Pelikan',
            precioUnitarioCompra: 0.5,
            precioUnitarioVenta: 0.9,
            cantidadPorCaja: 40,
            stockActual: 130
        },
        {
            id: 5,
            descripcion: 'Regla',
            proveedor: 'Pizzini',
            precioUnitarioCompra: 1.5,
            precioUnitarioVenta: 2.3,
            cantidadPorCaja: 20,
            stockActual: 105
        },
        {
            id: 6,
            descripcion: 'Transportador',
            proveedor: 'Pizzini',
            precioUnitarioCompra: 1.5,
            precioUnitarioVenta: 2.3,
            cantidadPorCaja: 20,
            stockActual: 100
        },
        {
            id: 7,
            descripcion: 'Marcador permanente rojo',
            proveedor: 'Sharpie',
            precioUnitarioCompra: 2.5,
            precioUnitarioVenta: 4,
            cantidadPorCaja: 10,
            stockActual: 110
        },
        {
            id: 8,
            descripcion: 'Marcador permanente azul',
            proveedor: 'Sharpie',
            precioUnitarioCompra: 2.4,
            precioUnitarioVenta: 3.9,
            cantidadPorCaja: 10,
            stockActual: 110
        },
        {
            id: 9,
            descripcion: 'Marcador permanente negro',
            proveedor: 'Sharpie',
            precioUnitarioCompra: 2.2,
            precioUnitarioVenta: 3.8,
            cantidadPorCaja: 10,
            stockActual: 100
        },
        {
            id: 10,
            descripcion: 'Cartulina verde',
            proveedor: 'Papelart',
            precioUnitarioCompra: 1,
            precioUnitarioVenta: 1.8,
            cantidadPorCaja: 10,
            stockActual: 80
        },
        {
            id: 11,
            descripcion: 'Cartulina amarilla',
            proveedor: 'Papelart',
            precioUnitarioCompra: 1.2,
            precioUnitarioVenta: 2,
            cantidadPorCaja: 10,
            stockActual: 80
        },
        {
            id: 12,
            descripcion: 'Pack Lapices de Colores',
            proveedor: 'Faber Castell',
            precioUnitarioCompra: 5,
            precioUnitarioVenta: 9,
            cantidadPorCaja: 20,
            stockActual: 210
        },
        {
            id: 13,
            descripcion: 'Mapa Arg Político',
            proveedor: 'Map',
            precioUnitarioCompra: 0.4,
            precioUnitarioVenta: 1.2,
            cantidadPorCaja: 50,
            stockActual: 60
        },
        {
            id: 14,
            descripcion: 'Mapa Arg Relieve',
            proveedor: 'Map',
            precioUnitarioCompra: 0.4,
            precioUnitarioVenta: 1.1,
            cantidadPorCaja: 40,
            stockActual: 60
        },
        {
            id: 15,
            descripcion: 'Sacapuntas',
            proveedor: 'Pizzini',
            precioUnitarioCompra: 0.5,
            precioUnitarioVenta: 1.2,
            cantidadPorCaja: 30,
            stockActual: 110
        },
        {
            id: 16,
            descripcion: 'Cuaderno Cuadriculado',
            proveedor: 'Gloria',
            precioUnitarioCompra: 2.5,
            precioUnitarioVenta: 4.8,
            cantidadPorCaja: 10,
            stockActual: 60
        },
        {
            id: 17,
            descripcion: 'Cuaderno Rayado',
            proveedor: 'Gloria',
            precioUnitarioCompra: 2.5,
            precioUnitarioVenta: 4.8,
            cantidadPorCaja: 10,
            stockActual: 60
        },
        {
            id: 18,
            descripcion: 'Resma A4',
            proveedor: 'Ledesma',
            precioUnitarioCompra: 4,
            precioUnitarioVenta: 10,
            cantidadPorCaja: 5,
            stockActual: 100
        },
        {
            id: 19,
            descripcion: 'Hojas x100 Rayadas',
            proveedor: 'Rivadavia',
            precioUnitarioCompra: 3,
            precioUnitarioVenta: 5.8,
            cantidadPorCaja: 20,
            stockActual: 120
        },
        {
            id: 20,
            descripcion: 'Hojas x100 Cuadriculadas',
            proveedor: 'Rivadavia',
            precioUnitarioCompra: 3,
            precioUnitarioVenta: 5.7,
            cantidadPorCaja: 20,
            stockActual: 120
        },
    ],
    proveedores: [
        {
            id: 1,
            nombre: 'Pelikan',
            email: 'pelikan@pelikan.com',
            direccion: 'Av. Rivadavia 2651',
            telefono: '4966-8365',
        },
        {
            id: 2,
            nombre: 'Rivadavia',
            email: 'contacto@rivadavia.com',
            direccion: 'Av. Alberdi 4618',
            telefono: '5156-8122',
        },
    ],
    ventas: [
        {
            detalles: [
                {
                    id: 16,
                    cantidad: 1,
                    descripcion: 'Cuaderno Cuadriculado',
                    precioUnitario: 2.5,
                    importe: 2.5,
                },
                {
                    id: 17,
                    cantidad: 2,
                    descripcion: 'Cuaderno Rayado',
                    precioUnitario: 2.5,
                    importe: 5,
                },
                {
                    id: 1,
                    cantidad: 5,
                    descripcion: 'Lapicera',
                    precioUnitario: 1.2,
                    importe: 6,
                },
            ],
            fecha: '19/12/2024',
            hora: '13:55',
            id: 1734677742863,
            importe: 13.5,
            metodoDePago: 'Efectivo',
        },
        {
            detalles: [
                {
                    id: 4,
                    cantidad: 1,
                    descripcion: 'Goma',
                    precioUnitario: 0.5,
                    importe: 0.5,
                },
                {
                    id: 3,
                    cantidad: 2,
                    descripcion: 'Lapiz hb',
                    precioUnitario: 0.7,
                    importe: 1.4,
                },
                {
                    id: 15,
                    cantidad: 1,
                    descripcion: 'Sacapuntas',
                    precioUnitario: 0.5,
                    importe: 0.5,
                },
            ],
            fecha: '18/12/2024',
            hora: '16:04',
            id: 1734678272266,
            importe: 2.4,
            metodoDePago: 'QR',
        },
        {
            detalles: [
                {
                    id: 4,
                    cantidad: 3,
                    descripcion: 'Goma',
                    precioUnitario: 0.5,
                    importe: 1.5,
                },
                {
                    id: 15,
                    cantidad: 6,
                    descripcion: 'Sacapuntas',
                    precioUnitario: 0.5,
                    importe: 3,
                },
            ],
            fecha: '20/12/2024',
            hora: '13:16',
            id: 1734678272267,
            importe: 4.5,
            metodoDePago: 'Maestro',
        },
    ],
    usuarios: [
        {
            id: 1,
            nombreUsuario: 'admin',
            nombre: 'Oscar',
            apellido: 'Rodriguez',
            fechaCreacion: 1734678272267,
            role: 'admin',
            password: 'Hola1234'
        }
    ],
    pedidosAProveedores: [
        {
            fechaPedido: "7/1/2025",
            horaPedido: "15:04",
            detallesPedido: 
                [
                    {
                    cantidadAPedir: "3",
                    descripcion: "Lapicera Azul",
                    id: 1 ,
                    proveedor: "Pelikan"
                    }
                ]
        }
    ]
}
