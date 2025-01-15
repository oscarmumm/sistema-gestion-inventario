import { MdClose } from 'react-icons/md'
import { IconContext } from 'react-icons'
import { MdOutlineVisibility } from 'react-icons/md'

import { useContext, useState } from 'react'
import { DataContext } from '../../context/DataContext'
import { AnimatePresence, motion } from 'framer-motion'
import { WarningModal } from './WarningModal'

const newUserFormat = {
    id: '',
    nombreUsuario: '',
    nombre: '',
    apellido: '',
    fechaCreacion: '',
    role: '',
    password: '',
}

export const NewUserModal = ({ closeNewUserModal }) => {
    const { data, setData } = useContext(DataContext)
    const [newUser, setNewUser] = useState(newUserFormat)
    const [warningModalActive, setWarningModalActive] = useState(false)
    const [warningModalMessage, setWarningModalMessage] = useState('')
    const [repeatPass, setRepeatPass] = useState('')
    const [viewPassInputValueActive, setViewPassInputValueActive] =
        useState(false)

    const handleChange = (e) => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value,
        })
    }

    const handleClick = (e) => {
        e.preventDefault()
        closeNewUserModal()
    }

    const closeWarningModal = () => {
        setWarningModalActive(false)
    }

    const guardarUsuario = (e) => {
        e.preventDefault()
        if (
            newUser.nombreUsuario === '' ||
            newUser.nombre === '' ||
            newUser.apellido === '' ||
            newUser.role === '' ||
            newUser.password === ''
        ) {
            setWarningModalMessage('Debe completar todos los campos')
            setWarningModalActive(true)
        } else if (newUser.password !== repeatPass) {
            setWarningModalMessage('Los campos de contraseña deben coincidir')
            setWarningModalActive(true)
        } else {
            newUser.id = Date.now()
            newUser.fechaCreacion = Date.now()
            setData({ ...data, usuarios: [...data.usuarios, newUser] })
            closeNewUserModal()
        }
    }

    const viewPasswordInputValue = (e) => {
        e.preventDefault()
        setViewPassInputValueActive(!viewPassInputValueActive)
    }

    return (
        <motion.div
            className='fixed top-0 left-0 h-screen w-screen flex items-center justify-center modal-main-bg z-50'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
        >
            <motion.form
                className='relative flex flex-col bg-slate-100 py-5 px-10 rounded-md min-w-96'
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100 }}
            >
                <h3 className='text-2xl my-5'>Alta de nuevo usuario:</h3>
                <button
                    className='hover:bg-slate-300 rounded-md absolute top-0 right-0 p-2'
                    onClick={(e) => handleClick(e)}
                >
                    <IconContext.Provider value={{ className: 'w-5 h-5' }}>
                        <MdClose />
                    </IconContext.Provider>
                </button>
                <label className='mb-1' htmlFor=''>
                    Nombre de Usuario
                </label>
                <input
                    autoComplete='off'
                    onChange={handleChange}
                    name='nombreUsuario'
                    value={newUser.nombreUsuario}
                    type='text'
                    className='mb-3 p-2 rounded-md outline-none shadow-lg'
                />
                <label className='mb-1' htmlFor=''>
                    Nombre
                </label>
                <input
                    autoComplete='off'
                    onChange={handleChange}
                    name='nombre'
                    value={newUser.nombre}
                    type='text'
                    className='mb-3 p-2 rounded-md outline-none shadow-lg'
                />
                <label className='mb-1' htmlFor=''>
                    Apellido
                </label>
                <input
                    autoComplete='off'
                    onChange={handleChange}
                    name='apellido'
                    value={newUser.apellido}
                    type='text'
                    className='mb-3 p-2 rounded-md outline-none shadow-lg'
                />
                <label className='mb-1' htmlFor=''>
                    Rol
                </label>
                <select
                    name='role'
                    value={newUser.role}
                    className='mb-3 p-2 outline-none rounded-md shadow-lg'
                    onChange={handleChange}
                >
                    <option value=''>Seleccione el rol del usuario</option>
                    <option value={'employee'}>Usuario</option>
                    <option value={'manager'}>Encargado</option>
                    <option value={'admin'}>Admin</option>
                </select>
                <label className='mb-1' htmlFor=''>
                    Contraseña
                </label>
                <div className='bg-white flex justify-between mb-3 p-2 rounded-md outline-none shadow-lg'>
                    <input
                        autoComplete='off'
                        onChange={handleChange}
                        name='password'
                        value={newUser.password}
                        type={
                            viewPassInputValueActive ? 'text' : 'password'
                        }
                        className='outline-none'
                    />
                    <button onClick={viewPasswordInputValue}>
                        <IconContext.Provider value={{ className: 'w-5 h-5' }}>
                            <MdOutlineVisibility />
                        </IconContext.Provider>
                    </button>
                </div>
                <label className='mb-1' htmlFor=''>
                    Repetir Contraseña
                </label>
                <input
                    autoComplete='off'
                    onChange={(e) => setRepeatPass(e.target.value)}
                    name='repeatPass'
                    value={repeatPass}
                    type='password'
                    className='mb-3 p-2 rounded-md outline-none shadow-lg'
                />
                <div className='flex justify-end mt-10'>
                    <button
                        className='bg-slate-600 hover:bg-slate-500 text-slate-50 p-2 w-24 rounded-md shadow-lg'
                        onClick={handleClick}
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={guardarUsuario}
                        className='bg-slate-700 hover:bg-slate-600 text-slate-50 p-2 w-24 ml-3 rounded-md shadow-lg'
                    >
                        Guardar
                    </button>
                </div>
            </motion.form>
            <AnimatePresence>
                {warningModalActive && (
                    <WarningModal
                        message={warningModalMessage}
                        closeModal={closeWarningModal}
                    />
                )}
            </AnimatePresence>
        </motion.div>
    )
}
