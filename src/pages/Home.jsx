import {useState, useContext} from 'react'
import {UserContext} from '../context/UserContext'
import {DataContext} from '../context/DataContext'
import {AnimatePresence} from 'framer-motion'

export const Home = () => {
    const {user, logIn, logOut} = useContext(UserContext)
    const {data, setData} = useContext(DataContext)
    const [userCredentials, setUserCredentials] = useState({
        username: '',
        password: '',
    })
    const handleChange = (e) => {
        setUserCredentials({
            ...userCredentials,
            [e.target.name]: e.target.value,
        })
        console.log(userCredentials)
    }

    const submitClick = (e) => {
        e.preventDefault()
        let temp = data.usuarios.find(
            (user) => user.nombreUsuario === userCredentials.username
        )
        if (temp && temp.password === userCredentials.password) {
            logIn({username: temp.nombreUsuario, role: temp.role})
        } else {
            console.log('Credenciales inválidas')
        }
    }

    const cerrarSesion = () => {
        logOut()
    }

    return (
        <div
            className="flex flex-col h-full overflow-auto p-3 min-w-96 items-center justify-center"
            style={{maxHeight: 'calc(100vh - 64px)'}}>
            <div>
                <h1 className="text-3xl font-bold text-slate-700 my-16">
                    Bienvenido al Sistema de Gestión de Comercio
                </h1>
            </div>
            {user ? (
                <div>
                    <h2>Usuario: </h2>
                    <p>{user.username}</p>
                    <button onClick={cerrarSesion}>Cerrar Sesión</button>
                </div>
            ) : (
                <AnimatePresence>
                    <div className="bg-slate-100 py-5 px-10 rounded-md min-w-96 shadow-lg">
                        <form className="flex flex-col">
                            <label className="mb-1" htmlFor="">
                                Usuario
                            </label>
                            <input
                                className="mb-3 p-2 rounded-md outline-none shadow-lg"
                                type="text"
                                name="username"
                                onChange={handleChange}
                            />
                            <label className="mb-1" htmlFor="">
                                Contraseña
                            </label>
                            <input
                                className="mb-3 p-2 rounded-md outline-none shadow-lg"
                                type="text"
                                name="password"
                                onChange={handleChange}
                            />
                            <span className="w-full text-center my-3">
                                ¿Olvidó su contraseña?
                            </span>
                            <div className="flex justify-center mt-5">
                                <button
                                    className="bg-slate-700 hover:bg-slate-600 text-slate-50 p-2 w-48 ml-3 rounded-md shadow-lg"
                                    onClick={submitClick}>
                                    Iniciar Sesión
                                </button>
                            </div>
                        </form>
                    </div>
                </AnimatePresence>
            )}
            <div className="my-24">
                <p>
                    Si tiene problemas para iniciar sesión consulte al
                    administrador del sistema
                </p>
            </div>
        </div>
    )
}
