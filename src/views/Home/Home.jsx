import { useState } from 'react'
import { motion } from 'framer-motion'
import { Header } from '../../components/Header/Header'
import { Sidebar } from '../../components/Sidebar/Sidebar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Inicio } from '../../components/Sections/Inicio/Inicio'
import { RegistrarVentas } from '../../components/Sections/RegistrarVentas/RegistrarVentas'
import { Productos } from '../../components/Sections/Productos/Productos'
import { Proveedores } from '../../components/Sections/Proveedores/Proveedores'

const sidebarVariants = {
    open: { marginLeft: 0 },
    close: { marginLeft: '-224px' },
}

export const Home = () => {
    const [sidebarStatus, setSidebarStatus] = useState(false)
    const toggleSidebar = () => {
        setSidebarStatus(!sidebarStatus)
    }
    return (
        <>
            <Router>
                <Header toggleSidebar={toggleSidebar} />
                <main className='flex flex-grow mt-16'>
                    <motion.div
                        variants={sidebarVariants}
                        animate={sidebarStatus ? 'open' : 'close'}
                        style={{ marginLeft: '-224px' }}
                    >
                        <Sidebar />
                    </motion.div>
                    <div className='bg-slate-300 flex-grow'>
                        <Routes>
                            <Route path='/' element={<Inicio />} />
                            <Route
                                path='/registrar-ventas'
                                element={<RegistrarVentas />}
                            />
                            <Route path='/productos' element={<Productos />} />
                            <Route path='/proveedores' element={<Proveedores />} />
                        </Routes>
                    </div>
                </main>
            </Router>
        </>
    )
}
