import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { ConfirmationModal } from './ConfirmationModal'
import { WarningModal } from './WarningModal'
import { FaLess, FaLessThan } from 'react-icons/fa'

export const SalePaymentModal = ({
    closeSalePaymentModal,
    sale,
    total,
    consfirmSale,
}) => {
    const [paymentMethod, setPaymentMethod] = useState()
    const paymentMethodOptions = [
        'Efectivo',
        'QR',
        'Visa Débito',
        'Visa Crédito',
        'Maestro',
        'Master Card',
        'American Express',
    ]
    const [confirmationModalActive, setConfirmationModalActive] =
        useState(false)
    const [warningModalActive, setWarningModalActive] = useState(false)
    const clickToExit = () => {
        closeSalePaymentModal()
    }
    const clickToRegister = () => {
        paymentMethod ? setConfirmationModalActive(true) : setWarningModalActive(true)
    }

    const agreeAction = () => {
        consfirmSale(paymentMethod)
        setConfirmationModalActive(false)
    }

    const cancelAction = () => {
        setConfirmationModalActive(false)
    }

    const selectMethod = (e) => {
        setPaymentMethod(e.target.value)
    }

    const closeWarningModal = () => {
        setWarningModalActive(false)
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
                className='relative flex flex-col justify-center items-center bg-slate-100 py-5 px-10 rounded-md min-w-96 max-w-screen-sm text-center shadow-lg'
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100 }}
            >
                <h3>Pago</h3>
                <span>Monto: ${total}</span>
                <label>Método de pago</label>
                <select
                    name='paymentMethod'
                    className='p-3 outline-none rounded-md shadow-lg'
                    value={paymentMethod}
                    onChange={selectMethod}
                >
                    <option value="">Elije un método de pago</option>
                    {paymentMethodOptions.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <div>
                    <button
                        className='mt-5 bg-slate-600 hover:bg-slate-500 text-slate-50 p-2 w-24 rounded-md shadow-lg'
                        onClick={clickToExit}
                    >
                        Volver
                    </button>
                    <button
                        className='mt-5 bg-slate-600 hover:bg-slate-500 text-slate-50 p-2 w-24 rounded-md shadow-lg'
                        onClick={clickToRegister}
                    >
                        Registrar
                    </button>
                </div>
            </motion.div>
            <AnimatePresence>
                {confirmationModalActive && (
                    <ConfirmationModal
                        message={`Confirma la venta? Monto: $${total} Método de pago: ${paymentMethod}`}
                        agreeAction={agreeAction}
                        cancelAction={cancelAction}
                    />
                )}
            </AnimatePresence>
            <AnimatePresence>
                {warningModalActive && (
                    <WarningModal
                        message={'Debe ingresar un método de pago!'}
                        closeModal={closeWarningModal}
                    />
                )}
            </AnimatePresence>
        </motion.div>
    )
}