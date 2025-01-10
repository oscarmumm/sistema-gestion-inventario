import {DataContext} from '../context/DataContext'
import {useContext, useEffect, useState, useRef} from 'react'
import {MdOutlinePrint} from 'react-icons/md'
import {MdSave} from 'react-icons/md'
import {IconContext} from 'react-icons'
import html2pdf from 'html2pdf.js'
import {AnimatePresence} from 'framer-motion'
import {ConfirmationModal} from '../components/Modals/ConfirmationModal'

//------------COSAS A MEJORAR:
// el ingreso del conteo debería guardarse al moverse entre otras partes de la aplicación
// de este modo el conteo podría corregirse antes de dar por cerrado el día de negocio en curso

export const InventoryCount = () => {
    const {data, setData} = useContext(DataContext)
    const [products, setProducts] = useState(data.productos)
    const [confirmationModalActive, setConfirmationModalActive] =
        useState(false)
    const [inputValues, setInputValues] = useState({})
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

    const clickOnSave = () => {
        setConfirmationModalActive(true)
    }

    const cancelAction = () => {
        setConfirmationModalActive(false)
    }

    const agreeAction = () => {
        const temp = products.map((product) => ({
            ...product, stockPorConteo: inputValues[product.id]
        }))
        setData({
            ...data,
            productos: temp
        })
        setConfirmationModalActive(false)
    }

    const handleChangeCajas = (e, product) => {
        const cantidadCajas = parseInt(e.target.value) * product.cantidadPorCaja
        const unidadesActuales = inputValues[product.id] || 0
        setInputValues({
            ...inputValues,
            [product.id]: cantidadCajas + unidadesActuales
        })
        console.log(inputValues)
    }

    const handleChangeUnidades = (e, product) => {
        const cantidadUnidades = parseInt(e.target.value)
        const totalSegunCajas = inputValues[product.id] || 0
        setInputValues({
            ...inputValues,
            [product.id]: cantidadUnidades + totalSegunCajas
        })
        console.log(inputValues)
    }

    return (
        <div
            className="flex flex-col h-full overflow-auto p-3 items-center relative"
            style={{maxHeight: 'calc(100vh - 64px)'}}>
            <div className="flex flex-col justify-between">
                <h2 className="text-2xl text-center font-semibold my-5">Conteo de Inventario</h2>
                <button
                    className="bg-slate-600 hover:bg-slate-500 text-slate-50 p-3 my-3 rounded-md shadow-xl flex items-center absolute top-2 right-2"
                    onClick={handlePrint}>
                    <IconContext.Provider
                        value={{className: 'text-slate-200 w-7 h-7'}}>
                        <MdOutlinePrint />
                    </IconContext.Provider>
                    <span className="ml-3">Imprimir Hoja de Conteo</span>
                </button>
            </div>
            <table
                ref={ref}
                className="printable-table bg-white text-center min-w-fit max-w-screen-lg shadow-xl overflow-hidden rounded-lg">
                <thead className="bg-slate-500 text-slate-200">
                    <tr>
                        <th className="p-3">Descripcion</th>
                        <th className="p-3">Cant. x Caja</th>
                        <th className="p-3">Cajas</th>
                        <th className="p-3">Unidades</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr
                            className="hover:bg-slate-300 border-b border-slate-300"
                            key={product.id}>
                            <td className="p-3 text-slate-900">
                                {product.descripcion}
                            </td>
                            <td className="p-3 text-slate-900 font-semibold">
                                {product.cantidadPorCaja}
                            </td>
                            <td className="min-w-32">
                                <input
                                    className="w-24 outline-none border border-slate-400 px-3 py-1 text-center rounded-md"
                                    type="number"
                                    name={`${product.id}-cajas`}
                                    value={inputValues[`${product.id}-cajas`]}
                                    onChange={(e) => handleChangeCajas(e, product)}
                                    
                                />
                            </td>
                            <td className="min-w-32">
                                <input
                                    className="w-24 outline-none border border-slate-400 px-3 py-1 text-center rounded-md"
                                    type="number"
                                    name={`${product.id}-unidades`}
                                    value={inputValues[`${product.id}-unidades`]}
                                    onChange={(e) => handleChangeUnidades(e, product)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button
                className="bg-slate-600 hover:bg-slate-500 text-slate-50 p-3 my-3 ml-3 rounded-md shadow-lg flex items-center"
                onClick={clickOnSave}>
                <IconContext.Provider
                    value={{className: 'text-slate-200 w-7 h-7'}}>
                    <MdSave />
                </IconContext.Provider>
                <span className="ml-3">Guardar Conteo</span>
            </button>
            <AnimatePresence>
                {confirmationModalActive && (
                    <ConfirmationModal
                        agreeAction={agreeAction}
                        cancelAction={cancelAction}
                        message={['Está seguro de guardar el conteo?']}
                    />
                )}
            </AnimatePresence>
        </div>
    )
}
