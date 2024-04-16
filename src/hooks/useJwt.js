import { jwtDecode } from "jwt-decode";

const useJwt = () => {
    const token = localStorage.getItem("token");
    if(token)
    {
        const decodedToken = jwtDecode(token);
        return {
                token,
                decodedToken
        }
    }else return {
        token:null,
        decodedToken:null
    }
}

export default useJwt;