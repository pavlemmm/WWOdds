export default function HamburgerMenu({onClick}) {
    return (
        <button className='block md:hidden p-2 text-white' onClick={onClick} aria-label='Toggle menu'>
            <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
            >
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16M4 18h16'></path>
            </svg>
        </button>
    );
}
