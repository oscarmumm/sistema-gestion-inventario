import { motion } from 'framer-motion'
import { useState } from 'react'

export const EditQuantityOnSaleModal = ({
    entryToEdit,
    saveEditedQuantity,
    closeEditQuantityModal,
}) => {
    const [newQuantity, setNewQuantity] = useState(entryToEdit.cantidad)
    const clickOnExit = () => {
        closeEditQuantityModal()
    }
    const clickOnSave = () => {
        saveEditedQuantity(parseInt(newQuantity))
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
                <h3>Modifique la cantidad del producto:</h3>
                <span>{entryToEdit.nombre}</span>
                <input type='number' onChange={e => setNewQuantity(e.target.value)} value={newQuantity} className='p-3 my-3 outline-none shadow-lg rounded-md text-center' />
                <div className='flex w-full justify-between'>
                    <button
                        className='mt-5 bg-slate-600 hover:bg-slate-500 text-slate-50 p-2 w-24 rounded-md shadow-lg'
                        onClick={clickOnSave}
                    >
                        Guardar
                    </button>
                    <button
                        className='mt-5 bg-slate-600 hover:bg-slate-500 text-slate-50 p-2 w-24 rounded-md shadow-lg'
                        onClick={clickOnExit}
                    >
                        Volver
                    </button>
                </div>
            </motion.div>
        </motion.div>
    )
}
