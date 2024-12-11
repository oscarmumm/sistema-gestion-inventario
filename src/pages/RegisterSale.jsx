import {useState, useContext, useEffect} from 'react'
import {DataContext} from '../context/DataContext'
import {AddProductOnSaleModal} from '../components/Modals/AddProductOnSaleModal'
import {AnimatePresence} from 'framer-motion'
import {motion} from 'framer-motion'
import {IconContext} from 'react-icons'
import {MdEdit} from 'react-icons/md'
import {MdDelete} from 'react-icons/md'
import {MdSave} from 'react-icons/md'
import {WarningModal} from '../components/Modals/WarningModal'
import {EditQuantityOnSaleModal} from '../components/Modals/EditQuantityOnSaleModal'
import {roundTwoDecimals} from '../utils/Utils'

const saleFormat = {
    cantidad: 0,
    nombre: '',
    precioUnitario: 0,
    importe: 0,
}

export const RegisterSale = () => {
    const {data, setData} = useContext(DataContext)
    const [sale, setSale] = useState([])
    const [AddProductModalActive, setAddProductModalActive] = useState(false)
    const [warningModalActive, setWarningModalActive] = useState(false)
    const [editQuantityModalActive, setEditQuantityModalActive] =
        useState(false)
    const [warningModalMessage, setWarningModalMessage] = useState('')
    const [productToAdd, setProductToAdd] = useState({})
    const [quantityToAdd, setQuantityToAdd] = useState('')
    const [entryToEdit, setEntryToEdit] = useState()
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

    const closeWarningModal = () => {
        setWarningModalActive(false)
    }

    const addProductToSale = (e) => {
        e.preventDefault()
        if (sale.some((product) => product.id === productToAdd.id)) {
            setWarningModalMessage(
                'El producto ya está en la transacción, puede editar la cantidad desde el detalle de la venta'
            )
            setWarningModalActive(true)
        } else if (!productToAdd.nombre) {
            setWarningModalMessage('No ha seleccionado ningún producto')
            setWarningModalActive(true)
        } else if (!quantityToAdd) {
            setWarningModalMessage('No ha ingresado la cantidad del producto')
            setWarningModalActive(true)
        } else {
            let saleEntry = {
                id: productToAdd.id,
                cantidad: parseInt(quantityToAdd),
                nombre: productToAdd.nombre,
                precioUnitario: productToAdd.precioUnitario,
                importe: roundTwoDecimals(
                    quantityToAdd * productToAdd.precioUnitario
                ),
            }
            setSale([...sale, saleEntry])
            setProductToAdd({})
            setQuantityToAdd('')
        }
    }

    const deleteProductOnSale = (id) => {
        let temp = sale.filter((entry) => entry.id !== id)
        setSale(temp)
        setTotal(0)
    }

    const editProductOnSale = (id) => {
        setIsDisabled(false)
        console.log(id)
    }

    const openEditQuantityModal = (entry) => {
        setEntryToEdit({
            id: entry.id,
            nombre: entry.nombre,
            cantidad: entry.cantidad,
        })
        setEditQuantityModalActive(true)
    }

    const closeEditQuantityModal = () => {
        setEditQuantityModalActive(false)
    }

    //------------------------------------------
    // REVISAR ESTA FUNCION
    //------------------------------------------
    const saveEditedQuantity = (qua) => {
        setEditQuantityModalActive(false)
        let temp = sale.map((el) => {
            if (el.id === entryToEdit.id) {
                return {
                    ...el,
                    cantidad: qua,
                    importe: el.precioUnitario * qua,
                }
            }
            return el
        })
        setSale(temp)
        setEntryToEdit()
        console.log(sale)
    }

    return (
        <div
            className="flex flex-col items-center h-full overflow-auto p-3"
            style={{maxHeight: 'calc(100vh - 64px)'}}>
            <h2 className="text-3xl mt-3 mb-5 text-center">Registrar Venta</h2>
            <div className="p-3 flex justify-center min-w-max w-full">
                <div className='flex flex-col'>
                    <div className="p-5 mb-5 text-center flex flex-col text-slate-50 bg-slate-600 rounded-md max-h-min">
                        <div className="flex items-center ">
                            <h2 className="text-lg">Agregar productos:</h2>
                            <button
                                className="p-2 ml-3 bg-sky-500 text-slate-50 rounded-md"
                                onClick={buscarProducto}>
                                Buscar Producto
                            </button>
                        </div>
                        <form className="my-3 flex flex-col ">
                            <span className="text-lg">
                                Producto Seleccionado:
                            </span>
                            <span className="p-2 bg-slate-300 rounded-md text-slate-800 min-h-10">
                                {productToAdd.nombre}
                            </span>
                            <span className="mt-3 text-lg">Cantidad: </span>
                            <input
                                type="number"
                                name="cantidad"
                                className="outline-none p-2 rounded-md text-center text-slate-800"
                                value={quantityToAdd}
                                onChange={(e) =>
                                    setQuantityToAdd(e.target.value)
                                }
                            />
                            <button
                                className="p-2 mt-10 bg-emerald-500 text-slate-50 rounded-md"
                                onClick={addProductToSale}>
                                Agregar
                            </button>
                        </form>
                    </div>
                    <button className="p-2 mt-5 bg-yellow-500 text-slate-50 text-lg rounded-md">Procesar Compra</button>
                </div>
                <div className="px-5">
                    <h2 className="text-2xl my-2">Detalle de la Venta:</h2>
                    <table className="bg-slate-50 text-center min-w-fit max-w-screen-lg border-collapse">
                        <thead className="bg-slate-500 text-slate-200 border-solid border-slate-500 border-2">
                            <tr>
                                <th className="w-24">Cantidad</th>
                                <th className="w-80">Descripción</th>
                                <th className="w-24">Precio Unitario</th>
                                <th className="w-24">Importe</th>
                                <th className="w-32">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sale.map((saleEntry) => (
                                <tr
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    exit={{opacity: 0, y: 100}}
                                    key={saleEntry.id}
                                    className="text-slate-900">
                                    <td className="p-3 border-solid border-slate-500 border-2">
                                        {saleEntry.cantidad}
                                    </td>
                                    <td className="p-3 border-solid border-slate-500 border-2">
                                        {saleEntry.nombre}
                                    </td>
                                    <td className="p-3 border-solid border-slate-500 border-2">
                                        ${saleEntry.precioUnitario}
                                    </td>
                                    <td className="p-3 border-solid border-slate-500 border-2">
                                        ${saleEntry.importe}
                                    </td>
                                    <td className="p-3 border-solid border-slate-500 border-2">
                                        <IconContext.Provider
                                            value={{
                                                className:
                                                    'text-slate-50 w-7 h-7',
                                            }}>
                                            <button
                                                className="p-1 rounded-md bg-yellow-500"
                                                onClick={() =>
                                                    openEditQuantityModal(
                                                        saleEntry
                                                    )
                                                }>
                                                <MdEdit />
                                            </button>
                                            <button
                                                className="p-1 ml-5 rounded-md bg-red-500"
                                                onClick={() =>
                                                    deleteProductOnSale(
                                                        saleEntry.id
                                                    )
                                                }>
                                                <MdDelete />
                                            </button>
                                        </IconContext.Provider>
                                    </td>
                                </tr>
                            ))}
                            <tr className='border-slate-500 border-2'>
                                <td
                                    colSpan="3"
                                    className="p-2 text-left font-bold text-lg text-slate-50 bg-slate-600">
                                    Total
                                </td>
                                <td
                                    colSpan="2"
                                    className="text-left font-bold text-lg text-slate-50 bg-slate-600">
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
                        closeModal={closeModal}
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
        </div>
    )
}
