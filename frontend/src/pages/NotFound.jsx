import { Link } from 'react-router-dom';
const NotFound = () => (
    <div className='h-screen flex flex-col justify-center items-center'>
        <h1 className='text-3xl'>404 - Page Not Found</h1>
        <div className='grid grid-flow-col gap-2 mt-2'>
            <Link to='/login' className='underline text-blue-400'>Login</Link>
            <Link to='/register' className='underline text-blue-400'>Register</Link>
            <Link to='/' className='underline text-blue-400'>Home</Link>
        </div>
    </div>
);
export default NotFound;
