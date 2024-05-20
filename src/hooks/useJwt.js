import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const useJwt = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [decodedToken, setDecodedToken] = useState(token ? jwtDecode(token) : null);

  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      setToken(token);
      setDecodedToken(token ? jwtDecode(token) : null);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return { token, decodedToken };
};

export default useJwt;
