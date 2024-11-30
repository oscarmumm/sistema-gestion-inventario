// PRODCUTS ORDER FUNCTIONS

export const orderByNombre = () => {
    if (order === 'nombreAsc') {
        let temp = searchResults.toSorted((a, b) =>
            b.nombre.localeCompare(a.nombre)
        )
        setOrder('nombreDesc')
        setOrderedProducts(temp)
    } else {
        let temp = searchResults.toSorted((a, b) =>
            a.nombre.localeCompare(b.nombre)
        )
        setOrder('nombreAsc')
        setOrderedProducts(temp)
    }
}

export const orderByPrecio = () => {
    if (order === 'precioAsc') {
        let temp = searchResults.toSorted(
            (a, b) => a.precioUnitario - b.precioUnitario
        )
        setOrder('precioDesc')
        setOrderedProducts(temp)
    } else {
        let temp = searchResults.toSorted(
            (a, b) => b.precioUnitario - a.precioUnitario
        )
        setOrder('precioAsc')
        setOrderedProducts(temp)
    }
}

export const orderByColor = () => {
    if (order === 'colorAsc') {
        let temp = searchResults.toSorted((a, b) =>
            b.color.localeCompare(a.color)
        )
        setOrder('colorDesc')
        setOrderedProducts(temp)
    } else {
        let temp = searchResults.toSorted((a, b) =>
            a.color.localeCompare(b.color)
        )
        setOrder('colorAsc')
        setOrderedProducts(temp)
    }
}

export const orderByProveedor = () => {
    if (order === 'proveedorAsc') {
        let temp = searchResults.toSorted((a, b) =>
            b.proveedor.localeCompare(a.proveedor)
        )
        setOrder('proveedorDesc')
        setOrderedProducts(temp)
    } else {
        let temp = searchResults.toSorted((a, b) =>
            a.proveedor.localeCompare(b.proveedor)
        )
        setOrder('proveedorAsc')
        setOrderedProducts(temp)
    }
}

export const orderByCantidad = () => {
    if (order === 'cantidadAsc') {
        let temp = searchResults.toSorted(
            (a, b) => a.cantidadPorCaja - b.cantidadPorCaja
        )
        setOrder('cantidadDesc')
        setOrderedProducts(temp)
    } else {
        let temp = searchResults.toSorted(
            (a, b) => b.cantidadPorCaja - a.cantidadPorCaja
        )
        setOrder('cantidadAsc')
        setOrderedProducts(temp)
    }
}