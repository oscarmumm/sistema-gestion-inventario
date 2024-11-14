import { useState, createContext } from 'react'
import { dbProducts } from '../db/dbProducts'

export const DataContext = createContext()

export const DataProvider = ({ children }) => {
    const [data, setData] = useState(dbProducts)
    return (
        <DataContext.Provider value={{data, setData}}>
            {children}
        </DataContext.Provider>
    )
}
