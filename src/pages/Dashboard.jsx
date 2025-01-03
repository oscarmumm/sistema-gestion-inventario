import { useContext, useEffect, useState } from 'react'
import { DataContext } from '../context/DataContext'
import { timeGetter } from '../utils/Utils'

export const Dashboard = () => {
    const { data, setData } = useContext(DataContext)
    const [sales, setSales] = useState(data.ventas)
    const [todaySales, setTodaySales] = useState({})

    //esta funcion esta mostrando la suma de los importes por moneda en todo el periodo
    // debe hacerlo solo por el dia en curso
    function todaySalesPerPaymentMethod(sales) {
        return sales.reduce((acumulador, transaccion) => {
            const metodoDePago = transaccion.metodoDePago
            const importe = transaccion.importe

            // Si el método de pago ya existe, suma el importe; si no, inicialízalo
            acumulador[metodoDePago] = (acumulador[metodoDePago] || 0) + importe
            return acumulador
        }, {})
    }

    useEffect(() => {
        setSales(data.ventas)
        setTodaySales(todaySalesPerPaymentMethod(sales))
    }, [data.ventas])

    const obtenerVentas = () => {
        console.log(todaySalesPerPaymentMethod(sales))
    }
    return (
        <div
            className='flex flex-col h-full overflow-auto p-3 min-w-96 items-center'
            style={{ maxHeight: 'calc(100vh - 64px)' }}
        >
            <h2 className='text-3xl my-5'>Dashboard</h2>
            <div className='min-w-72 bg-slate-50 p-3 rounded-md shadow-lg text-center mb-5'>
                <p className='p-3 text-xl font-bold text-slate-800'>Dia de Negocio Actual: </p>
                <p className='p-3 text-xl'>{timeGetter().date}</p>
            </div>
            <div className='min-w-72 bg-slate-50 p-3 rounded-md shadow-lg mb-5'>
                <p className='mb-5 text-xl font-bold text-slate-800 text-center'>
                    Ventas de Hoy
                </p>
                {Object.entries(todaySales).map(([key, value]) => (
                    <div key={key} className='flex justify-between'>
                        <span className='text-xl p-3'>{key}</span>
                        <span className='text-xl p-3'>${value}</span>
                    </div>
                ))}
            </div>
            <div className='min-w-72 bg-slate-50 p-3 rounded-md shadow-lg'>
                <p className='mb-5 text-xl font-bold text-slate-800 text-center'>
                    Acumulado Mensual
                </p>
                {Object.entries(todaySales).map(([key, value]) => (
                    <div key={key} className='flex justify-between'>
                        <span className='text-xl p-3'>{key}</span>
                        <span className='text-xl p-3'>${value}</span>
                    </div>
                ))}
            </div>
            <p>Productos mas vendidos</p>
        </div>
    )
}