export const Unauthorized = () => {
    return (
        <div
            className="flex flex-col h-full overflow-auto p-3 min-w-96 items-center justify-center"
            style={{maxHeight: 'calc(100vh - 64px)'}}>
            <h2 className="text-2xl text-slate-800 font-semibold">
                Usted no está autorizado para ver este contenido
            </h2>
        </div>
    )
}
