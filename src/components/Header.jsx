import { useContext, useState } from 'react'
import headerLogo from '../assets/img/logo/header-logo.png'
import { IconContext } from 'react-icons'
import { MdMenu } from 'react-icons/md'
import { MdPerson } from 'react-icons/md'
import { UserContext } from '../context/UserContext'
import { LoggedUserMenu } from './Modals/LoggedUserMenu'
import { AnimatePresence } from 'framer-motion'

export const Header = ({ toggleSidebar }) => {
    const { user } = useContext(UserContext)
    const [loggedUserMenuActive, setLoggedUserMenuActive] = useState(false)

    const clickOnMenu = () => {
        toggleSidebar()
    }

    const toggleLoggedUserMenu = () => {
        setLoggedUserMenuActive(!loggedUserMenuActive)
    }

    return (
        <IconContext.Provider value={{ className: 'w-8 h-8' }}>
            <header className='bg-slate-700 text-slate-200 p-3 h-16 fixed top-0 w-full flex items-center justify-between shadow-lg z-40'>
                <div className='flex items-center'>
                    <button onClick={clickOnMenu}>
                        <MdMenu />
                    </button>
                    <img className='w-10 mx-8' src={headerLogo} />
                    <h1 className='text-xl'>Gestión de Comercio</h1>
                </div>
                <div>
                    <button onClick={toggleLoggedUserMenu}>
                        <MdPerson />
                    </button>
                </div>
                <AnimatePresence>
                    {loggedUserMenuActive && <LoggedUserMenu />}
                </AnimatePresence>
            </header>
        </IconContext.Provider>
    )
}
