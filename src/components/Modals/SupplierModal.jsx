import { IconContext } from 'react-icons'
import { MdClose } from 'react-icons/md'
import { AnimatePresence, motion } from 'framer-motion'
import { useState, useContext } from 'react'
import { ConfirmationModal } from './ConfirmationModal'
import { DataContext } from '../../context/DataContext'

const supplierFormat = {
    id: '',
    nombre: '',
    email: '',
    direccion: '',
    telefono: '',
}

export const SupplierModal = ({ supplier, closeSupplierModal }) => {
    const { data, setData } = useContext(DataContext)
    const [isDisabled, setIsDisabled] = useState(true)
    const [editedSupplier, setEditedSupplier] = useState(supplier)
    const [confirmationModalActive, setConfirmationModalActive] =
        useState(false)

    const handleClick = () => {
        closeSupplierModal()
    }

    const handleChange = (e) => {
        setEditedSupplier({
            ...editedSupplier,
            [e.target.name]: e.target.value,
        })
    }

    const editSupplier = () => {
        setIsDisabled(false)
    }

    const saveEditedData = (e) => {
        e.preventDefault()
        let temp = data.proveedores.map((el) =>
            el.id === supplier.id
                ? {
                      id: editedSupplier.id,
                      nombre: editedSupplier.nombre,
                      email: editedSupplier.email,
                      direccion: editedSupplier.direccion,
                      telefono: editedSupplier.telefono,
                  }
                : el
        )
        setData({
            ...data,
            proveedores: temp,
        })
        closeSupplierModal()
    }

    const deleteSupplier = () => {
        setConfirmationModalActive(true)
    }

    const agreeAction = () => {
        let temp = data.proveedores.filter((el) => el.id !== supplier.id)
        setData({
            ...data,
            proveedores: temp,
        })
        setConfirmationModalActive(false)
        closeSupplierModal()
    }

    const cancelAction = () => {
        setConfirmationModalActive(false)
    }

    return (
        <motion.div
            className='fixed top-0 left-0 h-screen w-screen flex items-center justify-center modal-main-bg'
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
                    onClick={handleClick}
                >
                    <IconContext.Provider value={{ className: 'w-5 h-5' }}>
                        <MdClose />
                    </IconContext.Provider>
                </button>
                <h3 className='text-2xl my-5'>Detalles del producto:</h3>
                <div>
                    <form className='flex flex-col'>
                        <label className='mb-1' htmlFor=''>
                            Nombre
                        </label>
                        <input
                            className='mb-3 p-2 rounded-md outline-none shadow-lg'
                            disabled={isDisabled}
                            type='text'
                            name='nombre'
                            value={editedSupplier.nombre}
                            onChange={handleChange}
                        />
                        <label className='mb-1' htmlFor=''>
                            Email
                        </label>
                        <input
                            className='mb-3 p-2 rounded-md outline-none shadow-lg'
                            disabled={isDisabled}
                            type='text'
                            name='email'
                            value={editedSupplier.email}
                            onChange={handleChange}
                        />
                        <label className='mb-1' htmlFor=''>
                            Dirección
                        </label>
                        <input
                            className='mb-3 p-2 rounded-md outline-none shadow-lg'
                            disabled={isDisabled}
                            type='text'
                            name='direccion'
                            value={editedSupplier.direccion}
                            onChange={handleChange}
                        />
                        <label className='mb-1' htmlFor=''>
                            Teléfono
                        </label>
                        <input
                            className='mb-3 p-2 rounded-md outline-none shadow-lg'
                            disabled={isDisabled}
                            type='text'
                            name='telefono'
                            value={editedSupplier.telefono}
                            onChange={handleChange}
                        />
                    </form>
                    <div className='flex justify-end mt-10'>
                        {isDisabled ? (
                            <button
                                className='bg-slate-600 hover:bg-slate-500 text-slate-50 p-2 w-24 rounded-md shadow-lg'
                                onClick={editSupplier}
                            >
                                Editar
                            </button>
                        ) : (
                            <button
                                className='bg-slate-600 hover:bg-slate-500 text-slate-50 p-2 w-24 rounded-md shadow-lg'
                                onClick={saveEditedData}
                            >
                                Guardar
                            </button>
                        )}
                        <button
                            className='bg-slate-700 hover:bg-slate-600 text-slate-50 p-2 w-24 ml-3 rounded-md shadow-lg'
                            onClick={deleteSupplier}
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
            </motion.div>
            <AnimatePresence>
                {confirmationModalActive && (
                    <ConfirmationModal
                        message={['¿Está seguro que desea eliminar el proveedor?']}
                        agreeAction={agreeAction}
                        cancelAction={cancelAction}
                        supplierInfo={supplier}
                    />
                )}
            </AnimatePresence>
        </motion.div>
    )
}
