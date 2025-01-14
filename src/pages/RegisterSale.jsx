import { useState, useContext, useEffect } from 'react'
import { DataContext } from '../context/DataContext'
import { AddProductOnSaleModal } from '../components/Modals/AddProductOnSaleModal'
import { AnimatePresence } from 'framer-motion'
import { motion } from 'framer-motion'
import { IconContext } from 'react-icons'
import { MdEdit } from 'react-icons/md'
import { MdDelete } from 'react-icons/md'
import { MdSave } from 'react-icons/md'
import { WarningModal } from '../components/Modals/WarningModal'
import { EditQuantityOnSaleModal } from '../components/Modals/EditQuantityOnSaleModal'
import { roundTwoDecimals } from '../utils/Utils'
import { SalePaymentModal } from '../components/Modals/SalePaymentModal'
import { ToastNotification } from '../components/Modals/ToastNotification'
import { timeGetter } from '../utils/Utils'
import { Link } from 'react-router-dom'

export const RegisterSale = () => {
    const { data, setData } = useContext(DataContext)
    const [details, setDetails] = useState([])
    const [AddProductModalActive, setAddProductModalActive] = useState(false)
    const [warningModalActive, setWarningModalActive] = useState(false)
    const [editQuantityModalActive, setEditQuantityModalActive] =
        useState(false)
    const [warningModalMessage, setWarningModalMessage] = useState('')
    const [productToAdd, setProductToAdd] = useState({})
    const [quantityToAdd, setQuantityToAdd] = useState('')
    const [entryToEdit, setEntryToEdit] = useState()
    const [total, setTotal] = useState()
    const [paymentModalActive, setPaymentModalActive] = useState(false)
    const [toastNotificationAvtive, setToastNotificationActive] =
        useState(false)
    const [businessDayState, setBusinessDayState] = useState(
        data.businessDayState
    )

    useEffect(() => {
        if (details.length >= 1) {
            const sum = details.reduce((acc, entry) => acc + entry.importe, 0)
            setTotal(sum)
        }
    }, [details])

    const buscarProducto = (e) => {
        e.preventDefault()
        setAddProductModalActive(true)
    }

    const closeAddProductOnSaleModal = () => {
        setAddProductModalActive(false)
    }

    const selectProduct = (product) => {
        setProductToAdd(product)
    }

    const closeWarningModal = () => {
        setWarningModalActive(false)
    }

    const addProductToDetails = (e) => {
        e.preventDefault()
        if (details.some((product) => product.id === productToAdd.id)) {
            setWarningModalMessage(
                'El producto ya está en la transacción, puede editar la cantidad desde el detalle de la venta'
            )
            setWarningModalActive(true)
        } else if (!productToAdd.descripcion) {
            setWarningModalMessage('No ha seleccionado ningún producto')
            setWarningModalActive(true)
        } else if (!quantityToAdd) {
            setWarningModalMessage('No ha ingresado la cantidad del producto')
            setWarningModalActive(true)
        } else {
            let detailsEntry = {
                id: productToAdd.id,
                cantidad: parseInt(quantityToAdd),
                descripcion: productToAdd.descripcion,
                precioUnitarioCompra: productToAdd.precioUnitarioCompra,
                precioUnitarioVenta: productToAdd.precioUnitarioVenta,
                importe: roundTwoDecimals(
                    quantityToAdd * productToAdd.precioUnitarioVenta
                ),
            }
            setDetails([...details, detailsEntry])
            setProductToAdd({})
            setQuantityToAdd('')
        }
    }

    const deleteProductOnDetails = (id) => {
        let temp = details.filter((entry) => entry.id !== id)
        setDetails(temp)
        setTotal(0)
    }

    const openEditQuantityModal = (entry) => {
        setEntryToEdit({
            id: entry.id,
            descripcion: entry.descripcion,
            cantidad: entry.cantidad,
        })
        setEditQuantityModalActive(true)
    }

    const closeEditQuantityModal = () => {
        setEditQuantityModalActive(false)
    }

    const saveEditedQuantity = (qua) => {
        setEditQuantityModalActive(false)
        let temp = details.map((el) => {
            if (el.id === entryToEdit.id) {
                return {
                    ...el,
                    cantidad: qua,
                    importe: el.precioUnitarioVenta * qua,
                }
            }
            return el
        })
        setDetails(temp)
        setEntryToEdit()
    }

    const clickOnProccessSale = () => {
        if (details.length > 0) {
            setPaymentModalActive(true)
        } else {
            setWarningModalMessage(
                'Debe agregar productos para procesar la compra'
            )
            setWarningModalActive(true)
        }
    }

    const closeSalePaymentModal = () => {
        setPaymentModalActive(false)
    }

    const confirmSale = (paymentMethod) => {
        const fullDate = timeGetter().fullDate
        const time = timeGetter().time
        const saleId = timeGetter().timestamp
        let newSale = {
            id: saleId,
            detalles: details,
            fecha: fullDate,
            hora: time,
            importe: total,
            metodoDePago: paymentMethod,
        }

        //esta parte de la función se encarga de restar el stock vendido de los productos
        const newProductData = data.productos.map((product) => {
            const sale = details.find((detail) => detail.id === product.id)
            if (sale) {
                return {
                    ...product,
                    stockActual: product.stockActual - sale.cantidad,
                }
            }
            return product
        })
        setData({
            ...data,
            productos: newProductData,
            ventasDeHoy: [...data.ventasDeHoy, newSale],
        })

        setQuantityToAdd('')
        setProductToAdd('')
        setTotal()
        setDetails([])
        closeSalePaymentModal()
        setToastNotificationActive(true)
        setTimeout(() => {
            setToastNotificationActive(false)
        }, 1500)
    }

    useEffect(() => {
        setBusinessDayState(data.businessDayState)
    }, [data.businessDayState])

    return (
        <div>
            {businessDayState ? (
                <div>
                    <h2 className='text-slate-800 text-3xl font-semibold mt-3 mb-5 text-center'>
                        Registrar Venta
                    </h2>
                    <div className='p-3 flex justify-center min-w-max w-full'>
                        <div className='flex flex-col'>
                            <div className='p-5 mb-5 text-center flex flex-col text-slate-50 bg-slate-600 rounded-md max-h-min shadow-lg'>
                                <div className='flex items-center '>
                                    <h2 className='text-lg'>
                                        Agregar productos:
                                    </h2>
                                    <button
                                        className='p-2 ml-3 bg-sky-500 text-slate-50 hover:bg-sky-300 hover:text-slate-800 rounded-md font-semibold'
                                        onClick={buscarProducto}
                                    >
                                        Buscar Producto
                                    </button>
                                </div>
                                <form className='my-3 flex flex-col '>
                                    <span className='text-lg'>
                                        Producto Seleccionado:
                                    </span>
                                    <span className='p-2 bg-slate-300 rounded-md text-slate-800 min-h-10'>
                                        {productToAdd.descripcion}
                                    </span>
                                    <span className='mt-3 text-lg'>
                                        Cantidad:{' '}
                                    </span>
                                    <input
                                        type='number'
                                        name='cantidad'
                                        className='outline-none p-2 rounded-md text-center text-slate-800'
                                        value={quantityToAdd}
                                        onChange={(e) =>
                                            setQuantityToAdd(e.target.value)
                                        }
                                    />
                                    <button
                                        className='p-2 mt-10 bg-emerald-500 text-slate-50 hover:bg-emerald-300 hover:text-slate-800 font-semibold rounded-md'
                                        onClick={addProductToDetails}
                                    >
                                        Agregar
                                    </button>
                                </form>
                            </div>
                            <button
                                className='p-2 mt-5 bg-yellow-500 text-slate-600 hover:bg-yellow-300 text-lg rounded-md shadow-lg font-semibold'
                                onClick={clickOnProccessSale}
                            >
                                Procesar Compra
                            </button>
                        </div>
                        <div className='px-5'>
                            <h2 className='text-2xl mb-5'>
                                Detalle de la Venta:
                            </h2>
                            <table className='bg-slate-50 text-center min-w-fit max-w-screen-lg border-collapse shadow-lg rounded-lg overflow-hidden'>
                                <thead className='bg-slate-500 text-slate-200 border-solid border-slate-500 border-2'>
                                    <tr>
                                        <th className='w-24'>Cantidad</th>
                                        <th className='w-80'>Descripción</th>
                                        <th className='w-24'>
                                            Precio Unitario
                                        </th>
                                        <th className='w-24'>Importe</th>
                                        <th className='w-32'>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {details.map((detailsEntry) => (
                                        <tr
                                            initial={{ opacity: 0, y: 100 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 100 }}
                                            key={detailsEntry.id}
                                            className='text-slate-900'
                                        >
                                            <td className='p-3 border-solid border-slate-500 border-2'>
                                                {detailsEntry.cantidad}
                                            </td>
                                            <td className='p-3 border-solid border-slate-500 border-2'>
                                                {detailsEntry.descripcion}
                                            </td>
                                            <td className='p-3 border-solid border-slate-500 border-2'>
                                                $
                                                {
                                                    detailsEntry.precioUnitarioVenta
                                                }
                                            </td>
                                            <td className='p-3 border-solid border-slate-500 border-2'>
                                                ${detailsEntry.importe}
                                            </td>
                                            <td className='p-3 border-solid border-slate-500 border-2'>
                                                <IconContext.Provider
                                                    value={{
                                                        className:
                                                            'text-slate-50 w-7 h-7',
                                                    }}
                                                >
                                                    <button
                                                        className='p-1 rounded-md bg-yellow-500'
                                                        onClick={() =>
                                                            openEditQuantityModal(
                                                                detailsEntry
                                                            )
                                                        }
                                                    >
                                                        <MdEdit />
                                                    </button>
                                                    <button
                                                        className='p-1 ml-5 rounded-md bg-red-500'
                                                        onClick={() =>
                                                            deleteProductOnDetails(
                                                                detailsEntry.id
                                                            )
                                                        }
                                                    >
                                                        <MdDelete />
                                                    </button>
                                                </IconContext.Provider>
                                            </td>
                                        </tr>
                                    ))}
                                    <tr className='border-slate-500 border-2'>
                                        <td
                                            colSpan='3'
                                            className='p-2 text-left font-bold text-lg text-slate-50 bg-slate-600'
                                        >
                                            Total
                                        </td>
                                        <td
                                            colSpan='2'
                                            className='text-left font-bold text-lg text-slate-50 bg-slate-600'
                                        >
                                            ${roundTwoDecimals(total) || 0}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <AnimatePresence>
                        {AddProductModalActive && (
                            <AddProductOnSaleModal
                                closeModal={closeAddProductOnSaleModal}
                                selectProduct={selectProduct}
                            />
                        )}
                    </AnimatePresence>
                    <AnimatePresence>
                        {warningModalActive && (
                            <WarningModal
                                message={warningModalMessage}
                                closeModal={closeWarningModal}
                            />
                        )}
                    </AnimatePresence>
                    <AnimatePresence>
                        {editQuantityModalActive && (
                            <EditQuantityOnSaleModal
                                entryToEdit={entryToEdit}
                                saveEditedQuantity={saveEditedQuantity}
                                closeEditQuantityModal={closeEditQuantityModal}
                            />
                        )}
                    </AnimatePresence>
                    <AnimatePresence>
                        {paymentModalActive && (
                            <SalePaymentModal
                                closeSalePaymentModal={closeSalePaymentModal}
                                details={details}
                                total={total}
                                confirmSale={confirmSale}
                            />
                        )}
                    </AnimatePresence>
                    <AnimatePresence>
                        {toastNotificationAvtive && (
                            <ToastNotification
                                message='Venta registrada'
                                notificationType='success'
                            />
                        )}
                    </AnimatePresence>
                </div>
            ) : (
                <div className='flex flex-col items-center justify-center'>
                    <h2 className='text-2xl font-semibold my-24'>
                        El día de negocio debe estar abierto para registrar
                        ventas
                    </h2>
                    <Link to='/' className='bg-slate-700 hover:bg-sky-300 hover:text-slate-800 text-slate-50 font-semibold p-2 w-32 ml-3 rounded-lg shadow-xl text-center flex items-center justify-center'>
                        Ir a Inicio
                    </Link>
                </div>
            )}
        </div>
    )
}
