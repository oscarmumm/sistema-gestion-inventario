import { useState, useContext } from 'react'
import { motion } from 'framer-motion'
import { IconContext } from 'react-icons'
import { MdOutlineVisibility } from 'react-icons/md'
import { MdClose } from 'react-icons/md'
import { DataContext } from '../../context/DataContext'
import { AnimatePresence } from 'framer-motion'
import { ConfirmationModal } from './ConfirmationModal'

export const UserManagementModal = ({ user, closeUserManagementModal }) => {
    const { data, setData } = useContext(DataContext)
    const [isDisabled, setIsDisabled] = useState(true)
    const [userEdited, setUserEdited] = useState(user)
    const [confirmationModalActive, setConfirmationModalActive] =
        useState(false)
    const [repeatPass, setRepeatPass] = useState('')
    const [viewPassInputValueActive, setViewPassInputValueActive] =
        useState(false)

    const clickOnCloseBtn = () => {
        closeUserManagementModal()
    }

    const handleChange = (e) => {
        setUserEdited({
            ...userEdited,
            [e.target.name]: e.target.value,
        })
    }

    const editUser = () => {
        setIsDisabled(false)
    }

    const clickOnCancel = () => {
        setIsDisabled(true)
    }

    const saveEditedData = (e) => {
        e.preventDefault()
        let temp = data.usuarios.map((el) =>
            el.id === user.id
                ? {
                      id: user.id,
                      nombreUsuario: userEdited.nombreUsuario,
                      nombre: userEdited.nombre,
                      apellido: userEdited.apellido,
                      fechaCreacion: user.fechaCreacion,
                      role: userEdited.role,
                      password: userEdited.password,
                  }
                : el
        )
        setData({
            ...data,
            usuarios: temp,
        })
        closeUserManagementModal()
    }

    const deleteUser = () => {
        setConfirmationModalActive(true)
    }

    const agreeAction = () => {
        let temp = data.usuarios.filter((el) => el.id !== user.id)
        setData({
            ...data,
            usuarios: temp,
        })
        setConfirmationModalActive(false)
        closeUserManagementModal()
    }

    const cancelAction = () => {
        setConfirmationModalActive(false)
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
            <motion.div
                className='relative bg-slate-100 py-5 px-10 rounded-md min-w-96'
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100 }}
            >
                <button
                    className='hover:bg-slate-300 rounded-md absolute top-0 right-0 p-2'
                    onClick={clickOnCloseBtn}
                >
                    <IconContext.Provider value={{ className: 'w-5 h-5' }}>
                        <MdClose />
                    </IconContext.Provider>
                </button>
                <h3 className='text-2xl my-5'>Información del Usuario</h3>
                <div>
                    <form className='flex flex-col'>
                        <label className='mb-1' htmlFor=''>
                            Nombre de Usuario
                        </label>
                        <input
                            className='mb-3 p-2 rounded-md outline-none shadow-lg'
                            disabled={isDisabled}
                            type='text'
                            name='nombreUsuario'
                            value={userEdited.nombreUsuario}
                            onChange={handleChange}
                        />
                        <label className='mb-1' htmlFor=''>
                            Nombre
                        </label>
                        <input
                            className='mb-3 p-2 rounded-md outline-none shadow-lg'
                            disabled={isDisabled}
                            type='text'
                            name='nombre'
                            value={userEdited.nombre}
                            onChange={handleChange}
                        />
                        <label className='mb-1' htmlFor=''>
                            Apellido
                        </label>
                        <input
                            className='mb-3 p-2 rounded-md outline-none shadow-lg'
                            disabled={isDisabled}
                            type='text'
                            name='apellido'
                            value={userEdited.apellido}
                            onChange={handleChange}
                        />
                        <label className='mb-1' htmlFor=''>
                            Rol
                        </label>
                        <select
                            name='role'
                            value={userEdited.role}
                            className='mb-3 p-2 outline-none rounded-md shadow-lg'
                            onChange={handleChange}
                            disabled={isDisabled}
                        >
                            <option value=''>
                                Seleccione el rol del usuario
                            </option>
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
                                value={userEdited.password}
                                type={
                                    viewPassInputValueActive
                                        ? 'text'
                                        : 'password'
                                }
                                disabled={isDisabled}
                                className='outline-none'
                            />
                            {!isDisabled && (
                                <button onClick={viewPasswordInputValue}>
                                    <IconContext.Provider
                                        value={{ className: 'w-5 h-5' }}
                                    >
                                        <MdOutlineVisibility />
                                    </IconContext.Provider>
                                </button>
                            )}
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
                            disabled={isDisabled}
                            className='mb-3 p-2 rounded-md outline-none shadow-lg'
                        />
                    </form>
                    {isDisabled ? (
                        <div className='flex justify-end mt-10'>
                            <button
                                className='bg-slate-600 hover:bg-slate-500 text-slate-50 p-2 w-24 rounded-md shadow-lg'
                                onClick={editUser}
                            >
                                Editar
                            </button>
                            <button
                                className='bg-slate-700 hover:bg-slate-600 text-slate-50 p-2 w-24 ml-3 rounded-md shadow-lg'
                                onClick={deleteUser}
                            >
                                Eliminar
                            </button>
                        </div>
                    ) : (
                        <div className='flex justify-end mt-10'>
                            <button
                                className='bg-slate-600 hover:bg-slate-500 text-slate-50 p-2 w-24 rounded-md shadow-lg'
                                onClick={clickOnCancel}
                            >
                                Cancelar
                            </button>
                            <button
                                className='bg-slate-600 hover:bg-slate-500 text-slate-50 p-2 w-24 ml-3 rounded-md shadow-lg'
                                onClick={saveEditedData}
                            >
                                Guardar
                            </button>
                        </div>
                    )}
                </div>
            </motion.div>
            <AnimatePresence>
                {confirmationModalActive && (
                    <ConfirmationModal
                        message={[
                            '¿Está seguro que desea eliminar el usuario?',
                        ]}
                        agreeAction={agreeAction}
                        cancelAction={cancelAction}
                        userInfo={user}
                    />
                )}
            </AnimatePresence>
        </motion.div>
    )
}
