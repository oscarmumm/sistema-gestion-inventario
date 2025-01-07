import {useState} from 'react'
import {motion} from 'framer-motion'
// ICONOS
import {IconContext} from 'react-icons'
import {MdHome} from 'react-icons/md'
import {MdContentPaste} from 'react-icons/md'
import {MdMonetizationOn} from 'react-icons/md'
import {MdSettings} from 'react-icons/md'
import {MdGroup} from 'react-icons/md'
import {MdOutlineDiversity3} from 'react-icons/md'
import {MdDataThresholding} from 'react-icons/md'
import {MdKeyboardArrowDown} from 'react-icons/md'
import {Link} from 'react-router-dom'

const subGroupVariants = {
    open: {opacity: 1, height: 'auto'},
    close: {opacity: 0, height: 0},
}

const arrowVariants = {
    open: {rotate: -180},
    close: {rotate: 0},
}

export const Sidebar = () => {
    const [subGroup1Active, setSubGroup1Active] = useState(false)
    const [subGroup2Active, setSubGroup2Active] = useState(false)
    const [subGroup3Active, setSubGroup3Active] = useState(false)
    const [subGroup4Active, setSubGroup4Active] = useState(false)
    const [subGroup5Active, setSubGroup5Active] = useState(false)
    const [subGroup6Active, setSubGroup6Active] = useState(false)
    const [subGroup7Active, setSubGroup7Active] = useState(false)

    const toggleSub1 = () => {
        setSubGroup1Active(!subGroup1Active)
    }
    const toggleSub2 = () => {
        setSubGroup2Active(!subGroup2Active)
    }
    const toggleSub3 = () => {
        setSubGroup3Active(!subGroup3Active)
    }
    const toggleSub4 = () => {
        setSubGroup4Active(!subGroup4Active)
    }
    const toggleSub5 = () => {
        setSubGroup5Active(!subGroup5Active)
    }
    const toggleSub6 = () => {
        setSubGroup6Active(!subGroup6Active)
    }
    const toggleSub7 = () => {
        setSubGroup7Active(!subGroup7Active)
    }

    return (
        <IconContext.Provider value={{className: 'w-6 h-6'}}>
            <nav
                className="bg-slate-600 text-slate-200 p-5 h-full w-64 overflow-y-auto"
                style={{maxHeight: 'calc(100vh - 64px)'}}>
                <ul className="flex flex-col">
                    <li className="mb-5 hover:text-sky-200">
                        <Link to="/" className="flex items-center">
                            <MdHome />
                            <span className="ml-3">Inicio</span>
                        </Link>
                    </li>
                    <li className="mb-5">
                        <button
                            className="flex items-center hover:text-sky-200"
                            onClick={toggleSub1}>
                            <MdContentPaste />
                            <span className="ml-3">Inventario</span>
                            <motion.div
                                animate={subGroup1Active ? 'open' : 'close'}
                                variants={arrowVariants}
                                transition={{type: 'tween', duration: 0.2}}
                                className="ml-1">
                                <MdKeyboardArrowDown />
                            </motion.div>
                        </button>
                        <motion.ul
                            animate={subGroup1Active ? 'open' : 'close'}
                            variants={subGroupVariants}
                            className="ml-9 h-0 overflow-hidden">
                            <li className="mt-2 hover:text-sky-200">
                                <Link to="/product-list">
                                    Lista de Productos
                                </Link>
                            </li>
                            <li className="mt-2 hover:text-sky-200">
                                <Link to="/inventory-count">
                                    Conteo de Inventario
                                </Link>
                            </li>
                            <li className="mt-2 hover:text-sky-200">
                                <Link to="/stock-difference">
                                    Diferencias de Stock
                                </Link>
                            </li>
                        </motion.ul>
                    </li>
                    <li className="mb-5">
                        <button
                            className="flex items-center hover:text-sky-200"
                            onClick={toggleSub2}>
                            <MdMonetizationOn />
                            <span className="ml-3">Ventas</span>
                            <motion.div
                                animate={subGroup2Active ? 'open' : 'close'}
                                variants={arrowVariants}
                                transition={{type: 'tween', duration: 0.2}}
                                className="ml-1">
                                <MdKeyboardArrowDown />
                            </motion.div>
                        </button>
                        <motion.ul
                            animate={subGroup2Active ? 'open' : 'close'}
                            variants={subGroupVariants}
                            className="ml-9 h-0 overflow-hidden">
                            <li className="mt-3 hover:text-sky-200">
                                <Link to="/register-sale">
                                    Registrar Ventas
                                </Link>
                            </li>

                            <li className="mt-3 hover:text-sky-200">
                                <Link to="/sales-history">
                                    Historial de Ventas
                                </Link>
                            </li>
                        </motion.ul>
                    </li>
                    <li className="mb-5">
                        <button
                            className="flex items-center hover:text-sky-200"
                            onClick={toggleSub3}>
                            <MdOutlineDiversity3 />
                            <span className="ml-3">Proveedores</span>
                            <motion.div
                                animate={subGroup3Active ? 'open' : 'close'}
                                variants={arrowVariants}
                                transition={{type: 'tween', duration: 0.2}}
                                className="ml-1">
                                <MdKeyboardArrowDown />
                            </motion.div>
                        </button>
                        <motion.ul
                            animate={subGroup3Active ? 'open' : 'close'}
                            variants={subGroupVariants}
                            className="ml-9 h-0 overflow-hidden">
                            <li className="mt-3 hover:text-sky-200">
                                <Link to="/vendor-list">
                                    Lista de Proveedores
                                </Link>
                            </li>
                            <li className="mt-3 hover:text-sky-200">
                                <Link to="/purchase-order">
                                    Pedido a Proveedores
                                </Link>
                            </li>
                            <li className="mt-3 hover:text-sky-200">
                                <Link to="/orders-history">
                                    Historial de Pedidos
                                </Link>
                            </li>
                        </motion.ul>
                    </li>
                    <li className="mb-5">
                        <button
                            className="flex items-center hover:text-sky-200"
                            onClick={toggleSub5}>
                            <MdDataThresholding />
                            <span className="ml-3">Reportes</span>
                            <motion.div
                                animate={subGroup5Active ? 'open' : 'close'}
                                variants={arrowVariants}
                                transition={{type: 'tween', duration: 0.2}}
                                className="ml-1">
                                <MdKeyboardArrowDown />
                            </motion.div>
                        </button>
                        <motion.ul
                            animate={subGroup5Active ? 'open' : 'close'}
                            variants={subGroupVariants}
                            className="ml-9 h-0 overflow-hidden">
                            <li className="mt-3 hover:text-sky-200">
                                <Link to="/dashboard">Dashboard</Link>
                            </li>
                        </motion.ul>
                    </li>
                    <li className="mb-5">
                        <button
                            className="flex items-center hover:text-sky-200"
                            onClick={toggleSub6}>
                            <MdSettings />
                            <span className="ml-3">Configuración</span>
                            <motion.div
                                animate={subGroup6Active ? 'open' : 'close'}
                                variants={arrowVariants}
                                transition={{type: 'tween', duration: 0.2}}
                                className="ml-1">
                                <MdKeyboardArrowDown />
                            </motion.div>
                        </button>
                        <motion.ul
                            animate={subGroup6Active ? 'open' : 'close'}
                            variants={subGroupVariants}
                            className="ml-9 h-0 overflow-hidden">
                            <li className="mt-3 hover:text-sky-200">
                                <Link to="/product-management">
                                    Productos
                                </Link>
                            </li>
                            <li className="mt-3 hover:text-sky-200">
                                <Link to="/vendor-management">
                                    Proveedores
                                </Link>
                            </li>
                            <li className="mt-3 hover:text-sky-200">
                                <Link to="/user-management">Usuarios</Link>
                            </li>
                        </motion.ul>
                    </li>
                </ul>
            </nav>
        </IconContext.Provider>
    )
}
