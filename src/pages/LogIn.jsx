import { UserContext } from '../context/UserContext'
import { useState, useContext } from 'react'
import { DataContext } from '../context/DataContext'
import { MdOutlineVisibility } from 'react-icons/md'
import { IconContext } from 'react-icons'

export const LogIn = () => {
    const { user, logIn, logOut } = useContext(UserContext)
    const { data, setData } = useContext(DataContext)
    const [userCredentials, setUserCredentials] = useState({
        username: '',
        password: '',
    })
    const [forgottenPassword, setForgottenPassword] = useState(false)
    const [errorMessage, setErrorMessage] = useState()
    const [viewPassInputValueActive, setViewPassInputValueActive] =
        useState(false)

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
    }

    // estas funciones setean las credenciales adecuadas para probar el sistema
    const setAdminCredentials = () => {
        setUserCredentials({ username: 'admin', password: 'hJ.56lK.g' })
    }

    const setManagerCredentials = () => {
        setUserCredentials({ username: 'josegarcia', password: '15afG1.cv' })
    }

    const setEmployeeCredentials = () => {
        setUserCredentials({ username: 'carlosperez', password: 'ta68fgVV1.' })
    }

    const viewPasswordInputValue = (e) => {
        e.preventDefault()
        setViewPassInputValueActive(!viewPassInputValueActive)
    }

    // bg-slate-300
    return (
        <div className='bg-gradient-to-b from-sky-50 to-sky-200  flex flex-col items-center justify-center h-screen w-screen overflow-auto text-slate-800'>
            <div className='flex flex-col items-center mb-10'>
                <h1 className='text-3xl font-semibold mb-2'>
                    Sistema de Gestión de Comercio
                </h1>
                <span className='font-semibold text-xl'>(Prototipo)</span>
            </div>
            <div className='bg-slate-100 py-5 px-10 w-fit rounded-xl min-w-96 shadow-xl'>
                <p className='text-center text-xl my-5'>Iniciar Sesión</p>
                <form className='flex flex-col'>
                    <label className='mb-1' htmlFor=''>
                        Usuario
                    </label>
                    <input
                        className='mb-3 p-2 rounded-md outline-none shadow-lg relative'
                        type='text'
                        name='username'
                        onChange={handleChange}
                        autoComplete='off'
                        value={userCredentials.username}
                    />

                    <label className='mb-1' htmlFor=''>
                        Contraseña
                    </label>
                    <div className='bg-white flex justify-between mb-3 p-2 rounded-md outline-none shadow-lg'>
                        <input
                            className='outline-none'
                            type={
                                viewPassInputValueActive ? 'text' : 'password'
                            }
                            name='password'
                            onChange={handleChange}
                            autoComplete='off'
                            value={userCredentials.password}
                        />
                        <button onClick={viewPasswordInputValue}>
                            <IconContext.Provider
                                value={{ className: 'w-5 h-5' }}
                            >
                                <MdOutlineVisibility />
                            </IconContext.Provider>
                        </button>
                    </div>
                    <span className='w-full text-center text-red-600 font-semibold'>
                        {errorMessage}
                    </span>
                    <div className='flex justify-center mt-5'>
                        <button
                            className='bg-slate-700 hover:bg-sky-300 hover:text-slate-800 text-slate-50 p-2 w-48 ml-3 rounded-md shadow-xl'
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
            <div className='flex flex-col items-center p-3 absolute top-24 right-24 bg-slate-600 rounded-lg shadow-xl text-slate-50'>
                <div className='max-w-36 text-center mb-10 flex flex-col'>
                    <span className='mb-4 font-semibold'>NOTA DEL DESARROLLADOR:</span>
                    <span>
                        Cliquea alguna de estas opciones para setear las
                        credenciales y probar el sistema
                    </span>
                </div>
                <button
                    onClick={setAdminCredentials}
                    className='bg-slate-500 hover:bg-sky-300 hover:text-slate-800 text-slate-50 p-2 w-32 rounded-md shadow-lg mb-3'
                >
                    Admin
                </button>
                <button
                    onClick={setManagerCredentials}
                    className='bg-slate-500 hover:bg-sky-300 hover:text-slate-800 text-slate-50 p-2 w-32 rounded-md shadow-lg mb-3'
                >
                    Encargado
                </button>
                <button
                    onClick={setEmployeeCredentials}
                    className='bg-slate-500 hover:bg-sky-300 hover:text-slate-800 text-slate-50 p-2 w-32 rounded-md shadow-lg'
                >
                    Usuario
                </button>
            </div>
        </div>
    )
}
