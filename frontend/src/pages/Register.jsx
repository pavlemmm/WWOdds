import { useState } from 'react';
import { Link } from 'react-router-dom';
import InputText from '../components/common/InputText';
import ToggleGroup from '../components/common/ToggleGroup';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';
import { regionValues } from '../utils/Regions';

function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [regions, setRegions] = useState([]);
    const [errors, setErrors] = useState({});
    const { dispatch } = useAuth();

    const handleRegionsChange = region => {
        setRegions(o => (o.indexOf(region) == -1 ? [...o, region] : o.filter(v => v != region)));
    };


    const validateForm = () => {
        const errors = {};

        const nameRegex = /^\p{L}{3,40}$/u;

        // First name validation
        if (!firstName) {
            errors.firstName = 'First name is required.';
        } else if (!nameRegex.test(firstName)) {
            errors.firstName = 'First name is not valid.';
        }

        // Last name validation
        if (!lastName) {
            errors.lastName = 'Last name is required.';
        } else if (!nameRegex.test(lastName)) {
            errors.lastName = 'Last name is not valid.';
        }

        // Email validation
        const emailRegex = /^[\w\.]{1,40}@\w{1,15}\.\w{2,4}$/;
        if (!email) {
            errors.email = 'Email is required.';
        } else if (!emailRegex.test(email)) {
            errors.email = 'Email is not valid.';
        }

        // Password validation
        const passwordRegex = /^[\w!@#$%^&*()+={}\[\]:;"'<>,.?/\\|`~^-]{8,60}$/;
        if (!password) {
            errors.password = 'Password is required.';
        } else if (!passwordRegex.test(password)) {
            errors.password = 'Password must be at least 8 characters long.';
        }

        if (!confirmPassword) {
            errors.confirmPassword = 'You need to confirm the password.';
        } else if (password != confirmPassword) {
            errors.confirmPassword = "Confirm password doesn't match with the password.";
        }

        return errors;
    };

    const handleRegister = async e => {
        e.preventDefault();

        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        console.log({ email, password, regions, firstName, lastName });

        try {
            const response = await fetch(import.meta.env.VITE_API_URL + '/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, regions, firstName, lastName }),
            });

            if (!response.ok) {
                throw new Error(await response.text());
            }

            const data = await response.json();

            dispatch({
                type: 'REGISTER',
                payload: data.token,
            });

            setErrors({});
        } catch (err) {
            console.log(err);
            setErrors({ form: err.message });
        }
    };

    return (
        <div className='flex-grow flex items-center justify-center'>
            <form onSubmit={handleRegister} className='w-[45rem] rounded border dark:bg-gray-800 bg-gray-300 border-gray-700 px-3 pt-7 pb-5 mx-[2vw]'>
                <h2 className='text-xl mb-7 border-b pb-2 border-gray-700'>Register</h2>
                <div className='flex gap-4'>
                    <div className='flex-1'>
                        <InputText
                            id='firstname'
                            placeholder='John'
                            title='First Name:'
                            required
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                        />
                        <p className='text-red-500 mb-5 text-sm'>{errors.firstName}</p>
                    </div>
                    <div className='flex-1'>
                        <InputText
                            id='lastname'
                            placeholder='Parker'
                            title='Last Name:'
                            required
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                        />
                        <p className='text-red-500 mb-5 text-sm'>{errors.lastName}</p>
                    </div>
                </div>
                <InputText
                    type='email'
                    id='email'
                    placeholder='example@gmail.com'
                    title='Email:'
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className='mb-2'
                />
                <p className='text-red-500 mb-5 text-sm'>{errors.email}</p>
                <InputText
                    type='password'
                    id='password'
                    placeholder='********'
                    title='Password:'
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className='mb-2'
                />
                <p className='text-red-500 mb-5 text-sm'>{errors.password}</p>
                <InputText
                    type='password'
                    id='confirm-password'
                    placeholder='********'
                    title='Confirm Password:'
                    required
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    className='mb-2'
                />
                <p className='text-red-500 mb-8 text-sm'>{errors.confirmPassword}</p>
                <p className='text-sm font-medium text-gray-900 dark:text-white mb-1'>Select Regions: </p>
                <ToggleGroup
                    options={regionValues}
                    selected={regions}
                    onChange={handleRegionsChange}
                    className='mb-8'
                />
                <p className='text-red-500 mb-5 text-sm'>{errors.form}</p>
                Already have an accounut?{' '}
                <Link to='/login' className='underline text-blue-400'>
                    Login
                </Link> now.
                <Button type='submit' className='block mx-auto mt-2'>
                    Register
                </Button>
            </form>
        </div>
    );
}

export default Register;
