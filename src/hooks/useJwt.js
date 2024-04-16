import { jwtDecode } from "jwt-decode";

const useJwt = () => {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    return {
            token,
            decodedToken
    }
}

export default useJwt;