import { useState, useContext, useEffect } from 'react'
import { DataContext } from '../context/DataContext'
import { AddProductOnSaleModal } from '../components/Modals/AddProductOnSaleModal'
import { AnimatePresence } from 'framer-motion'

const saleFormat = {
    cantidad: 0,
    nombre: '',
    precioUnitario: 0,
    importe: 0,
}

export const RegisterSale = () => {
    const { data, setData } = useContext(DataContext)
    const [sale, setSale] = useState([])
    const [AddProductModalActive, setAddProductModalActive] = useState(false)
    const [productToAdd, setProductToAdd] = useState({})
    const [quantityToAdd, setQuantityToAdd] = useState()
    const [total, setTotal] = useState()

    useEffect(() => {
        if (sale.length >= 1) {
            const sum = sale.reduce((acc, entry) => acc + entry.importe, 0)
            setTotal(sum)
        }
    }, [sale])

    const buscarProducto = (e) => {
        e.preventDefault()
        setAddProductModalActive(true)
    }

    const closeModal = () => {
        setAddProductModalActive(false)
    }

    const selectProduct = (product) => {
        setProductToAdd(product)
    }

    const handleQuantityChange = (e) => {
        setQuantityToAdd(e.target.value)
    }

    const addProductToSale = (e) => {
        e.preventDefault()
        let saleEntry = {
            id: productToAdd.id,
            cantidad: quantityToAdd,
            nombre: productToAdd.nombre,
            precioUnitario: productToAdd.precioUnitario,
            importe: quantityToAdd * productToAdd.precioUnitario,
        }
        setSale([...sale, saleEntry])
    }

    return (
        <div
            className='flex flex-col h-full overflow-auto p-3'
            style={{ maxHeight: 'calc(100vh - 64px)' }}
        >
            <h2 className='text-xl my-5 text-center'>Registrar Venta</h2>
            <div className='flex flex-col'>
                <div className='flex items-center'>
                    <h2 className='text-lg'>Agregar productos:</h2>
                    <button
                        className='p-2 ml-3 bg-sky-500 text-slate-50 rounded-md'
                        onClick={buscarProducto}
                    >
                        Buscar Producto
                    </button>
                </div>
                <form className='my-3 flex items-center'>
                    <span className='text-lg'>Producto Seleccionado:</span>
                    <span className='p-2 ml-3 bg-slate-50 rounded-md w-72 h-full'>
                        {productToAdd.nombre}
                    </span>
                    <span className='ml-3 text-lg'>Cantidad: </span>
                    <input
                        type='number'
                        name='cantidad'
                        className='outline-none p-2 ml-3 w-24 rounded-md'
                        onChange={handleQuantityChange}
                    />
                    <button
                        className='p-2 ml-3 bg-emerald-500 text-slate-50 rounded-md'
                        onClick={addProductToSale}
                    >
                        Agregar
                    </button>
                </form>
            </div>
            <h2 className='text-lg'>Detalle de la Venta:</h2>
            <table className='bg-slate-50 text-center min-w-fit max-w-screen-lg border-collapse'>
                <thead className='bg-slate-500 text-slate-200 border-solid border-slate-500 border-2'>
                    <tr>
                        <th className='w-16'>Cantidad</th>
                        <th className='w-72'>Descripción</th>
                        <th className='w-24'>Precio Unitario</th>
                        <th className='w-24'>Importe</th>
                    </tr>
                </thead>
                <tbody>
                    {sale.map((saleEntry) => (
                        <tr key={saleEntry.id}>
                            <td className='p-2 border-solid border-slate-500 border-2'>
                                {saleEntry.cantidad}
                            </td>
                            <td className='p-2 border-solid border-slate-500 border-2'>
                                {saleEntry.nombre}
                            </td>
                            <td className='p-2 border-solid border-slate-500 border-2'>
                                ${saleEntry.precioUnitario}
                            </td>
                            <td className='p-2 border-solid border-slate-500 border-2'>
                                ${saleEntry.importe}
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan='3' className='p-2 text-left font-bold'>
                            Total
                        </td>
                        <td>${total || 0}</td>
                    </tr>
                </tbody>
            </table>
            <AnimatePresence>
                {AddProductModalActive && (
                    <AddProductOnSaleModal
                        closeModal={closeModal}
                        selectProduct={selectProduct}
                    />
                )}
            </AnimatePresence>
        </div>
    )
}
