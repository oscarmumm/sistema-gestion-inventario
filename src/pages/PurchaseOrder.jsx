import {DataContext} from '../context/DataContext'
import {useContext, useEffect, useState} from 'react'
import {MdSave} from 'react-icons/md'
import {IconContext} from 'react-icons'
import {ConfirmationModal} from '../components/Modals/ConfirmationModal'
import {WarningModal} from '../components/Modals/WarningModal'
import {AnimatePresence} from 'framer-motion'
import {timeGetter, toRounded} from '../utils/Utils'
import { ToastNotification } from '../components/Modals/ToastNotification'

export const PurchaseOrder = () => {
    const {data, setData} = useContext(DataContext)
    const [products, setProducts] = useState(data.productos)
    const [inputValues, setInputValues] = useState({})
    const [confirmationModalActive, setConfirmationModalActive] =
        useState(false)
    const [total, setTotal] = useState()
    const [warningModalActive, setWarningModalActive] = useState(false)
    const [warningModalMessage, setWarningModalMessage] = useState()
    const [order, setOrder] = useState()
    const [toastNotificationAvtive, setToastNotificationActive] =
        useState(false)

    const handleChange = (e) => {
        setInputValues({
            ...inputValues,
            [e.target.name]: parseInt(e.target.value),
        })
    }

    const agreeAction = () => {
        setData({
            ...data,
            pedidosAProveedores: [...data.pedidosAProveedores, order],
        })
        setToastNotificationActive(true)
        setTimeout(() => {
            setToastNotificationActive(false)
        }, 1500)
        setConfirmationModalActive(false)
    }

    const cancelAction = () => {
        setConfirmationModalActive(false)
    }

    const closeWarningModal = () => {
        setWarningModalActive(false)
    }

    const clickOnSave = () => {
        if (Object.keys(inputValues).length === 0) {
            setWarningModalMessage('No puede guardar un pedido vacío')
            setWarningModalActive(true)
        } else {
            const purchaseOrderDetails = products.map((product) => ({
                id: product.id,
                descripcion: product.descripcion,
                proveedor: product.proveedor,
                cantidadAPedir: inputValues[product.id],
                importe:
                    product.precioUnitarioCompra *
                    product.cantidadPorCaja *
                    inputValues[product.id],
            }))
            const fullDate = timeGetter().fullDate
            const time = timeGetter().time
            const newPurchaseOrder = {
                id: Date.now(),
                fechaPedido: fullDate,
                horaPedido: time,
                importeTotal: total,
                detallesPedido: purchaseOrderDetails.filter(
                    (el) => el.cantidadAPedir > 0
                ),
            }
            setOrder(newPurchaseOrder)
            setConfirmationModalActive(true)
        }
    }

    useEffect(() => {
        setProducts(data.productos)
        let temp = Object.entries(inputValues).reduce(
            (acumulador, [id, cantidad]) => {
                if(cantidad === undefined || isNaN(cantidad)) {
                    return acumulador
                }
                const product = products.find(
                    (prod) => prod.id === parseInt(id)
                )
                if (product) {
                    return (
                        acumulador +
                        product.precioUnitarioCompra *
                            product.cantidadPorCaja *
                            cantidad
                    )
                }
                return acumulador
            },
            0
        )
        setTotal(toRounded(temp))
    }, [data, inputValues])

    return (
        <div
            className="flex flex-col items-center h-full overflow-auto p-3"
            style={{maxHeight: 'calc(100vh - 64px)'}}>
            <h2 className="text-2xl font-bold my-5">Pedido a Proveedores</h2>
            <button
                className="bg-slate-600 hover:bg-slate-500 text-slate-50 p-3 my-3 ml-3 rounded-md shadow-lg flex items-center"
                onClick={clickOnSave}>
                <IconContext.Provider
                    value={{className: 'text-slate-200 w-7 h-7'}}>
                    <MdSave />
                </IconContext.Provider>
                Guardar pedido
            </button>
            <div className='text-slate-50 bg-slate-600 rounded-md absolute top-20 right-10 p-3 shadow-lg'>Total del pedido: $ {total}</div>
            <table className="bg-slate-200 text-center min-w-fit max-w-screen-lg shadow-lg">
                <thead className="bg-slate-500 text-slate-200">
                    <tr>
                        <th className="p-3">Descripción</th>
                        <th className="p-3">Cant x caja</th>
                        <th className="p-3">Stock actual</th>
                        <th className="p-3">Pedido</th>
                        <th className="p-3">Precio Por Caja</th>
                        <th className="p-3">Costo Total Producto</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id} className="hover:bg-slate-100">
                            <td className="p-3 ">{product.descripcion}</td>
                            <td className="p-3">{product.cantidadPorCaja}</td>
                            <td className="p-3">{product.stockActual}</td>
                            <td className="p-3">
                                <input
                                    type="number"
                                    name={product.id}
                                    className="w-24 outline-none px-3 py-2 text-center rounded-md"
                                    onChange={handleChange}
                                />
                            </td>
                            <td className="p-3">
                                $
                                {product.precioUnitarioCompra *
                                    product.cantidadPorCaja}
                            </td>
                            <td className="p-3">
                                $
                                {(inputValues[product.id] || 0) *
                                    (product.precioUnitarioCompra *
                                        product.cantidadPorCaja)}
                            </td>
                        </tr>
                    ))}
                    <tr className="bg-slate-500 text-slate-200">
                        <td
                            colSpan="5"
                            className="p-3 text-lg text-right font-bold">
                            TOTAL PEDIDO
                        </td>
                        <td className="text-lg font-bold">${total || 0}</td>
                    </tr>
                </tbody>
            </table>
            <AnimatePresence>
                {confirmationModalActive && (
                    <ConfirmationModal
                        message={['Desea confirmar este pedido?']}
                        agreeAction={agreeAction}
                        cancelAction={cancelAction}
                        purchaseOrderInfo={order}
                    />
                )}
            </AnimatePresence>
            <AnimatePresence>
                {warningModalActive && (
                    <WarningModal
                        closeModal={closeWarningModal}
                        message={warningModalMessage}
                    />
                )}
            </AnimatePresence>
            <AnimatePresence>
                    {toastNotificationAvtive && <ToastNotification message={'El pedido se ha guardado'} notificationType={'success'} />}
            </AnimatePresence>
        </div>
    )
}
