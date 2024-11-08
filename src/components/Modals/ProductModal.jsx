import { IconContext } from 'react-icons'
import { MdClose } from 'react-icons/md'

export const ProductModal = ({ producto, closeModal }) => {
    const handleClick = () => {
        closeModal()
    }
    return (
        <div className='fixed top-0 left-0 h-screen w-screen flex items-center justify-center modal-main-bg'>
            <div className='relative bg-slate-50 py-5 px-10 rounded-md min-w-72'>
                <button
                    className='hover:bg-slate-300 rounded-md absolute top-0 right-0 p-2'
                    onClick={handleClick}
                >
                    <IconContext.Provider value={{className: 'w-5 h-5'}}>
                        <MdClose />
                    </IconContext.Provider>
                </button>
                <div className='flex justify-between mb-10'>
                    <p>Detalles del producto</p>
                </div>
                <div>
                    <h3 className='mb-3'>Nombre: {producto.nombre}</h3>
                    <h3 className='mb-3'>Color: {producto.color}</h3>
                    <p className='mb-3'>Proveedor: {producto.proveedor}</p>
                    <p className='mb-3'>
                        Precio Unitario: ${producto.precioUnitario}
                    </p>
                    <p className='mb-3'>
                        Cantidad por caja: {producto.cantidadPorCaja}
                    </p>
                    <div className='flex justify-end mt-10'>
                        <button className='bg-yellow-600 hover:bg-yellow-500 text-slate-50 p-1 w-20 rounded-md'>
                            Editar
                        </button>
                        <button className='bg-red-600 hover:bg-red-500 text-slate-50 p-1 w-20 ml-3 rounded-md'>
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
