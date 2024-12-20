import { IconContext } from 'react-icons'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { motion } from 'framer-motion'
import { useContext, useState } from 'react'
import { DataContext } from '../context/DataContext'
import { Searchbar } from '../components/Searchbar'
import {
    stringAscSort,
    stringDesSort,
    numericAscSort,
    numericDesSort,
} from '../utils/Utils'

const arrowVariants = {
    asc: { rotate: -180 },
    des: { rotate: 0 },
}

export const ProductList = () => {
    const {data, setData } = useContext(DataContext)
    const [searchResults, setSearchResults] = useState(data.productos)
    const [orderedProducts, setOrderedProducts] = useState(data.productos)
    const [order, setOrder] = useState('')

    const startSearch = (search) => {
        if (search.trim() === '') {
            setOrderedProducts(data.productos)
            setSearchResults(data.productos)
        } else {
            const regex = new RegExp(search.trim(), 'i')
            let temp = data.productos.filter((el) => regex.test(el.nombre))
            setSearchResults(temp)
            setOrderedProducts(temp)
        }
    }

    const resetSearch = () => {
        setSearchResults(data.productos)
        setOrderedProducts(data.productos)
    }

    const sortColumn = (key, isString = false) => {
        const isAsc = order === `${key}Asc`
        const temp = isAsc
            ? (isString ? stringDesSort(searchResults, key) : numericDesSort(searchResults, key))
            : (isString ? stringAscSort(searchResults, key) : numericAscSort(searchResults, key))
        setOrder(isAsc ? `${key}Desc` : `${key}Asc`)
        setOrderedProducts(temp)
    }

    return (
        <div
            className='flex flex-col h-full overflow-auto p-3'
            style={{ maxHeight: 'calc(100vh - 64px)' }}
        >
                <h2 className='text-xl my-5'>Lista de Productos</h2>
            <div className='flex justify-between items-center w-full min-w-max'>
                <div className='flex items-center'>
                    <span className='mr-3'>Búsqueda de Productos:</span>
                    <Searchbar
                        startSearch={startSearch}
                        resetSearch={resetSearch}
                    />
                </div>
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
                                    <button onClick={() => sortColumn('nombre', true)}>
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
                                    <button onClick={() => sortColumn('color', true)}>
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
                                    <button onClick={() => sortColumn('proveedor', true)}>
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
                                    <button onClick={() => sortColumn('precioUnitario')}>
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
                                    <button onClick={() => sortColumn('cantidadPorCaja')}>
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
        </div>
    )
}