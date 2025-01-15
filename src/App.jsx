import { motion } from 'framer-motion'
import { useState, useContext } from 'react'
import { DataProvider } from './context/DataContext'
import { BrowserRouter as Router } from 'react-router-dom'
import { AppRoutes } from './routes/Routes'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { UserContext } from './context/UserContext'
import { LogIn } from './pages/LogIn'

import { Sidebar2 } from './components/Sidebar2'

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
                    <div className='bg-gradient-to-b from-sky-50 to-sky-200 flex items-center justify-center h-screen w-screen overflow-auto'>
                        <Sidebar2 />
                        <div className='flex flex-col items-center h-full w-full overflow-auto p-3'>
                            <AppRoutes />
                        </div>
                        <div className='fixed bottom-0 right-2 italic text-slate-700'>
                            <span>Desarrollador: Oscar Mumm</span>
                        </div>
                    </div>
                ) : (
                    <LogIn />
                )}

            </Router>
        </DataProvider>
    )
}

export default App
