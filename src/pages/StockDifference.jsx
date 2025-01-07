import { useContext, useEffect, useState } from "react"
import { DataContext } from "../context/DataContext"

export const StockDifference = () => {
    const {data, setData} = useContext(DataContext)
    const [products, setProducts] = useState(data.productos)

    useEffect(() => {
        setProducts(data.productos)
    }, [data.productos])

    return (
        <div
            className="flex flex-col items-center h-full overflow-auto p-3"
            style={{maxHeight: 'calc(100vh - 64px)'}}>
            <h2>Stock difference</h2>
            <p>Ingresa datos al conteo para ver si hay diferencias de stock</p>
            <table className="bg-slate-50 text-center min-w-fit max-w-screen-lg">
                <thead className="bg-slate-500 text-slate-200">
                    <tr>
                        <th className="p-3">Descripcion</th>
                        <th className="p-3">Cantidad por caja</th>
                        <th className="p-3">Stock s/sistema</th>
                        <th className="p-3">Stock s/conteo</th>
                        <th className="p-3">Diferencia</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((product) => (
                            <tr key={product.id} className="border-b-2 border-slate-400">
                                <td className="p-1">{product.descripcion}</td>
                                <td className="p-1">{product.cantidadPorCaja}</td>
                                <td className="p-1">{product.stockActual}</td>
                                <td className="p-1">{product.stockPorConteo || 0}</td>
                                <td className="p-1">{(product.stockActual - (product.stockPorConteo || 0))}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
