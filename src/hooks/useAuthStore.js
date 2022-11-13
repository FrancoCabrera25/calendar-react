import { useDispatch, useSelector } from 'react-redux';
import { calendarApi } from '../api';
import {
    onChecking,
    onLogin,
    onAuthError,
    onLogout,
} from '../store/auth/authSlice';
import { onClearEvents} from '../store/calendar/calendarSlice';
export const useAuthStore = () => {
    const { status, user, errorMessage } = useSelector((state) => state.auth);

    const distpatch = useDispatch();

    const startLogin = async ({ email, password }) => {
        try {
            distpatch(onChecking());
            const { data } = await calendarApi.post('/auth/login', {
                email,
                password,
            });

            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            distpatch(onLogin({ name: data.name, id: data.id }));
        } catch (error) {
            distpatch(onAuthError('El usuario/contraseña es incorrecta'));
        }
    };

    const startRegister = async ({ name, email, password }) => {
        distpatch(onChecking());

        try {
            const { data } = await calendarApi.post('/auth/new', {
                name,
                email,
                password,
            });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            distpatch(onLogin({ name: data.name, id: data.id }));
        } catch (error) {
            console.log(error);
            distpatch(
                onAuthError(error.data?.msg || 'Error al crear el registro')
            );
        }
    };

    const isAuthenticated = async () => {
        const token = localStorage.getItem('token');

        if (!token) return distpatch(onLogout());

        try {
            const { data } = await calendarApi.get('/auth/renew');

            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            distpatch(onLogin({ name: data.name, id: data.id }));
        } catch (error) {
            localStorage.clear();
            distpatch(
                onAuthError(error.data?.msg || 'Error al renovar el token')
            );
        }
    };

    const logout = () => {
        localStorage.clear();
        distpatch(onLogout());
        distpatch(onClearEvents());
    }

    return {
        // propertis
        status,
        user,
        errorMessage,

        //method
        startLogin,
        startRegister,
        isAuthenticated,
        logout
    };
};
