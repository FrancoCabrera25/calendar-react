import { useAuthStore } from '../../hooks/useAuthStore';

export const NavBar = () => {
    const { user, logout } = useAuthStore();

    return (
        <div className='navbar navbar-dark bg-dark mb-4 px-4'>
            <span className='navbar-brand'>
                <i className='fas fa-calendar-alt'></i>
                &nbsp;
                {user?.name}
            </span>
            <button className='btn btn-outline-danger' onClick={logout}>
                <i className='fas fa-sing-out-alt'></i>
                Salir
            </button>
        </div>
    );
};
