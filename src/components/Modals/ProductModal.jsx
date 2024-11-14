import { IconContext } from 'react-icons'
import { MdClose } from 'react-icons/md'
import { AnimatePresence, motion } from 'framer-motion'
import { useState, useContext } from 'react'
import { ConfirmationModal } from './ConfirmationModal'
import { DataContext } from '../../context/DataContext'

const productFormat = {
    id: '',
    nombre: '',
    color: '',
    proveedor: '',
    precioUnitario: '',
    cantidadPorCaja: '',
}

export const ProductModal = ({ producto, closeModal }) => {
    const { data, setData } = useContext(DataContext)
    const [isDisabled, setIsDisabled] = useState(true)
    const [productEdited, setProductEdited] = useState(producto)
    const [confirmationModalActive, setConfirmationModalActive] =
        useState(false)

    const handleClick = () => {
        closeModal()
    }

    const handleChange = (e) => {
        setProductEdited({
            ...productEdited,
            [e.target.name]: e.target.value,
        })
    }

    const editProduct = () => {
        setIsDisabled(false)
    }

    const saveEditedData = (e) => {
        e.preventDefault()
        let temp = data.map(el => el.id === producto.id ? {
            nombre: productEdited.nombre,
            color: productEdited.color,
            proveedor: productEdited.proveedor,
            precioUnitario: productEdited.precioUnitario,
            cantidadPorCaja: productEdited.cantidadPorCaja,
        } : el)
        setData(temp)
        closeModal()
    }


    const deleteProduct = () => {
        setConfirmationModalActive(true)
    }

    const agreeAction = () => {
        let temp = data.filter((el) => el.id !== producto.id)
        setData(temp)
        closeModal()
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
                            value={productEdited.nombre}
                            onChange={handleChange}
                        />
                        <label className='mb-1' htmlFor=''>
                            Color
                        </label>
                        <input
                            className='mb-3 p-2 rounded-md outline-none shadow-lg'
                            disabled={isDisabled}
                            type='text'
                            name='color'
                            value={productEdited.color}
                            onChange={handleChange}
                        />
                        <label className='mb-1' htmlFor=''>
                            Proveedor
                        </label>
                        <input
                            className='mb-3 p-2 rounded-md outline-none shadow-lg'
                            disabled={isDisabled}
                            type='text'
                            name='proveedor'
                            value={productEdited.proveedor}
                            onChange={handleChange}
                        />
                        <label className='mb-1' htmlFor=''>
                            Precio Unitario
                        </label>
                        <input
                            className='mb-3 p-2 rounded-md outline-none shadow-lg'
                            disabled={isDisabled}
                            type='text'
                            name='precioUnitario'
                            value={productEdited.precioUnitario}
                            onChange={handleChange}
                        />
                        <label className='mb-1' htmlFor=''>
                            Cantidad por caja
                        </label>
                        <input
                            className='mb-3 p-2 rounded-md outline-none shadow-lg'
                            disabled={isDisabled}
                            type='text'
                            name='cantidadPorCaja'
                            value={productEdited.cantidadPorCaja}
                            onChange={handleChange}
                        />
                    </form>
                    <div className='flex justify-end mt-10'>
                        {isDisabled ? (
                            <button
                                className='bg-slate-600 hover:bg-slate-500 text-slate-50 p-2 w-24 rounded-md shadow-lg'
                                onClick={editProduct}
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
                            onClick={deleteProduct}
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
                <AnimatePresence>
                    {confirmationModalActive && (
                        <ConfirmationModal
                            message='¿Está seguro que desea eliminar el producto?'
                            agreeAction={agreeAction}
                            cancelAction={cancelAction}
                            productInfo={producto}
                        />
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    )
}
