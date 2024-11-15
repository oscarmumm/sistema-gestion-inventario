import { IconContext } from 'react-icons'
import { MdOutlineSearch } from 'react-icons/md'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { MdReplay } from 'react-icons/md'
import { ProductModal } from '../../Modals/ProductModal'
import { motion } from 'framer-motion'
import { AnimatePresence } from 'framer-motion'
import { useContext, useState, useEffect } from 'react'
import { NewProductModal } from '../../Modals/NewProductModal'
import { DataContext } from '../../../context/DataContext'
import { ModalNuevoProveedor } from '../../Modals/ModalNuevoProveedor'
import { SupplierModal } from '../../Modals/SupplierModal'

const arrowVariants = {
    asc: { rotate: -180 },
    des: { rotate: 0 },
}

export const Proveedores = () => {
    const { data, setData } = useContext(DataContext)
    const [supplierModalActive, setSupplierModalActive] = useState(false)
    const [modalNuevoProveedorActivo, setModalNuevoProveedorActivo] = useState(false)
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

    const abrirModalNuevoProveedor = () => {
        setModalNuevoProveedorActivo(true)
    }

    const cerrarModalNuevoProveedor = () => {
        setModalNuevoProveedorActivo(false)
    }

    const searchSupplier = (search) => {
        if (searchValue.trim() === '') {
            setOrderedSuppliers(data.proveedores)
            setSearchResults(data.proveedores)
        } else {
            // CORREGIR LA LINEA UTILIZANDO REGEX PARA FLEXIBILIZAR LA BUSQUEDA, IGNORANDO MAYUSCULAS Y ESPACIOS, ETC
            // let temp = data.filter((el) => el.nombre === `/^\\s*${search}\s*$/i`)
            const regex = new RegExp(search.trim(), 'i')
            let temp = data.proveedores.filter((el) => regex.test(el.nombre))
            setSearchResults(temp)
            setOrderedSuppliers(temp)
        }
    }

    const resetSearch = () => {
        setSearchResults(data.proveedores)
        setOrderedSuppliers(data.proveedores)
        setSearchValue('')
    }

    const ordenarPorNombre = () => {
        if (order === 'nombreAsc') {
            let temp = searchResults.toSorted((a, b) =>
                b.nombre.localeCompare(a.nombre)
            )
            setOrder('nombreDesc')
            setOrderedSuppliers(temp)
        } else {
            let temp = searchResults.toSorted((a, b) =>
                a.nombre.localeCompare(b.nombre)
            )
            setOrder('nombreAsc')
            setOrderedSuppliers(temp)
        }
    }


    const ordenarPorEmail = () => {
        if (order === 'emailAsc') {
            let temp = searchResults.toSorted((a, b) =>
                b.email.localeCompare(a.email)
            )
            setOrder('emailDesc')
            setOrderedSuppliers(temp)
        } else {
            let temp = searchResults.toSorted((a, b) =>
                a.email.localeCompare(b.email)
            )
            setOrder('emailAsc')
            setOrderedSuppliers(temp)
        }
    }

    const ordenarPorDireccion = () => {
        if (order === 'direccionAsc') {
            let temp = searchResults.toSorted((a, b) =>
                b.direccion.localeCompare(a.direccion)
            )
            setOrder('direccionDesc')
            setOrderedSuppliers(temp)
        } else {
            let temp = searchResults.toSorted((a, b) =>
                a.direccion.localeCompare(b.direccion)
            )
            setOrder('direccionAsc')
            setOrderedSuppliers(temp)
        }
    }

    const ordenarPorTelefono = () => {
        if (order === 'telefonoAsc') {
            let temp = searchResults.toSorted((a, b) =>
                b.telefono.localeCompare(a.telefono)
            )
            setOrder('telefonoDesc')
            setOrderedSuppliers(temp)
        } else {
            let temp = searchResults.toSorted((a, b) =>
                a.telefono.localeCompare(b.telefono)
            )
            setOrder('telefonoAsc')
            setOrderedSuppliers(temp)
        }
    }

    return (
        <div
            className='flex flex-col h-full overflow-auto p-3'
            style={{ maxHeight: 'calc(100vh - 64px)' }}
        >
            <div className='flex items-center justify-between'>
                <h2 className='text-xl my-5'>Agenda de Proveedores</h2>
                <button
                    className='bg-green-600 hover:bg-green-500 text-slate-50 p-3 my-5 rounded-md shadow-lg'
                    onClick={abrirModalNuevoProveedor}
                >
                    Nuevo Proveedor
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
                        onClick={() => searchSupplier(searchValue)}
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
                                    <button onClick={ordenarPorNombre}>
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
                                    <button onClick={ordenarPorEmail}>
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
                                    <button onClick={ordenarPorDireccion}>
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
                                    <button onClick={ordenarPorTelefono}>
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
                {modalNuevoProveedorActivo && (
                    <ModalNuevoProveedor
                    cerrarModalNuevoProveedor={cerrarModalNuevoProveedor}
                    />
                )}
            </AnimatePresence>
        </div>
    )
}