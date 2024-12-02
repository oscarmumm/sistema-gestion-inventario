import { DataContext } from '../context/DataContext'
import { useContext, useEffect, useState } from 'react'
import { MdOutlinePrint } from 'react-icons/md'
import { IconContext } from 'react-icons'

export const InventoryCount = () => {
    const { data, setData } = useContext(DataContext)
    const [products, setProducts] = useState(data.productos)

    useEffect(() => {
        setProducts(data.productos)
    }, [data.productos])

    const printStockSheet = () => {}

    return (
        <div
            className='flex flex-col h-full overflow-auto p-3 items-center'
            style={{ maxHeight: 'calc(100vh - 64px)' }}
        >
            <div className='flex justify-between'>
                <h2 className='text-xl my-5'>Inventory Count</h2>
                <button className='bg-slate-600 hover:bg-slate-500 text-slate-50 p-3 my-3 ml-3 rounded-md shadow-lg flex items-center'>
                    <IconContext.Provider
                        value={{ className: 'text-slate-200 w-7 h-7' }}
                    >
                        <MdOutlinePrint />
                    </IconContext.Provider>
                    <span className='ml-3' onClick={printStockSheet}>
                        Print Stock Sheet
                    </span>
                </button>
            </div>
            <table
                className='bg-slate-400 text-center min-w-fit max-w-screen-lg'
            >
                <thead className='bg-slate-500 text-slate-200'>
                    <tr>
                        <th className='p-3'>Nombre</th>
                        <th>Cant. x Caja</th>
                        <th>Cajas</th>
                        <th>Sub-unidades</th>
                        <th>Unidades</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr className='hover:bg-slate-300' key={product.id}>
                            <td className='p-5 text-slate-900 font-semibold'>
                                {product.nombre}
                            </td>
                            <td className='p-5 text-slate-900 font-semibold'>
                                {product.cantidadPorCaja}
                            </td>
                            <td className='min-w-32'>
                                <input
                                    className='w-20 outline-none p-1 rounded-md'
                                    type='text'
                                />
                            </td>
                            <td className='min-w-32'>
                                <input
                                    className='w-20 outline-none p-1 rounded-md'
                                    type='text'
                                />
                            </td>
                            <td className='min-w-32'>
                                <input
                                    className='w-20 outline-none p-1 rounded-md'
                                    type='text'
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
