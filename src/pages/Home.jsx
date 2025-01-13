import { useState, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { DataContext } from '../context/DataContext'
import { AnimatePresence } from 'framer-motion'
import { timeGetter } from '../utils/Utils'

export const Home = () => {
    const { user } = useContext(UserContext)
    const { data } = useContext(DataContext)
    const [businessDay, setBusinessDay] = useState(timeGetter().fullDate)
    const [businessDayState, setBusinessDayState] = useState(true)

    return (
        <div>
            <div>
                <h1 className='text-3xl font-semibold text-slate-700 mb-16'>
                    Bienvenido al Sistema de Gestión de Comercio
                </h1>
                <div className='text-2xl font-semibold text-slate-700 flex flex-col bg-slate-50 p-10 rounded-xl shadow-xl'>
                    <div className='flex justify-between mb-5'>
                        <span>Usuario Activo: </span>
                        <span className='text-emerald-600'>
                            {user.username}
                        </span>
                    </div>
                    <div className='flex justify-between mb-5'>
                        <span>Día de negocio actual: </span>
                        <span>{businessDay}</span>
                    </div>
                    <div className='flex justify-between mb-5'>
                        <span>Estado:</span>
                        <span className='text-emerald-600'>
                            {businessDayState ? 'abierto' : 'cerrado'}
                        </span>
                    </div>
                    <div className='flex justify-between mb-5'>
                        <span>Conteo de inventario ingresado?</span>
                        <span>{}</span>
                    </div>
                    <div className='flex justify-between mb-5'>
                        <span>Arqueo de caja realizado?</span>
                        <span>{}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
