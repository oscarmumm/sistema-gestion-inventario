import headerLogo from '../assets/img/logo/header-logo.png'
import { IconContext } from 'react-icons'
import { MdMenu } from 'react-icons/md'
import { MdPerson } from 'react-icons/md'

export const Header = ({ toggleSidebar }) => {
    const clickOnMenu = () => {
        toggleSidebar()
    }
    return (
        <IconContext.Provider value={{ className: 'w-8 h-8' }}>
            <header className='bg-slate-700 text-slate-200 p-3 h-16 fixed top-0 w-full flex items-center justify-between shadow-lg'>
                <div className='flex items-center'>
                    <button onClick={clickOnMenu}>
                        <MdMenu />
                    </button>
                    <img className='w-10 mx-8' src={headerLogo} />
                    <h1 className='text-xl'>Gestión de Comercio</h1>
                </div>
                <div>
                    <button>
                        <MdPerson />
                    </button>
                </div>
            </header>
        </IconContext.Provider>
    )
}
