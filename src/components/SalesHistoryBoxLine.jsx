import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { IconContext } from 'react-icons'

const subGroupVariants = {
    open: { opacity: 1, height: 'auto' },
    close: { opacity: 0, height: 0 },
}

const arrowVariants = {
    open: { rotate: -180 },
    close: { rotate: 0 },
}

export const SalesHistoryBoxLine = ({ fecha, ventas }) => {
    const [salesExpanded, setSalesExpanded] = useState(false)
    return (
        <div className='bg-slate-50 flex flex-col items-start p-3 mb-3 rounded-lg shadow-xl text-center'>
            <IconContext.Provider value={{ className: 'w-6 h-6' }}>
                <div className='flex items-center'>
                    <span>{fecha}</span>
                    <button onClick={() => setSalesExpanded(!salesExpanded)}>
                        <motion.div
                            animate={salesExpanded ? 'open' : 'close'}
                            variants={arrowVariants}
                            transition={{ type: 'tween', duration: 0.2 }}
                            className='ml-1'
                        >
                            <MdKeyboardArrowDown />
                        </motion.div>
                    </button>
                </div>
                <AnimatePresence>
                    {salesExpanded &&
                        ventas.map((venta) => (
                            <div
                                className='flex border-t border-slate-300 p-1'
                                key={venta.id}
                                //animate={salesExpanded ? 'open' : 'close'}
                                //variants={subGroupVariants}
                            >
                                <span className='w-40'></span>
                                <span className='w-40'>{venta.hora}</span>
                                <span className='w-40'>${venta.importe}</span>
                                <span className='w-40'>
                                    {venta.metodoDePago}
                                </span>
                            </div>
                        ))}
                </AnimatePresence>
            </IconContext.Provider>
        </div>
    )
}
