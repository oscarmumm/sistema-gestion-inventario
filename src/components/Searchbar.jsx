import { useState } from 'react'
import { IconContext } from 'react-icons'
import { MdReplay } from 'react-icons/md'
import { MdOutlineSearch } from 'react-icons/md'

export const Searchbar = ({ startSearch, resetSearch }) => {
    const [searchValue, setSearchValue] = useState('')
    const handleCLick = () => {
        resetSearch()
        setSearchValue('')
    }
    return (
        <div className='flex my-3 rounded-md shadow-lg w-96'>
            <IconContext.Provider
                value={{ className: 'text-slate-200 w-8 h-8' }}
            >
                <input
                    className='p-3 flex-grow rounded-l-md outline-none'
                    type='text'
                    placeholder='Ingrese el nombre...'
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                {searchValue && (
                    <button
                        className='px-3 bg-orange-600'
                        onClick={handleCLick}
                    >
                        <MdReplay />
                    </button>
                )}
                <button
                    className='px-3 bg-slate-600 rounded-r-md'
                    onClick={() => startSearch(searchValue)}
                >
                    <MdOutlineSearch />
                </button>
            </IconContext.Provider>
        </div>
    )
}
