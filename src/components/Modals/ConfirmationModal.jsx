import { motion } from 'framer-motion'

export const ConfirmationModal = ({
    message,
    agreeAction,
    cancelAction,
    productInfo,
    supplierInfo,
}) => {
    const clickOnAgree = () => {
        agreeAction()
    }
    const clickOnCancel = () => {
        cancelAction()
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
                className='relative flex flex-col justify-evenly bg-slate-100 py-5 px-10 rounded-md min-w-96 min-h-96 text-center'
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100 }}
            >
                {message.map((line) => (
                    <span className='text-xl'>{line}</span>
                ))}
                {/* <span className='text-xl'>{message}</span> */}
                {supplierInfo && (
                    <div className='text-xl font-bold flex flex-col my-5'>
                        <span>{supplierInfo.nombre}</span>
                    </div>
                )}
                {productInfo && (
                    <div className='text-xl font-bold flex flex-col my-5'>
                        <span>{productInfo.nombre}</span>
                        <span>Proveedor: {productInfo.proveedor}</span>
                        <span>Color {productInfo.color}</span>
                    </div>
                )}
                <div className='flex justify-around mt-10'>
                    <button
                        onClick={clickOnCancel}
                        className='bg-slate-600 hover:bg-slate-500 text-slate-50 p-2 w-24 rounded-md shadow-lg'
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={clickOnAgree}
                        className='bg-slate-700 hover:bg-slate-600 text-slate-50 p-2 w-24 ml-3 rounded-md shadow-lg'
                    >
                        Aceptar
                    </button>
                </div>
            </motion.div>
        </motion.div>
    )
}
