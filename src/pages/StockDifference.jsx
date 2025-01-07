import {useContext, useEffect, useState} from 'react'
import {DataContext} from '../context/DataContext'
import {toRounded} from '../utils/Utils'

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
            <h2 className="text-2xl font-bold my-3">Chequeo de Diferencias de Stock</h2>
            <p className="mb-3">
                Ingresa datos al conteo para ver si hay diferencias de stock
            </p>
            <table className="bg-slate-50 text-center min-w-fit max-w-screen-lg">
                <thead className="bg-slate-500 text-slate-200">
                    <tr>
                        <th className="p-3">Descripcion</th>
                        <th className="p-3">Cantidad por caja</th>
                        <th className="p-3">Stock s/sistema</th>
                        <th className="p-3">Stock s/conteo</th>
                        <th className="p-3">Diferencia (un)</th>
                        <th className="p-3">Diferencia ($)</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr
                            key={product.id}
                            className="border-b-2 border-slate-400">
                            <td className="p-1">{product.descripcion}</td>
                            <td className="p-1">{product.cantidadPorCaja}</td>
                            <td className="p-1">{product.stockActual}</td>
                            <td className="p-1">
                                {product.stockPorConteo || 0}
                            </td>
                            <td className="p-1">
                                {
                                    -(
                                        product.stockActual -
                                        (product.stockPorConteo || 0)
                                    )
                                }
                            </td>
                            <td
                                className={`p-1 ${
                                    product.stockActual -
                                        (product.stockPorConteo || 0) <
                                    0
                                        ? 'text-emerald-600'
                                        : 'text-red-600'
                                }`}>
                                {toRounded(-(
                                    product.stockActual -
                                    (product.stockPorConteo || 0)
                                ) * product.precioUnitarioCompra)}
                                $
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
