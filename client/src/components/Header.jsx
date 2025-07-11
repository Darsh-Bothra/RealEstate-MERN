import { FaSearch } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

function Header() {
    const { currentUser } = useSelector((state) => state.user)
    const [searchTerm, setSearchTerm] = useState('')
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`)
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        if(searchTermFromUrl) {
            setSearchTerm(searchTermFromUrl);
        }
    }, [location.search])

    return (
        <header className='bg-white shadow-lg'>
        {/* <header className='bg-[#A0522D] shadow-lg'> */}
            <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
                <Link to="/">
                    <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                        <span className='text-slate-900'>99</span>
                        <span className='text-slate-400'>Bigha</span> 
                        {/* <span className='text-white'>99</span>
                        <span className='text-black'>Bigha</span>  */}
                    </h1>
                </Link>
                <form 
                    className='bg-slate-100 p-3 rounded-lg flex items-center'
                    onSubmit={handleSubmit}
                >
                    <input
                        type="text"
                        placeholder='Search...' className='bg-transparent focus:outline-none w-24 sm:w-64'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button>
                        <FaSearch  
                            className='text-slate-600' 
                        />
                    </button>
                </form>
                <ul className='flex gap-4'>
                    <Link to="/">
                        <li className='hidden sm:inline text-slate-600 hover:underline'>Home</li>
                        {/* <li className='hidden sm:inline text-[#F5F5DC] hover:underline'>Home</li> */}
                    </Link>
                    <Link to="/about">
                        <li className='hidden sm:inline text-slate-600 hover:underline'>About</li>
                        {/* <li className='hidden sm:inline text-[#F5F5DC] hover:underline'>About</li> */}
                    </Link>
                    <Link to="/profile">
                        {currentUser ? (
                            <img src={currentUser.avatar} alt="profile" className='rounded-full h-7 w-7 object-cover' />
                            
                        ) : (
                            <li className='text-slate-600 hover:underline'>Sign in</li>
                        )}
                    </Link>
                </ul>
            </div>
        </header>
    )
}

export default Header