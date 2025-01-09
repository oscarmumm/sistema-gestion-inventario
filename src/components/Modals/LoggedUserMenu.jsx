import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export const LoggedUserMenu = () => {
    const { user, logOut } = useContext(UserContext)
    const navigate = useNavigate()

    const clickOnLogOut = () => {
        navigate('/')
        logOut()
    }
    return (
        <motion.div
            className='absolute right-2 top-12 flex flex-col items-center justify-between bg-slate-600 min-h-40 p-5 rounded-xl shadow-xl z-50'
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
        >
            <div className='flex flex-col items-center text-slate-50'>
                <span>Usuario:</span>
                <span className='font-semibold'>{user.username}</span>
            </div>
            <button className='bg-slate-500 hover:bg-slate-400 text-slate-50 p-2 w-32 rounded-md shadow-lg' onClick={clickOnLogOut}>
                Cerrar Sesión
            </button>
        </motion.div>
    )
}
