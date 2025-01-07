import {MdClose} from 'react-icons/md'
import {IconContext} from 'react-icons'
import {useContext, useState} from 'react'
import {DataContext} from '../../context/DataContext'
import {AnimatePresence, motion} from 'framer-motion'
import {WarningModal} from './WarningModal'

const newProductFormat = {
    id: '',
    descripcion: '',
    proveedor: '',
    precioUnitarioCompra: '',
    precioUnitarioVenta: '',
    cantidadPorCaja: '',
}

export const NewProductModal = ({closeNewProductModal}) => {
    const {data, setData} = useContext(DataContext)
    const [newProduct, setNewProduct] = useState(newProductFormat)
    const [warningModalActive, setWarningModalActive] = useState(false)
    const [warningModalMessage, setWarningModalMessage] = useState('')

    const handleChange = (e) => {
        setNewProduct({
            ...newProduct,
            [e.target.name]: e.target.value,
        })
    }

    const handleClick = (e) => {
        e.preventDefault()
        closeNewProductModal()
    }

    const closeWarningModal = () => {
        setWarningModalActive(false)
    }

    const guardarProducto = (e) => {
        e.preventDefault()
        if (
            newProduct.descripcion === '' ||
            newProduct.proveedor === '' ||
            newProduct.cantidadPorCaja === '' ||
            newProduct.precioUnitarioCompra === '' ||
            newProduct.precioUnitarioVenta === ''
        ) {
            setWarningModalMessage('Debe completar todos los campos')
            setWarningModalActive(true)
        } else {
            newProduct.id = Date.now()
            setData({...data, productos: [...data.productos, newProduct]})
            closeNewProductModal()
        }
    }

    return (
        <motion.div
            className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center modal-main-bg"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.2}}>
            <motion.form
                className="relative flex flex-col bg-slate-100 py-5 px-10 rounded-md min-w-96"
                initial={{opacity: 0, y: 100}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: 100}}>
                <h3 className="text-2xl my-5">Alta de nuevo producto:</h3>
                <button
                    className="hover:bg-slate-300 rounded-md absolute top-0 right-0 p-2"
                    onClick={(e) => handleClick(e)}>
                    <IconContext.Provider value={{className: 'w-5 h-5'}}>
                        <MdClose />
                    </IconContext.Provider>
                </button>
                <label className="mb-1" htmlFor="">
                    Descripción
                </label>
                <input
                    autoComplete="off"
                    onChange={handleChange}
                    name="descripcion"
                    value={newProduct.descripcion}
                    type="text"
                    className="mb-3 p-2 rounded-md outline-none shadow-lg"
                />
                <label className="mb-1" htmlFor="">
                    Proveedor
                </label>
                <input
                    autoComplete="off"
                    onChange={handleChange}
                    name="proveedor"
                    value={newProduct.proveedor}
                    type="text"
                    className="mb-3 p-2 rounded-md outline-none shadow-lg"
                />
                <label className="mb-1" htmlFor="">
                    Precio unitario Compra
                </label>
                <input
                    autoComplete="off"
                    onChange={handleChange}
                    name="precioUnitarioCompra"
                    value={newProduct.precioUnitarioCompra}
                    type="text"
                    className="mb-3 p-2 rounded-md outline-none shadow-lg"
                />
                <label className="mb-1" htmlFor="">
                    Precio unitario Venta
                </label>
                <input
                    autoComplete="off"
                    onChange={handleChange}
                    name="precioUnitarioVenta"
                    value={newProduct.precioUnitarioVenta}
                    type="text"
                    className="mb-3 p-2 rounded-md outline-none shadow-lg"
                />
                <label className="mb-1" htmlFor="">
                    Cantidad por caja
                </label>
                <input
                    autoComplete="off"
                    onChange={handleChange}
                    name="cantidadPorCaja"
                    value={newProduct.cantidadPorCaja}
                    type="text"
                    className="mb-3 p-2 rounded-md outline-none shadow-lg"
                />
                <div className="flex justify-end mt-10">
                    <button
                        className="bg-slate-600 hover:bg-slate-500 text-slate-50 p-2 w-24 rounded-md shadow-lg"
                        onClick={handleClick}>
                        Cancelar
                    </button>
                    <button
                        onClick={guardarProducto}
                        className="bg-slate-700 hover:bg-slate-600 text-slate-50 p-2 w-24 ml-3 rounded-md shadow-lg">
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
