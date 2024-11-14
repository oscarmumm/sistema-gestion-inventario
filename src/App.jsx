import { Home } from './views/Home/Home'
import { DataProvider } from './context/DataContext'

function App() {
    return (
        <DataProvider>
            <div className='flex flex-col h-screen w-screen overflow-auto'>
                <Home />
            </div>
        </DataProvider>
    )
}

export default App
