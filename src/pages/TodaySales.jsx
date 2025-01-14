import { useState, useContext, useEffect } from 'react'
import { timeGetter } from '../utils/Utils'
import { DataContext } from '../context/DataContext'
import { SaleHistoryModal } from '../components/Modals/SaleHistoryModal'
import { Link } from 'react-router-dom'

export const TodaySales = () => {
    const { data } = useContext(DataContext)
    const [businessDay, setBusinessDay] = useState(timeGetter().fullDate)
    const [todaySales, settodaySales] = useState(data.ventasDeHoy)
    const [saleHistoryModalActive, setSaleHistoryModalActive] = useState(false)
    const [selectedSale, setSelectedSale] = useState()
    const [businessDayState, setBusinessDayState] = useState(
        data.businessDayState
    )

    const closeSaleHistoryModal = () => {
        setSaleHistoryModalActive(false)
    }

    useEffect(() => {
        setBusinessDayState(data.businessDayState)
    }, [data.businessDayState])

    return (
        <div>
            {businessDayState ? (
                <div>
                    <h2 className='text-2xl font-semibold my-5 text-slate-800'>
                        Ventas de hoy
                    </h2>
                    <h3 className='my-3 font-semibold'>
                        Fecha de Negocio: {businessDay}
                    </h3>
                    <table className='bg-slate-50 text-center min-w-max max-w-screen-lg rounded-lg shadow-xl overflow-hidden'>
                        <thead className='bg-slate-500 text-slate-200'>
                            <tr>
                                <th className='p-3 min-w-44'>Hora</th>
                                <th className='p-3 min-w-44'>Importe</th>
                                <th className='p-3 min-w-44'>Método de Pago</th>
                            </tr>
                        </thead>
                        <tbody>
                            {todaySales.map((sale) => (
                                <tr
                                    key={sale.id}
                                    className='hover:bg-slate-200 border-t-slate-200 border-t-2 cursor-pointer'
                                    onClick={() => {
                                        setSelectedSale(sale)
                                        setSaleHistoryModalActive(true)
                                    }}
                                >
                                    <td className='p-3'>{sale.hora}</td>
                                    <td className='p-3'>${sale.importe}</td>
                                    <td className='p-3'>{sale.metodoDePago}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {saleHistoryModalActive && (
                        <SaleHistoryModal
                            sale={selectedSale}
                            closeSaleHistoryModal={closeSaleHistoryModal}
                        />
                    )}
                </div>
            ) : (
                <div className='flex flex-col items-center justify-center'>
                    <h2 className='text-2xl font-semibold my-24'>
                        El día de negocio está cerrado
                    </h2>
                    <Link
                        to='/sales-history'
                        className='bg-slate-700 hover:bg-sky-300 hover:text-slate-800 text-slate-50 font-semibold p-3 w-38 ml-3 rounded-lg shadow-xl text-center flex items-center justify-center'
                    >
                        Ver Historial de Ventas
                    </Link>
                </div>
            )}
        </div>
    )
}
