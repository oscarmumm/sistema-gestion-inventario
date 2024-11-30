import { MdClose } from 'react-icons/md'
import { IconContext } from 'react-icons'
import { useContext, useState } from 'react'
import { DataContext } from '../../context/DataContext'
import { motion } from 'framer-motion'

const formatoNuevoProveedor = {
    id: '',
    nombre: '',
    email: '',
    direccion: '',
    telefono: '',
}

export const NewSupplierModal = ({ closeNewSupplierModal }) => {
    const { data, setData } = useContext(DataContext)
    const [nuevoProveedor, setNuevoProveedor] = useState(formatoNuevoProveedor)

    const handleChange = (e) => {
        setNuevoProveedor({
            ...nuevoProveedor,
            [e.target.name]: e.target.value,
        })
    }

    const handleClick = (e) => {
        e.preventDefault()
        closeNewSupplierModal()
    }

    const guardarProducto = (e) => {
        e.preventDefault()
        nuevoProveedor.id = Date.now()
        setData({ ...data, proveedores: [...data.proveedores, nuevoProveedor] })
        closeNewSupplierModal()
    }

    return (
        <motion.div
            className='fixed top-0 left-0 h-screen w-screen flex items-center justify-center modal-main-bg'
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
                <h3 className='text-2xl my-5'>Alta de nuevo proveedor:</h3>
                <button
                    className='hover:bg-slate-300 rounded-md absolute top-0 right-0 p-2'
                    onClick={(e) => handleClick(e)}
                >
                    <IconContext.Provider value={{ className: 'w-5 h-5' }}>
                        <MdClose />
                    </IconContext.Provider>
                </button>
                <label className='mb-1' htmlFor=''>
                    Nombre
                </label>
                <input
                    onChange={handleChange}
                    name='nombre'
                    value={nuevoProveedor.nombre}
                    type='text'
                    className='mb-3 p-2 rounded-md outline-none shadow-lg'
                />
                <label className='mb-1' htmlFor=''>
                    Email
                </label>
                <input
                    onChange={handleChange}
                    name='email'
                    value={nuevoProveedor.email}
                    type='text'
                    className='mb-3 p-2 rounded-md outline-none shadow-lg'
                />
                <label className='mb-1' htmlFor=''>
                    Dirección
                </label>
                <input
                    onChange={handleChange}
                    name='direccion'
                    value={nuevoProveedor.direccion}
                    type='text'
                    className='mb-3 p-2 rounded-md outline-none shadow-lg'
                />
                <label className='mb-1' htmlFor=''>
                    Teléfono
                </label>
                <input
                    onChange={handleChange}
                    name='telefono'
                    value={nuevoProveedor.telefono}
                    type='text'
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
                        onClick={guardarProducto}
                        className='bg-slate-700 hover:bg-slate-600 text-slate-50 p-2 w-24 ml-3 rounded-md shadow-lg'
                    >
                        Guardar
                    </button>
                </div>
            </motion.form>
        </motion.div>
    )
}