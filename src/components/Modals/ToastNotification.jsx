import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { MdCheck } from 'react-icons/md'
import { IconContext } from 'react-icons'

export const ToastNotification = ({ message, notificationType }) => {
    const [bgColor, setBgColor] = useState('bg-slate-50')
    useEffect(() => {
        if (notificationType === 'success') {
            setBgColor('bg-emerald-600')
        }
    }, [notificationType])
    return (
        <motion.div
            className='fixed top-0 left-0 h-screen w-screen flex items-center justify-center modal-main-bg'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
        >
            <motion.div
                className={`relative flex flex-col justify-center items-center ${bgColor} text-slate-50 font-bold text-2xl py-5 px-10 rounded-full w-64 h-64 text-center shadow-lg `}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                //initial={{ opacity: 0, y: 100 }}
                //animate={{ opacity: 1, y: 0 }}
                //exit={{ opacity: 0, y: 100 }}
            >
                <IconContext.Provider
                    value={{ className: 'w-24 h-24 text-slate-50' }}
                >
                    <MdCheck />
                    <div>{message}</div>
                </IconContext.Provider>
            </motion.div>
        </motion.div>
    )
}
