import {useContext, useEffect, useState} from 'react'
import {DataContext} from '../context/DataContext'
import {AnimatePresence} from 'framer-motion'
import {PurchaseOrderModal} from '../components/Modals/PurchaseOrderModal'

export const OrdersHistory = () => {
    const {data, setData} = useContext(DataContext)
    const [orders, setOrders] = useState(data.pedidosAProveedores)
    const [purchaseOrderModalActive, setPurchaseOrderModalActive] =
        useState(false)
    const [selectedOrder, setSelectedorder] = useState()
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [filteredOrders, setFilteredOrders] = useState(orders)

    const normalizeDateFormat = (date) => {
        const [day, month, year] = date.split('/')
        return `${year}-${month}-${day}`
    }

    const applyFilters = () => {
        let filteredData = orders
        if (startDate !== '' && endDate !== '') {
            const start = new Date(startDate)
            const end = new Date(endDate)
            filteredData = orders.filter((el) => {
                const saleDate = new Date(normalizeDateFormat(el.fechaPedido))
                return saleDate >= start && saleDate <= end
            })
            setFilteredOrders(filteredData)
        }
        if (startDate === '' && endDate === '') {
            setFilteredSales(ventas)
        }
    }

    const quitFilters = () => {
        setStartDate('')
        setEndDate('')
        setFilteredOrders(orders)
    }

    const closePurchaseOrderModal = () => {
        setPurchaseOrderModalActive(false)
    }

    useEffect(() => {
        setOrders(data.pedidosAProveedores)
    }, [data.pedidosAProveedores])

    return (
        <div
            className="flex flex-col items-center h-full overflow-auto p-3"
            style={{maxHeight: 'calc(100vh - 64px)'}}>
            <h2 className="text-2xl font-semibold my-5 text-slate-800">Historial de Órdenes</h2>
            <div className="p-3 flex justify-center min-w-max w-full">
                <div className="flex flex-col">
                    <span className=" text-xl my-3">Filtros:</span>
                    <div className="flex flex-col items-start mb-5 p-3 rounded-md shadow-lg bg-slate-500 text-slate-50 min-w-max">
                        <label>Desde</label>
                        <input
                            className="p-2 rounded-md shadow-lg text-slate-900 outline-none"
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        <label>Hasta</label>
                        <input
                            className="p-2 rounded-md shadow-lg text-slate-900 outline-none"
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                        <button
                            className="bg-emerald-500 hover:bg-emerald-400 text-slate-50 font-bold mt-3 p-2 w-24 rounded-md shadow-lg"
                            onClick={applyFilters}>
                            Aplicar
                        </button>
                        <button
                            className="bg-yellow-500 hover:bg-yellow-400 text-slate-50 font-bold mt-3 p-2 w-32 rounded-md shadow-lg"
                            onClick={quitFilters}>
                            Quitar filtros
                        </button>
                    </div>
                </div>
                <div className="p-3 flex flex-col">
                    <table className="bg-slate-50 text-center min-w-max max-w-screen-md shadow-lg">
                        <thead className="bg-slate-500 text-slate-200">
                            <tr>
                                <th className="p-3 min-w-40">Fecha</th>
                                <th className="p-3 min-w-40">Hora</th>
                                <th className="p-3 min-w-40">Importe</th>
                            </tr>
                        </thead>
                        <tbody className="bg-slate-50">
                            {filteredOrders.map((order) => (
                                <tr
                                key={order.id}
                                    className="border-t-2 border-slate-300 hover:bg-slate-200 cursor-pointer"
                                    onClick={() => {
                                        setSelectedorder(order)
                                        setPurchaseOrderModalActive(true)
                                    }}>
                                    <td className="p-3">{order.fechaPedido}</td>
                                    <td className="p-3">{order.horaPedido}</td>
                                    <td className="p-3">
                                        ${order.importeTotal}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <AnimatePresence>
                {purchaseOrderModalActive && (
                    <PurchaseOrderModal
                        order={selectedOrder}
                        closeModal={closePurchaseOrderModal}
                    />
                )}
            </AnimatePresence>
        </div>
    )
}
