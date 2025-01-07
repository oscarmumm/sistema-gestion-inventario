import { useContext, useEffect, useState } from 'react'
import { DataContext } from '../context/DataContext'
import { timeGetter } from '../utils/Utils'

export const Dashboard = () => {
    const {data, setData} = useContext(DataContext)
    const [todaySales, setTodaySales] = useState([])
    const [todaySalesPerPaymentMethod, setTodaySalesPerPaymentMethod] =
        useState()
    const [businessDay, setBusinessDay] = useState(timeGetter().fullDate)

    useEffect(() => {
        // Filtrar las ventas del día
        const filteredSales = data.ventas.filter((entry) => entry.fecha === businessDay);
        // Función para calcular ventas por método de pago
        const calculateSalesByPaymentMethod = (filteredSales) => {
            return filteredSales.reduce((acumulador, transaccion) => {
                const metodoDePago = transaccion.metodoDePago;
                const importe = transaccion.importe;
                acumulador[metodoDePago] = (acumulador[metodoDePago] || 0) + importe;
                return acumulador;
            }, {});
        };
    
        setTodaySales(filteredSales);
    
        const salesPerMethod = calculateSalesByPaymentMethod(filteredSales);
    
        setTodaySalesPerPaymentMethod(salesPerMethod);
    
    }, [data.ventas, businessDay]);
    
    return (
        <div
            className="flex flex-col h-full overflow-auto p-3 min-w-96 items-center"
            style={{maxHeight: 'calc(100vh - 64px)'}}>
            <h2 className="text-3xl my-5">Dashboard</h2>
            <div className="min-w-72 bg-slate-50 p-3 rounded-md shadow-lg text-center mb-5">
                <p className="p-3 text-xl font-bold text-slate-800">
                    Dia de Negocio Actual:{' '}
                </p>
                <p className="p-3 text-xl">{businessDay}</p>
            </div>
            <div className="min-w-72 bg-slate-50 p-5 rounded-md shadow-lg">
                {todaySales.length > 0 ? (
                    <div>
                        <p className="mb-5 text-xl font-bold text-slate-800 text-center">
                            Ventas Totales
                        </p>
                        {Object.entries(todaySalesPerPaymentMethod).map(
                            ([key, value]) => (
                                <div key={key} className="flex justify-between">
                                    <span className="text-xl p-3">{key}</span>
                                    <span className="text-xl p-3">
                                        ${value}
                                    </span>
                                </div>
                            )
                        )}
                    </div>
                ) : (
                    <div>

                    <p className="mb-5 text-xl font-bold text-slate-800 text-center">
                        Aún no tiene ventas para el día de negocio actual
                    </p>
                    <p className="mb-5 text-xl text-slate-800 text-center">
                        (Prueba registrando algunas ventas)
                    </p>
                    </div>
                )}
            </div>
        </div>
    )
}