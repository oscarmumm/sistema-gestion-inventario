import { motion } from 'framer-motion'
import { useState, useContext } from 'react'
import { DataProvider } from './context/DataContext'
import { BrowserRouter as Router } from 'react-router-dom'
import { AppRoutes } from './routes/Routes'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { UserContext } from './context/UserContext'
import { LogIn } from './pages/LogIn'

const sidebarVariants = {
    open: { marginLeft: 0 },
    close: { marginLeft: '-256px' },
}

function App() {
    const { user } = useContext(UserContext) || {}
    const [sidebarStatus, setSidebarStatus] = useState(false)
    const toggleSidebar = () => {
        setSidebarStatus(!sidebarStatus)
    }

    return (
        <DataProvider>
            <Router>
                {user ? (
                    <div className='flex flex-col h-screen w-screen overflow-auto'>
                        <Header toggleSidebar={toggleSidebar} />
                        <main className='flex flex-grow mt-16'>
                            <motion.div
                                variants={sidebarVariants}
                                animate={sidebarStatus ? 'open' : 'close'}
                                style={{ marginLeft: '-256px' }}
                            >
                                <Sidebar />
                            </motion.div>
                            <div className='bg-slate-300 flex-grow'>
                                <AppRoutes />
                            </div>
                        </main>
                    </div>
                ) : (
                    <LogIn />
                )}
            </Router>
        </DataProvider>
    )
}

export default App
