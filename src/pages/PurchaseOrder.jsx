import { DataContext } from "../context/DataContext"
import { useContext, useEffect, useState } from "react"

export const PurchaseOrder = () => {
    const {data, setData} = useContext(DataContext)
    const [products, setProducts] = useState(data.productos)

    useEffect(() => {
        setProducts(data.productos)
    }, [data])


    return (
        <div
            className='flex flex-col items-center h-full overflow-auto p-3'
            style={{ maxHeight: 'calc(100vh - 64px)' }}
        >
            <h2 className="text-xl my-5">Pedido a Proveedores</h2>
            <table className='bg-slate-200 text-center min-w-fit max-w-screen-lg shadow-lg'>
                <thead className='bg-slate-500 text-slate-200'>
                    <tr>
                        <th className="p-3">Descripción</th>
                        <th className="p-3">Cant x caja</th>
                        <th className="p-3">Stock actual</th>
                        <th className="p-3">Pedido</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((entry) => (
                        <tr key={entry.id} className="hover:bg-slate-100">
                            <td className="p-3 ">{entry.descripcion}</td>
                            <td className="p-3">{entry.cantidadPorCaja}</td>
                            <td className="p-3">{entry.stockActual}</td>
                            <td className="p-3">
                                <input type="number" className="w-24 outline-none px-3 py-2 text-center rounded-md"/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
