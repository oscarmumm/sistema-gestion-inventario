import {DataContext} from '../context/DataContext'
import {useContext, useEffect, useState, useRef} from 'react'
import {MdOutlinePrint} from 'react-icons/md'
import {IconContext} from 'react-icons'
import html2pdf from 'html2pdf.js'

export const InventoryCount = () => {
    const {data, setData} = useContext(DataContext)
    const [products, setProducts] = useState(data.productos)
    const ref = useRef()

    useEffect(() => {
        setProducts(data.productos)
    }, [data.productos])

    const handlePrint = () => {
        const element = ref.current
        const options = {
            margin: 0,
            filename: 'hoja_de_conteo.pdf',
            html2canvas: {scale: 2},
            jsPDF: {unit: 'in', format: 'A4', orientation: 'portrait'},
        }
        html2pdf().set(options).from(element).save()
    }

    return (
        <div
            className="flex flex-col h-full overflow-auto p-3 items-center"
            style={{maxHeight: 'calc(100vh - 64px)'}}>
            <div className="flex justify-between">
                <h2 className="text-xl my-5">Conteo de Inventario</h2>
                <button
                    className="bg-slate-600 hover:bg-slate-500 text-slate-50 p-3 my-3 ml-3 rounded-md shadow-lg flex items-center"
                    onClick={handlePrint}>
                    <IconContext.Provider
                        value={{className: 'text-slate-200 w-7 h-7'}}>
                        <MdOutlinePrint />
                    </IconContext.Provider>
                    <span className="ml-3">
                        Imprimir Hoja de Conteo
                    </span>
                </button>
            </div>
            <table
                ref={ref}
                className="printable-table bg-white text-center min-w-fit max-w-screen-lg shadow-lg">
                <thead className="bg-slate-500 text-slate-200">
                    <tr>
                        <th className="p-3">Descripcion</th>
                        <th className='p-3'>Cant. x Caja</th>
                        <th className='p-3'>Cajas</th>
                        <th className='p-3'>Unidades</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr className="hover:bg-slate-300 border-b-2 border-slate-300" key={product.id}>
                            <td className="p-3 text-slate-900 font-semibold">
                                {product.descripcion}
                            </td>
                            <td className="p-3 text-slate-900 font-semibold">
                                {product.cantidadPorCaja}
                            </td>
                            <td className="min-w-32">
                                <input
                                    className="w-24 outline-none border-2 border-slate-400 px-3 py-1 text-center rounded-md"
                                    type="number"
                                />
                            </td>
                            <td className="min-w-32">
                                <input
                                    className="w-24 outline-none border-2 border-slate-400 px-3 py-1 text-center rounded-md"
                                    type="number"
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
