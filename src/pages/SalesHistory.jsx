import {useContext, useEffect, useState} from 'react'
import {DataContext} from '../context/DataContext'
import {SaleHistoryModal} from '../components/Modals/SaleHistoryModal'
import {AnimatePresence} from 'framer-motion'
import {SalesHistoryBoxLine} from '../components/SalesHistoryBoxLine'

export const SalesHistory = () => {
    const {data, setData} = useContext(DataContext)
    const [ventas, setVentas] = useState(data.historialVentas)
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
    const [filteredSales, setFilteredSales] = useState()

    //--------------------------------IMPORTANT!!-------------------------------------
    //filter logic should be remade after logic changes on sales history render method

    useEffect(() => {
        setVentas(data.historialVentas)
    }, [data.historialVentas])

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
            filteredData = ventas.filter((entry) => {
                const saleDate = new Date(
                    normalizeDateFormat(Object.keys(entry)[0])
                )
                return saleDate >= start && saleDate <= end
            })
            setFilteredSales(filteredData)
        }
        if (startDate === '' && endDate === '') {
            setFilteredSales(ventas)
        }
    }

    const quitFilters = () => {
        setStartDate('')
        setEndDate('')
        setFilteredSales()
    }

    return (
        <div
            className="flex flex-col items-center h-full overflow-auto p-3"
            style={{maxHeight: 'calc(100vh - 64px)'}}>
            <h2 className="text-2xl font-semibold my-6 text-slate-800">
                Historial de Ventas
            </h2>
            <div className="p-3 flex flex-col items-center justify-center min-w-max w-full">
                <div className="flex flex-col">
                    <span className=" text-xl my-3">Filtros:</span>
                    <div className="flex justify-center items-center mb-5 p-3 rounded-lg shadow-xl bg-slate-500 text-slate-50 max-w-fit">
                        <label className='mx-1'>Desde</label>
                        <input
                            className="p-2 mx-1 rounded-md shadow-lg text-slate-900 outline-none"
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        <label className='mx-1'>Hasta</label>
                        <input
                            className="p-2 mx-1 rounded-md shadow-lg text-slate-900 outline-none"
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                        <button
                            className="bg-emerald-500 hover:bg-emerald-400 text-slate-50 font-bold p-2 mx-1 w-24 rounded-md shadow-lg"
                            onClick={applyFilters}>
                            Aplicar
                        </button>
                        <button
                            className="bg-yellow-500 hover:bg-yellow-400 text-slate-50 font-bold p-2 mx-1 w-32 rounded-md shadow-lg"
                            onClick={quitFilters}>
                            Quitar filtros
                        </button>
                    </div>
                </div>
                {filteredSales && (
                    <div className="p-3 flex flex-col">
                        <div className="bg-slate-500 text-slate-200 text-center font-semibold p-4 mb-3 flex rounded-lg shadow-xl max-w-fit">
                            <span className="w-40">Fecha</span>
                            <span className="w-40">Hora</span>
                            <span className="w-40">Monto</span>
                            <span className="w-40">Método de pago</span>
                        </div>

                        {filteredSales.map((date) =>
                            Object.entries(date).map(([fecha, ventas]) => (
                                <SalesHistoryBoxLine
                                    key={fecha}
                                    fecha={fecha}
                                    ventas={ventas}
                                />
                            ))
                        )}
                    </div>
                )}
                {!filteredSales && (
                    <p className='text-xl mt-5'>
                        Ingrese una fecha o rango para buscar ventas en el
                        historial
                    </p>
                )}
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
