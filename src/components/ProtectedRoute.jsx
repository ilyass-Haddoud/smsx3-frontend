import { Outlet, Navigate } from 'react-router-dom'
import useJwt from '../hooks/useJwt';

const ProtectedRoute = () => {
    const {token,decodedToken} = useJwt()
    return (
        token && decodedToken.name ? <Outlet/> : <Navigate to="/auth/login"/>
    )
};

export default ProtectedRoute;