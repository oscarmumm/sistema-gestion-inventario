import {motion} from 'framer-motion'

export const ConfirmationModal = ({
    message,
    agreeAction,
    cancelAction,
    productInfo,
    supplierInfo,
    purchaseOrderInfo,
    userInfo,
    businessDayInfo,
}) => {
    const clickOnAgree = () => {
        agreeAction()
    }
    const clickOnCancel = () => {
        cancelAction()
    }

    return (
        <motion.div
            className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center modal-main-bg z-50"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.2}}>
            <motion.div
                className="relative flex flex-col justify-evenly bg-slate-100 py-5 px-10 rounded-md min-w-96 min-h-96 text-center"
                initial={{opacity: 0, y: 100}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: 100}}>
                {message.map((line) => (
                    <span key={line} className="text-xl">
                        {line}
                    </span>
                ))}
                {/* <span className='text-xl'>{message}</span> */}
                {supplierInfo && (
                    <div className="text-xl font-bold flex flex-col my-5">
                        <span>{supplierInfo.nombre}</span>
                    </div>
                )}
                {productInfo && (
                    <div className="text-xl font-semibold flex flex-col my-5">
                        <span>{productInfo.descripcion}</span>
                        <span>Proveedor: {productInfo.proveedor}</span>
                    </div>
                )}
                {purchaseOrderInfo && (
                    <div className="text-xl font-bold flex flex-col my-5">
                        <span>Importe Total: ${purchaseOrderInfo.importeTotal}</span>
                    </div>
                )}
                {userInfo && (
                    <div className="text-xl font-bold flex flex-col my-5">
                        <span>{userInfo.nombreUsuario}</span>
                    </div>
                )}
                {businessDayInfo && (
                    <div className="text-xl font-bold flex flex-col my-5">
                        <span>{businessDayInfo}</span>
                    </div>
                )}
                <div className="flex justify-around mt-10">
                    <button
                        onClick={clickOnCancel}
                        className="bg-slate-600 hover:bg-slate-500 text-slate-50 p-2 w-24 rounded-md shadow-lg">
                        Cancelar
                    </button>
                    <button
                        onClick={clickOnAgree}
                        className="bg-red-600 hover:bg-red-500 text-slate-50 p-2 w-24 ml-3 rounded-md shadow-lg">
                        Aceptar
                    </button>
                </div>
            </motion.div>
        </motion.div>
    )
}
