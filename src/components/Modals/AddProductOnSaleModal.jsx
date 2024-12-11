import { useState, useContext } from 'react'
import { DataContext } from '../../context/DataContext'
import { motion } from 'framer-motion'
import { Searchbar } from '../Searchbar'
import { stringAscSort } from '../../utils/Utils'
import { IconContext } from 'react-icons'
import { MdClose } from 'react-icons/md'

//-----------------------------------------------------------------
// AGREGAR FUNCIONES DE ORDENAMIENTO
//-----------------------------------------------------------------

export const AddProductOnSaleModal = ({ closeModal, selectProduct }) => {
    const { data, setData } = useContext(DataContext)
    const [productList, setProductList] = useState(
        stringAscSort(data.productos, 'nombre')
    )
    const handleClick = () => {
        closeModal()
    }

    const startSearch = (search) => {
        const regex = new RegExp(search.trim(), 'i')
        search.trim() === ''
            ? setProductList(data.productos)
            : setProductList(
                  data.productos.filter((el) => regex.test(el.nombre))
              )
    }

    const resetSearch = () => {
        setProductList(stringAscSort(data.productos, 'nombre'))
    }

    const chooseProduct = (product) => {
        selectProduct(product)
        closeModal()
    }

    return (
        <motion.div
            className='fixed top-0 left-0 h-screen w-screen flex items-center justify-center modal-main-bg'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
        >
            <motion.div
                className='relative bg-slate-100 w-3/4 py-5 px-10 rounded-md min-w-96 h-5/6 flex flex-col items-center'
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100 }}
            >
                <button
                    className='hover:bg-slate-300 rounded-md absolute top-0 right-0 p-2'
                    onClick={handleClick}
                >
                    <IconContext.Provider value={{ className: 'w-5 h-5' }}>
                        <MdClose />
                    </IconContext.Provider>
                </button>
                <Searchbar
                    startSearch={startSearch}
                    resetSearch={resetSearch}
                />
                <div className='overflow-y-auto'>
                    <table className='bg-slate-50 min-w-96 max-w-screen-lg border-collapse '>
                        <thead className='bg-slate-500 text-slate-200 border-solid border-slate-500 sticky top-0'>
                            <tr className='text-left'>
                                <th className='p-2'>Nombre</th>
                                <th className='p-2'>Color</th>
                                <th className='p-2'>Proveedor</th>
                                <th className='p-2'>Precio Unitario</th>
                            </tr>
                        </thead>
                        <tbody className='overflow-y-auto'>
                            {productList.map((product) => (
                                <tr
                                    onClick={() => chooseProduct(product)}
                                    className='hover:bg-slate-300 cursor-pointer'
                                    key={product.id}
                                >
                                    <td className='p-3'>{product.nombre}</td>
                                    <td className='p-3'>{product.color}</td>
                                    <td className='p-3'>{product.proveedor}</td>
                                    <td className='text-center'>
                                        ${product.precioUnitario}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </motion.div>
    )
}
