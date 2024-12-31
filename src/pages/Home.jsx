export const Home = () => {
    return (
        <div
            className='flex flex-col h-full overflow-auto p-3 items-center'
            style={{ maxHeight: 'calc(100vh - 64px)' }}
        >
            <h2>Inicio</h2>
            <p>Dia de Negocio Actual: </p>
            <p>Resumen del Día:</p>
            <p>Ventas Totales</p>
            <p>Productos mas vendidos</p>
        </div>
    )
}
