import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import ProtectedRoute from './utils/ProtectedRoute.jsx';
import NotFound from './pages/NotFound.jsx';
import Layout from './utils/Layout.jsx';
import Admin from './pages/Admin.jsx';

function App() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route element={<Layout />}>
                        <Route
                            path='/'
                            element={
                                <ProtectedRoute>
                                    <Home />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path='/admin'
                            element={
                                <ProtectedRoute admin>
                                    <Admin />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path='/register'
                            element={
                                <ProtectedRoute guest>
                                    <Register />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path='/login'
                            element={
                                <ProtectedRoute guest>
                                    <Login />
                                </ProtectedRoute>
                            }
                        />
                    </Route>

                    <Route path='*' element={<NotFound />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;
