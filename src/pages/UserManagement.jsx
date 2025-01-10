import {useState, useContext, useEffect} from 'react'
import {AnimatePresence} from 'framer-motion'
import {WarningModal} from '../components/Modals/WarningModal'
import {UserManagementModal} from '../components/Modals/UserManagementModal'
import {DataContext} from '../context/DataContext'
import {IconContext} from 'react-icons'
import {MdEdit} from 'react-icons/md'
import {MdDelete} from 'react-icons/md'
import {NewUserModal} from '../components/Modals/NewUserModal'

export const UserManagement = () => {
    const {data, setData} = useContext(DataContext)
    const [users, setUsers] = useState(data.usuarios)
    const [userManagementModalActive, setUserManagementModalActive] =
        useState(false)
    const [selectedUser, setSelectedUser] = useState({})
    const [newUserModalActive, setNewUserModalActive] = useState(false)

    useEffect(() => {
        setUsers(data.usuarios)
    }, [data])

    const closeUserManagementModal = () => {
        setUserManagementModalActive(false)
    }

    const openNewUserModal = () => {
        setNewUserModalActive(true)
    }

    const closeNewUserModal = () => {
        setNewUserModalActive(false)
    }

    return (
        <div
            className="flex flex-col h-full overflow-auto p-3 items-center"
            style={{maxHeight: 'calc(100vh - 64px)'}}>
            <h2 className='text-2xl font-semibold my-3 text-slate-800'>Gestión de Usuarios</h2>
            <button
                className="bg-green-600 hover:bg-green-500 text-slate-50 p-3 my-5 ml-3 rounded-md shadow-lg"
                onClick={openNewUserModal}>
                Nuevo Usuario
            </button>
            <table className="bg-slate-50 text-center min-w-fit max-w-screen-lg rounded-lg shadow-xl overflow-hidden">
                <thead className="bg-slate-500 text-slate-200">
                    <tr>
                        <th className="p-3">Usuario</th>
                        <th className="p-3">Nombre</th>
                        <th className="p-3">Apellido</th>
                        <th className="p-3">Fecha de creación</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr
                            key={user.fechaCreacion}
                            className="hover:bg-slate-200 border-t-slate-200 border-t-2 cursor-pointer"
                            onClick={() => {
                                setSelectedUser(user)
                                setUserManagementModalActive(true)
                            }}>
                            <td className="p-3">{user.nombreUsuario}</td>
                            <td className="p-3">{user.nombre}</td>
                            <td className="p-3">{user.apellido}</td>
                            <td className="p-3">{user.fechaCreacion}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <AnimatePresence>
                {userManagementModalActive && (
                    <UserManagementModal
                        user={selectedUser}
                        closeUserManagementModal={closeUserManagementModal}
                    />
                )}
            </AnimatePresence>
            <AnimatePresence>
                {newUserModalActive && (
                    <NewUserModal closeNewUserModal={closeNewUserModal} />
                )}
            </AnimatePresence>
        </div>
    )
}
