import { motion } from 'framer-motion'

export const WarningModal = ({ message, closeModal }) => {
    const handleCLick = () => {
        closeModal()
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
                className='relative flex flex-col justify-center items-center bg-slate-100 py-5 px-10 rounded-md min-w-96 max-w-screen-sm text-center shadow-lg'
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100 }}
            >
                <h3 className='text-2xl my-5'>{message}</h3>
                <button
                    className='mt-5 bg-slate-600 hover:bg-slate-500 text-slate-50 p-2 w-24 rounded-md shadow-lg'
                    onClick={handleCLick}
                >
                    Volver
                </button>
            </motion.div>
        </motion.div>
    )
}
