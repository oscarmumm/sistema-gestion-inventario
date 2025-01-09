import { useState, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { DataContext } from '../context/DataContext'
import { AnimatePresence } from 'framer-motion'

export const Home = () => {
    const { user, logIn, logOut } = useContext(UserContext)
    const { data, setData } = useContext(DataContext)
    const [userCredentials, setUserCredentials] = useState({
        username: '',
        password: '',
    })
    const handleChange = (e) => {
        setUserCredentials({
            ...userCredentials,
            [e.target.name]: e.target.value,
        })
    }

    const submitClick = (e) => {
        e.preventDefault()
        let temp = data.usuarios.find(
            (user) => user.nombreUsuario === userCredentials.username
        )
        if (temp && temp.password === userCredentials.password) {
            logIn({ username: temp.nombreUsuario, role: temp.role })
        } else {
            console.log('Credenciales inválidas')
        }
    }

    const cerrarSesion = () => {
        logOut()
    }

    return (
        <div
            className='flex flex-col h-full overflow-auto p-3 min-w-96 items-center justify-center'
            style={{ maxHeight: 'calc(100vh - 64px)' }}
        >
            <div>
                <h1 className='text-3xl font-semibold text-slate-700 my-16'>
                    Bienvenido al Sistema de Gestión de Comercio
                </h1>
            </div>
        </div>
    )
}
