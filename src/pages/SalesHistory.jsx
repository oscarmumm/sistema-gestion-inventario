import { useContext, useEffect, useState } from 'react'
import { DataContext } from '../context/DataContext'

export const SalesHistory = () => {
    const { data, setData } = useContext(DataContext)
    const [ventas, setVentas] = useState(data.ventas)

    useEffect(() => {
        setVentas(data.ventas)
    }, [data])

    return (
        <div
            className='flex flex-col items-center h-full overflow-auto p-3'
            style={{ maxHeight: 'calc(100vh - 64px)' }}
        >
            <h2 className='text-xl my-8'>Sales History</h2>
            <div></div>
            <table className='bg-slate-50 text-center min-w-max max-w-screen-md'>
                <thead className='bg-slate-500 text-slate-200'>
                    <tr>
                        <th className='p-3 min-w-40'>Fecha</th>
                        <th className='p-3 min-w-40'>Hora</th>
                        <th className='p-3 min-w-40'>Monto</th>
                        <th className='p-3 min-w-40'>Método de Pago</th>
                    </tr>
                </thead>
                <tbody>
                    {ventas.map((venta) => (
                        <tr
                            key={venta.id}
                            className='hover:bg-slate-200 border-t-slate-200 border-t-2 cursor-pointer'
                        >
                            <td className='p-3'>{(venta.fechaYHora).slice(0,10)}</td>
                            <td className='p-3'>{(venta.fechaYHora).slice(-8, -3)}</td>
                            <td className='p-3'>${venta.importe}</td>
                            <td className='p-3'>{venta.metodoDePago}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
