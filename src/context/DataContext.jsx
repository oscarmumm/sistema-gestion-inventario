import { useState, createContext } from 'react'
import { db } from '../db/db'

export const DataContext = createContext()

export const DataProvider = ({ children }) => {
    const [data, setData] = useState(db)
    return (
        <DataContext.Provider value={{data, setData}}>
            {children}
        </DataContext.Provider>
    )
}
