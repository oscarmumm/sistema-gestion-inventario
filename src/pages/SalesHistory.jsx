import { useContext, useEffect, useState } from 'react'
import { DataContext } from '../context/DataContext'
import { SaleHistoryModal } from '../components/Modals/SaleHistoryModal'
import { AnimatePresence } from 'framer-motion'

export const SalesHistory = () => {
    const { data, setData } = useContext(DataContext)
    const [ventas, setVentas] = useState(data.ventas)
    const [saleHistoryModalActive, setSaleHistoryModalActive] = useState(false)
    const [selectedSale, setSelectedSale] = useState()
    const [paymentMethod, setPaymentMethod] = useState('')
    const paymentMethodOptions = [
        'Efectivo',
        'QR',
        'Visa Débito',
        'Visa Crédito',
        'Maestro',
        'Master Card',
        'American Express',
    ]
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [filteredSales, setFilteredSales] = useState(ventas)

    useEffect(() => {
        setVentas(data.ventas)
    }, [data])

    const closeSaleHistoryModal = () => {
        setSaleHistoryModalActive(false)
    }

    const selectMethod = (e) => {
        setPaymentMethod(e.target.value)
    }

    const normalizeDateFormat = (date) => {
        const [day, month, year] = date.split('/')
        return `${year}-${month}-${day}`
    }

    const applyFilters = () => {
        let filteredData = ventas
        if (startDate !== '' && endDate !== '') {
            const start = new Date(startDate)
            const end = new Date(endDate)
            filteredData = ventas.filter((el) => {
                const saleDate = new Date(normalizeDateFormat(el.fecha))
                return saleDate >= start && saleDate <= end
            })
            setFilteredSales(filteredData)
        }
        if (paymentMethod !== '') {
            filteredData = filteredData.filter(
                (el) => el.metodoDePago === paymentMethod
            )
            setFilteredSales(filteredData)
        }
        if (startDate === '' && endDate === '' && paymentMethod === '') {
            setFilteredSales(ventas)
        }
    }

    const quitFilters = () => {
        setStartDate('')
        setEndDate('')
        setPaymentMethod('')
        setFilteredSales(ventas)
    }

    return (
        <div
            className='flex flex-col items-center h-full overflow-auto p-3'
            style={{ maxHeight: 'calc(100vh - 64px)' }}
        >
            <h2 className='text-2xl my-6'>Historial de Ventas</h2>
            <div className='p-3 flex justify-center min-w-max w-full'>
                <div className='flex flex-col'>
                    <span className=' text-xl my-3'>Filtros:</span>
                    <div className='flex flex-col items-start mb-5 p-3 rounded-md shadow-lg bg-slate-500 text-slate-50 min-w-max'>
                        <label>Desde</label>
                        <input
                            className='p-2 rounded-md shadow-lg text-slate-900 outline-none'
                            type='date'
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        <label>Hasta</label>
                        <input
                            className='p-2 rounded-md shadow-lg text-slate-900 outline-none'
                            type='date'
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                        <label>Método de pago</label>
                        <select
                            name='paymentMethod'
                            className='p-3 outline-none rounded-md shadow-lg text-slate-900'
                            value={paymentMethod}
                            onChange={selectMethod}
                        >
                            <option value=''>Elije un método de pago</option>
                            {paymentMethodOptions.map((option, index) => (
                                <option
                                    key={index}
                                    value={option}
                                    onChange={(e) =>
                                        setPaymentMethod(e.target.value)
                                    }
                                >
                                    {option}
                                </option>
                            ))}
                        </select>
                        <button
                            className='bg-emerald-500 hover:bg-emerald-400 text-slate-50 font-bold mt-3 p-2 w-24 rounded-md shadow-lg'
                            onClick={applyFilters}
                        >
                            Aplicar
                        </button>
                        <button
                            className='bg-yellow-500 hover:bg-yellow-400 text-slate-50 font-bold mt-3 p-2 w-32 rounded-md shadow-lg'
                            onClick={quitFilters}
                        >
                            Quitar filtros
                        </button>
                    </div>
                </div>
                <div className='p-3 felx flex-col'>
                    <table className=' bg-slate-50 text-center min-w-max max-w-screen-md'>
                        <thead className='bg-slate-500 text-slate-200'>
                            <tr>
                                <th className='p-3 min-w-40'>Fecha</th>
                                <th className='p-3 min-w-40'>Hora</th>
                                <th className='p-3 min-w-40'>Monto</th>
                                <th className='p-3 min-w-40'>Método de Pago</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSales.map((sale) => (
                                <tr
                                    key={sale.id}
                                    className='hover:bg-slate-200 border-t-slate-200 border-t-2 cursor-pointer'
                                    onClick={() => {
                                        setSelectedSale(sale)
                                        setSaleHistoryModalActive(true)
                                    }}
                                >
                                    <td className='p-3'>{sale.fecha}</td>
                                    <td className='p-3'>{sale.hora}</td>
                                    <td className='p-3'>${sale.importe}</td>
                                    <td className='p-3'>{sale.metodoDePago}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filteredSales.length === 0 && (
                        <p className='text-xl text-center p-3'>
                            No hay resultados para la búsqueda solicitada
                        </p>
                    )}
                </div>
                <AnimatePresence>
                    {saleHistoryModalActive && (
                        <SaleHistoryModal
                            sale={selectedSale}
                            closeSaleHistoryModal={closeSaleHistoryModal}
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
