import { useState } from 'react'
import headerLogo from '../assets/img/logo/header-logo.png'
import { IconContext } from 'react-icons'
import { MdMenu } from 'react-icons/md'
import { MdPerson } from 'react-icons/md'
import { MdHome } from 'react-icons/md'
import { MdContentPaste } from 'react-icons/md'
import { MdMonetizationOn } from 'react-icons/md'
import { MdSettings } from 'react-icons/md'
import { MdGroup } from 'react-icons/md'
import { MdOutlineDiversity3 } from 'react-icons/md'
import { MdDataThresholding } from 'react-icons/md'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const submenuVariants = {
    open: { opacity: 1, x: -20, display: 'block' },
    close: { opacity: 0, x: -50, display: 'none' },
}

const linksVariants = {
    open: { opacity: 1, x: -20, display: 'block' },
    close: { opacity: 0, x: -150, display: 'none' },
}

export const Sidebar2 = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [subMenuOpen, setSubMenuOpen] = useState(false)
    const [inventoryMenuOpen, setInventoryMenuOpen] = useState(false)
    const [salesMenuOpen, setSalesMenuOpen] = useState(false)
    const [vendorMenuOpen, setVendorMenuOpen] = useState(false)
    const [reportsMenuOpen, setReportsMenuOpen] = useState(false)

    const openInventoryMenu = () => {
        if (subMenuOpen && !inventoryMenuOpen) {
            setInventoryMenuOpen(true)
            setSalesMenuOpen(false)
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
        } else if (subMenuOpen && salesMenuOpen) {
            setSalesMenuOpen(false)
            setSubMenuOpen(false)
        } else {
            setSubMenuOpen(true)
            setSalesMenuOpen(true)
        }
    }

    return (
        <div className='fixed flex left-0 top-0 p-5 h-full max-h-screen overflow-hidden z-50'>
            <IconContext.Provider value={{ className: 'w-8 h-8' }}>
                <div className='bg-slate-600 p-6 h-full w-20 rounded-xl shadow-xl text-slate-50 flex flex-col items-start justify-between overflow-hidden z-40'>
                    <ul>
                        <li className='flex items-center mb-3'>
                            <button>
                                <Link to='/'>
                                    <MdHome />
                                </Link>
                            </button>
                        </li>
                        <li className='flex items-center mb-3'>
                            <button onClick={openInventoryMenu}>
                                <MdContentPaste />
                            </button>
                        </li>
                        <li className='flex items-center mb-3'>
                            <button onClick={openSalesMenu}>
                                <MdMonetizationOn />
                            </button>
                        </li>
                        <li className='flex items-center mb-3'>
                            <MdOutlineDiversity3 />
                        </li>
                        <li className='flex items-center mb-3'>
                            <MdDataThresholding />
                        </li>
                        <li className='flex items-center mb-3'>
                            <MdSettings />
                        </li>
                    </ul>
                    <div>
                        <MdPerson />
                    </div>
                </div>
                <motion.div
                    className='hidden h-full w-72 p-5 bg-slate-500 text-slate-50 rounded-tr-xl rounded-br-xl shadow-xl z-20'
                    variants={submenuVariants}
                    animate={subMenuOpen ? 'open' : 'close'}
                >
                    <AnimatePresence>
                        {inventoryMenuOpen && (
                            <motion.div
                                variants={linksVariants}
                                animate={inventoryMenuOpen ? 'open' : 'close'}
                                className='pl-10'
                            >
                                <p className='mb-12'>Inventario</p>
                                <ul>
                                    <li className='mt-2 hover:text-sky-200'>
                                        <Link to='/product-list'>
                                            Lista de Productos
                                        </Link>
                                    </li>
                                    <li className='mt-2 hover:text-sky-200'>
                                        <Link to='/inventory-count'>
                                            Conteo de Inventario
                                        </Link>
                                    </li>
                                    <li className='mt-2 hover:text-sky-200'>
                                        <Link to='/stock-difference'>
                                            Diferencias de Stock
                                        </Link>
                                    </li>
                                </ul>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <AnimatePresence>
                        {salesMenuOpen && (
                            <motion.div
                                variants={linksVariants}
                                animate={salesMenuOpen ? 'open' : 'close'}
                                className='pl-10'
                            >
                                <p className='mb-12'>Ventas</p>
                                <ul>
                                    <li className='mt-3 hover:text-sky-200'>
                                        <Link to='/register-sale'>
                                            Registrar Ventas
                                        </Link>
                                    </li>

                                    <li className='mt-3 hover:text-sky-200'>
                                        <Link to='/today-sales-history'>
                                            Ventas de Hoy
                                        </Link>
                                    </li>
                                    <li className='mt-3 hover:text-sky-200'>
                                        <Link to='/sales-history'>
                                            Historial de Ventas
                                        </Link>
                                    </li>
                                </ul>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </IconContext.Provider>
        </div>
    )
}
