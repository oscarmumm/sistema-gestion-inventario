import {useState, createContext, useEffect} from 'react'

export const UserContext = createContext()

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user')
        return storedUser ? JSON.parse(storedUser) : null
    })

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [])

    const logIn = (userData) => {
        setUser(userData)
        localStorage.setItem('user', JSON.stringify(userData))
    }

    const logOut = () => {
        setUser(null)
        localStorage.removeItem('user')
    }
    return (
        <UserContext.Provider value={{user, logIn, logOut}}>
            {children}
        </UserContext.Provider>
    )
}
