import {useContext, useState} from 'react'
import {UserContext} from '../context/UserContext'
import {IconContext} from 'react-icons'
import {MdPerson} from 'react-icons/md'
import {MdHome} from 'react-icons/md'
import {MdContentPaste} from 'react-icons/md'
import {MdMonetizationOn} from 'react-icons/md'
import {MdSettings} from 'react-icons/md'
import {MdOutlineDiversity3} from 'react-icons/md'
import {MdDataThresholding} from 'react-icons/md'
import {MdKeyboardArrowLeft} from 'react-icons/md'
import {motion} from 'framer-motion'
import {Link} from 'react-router-dom'

const submenuVariants = {
    open: {opacity: 1, x: -20, display: 'block'},
    close: {opacity: 0, x: -60, display: 'none'},
}

const linksVariants = {
    open: {opacity: 1, display: 'block', height: '100px'},
    close: {opacity: 0, display: 'none', height: 0},
}

export const Sidebar2 = () => {
    const {user, logOut} = useContext(UserContext)
    const [subMenuOpen, setSubMenuOpen] = useState(false)
    const [inventoryMenuOpen, setInventoryMenuOpen] = useState(false)
    const [salesMenuOpen, setSalesMenuOpen] = useState(false)
    const [vendorMenuOpen, setVendorMenuOpen] = useState(false)
    const [reportsMenuOpen, setReportsMenuOpen] = useState(false)
    const [configurationMenuOpen, setConfigurationMenuOpen] = useState(false)

    const openInventoryMenu = () => {
        if (subMenuOpen && !inventoryMenuOpen) {
            setInventoryMenuOpen(true)
            setSalesMenuOpen(false)
            setVendorMenuOpen(false)
            setConfigurationMenuOpen(false)
            setReportsMenuOpen(false)
        } else if (subMenuOpen && inventoryMenuOpen) {
            setInventoryMenuOpen(false)
            setSubMenuOpen(false)
        } else {
            setSubMenuOpen(true)
            setInventoryMenuOpen(true)
        }
    }

    const openSalesMenu = () => {
        if (subMenuOpen && !salesMenuOpen) {
            setSalesMenuOpen(true)
            setInventoryMenuOpen(false)
            setVendorMenuOpen(false)
            setConfigurationMenuOpen(false)
            setReportsMenuOpen(false)
        } else if (subMenuOpen && salesMenuOpen) {
            setSalesMenuOpen(false)
            setSubMenuOpen(false)
        } else {
            setSubMenuOpen(true)
            setSalesMenuOpen(true)
        }
    }

    const openVendorMenu = () => {
        if (subMenuOpen && !vendorMenuOpen) {
            setVendorMenuOpen(true)
            setSalesMenuOpen(false)
            setInventoryMenuOpen(false)
            setConfigurationMenuOpen(false)
            setReportsMenuOpen(false)
        } else if (subMenuOpen && vendorMenuOpen) {
            setVendorMenuOpen(false)
            setSubMenuOpen(false)
        } else {
            setSubMenuOpen(true)
            setVendorMenuOpen(true)
        }
    }

    const openReportsMenu = () => {
        if (subMenuOpen && !reportsMenuOpen) {
            setReportsMenuOpen(true)
            setSalesMenuOpen(false)
            setInventoryMenuOpen(false)
            setVendorMenuOpen(false)
            setConfigurationMenuOpen(false)
        } else if (subMenuOpen && reportsMenuOpen) {
            setReportsMenuOpen(false)
            setSubMenuOpen(false)
        } else {
            setSubMenuOpen(true)
            setReportsMenuOpen(true)
        }
    }
    const openConfigMenu = () => {
        if (subMenuOpen && !configurationMenuOpen) {
            setConfigurationMenuOpen(true)
            setSalesMenuOpen(false)
            setInventoryMenuOpen(false)
            setVendorMenuOpen(false)
            setReportsMenuOpen(false)
        } else if (subMenuOpen && configurationMenuOpen) {
            setConfigurationMenuOpen(false)
            setSubMenuOpen(false)
        } else {
            setSubMenuOpen(true)
            setConfigurationMenuOpen(true)
        }
    }

    const closeAll = () => {
        subMenuOpen &&
            (setSubMenuOpen(false),
            setConfigurationMenuOpen(false),
            setSalesMenuOpen(false),
            setVendorMenuOpen(false),
            setInventoryMenuOpen(false),
            setReportsMenuOpen(false))
    }

    const clickOnUser = () => {
        setSubMenuOpen(!subMenuOpen)
    }

    const cerrarSesion = () => {
        logOut()
    }

    return (
        <div className="fixed flex left-0 top-0 p-5 h-full max-h-screen overflow-hidden z-50">
            <IconContext.Provider value={{className: 'w-8 h-8'}}>
                <div className="bg-slate-600 p-6 h-full w-20 rounded-xl shadow-xl text-slate-50 flex flex-col items-start justify-between overflow-hidden z-40">
                    <ul>
                        <li className="flex items-center mb-5">
                            <button
                                onClick={closeAll}
                                className="hover:text-sky-400">
                                <Link to="/">
                                    <MdHome />
                                </Link>
                            </button>
                        </li>
                        <li className="flex items-center mb-5 hover:text-sky-400">
                            <button onClick={openSalesMenu}>
                                <MdMonetizationOn />
                            </button>
                        </li>
                        <li className="flex items-center mb-5 hover:text-sky-400">
                            <button onClick={openInventoryMenu}>
                                <MdContentPaste />
                            </button>
                        </li>
                        <li className="flex items-center mb-5 hover:text-sky-400">
                            <button onClick={openVendorMenu}>
                                <MdOutlineDiversity3 />
                            </button>
                        </li>
                        <li className="flex items-center mb-5 hover:text-sky-400">
                            <button onClick={openReportsMenu}>
                                <MdDataThresholding />
                            </button>
                        </li>
                        <li className="flex items-center mb-5 hover:text-sky-400">
                            <button onClick={openConfigMenu}>
                                <MdSettings />
                            </button>
                        </li>
                    </ul>
                    <div>
                        <button
                            onClick={clickOnUser}
                            className="hover:text-sky-400">
                            <MdPerson />
                        </button>
                    </div>
                </div>
                <motion.div
                    className="hidden h-full w-72 p-5 bg-slate-500 text-slate-50 rounded-tr-xl rounded-br-xl shadow-xl z-20"
                    variants={submenuVariants}
                    animate={subMenuOpen ? 'open' : 'close'}>
                    <div className="p-4 absolute bottom-0 left-0 flex justify-between w-full">
                        <div className="flex flex-col ml-5">
                            <span>Usuario:</span>
                            <span>{user.username}</span>
                        </div>
                        <Link
                            className="bg-slate-700 hover:bg-sky-300 hover:text-slate-800 text-slate-50 font-semibold p-2 w-32 ml-3 rounded-lg shadow-xl text-center flex items-center justify-center"
                            onClick={cerrarSesion}
                            to="/">
                            Cerrar Sesión
                        </Link>
                    </div>
                    <div className="absolute right-0 top-0 p-5 hover:text-sky-400">
                        <button onClick={closeAll}>
                            <MdKeyboardArrowLeft />
                        </button>
                    </div>

                    <motion.div
                        className="pl-10 hidden"
                        animate={inventoryMenuOpen ? 'open' : 'close'}
                        variants={linksVariants}>
                        <p className="mb-16 text-xl font-semibold">
                            Inventario
                        </p>
                        <ul>
                            <li className="mt-5 hover:text-sky-200">
                                <Link to="/product-list" onClick={closeAll}>
                                    Lista de Productos
                                </Link>
                            </li>
                            <li className="mt-5 hover:text-sky-200">
                                <Link to="/inventory-count" onClick={closeAll}>
                                    Conteo de Inventario
                                </Link>
                            </li>
                            <li className="mt-5 hover:text-sky-200">
                                <Link to="/stock-difference" onClick={closeAll}>
                                    Diferencias de Stock
                                </Link>
                            </li>
                        </ul>
                    </motion.div>

                    <motion.div
                        className="pl-10 hidden"
                        animate={salesMenuOpen ? 'open' : 'close'}
                        variants={linksVariants}>
                        <p className="mb-16 text-xl font-semibold">Ventas</p>
                        <ul>
                            <li className="mt-5 hover:text-sky-200">
                                <Link to="/register-sale" onClick={closeAll}>
                                    Registrar Ventas
                                </Link>
                            </li>

                            <li className="mt-5 hover:text-sky-200">
                                <Link
                                    to="/today-sales-history"
                                    onClick={closeAll}>
                                    Ventas de Hoy
                                </Link>
                            </li>
                            <li className="mt-5 hover:text-sky-200">
                                <Link to="/sales-history" onClick={closeAll}>
                                    Historial de Ventas
                                </Link>
                            </li>
                        </ul>
                    </motion.div>
                    <motion.div
                        className="pl-10 hidden"
                        animate={vendorMenuOpen ? 'open' : 'close'}
                        variants={linksVariants}>
                        <p className="mb-16 text-xl font-semibold">
                            Proveedores
                        </p>
                        <ul>
                            <li className="mt-5 hover:text-sky-200">
                                <Link to="/vendor-list" onClick={closeAll}>
                                    Agenda
                                </Link>
                            </li>
                            <li className="mt-5 hover:text-sky-200">
                                <Link to="/purchase-order" onClick={closeAll}>
                                    Realizar pedido
                                </Link>
                            </li>
                            <li className="mt-5 hover:text-sky-200">
                                <Link to="/orders-history" onClick={closeAll}>
                                    Historial de Pedidos
                                </Link>
                            </li>
                        </ul>
                    </motion.div>

                    <motion.div
                        className="pl-10 hidden"
                        animate={reportsMenuOpen ? 'open' : 'close'}
                        variants={linksVariants}>
                        <p className="mb-16 text-xl font-semibold">Reportes</p>
                        <ul>
                            <li className="mt-5 hover:text-sky-200">
                                <Link to="/dashboard" onClick={closeAll}>
                                    Dashboard
                                </Link>
                            </li>
                        </ul>
                    </motion.div>
                    <motion.div
                        className="pl-10 hidden"
                        animate={configurationMenuOpen ? 'open' : 'close'}
                        variants={linksVariants}>
                        <p className="mb-16 text-xl font-semibold">
                            Configuración
                        </p>
                        <ul>
                            <li className="mt-5 hover:text-sky-200">
                                <Link
                                    to="/product-management"
                                    onClick={closeAll}>
                                    Productos
                                </Link>
                            </li>
                            <li className="mt-5 hover:text-sky-200">
                                <Link
                                    to="/vendor-management"
                                    onClick={closeAll}>
                                    Proveedores
                                </Link>
                            </li>
                            <li className="mt-5 hover:text-sky-200">
                                <Link to="/user-management" onClick={closeAll}>
                                    Usuarios
                                </Link>
                            </li>
                        </ul>
                    </motion.div>
                </motion.div>
            </IconContext.Provider>
        </div>
    )
}
