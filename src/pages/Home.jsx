import { useState, useContext, useEffect } from 'react'
import { UserContext } from '../context/UserContext'
import { DataContext } from '../context/DataContext'
import { AnimatePresence } from 'framer-motion'
import { timeGetter } from '../utils/Utils'
import { ConfirmationModal } from '../components/Modals/ConfirmationModal'

export const Home = () => {
    const { user } = useContext(UserContext)
    const { data, setData } = useContext(DataContext)
    const [businessDay, setBusinessDay] = useState(timeGetter().fullDate)
    const [businessDayState, setBusinessDayState] = useState(
        data.businessDayState
    )
    const [confirmationModalActive, setConfirmationModalActive] =
        useState(false)
    const [confirmationModalMessage, setConfirmationModalMesagge] = useState([])

    // funcion que cierra el dia de negocio
    const agreeAction = () => {
        setData((prevData) => ({
            ...prevData,
            businessDayState: !prevData.businessDayState
        }))
        setConfirmationModalActive(false);
    };

    const cancelAction = () => {
        setConfirmationModalActive(false)
    }

    useEffect(() => {
        setBusinessDayState(data.businessDayState)
    }, [data.businessDayState])

    return (
        <div className='flex flex-col items-center'>
            <h1 className='text-3xl font-semibold text-slate-700 my-10'>
                Bienvenido al Sistema de Gestión de Comercio
            </h1>
            <div className='min-w-full text-2xl font-semibold text-slate-700 flex flex-col bg-slate-50 p-10 rounded-xl shadow-xl mb-10'>
                <div className='flex justify-between mb-5'>
                    <span>Usuario Activo: </span>
                    <span className='text-emerald-600'>{user.username}</span>
                </div>
                <div className='flex justify-between mb-5'>
                    <span>Día de negocio actual: </span>
                    <span>{businessDay}</span>
                </div>
                <div className='flex justify-between mb-5'>
                    <span>Estado:</span>
                    <span
                        className={`${
                            businessDayState
                                ? 'text-emerald-600'
                                : 'text-red-600'
                        }`}
                    >
                        {businessDayState ? 'abierto' : 'cerrado'}
                    </span>
                </div>
            </div>
            {/* <div className="min-w-full text-2xl font-semibold text-slate-700 flex flex-col bg-slate-50 p-10 rounded-xl shadow-xl">
                <div className="flex justify-between mb-5">
                    <span>Acciones Recomendadas:</span>
                </div>
                <div className="flex justify-between mb-5">
                    <span>Ingresar conteo de inventario</span>
                    <span>{}</span>
                </div>
                <div className="flex justify-between mb-5">
                    <span>Arquear la caja registradora </span>
                    <span>{}</span>
                </div>
            </div> */}
            <div className='mt-10'>
                {businessDayState ? (
                    <button
                        onClick={() => {
                            setConfirmationModalMesagge([
                                'Cerrar el dia de negocio actual?',
                            ])
                            setConfirmationModalActive(true)
                        }}
                        className='bg-red-500 hover:bg-red-400  text-slate-50 font-semibold p-2 w-48 ml-3 rounded-md shadow-xl'
                    >
                        Cerrar Día de Negocio
                    </button>
                ) : (
                    <button
                        onClick={() => {
                            setConfirmationModalMesagge([
                                'Abrir el día de negocio?',
                            ])
                            setConfirmationModalActive(true)
                        }}
                        className='bg-emerald-500 hover:bg-emerald-400  text-slate-50 font-semibold p-2 w-48 ml-3 rounded-md shadow-xl'
                    >
                        Abrir Día de Negocio
                    </button>
                )}
            </div>
            {confirmationModalActive && (
                <ConfirmationModal
                    agreeAction={agreeAction}
                    cancelAction={cancelAction}
                    businessDayInfo={businessDay}
                    message={confirmationModalMessage}
                />
            )}
        </div>
    )
}
