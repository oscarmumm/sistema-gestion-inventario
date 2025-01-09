import {motion} from 'framer-motion'
import {IconContext} from 'react-icons'
import {MdClose} from 'react-icons/md'

export const PurchaseOrderModal = ({order, closeModal}) => {
    const clickOnClose = () => {
        closeModal()
    }

    return (
        <motion.div
            className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center modal-main-bg z-50"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.2}}>
            <motion.div
                className="relative bg-slate-100 py-5 px-10 rounded-md min-w-96"
                initial={{opacity: 0, y: 100}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: 100}}>
                <button
                    className="hover:bg-slate-300 rounded-md absolute top-0 right-0 p-2"
                    onClick={clickOnClose}>
                    <IconContext.Provider value={{className: 'w-5 h-5'}}>
                        <MdClose />
                    </IconContext.Provider>
                </button>
                <h3 className="text-lg font-bold text-center mb-5">
                    Detalles del Pedido:
                </h3>
                <div>
                    <p className='mb-3'>
                        <span className="font-bold">Fecha: </span>
                        <span>{order.fechaPedido}</span>
                    </p>
                    <p className='mb-3'>
                        <span className="font-bold">Hora: </span>
                        <span>{order.horaPedido}</span>
                    </p>
                    <p>
                        <span className="font-bold">Detalles del pedido: </span>
                    </p>
                    <table className="border-collapse border border-slate-500 min-w-full mb-3">
                        <thead className="bg-slate-500 text-slate-200 ">
                            <tr>
                                <th className="p-2">Cajas</th>
                                <th className="p-2">Producto</th>
                                <th className="p-2">Proveedor</th>
                                <th className="p-2">Importe</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.detallesPedido.map((entry) => (
                                <tr key={entry.id} className="text-center">
                                    <td className="text-center p-3">
                                        {entry.cantidadAPedir}
                                    </td>
                                    <td className="p-3 border border-slate-500">
                                        {entry.descripcion}
                                    </td>
                                    <td className="p-3 border border-slate-500">
                                        {entry.proveedor}
                                    </td>
                                    <td className="p-3 border border-slate-500">
                                        ${entry.importe}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p>
                        <span className="font-bold">Total del pedido: </span>
                        <span>${order.importeTotal}</span>
                    </p>
                </div>
            </motion.div>
        </motion.div>
    )
}
