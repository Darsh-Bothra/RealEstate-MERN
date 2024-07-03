import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header() {
    const { currentUser } = useSelector(state => state.user)
    // console.log(currentUser);
    return (
        <header className='bg-white shadow-lg'>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
                <Link to="/">
                    <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                        <span className='text-orange-400'>99</span>
                        <span className='text-green-500'>Bigha</span>
                    </h1>
                </Link>
                <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
                    <input type="text" placeholder='Search...' className='bg-transparent focus:outline-none w-24 sm:w-64' />
                    <FaSearch className='text-slate-600' />
                </form>
                <ul className='flex gap-4'>
                    <Link to="/">
                        <li className='hidden sm:inline text-slate-600 hover:underline'>Home</li>
                    </Link>
                    <Link to="/about">
                        <li className='hidden sm:inline text-slate-600 hover:underline'>About</li> 
                    </Link>
                    <Link to="/profile">
                        {currentUser ? (
                            <img src={currentUser.avatar} alt="profile" className='rounded-full h-7 w-7 object-cover'/>
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