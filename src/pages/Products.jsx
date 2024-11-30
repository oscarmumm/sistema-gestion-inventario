import { IconContext } from 'react-icons'
import { MdOutlineSearch } from 'react-icons/md'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { MdReplay } from 'react-icons/md'
import { ProductModal } from '../components/Modals/ProductModal'
import { motion } from 'framer-motion'
import { AnimatePresence } from 'framer-motion'
import { useContext, useState, useEffect } from 'react'
import { NewProductModal } from '../components/Modals/NewProductModal'
import { DataContext } from '../context/DataContext'

const arrowVariants = {
    asc: { rotate: -180 },
    des: { rotate: 0 },
}

export const Products = () => {
    const { data, setData } = useContext(DataContext)
    const [productModalActive, setProductModalActive] = useState(false)
    const [newProductModalActive, setNewProductModalActive] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState({})
    const [searchResults, setSearchResults] = useState(data.productos)
    const [orderedProducts, setOrderedProducts] = useState(data.productos)
    const [order, setOrder] = useState('')
    const [searchValue, setSearchValue] = useState('')

    // El valor predeterminado para mostrarse en la tabla es el de la lista ordenada (orderedProducts)
    // que por defecto viene con el valor data, es decir, la DB original
    // en caso de que se ingrese un termino de busqueda la lista que se utiliza proviene
    // de los resultados de la busqueda

    useEffect(() => {
        setOrderedProducts(data.productos)
        setSearchResults(data.productos)
    }, [data.productos])

    const closeModal = () => {
        setProductModalActive(false)
    }

    const openNewProductModal = () => {
        setNewProductModalActive(true)
    }

    const closeNewProductModal = () => {
        setNewProductModalActive(false)
    }

    const searchProduct = (search) => {
        if (searchValue.trim() === '') {
            setOrderedProducts(data.productos)
            setSearchResults(data.productos)
        } else {
            // CORREGIR LA LINEA UTILIZANDO REGEX PARA FLEXIBILIZAR LA BUSQUEDA, IGNORANDO MAYUSCULAS Y ESPACIOS, ETC
            // let temp = data.filter((el) => el.nombre === `/^\\s*${search}\s*$/i`)
            const regex = new RegExp(search.trim(), 'i')
            let temp = data.productos.filter((el) => regex.test(el.nombre))
            setSearchResults(temp)
            setOrderedProducts(temp)
        }
    }

    const resetSearch = () => {
        setSearchResults(data.productos)
        setOrderedProducts(data.productos)
        setSearchValue('')
    }

    const orderByNombre = () => {
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

    const orderByPrecio = () => {
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

    const orderByColor = () => {
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

    const orderByProveedor = () => {
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

    const orderByCantidad = () => {
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

    return (
        <div
            className='flex flex-col h-full overflow-auto p-3'
            style={{ maxHeight: 'calc(100vh - 64px)' }}
        >
            <div className='flex items-center justify-between'>
                <h2 className='text-xl my-5'>Productos</h2>
                <button
                    className='bg-green-600 hover:bg-green-500 text-slate-50 p-3 my-5 rounded-md shadow-lg'
                    onClick={openNewProductModal}
                >
                    Nuevo Producto
                </button>
            </div>
            {/* ----------SEARCHBAR-------- */}
            <div className='flex my-3 rounded-md shadow-lg'>
                <IconContext.Provider
                    value={{ className: 'text-slate-200 w-8 h-8' }}
                >
                    <input
                        className='p-3 flex-grow rounded-l-md outline-none'
                        type='text'
                        placeholder='nombre del producto...'
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    {searchValue && (
                        <button
                            className='px-3 bg-orange-600 rounded-l-md'
                            onClick={resetSearch}
                        >
                            <MdReplay />
                        </button>
                    )}
                    <button
                        className='px-3 bg-slate-600 rounded-r-md'
                        onClick={() => searchProduct(searchValue)}
                    >
                        <MdOutlineSearch />
                    </button>
                </IconContext.Provider>
            </div>
            <table className='bg-slate-50 text-center min-w-fit'>
                <thead className='bg-slate-500 text-slate-200'>
                    <IconContext.Provider
                        value={{ className: 'text-slate-200 w-7 h-7' }}
                    >
                        <tr>
                            <th className='p-3'>
                                <div className='flex items-center justify-center'>
                                    Nombre
                                    <button onClick={orderByNombre}>
                                        <motion.div
                                            animate={
                                                order === 'nombreAsc'
                                                    ? 'asc'
                                                    : 'desc'
                                            }
                                            variants={arrowVariants}
                                            transition={{
                                                type: 'tween',
                                                duration: 0.2,
                                            }}
                                        >
                                            <MdKeyboardArrowDown />
                                        </motion.div>
                                    </button>
                                </div>
                            </th>
                            <th className='p-3'>
                                <div className='flex items-center justify-center'>
                                    Color
                                    <button onClick={orderByColor}>
                                        <motion.div
                                            animate={
                                                order === 'colorAsc'
                                                    ? 'asc'
                                                    : 'desc'
                                            }
                                            variants={arrowVariants}
                                            transition={{
                                                type: 'tween',
                                                duration: 0.2,
                                            }}
                                        >
                                            <MdKeyboardArrowDown />
                                        </motion.div>
                                    </button>
                                </div>
                            </th>
                            <th className='p-3'>
                                <div className='flex items-center justify-center'>
                                    Proveedor
                                    <button onClick={orderByProveedor}>
                                        <motion.div
                                            animate={
                                                order === 'proveedorAsc'
                                                    ? 'asc'
                                                    : 'desc'
                                            }
                                            variants={arrowVariants}
                                            transition={{
                                                type: 'tween',
                                                duration: 0.2,
                                            }}
                                        >
                                            <MdKeyboardArrowDown />
                                        </motion.div>
                                    </button>
                                </div>
                            </th>
                            <th className='p-3'>
                                <div className='flex items-center justify-center'>
                                    Precio unitario
                                    <button onClick={orderByPrecio}>
                                        <motion.div
                                            animate={
                                                order === 'precioAsc'
                                                    ? 'asc'
                                                    : 'desc'
                                            }
                                            variants={arrowVariants}
                                            transition={{
                                                type: 'tween',
                                                duration: 0.2,
                                            }}
                                        >
                                            <MdKeyboardArrowDown />
                                        </motion.div>
                                    </button>
                                </div>
                            </th>
                            <th className='p-3'>
                                <div className='flex items-center justify-center'>
                                    Cantidad por caja
                                    <button onClick={orderByCantidad}>
                                        <motion.div
                                            animate={
                                                order === 'cantidadAsc'
                                                    ? 'asc'
                                                    : 'desc'
                                            }
                                            variants={arrowVariants}
                                            transition={{
                                                type: 'tween',
                                                duration: 0.2,
                                            }}
                                        >
                                            <MdKeyboardArrowDown />
                                        </motion.div>
                                    </button>
                                </div>
                            </th>
                        </tr>
                    </IconContext.Provider>
                </thead>
                <tbody>
                    {orderedProducts.map((product) => (
                        <tr
                            key={product.id}
                            className='hover:bg-slate-200 border-t-slate-200 border-t-2 cursor-pointer'
                            onClick={() => {
                                setSelectedProduct(product)
                                setProductModalActive(true)
                            }}
                        >
                            <td className='p-3'>{product.nombre}</td>
                            <td className='p-3'>{product.color}</td>
                            <td className='p-3'>{product.proveedor}</td>
                            <td className='p-3'>$ {product.precioUnitario}</td>
                            <td className='p-3'>{product.cantidadPorCaja}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* BUTTONS FOR PAGINATION */}
            {/* <div className='my-3'>
                <button> Atras </button>
                <button> Adelante </button>
            </div> */}
            <AnimatePresence>
                {productModalActive ? (
                    <ProductModal
                        producto={selectedProduct}
                        closeModal={closeModal}
                    />
                ) : null}
            </AnimatePresence>
            <AnimatePresence>
                {newProductModalActive && (
                    <NewProductModal
                        closeNewProductModal={closeNewProductModal}
                    />
                )}
            </AnimatePresence>
        </div>
    )
}
