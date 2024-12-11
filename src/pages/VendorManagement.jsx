import { IconContext } from 'react-icons'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { motion } from 'framer-motion'
import { AnimatePresence } from 'framer-motion'
import { useContext, useState, useEffect } from 'react'
import { DataContext } from '../context/DataContext'
import { SupplierModal } from '../components/Modals/SupplierModal'
import { NewSupplierModal } from '../components/Modals/NewSupplierModal'
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

export const VendorManagement   = () => {
    const { data, setData } = useContext(DataContext)
    const [supplierModalActive, setSupplierModalActive] = useState(false)
    const [newSupplierModalActive, setNewSupplierModalActive] = useState(false)
    const [selectedSupplier, setSelectedSupplier] = useState({})
    const [searchResults, setSearchResults] = useState(data.proveedores)
    const [orderedSuppliers, setOrderedSuppliers] = useState(data.proveedores)
    const [order, setOrder] = useState('')
    const [searchValue, setSearchValue] = useState('')

    // El valor predeterminado para mostrarse en la tabla es el de la lista ordenada (orderedProducts)
    // que por defecto viene con el valor data, es decir, la DB original
    // en caso de que se ingrese un termino de busqueda la lista que se utiliza proviene
    // de los resultados de la busqueda

    useEffect(() => {
        setOrderedSuppliers(data.proveedores)
        setSearchResults(data.proveedores)
    }, [data.proveedores])

    const closeSupplierModal = () => {
        setSupplierModalActive(false)
    }

    const openNewSupplierModal = () => {
        setNewSupplierModalActive(true)
    }

    const closeNewSupplierModal = () => {
        setNewSupplierModalActive(false)
    }

    const startSearch = (search) => {
        if (search.trim() === '') {
            setOrderedSuppliers(data.proveedores)
            setSearchResults(data.proveedores)
        } else {
            const regex = new RegExp(search.trim(), 'i')
            let temp = data.proveedores.filter((el) => regex.test(el.nombre))
            setSearchResults(temp)
            setOrderedSuppliers(temp)
        }
    }

    const resetSearch = () => {
        setSearchResults(data.proveedores)
        setOrderedSuppliers(data.proveedores)
    }

    const sortColumn = (key, isString = false) => {
        const isAsc = order === `${key}Asc`
        const temp = isAsc
            ? (isString ? stringDesSort(searchResults, key) : numericDesSort(searchResults, key))
            : (isString ? stringAscSort(searchResults, key) : numericAscSort(searchResults, key))
        setOrder(isAsc ? `${key}Desc` : `${key}Asc`)
        setOrderedSuppliers(temp)
    }

    return (
        <div
            className='flex flex-col h-full overflow-auto p-3'
            style={{ maxHeight: 'calc(100vh - 64px)' }}
        >
            <div className='flex items-center justify-between max-w-screen-sm'>
                <h2 className='text-xl my-5'>Gestión de Proveedores</h2>
            </div>
            <div className='flex justify-between items-center w-full min-w-max'>
                <div className='flex items-center'>
                    <span className='mr-3'>Búsqueda de Proveedor</span>
                    <Searchbar
                        startSearch={startSearch}
                        resetSearch={resetSearch}
                    />
                </div>
                <button
                    className='bg-green-600 hover:bg-green-500 text-slate-50 p-3 my-3 ml-3 rounded-md shadow-lg'
                    onClick={openNewSupplierModal}
                >
                    Nuevo Proveedor
                </button>
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
                                    Email
                                    <button onClick={() => sortColumn('email', true)}>
                                        <motion.div
                                            animate={
                                                order === 'emailAsc'
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
                                    Dirección
                                    <button onClick={() => sortColumn('direccion', true)}>
                                        <motion.div
                                            animate={
                                                order === 'direccionAsc'
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
                                    Teléfono
                                    <button onClick={() => sortColumn('telefono', true)}>
                                        <motion.div
                                            animate={
                                                order === 'telefonoAsc'
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
                    {orderedSuppliers.map((supplier) => (
                        <tr
                            key={supplier.id}
                            className='hover:bg-slate-200 border-t-slate-200 border-t-2 cursor-pointer'
                            onClick={() => {
                                setSelectedSupplier(supplier)
                                setSupplierModalActive(true)
                            }}
                        >
                            <td className='p-3'>{supplier.nombre}</td>
                            <td className='p-3'>{supplier.email}</td>
                            <td className='p-3'>{supplier.direccion}</td>
                            <td className='p-3'>{supplier.telefono}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <AnimatePresence>
                {supplierModalActive ? (
                    <SupplierModal
                        supplier={selectedSupplier}
                        closeSupplierModal={closeSupplierModal}
                    />
                ) : null}
            </AnimatePresence>
            <AnimatePresence>
                {newSupplierModalActive && (
                    <NewSupplierModal
                        closeNewSupplierModal={closeNewSupplierModal}
                    />
                )}
            </AnimatePresence>
        </div>
    )
}
