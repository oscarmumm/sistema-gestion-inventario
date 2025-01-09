import { UserContext } from '../context/UserContext'
import { useState, useContext } from 'react'
import { DataContext } from '../context/DataContext'

export const LogIn = () => {
    const { user, logIn, logOut } = useContext(UserContext)
    const { data, setData } = useContext(DataContext)
    const [userCredentials, setUserCredentials] = useState({
        username: '',
        password: '',
    })
    const [forgottenPassword, setForgottenPassword] = useState(false)
    const [errorMessage, setErrorMessage] = useState()

    const handleChange = (e) => {
        setUserCredentials({
            ...userCredentials,
            [e.target.name]: e.target.value,
        })
    }

    const submitClick = (e) => {
        e.preventDefault()
        let auth = data.usuarios.find(
            (usuario) => usuario.nombreUsuario === userCredentials.username
        )
        if (auth && auth.password === userCredentials.password) {
            logIn({ username: auth.nombreUsuario, role: auth.role })
        } else {
            setErrorMessage('Datos de inicio de sesión incorrectos')
        }
        console.log(user)
    }

    const cerrarSesion = () => {
        logOut()
    }

    return (
        <div className='flex flex-col items-center justify-center h-screen w-screen overflow-auto bg-slate-300 text-slate-800'>
            <h1 className='text-3xl font-semibold  mb-10'>
                Sistema de Gestión de Comercio
            </h1>
            <div className='bg-slate-100 py-5 px-10 w-fit rounded-xl min-w-96 shadow-xl'>
                <p className='text-center text-xl my-5'>Iniciar Sesión</p>
                <form className='flex flex-col'>
                    <label className='mb-1' htmlFor=''>
                        Usuario
                    </label>
                    <input
                        className='mb-3 p-2 rounded-md outline-none shadow-lg'
                        type='text'
                        name='username'
                        onChange={handleChange}
                    />
                    <label className='mb-1' htmlFor=''>
                        Contraseña
                    </label>
                    <input
                        className='mb-3 p-2 rounded-md outline-none shadow-lg'
                        type='text'
                        name='password'
                        onChange={handleChange}
                    />
                    <span className='w-full text-center my-3'>
                        ¿Olvidó su contraseña?
                    </span>
                    <span className='w-full text-center text-red-600 font-semibold'>
                        {errorMessage}
                    </span>
                    <div className='flex justify-center mt-5'>
                        <button
                            className='bg-slate-700 hover:bg-slate-600 text-slate-50 p-2 w-48 ml-3 rounded-md shadow-lg'
                            onClick={submitClick}
                        >
                            Iniciar Sesión
                        </button>
                    </div>
                </form>
            </div>
            <div className='mt-24'>
                <p>
                    Si tiene problemas para iniciar sesión consulte al
                    administrador del sistema
                </p>
            </div>
        </div>
    )
}
