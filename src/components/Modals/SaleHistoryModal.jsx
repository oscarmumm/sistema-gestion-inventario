import { motion } from 'framer-motion'
import { MdClose } from 'react-icons/md'
import { IconContext } from 'react-icons'


//-----------------------------
// agregar datos de cajero logueado en la venta
//-----------------------------

export const SaleHistoryModal = ({ sale, closeSaleHistoryModal }) => {

    const handleClick = () => {
        closeSaleHistoryModal()
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

                <div className='flex flex-col items-start'>
                    <h3 className='text-xl text-center w-full'>
                        Detalle de la venta
                    </h3>
                    <div className='flex flex-col mt-5'>
                        <span className='mb-3'>
                            Fecha: {sale.fecha}
                        </span>
                        <span className='mb-3'>
                            Hora: {sale.hora}
                        </span>
                        <span className='mb-3'>Importe: ${sale.importe}</span>
                        <span className='mb-3'>
                            Método de pago: {sale.metodoDePago}
                        </span>
                    </div>
                    <span>Productos: </span>
                    <table className='border-collapse border border-slate-500 min-w-full'>
                        <thead className='bg-slate-500 text-slate-200 '>
                            <tr>
                                <th className='p-2 w-6'>Cantidad</th>
                                <th className='p-2 text-left'>Producto</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sale.detalles.map((entry) => (
                                <tr key={entry.descripcion}>
                                    <td className='p-2 text-center'>
                                        {entry.cantidad}
                                    </td>
                                    <td className='p-2'>{entry.descripcion}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </motion.div>
    )
}
