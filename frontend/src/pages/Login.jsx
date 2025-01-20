import { useState } from 'react';
import InputText from '../components/form/InputText';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const { dispatch } = useAuth();

    const validateForm = () => {
        const errors = {};

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

        return errors;
    };

    const handleLogin = async e => {
        e.preventDefault();

        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await fetch(import.meta.env.VITE_API_URL + '/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error(await response.text());
            }

            const data = await response.json();

            dispatch({
                type: 'LOGIN',
                payload: data.token,
            });

            setErrors({});
        } catch (err) {
            console.log(err);
            setErrors({ form: err.message });
        }
    };

    return (
        <form onSubmit={handleLogin} className='m-auto mt-10 w-1/2 rounded border px-3 py-5'>
            <InputText
                type='email'
                id='email'
                placeholder='example@gmail.com'
                title='Email:'
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className='mb-1'
            />
            <p className='text-red-500 h-3 mb-5 text-sm'>{errors.email}</p>

            <InputText
                type='password'
                id='password'
                placeholder='********'
                title='Password:'
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className='mb-1'
            />
            <p className='text-red-500 h-3 mb-5 text-sm'>{errors.password}</p>

            <p className='text-red-500 h-3 mb-5 text-sm'>{errors.form}</p>
            <Button type='submit' className='block mx-auto'>
                Login
            </Button>
        </form>
    );
}

export default Login;
