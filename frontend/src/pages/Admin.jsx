import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import InputText from '../components/common/InputText';
import ToggleGroup from '../components/common/ToggleGroup';
import { regionValues } from '../utils/Regions';

export default function Admin(props) {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [maxPages, setMaxPages] = useState(1);

    const [currUser, setCurrUser] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { state: authState } = useAuth();
    const { user, token } = authState;

    const fetchUsers = async opts => {
        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/users?page=${opts.page}&limit=${opts.limit || 4}`,
                {
                    headers: { 'Content-Type': 'application/json', Authorization: token },
                }
            );

            if (!res.ok) {
                throw new Error(await res.text());
            }

            const data = await res.json();

            console.log(data);

            setPage(data.page);
            setMaxPages(data.pages);

            setUsers(data.items);
        } catch (err) {
            console.log(err);
        }
    };

    const deleteUser = async u => {
        if (!confirm(`You are going to delete user ${u.firstName} ${u.lastName}`)) return;
        try {
            const res = await fetch(import.meta.env.VITE_API_URL + `/users/${u._id}`, {
                method: 'DELETE',
                headers: { Authorization: token },
            });

            if (!res.ok) {
                throw new Error(await res.text());
            }

            console.log(await res.json());

            setUsers(oldUsers => oldUsers.filter(u1 => u1._id != u._id));
        } catch (err) {
            console.log(err);
        }
    };

    const patchUser = async (user, body) => {
        console.log(JSON.stringify(body));
        try {
            const res = await fetch(import.meta.env.VITE_API_URL + `/users/${user._id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json', Authorization: token },
                body: JSON.stringify(body),
            });

            if (!res.ok) {
                throw new Error(await res.text());
            }

            console.log(await res.json());

            fetchUsers({ page });
        } catch (err) {
            console.log(err);
        }
    };

    const openEditModal = user => {
        setCurrUser(user);
        setIsModalOpen(true);
    };

    useEffect(() => {
        fetchUsers({ page: page });
    }, []);

    const goPrev = () => page > 1 && fetchUsers({ page: page - 1 });
    const goNext = () => page < maxPages && fetchUsers({ page: page + 1 });

    return (
        <div className='container mx-auto px-2'>
            <h1 className='mt-8 text-2xl max-sm:text-xl font-bold text-blue-600 dark:text-blue-400'>
                Admin Panel: User Management
            </h1>
            <div className='mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
                {users.map(
                    (u, i) =>
                        !u.Admin && (
                            <div
                                key={i}
                                className='dark:bg-gray-800 bg-gray-300 rounded-lg shadow-lg dark:border dark:border-gray-700 p-4'
                            >
                                <h2 className='text-lg font-semibold mb-2 border-b dark:border-gray-700 border-gray-400'>
                                    {u.firstName} {u.lastName}
                                </h2>
                                <p className='dark:text-gray-400'>Email: {u.email}</p>
                                <p className='dark:text-gray-400'>
                                    Regions:{' '}
                                    <span className='dark:text-gray-200 font-medium'>{u.regions.join(', ')}</span>
                                </p>
                                <Button style='blue' onClick={() => openEditModal(u)} className='mt-4 mr-2'>
                                    Edit
                                </Button>
                                <Button style='red' onClick={() => deleteUser(u)}>
                                    Delete
                                </Button>
                            </div>
                        )
                )}
            </div>
            <div>
                <Button onClick={goPrev} className='mt-4 mr-2'>
                    &lt;
                </Button>
                <p className='dark:text-gray-400 inline-block'>
                    {page} / {maxPages}
                </p>
                <Button onClick={goNext} className='ml-2'>
                    &gt;
                </Button>
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <EditUserForm user={currUser} close={() => setIsModalOpen(false)} patchUser={patchUser} />
            </Modal>
        </div>
    );
}

function EditUserForm({ user, close, patchUser }) {
    const [formData, setFormData] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: '',
        regions: user.regions,
    });

    const handleRegionsChange = region => {
        setFormData(o => {
            const regions = o.regions.includes(region) ? o.regions.filter(r => r !== region) : [...o.regions, region];
            return { ...o, regions };
        });
    };

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = e => {
        e.preventDefault();

        const body = {};

        if (user.firstName !== formData.firstName) body.firstName = formData.firstName;
        if (user.lastName !== formData.lastName) body.lastName = formData.lastName;
        if (user.email !== formData.email) body.email = formData.email;
        if (formData.password) body.password = formData.password;
        if (user.regions.toString() !== formData.regions.toString()) body.regions = formData.regions;

        if (Object.keys(body).length === 0) return;

        patchUser(user, body);
        close();
    };

    return (
        <form onSubmit={onSubmit}>
            <h2 className='text-xl border-b font-semibold border-gray-600 pb-1 mb-6 text-blue-600 dark:text-blue-400'>
                Edit {user.firstName} {user.lastName}
            </h2>
            <InputText
                title='First Name'
                name='firstName'
                value={formData.firstName}
                onChange={handleChange}
                className='inline-block max-sm:block max-sm:mr-0 max-sm:mb-4 mr-2'
            />
            <InputText
                title='Last Name'
                name='lastName'
                value={formData.lastName}
                onChange={handleChange}
                className='inline-block max-sm:block mb-4'
            />
            <InputText title='Email' name='email' value={formData.email} onChange={handleChange} className='mb-4' />
            <InputText
                title='New Password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                className='mb-4'
            />
            <p className='text-sm font-medium text-gray-900 dark:text-white mb-1'>Select Regions: </p>
            <ToggleGroup
                options={regionValues}
                onChange={handleRegionsChange}
                selected={formData.regions}
                className='mb-8'
            />
            <Button type='submit' style='blue' className='mr-2'>
                Edit
            </Button>
            <Button type='button' onClick={close}>
                Cancel
            </Button>
        </form>
    );
}
