import type React from "react";
import { useEffect, useState } from "react";
import { getToken, removeToken } from "../../lib/localStorage.helper";
import Preloader from "./Preloader";
import { useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

export default function WithAuth({ children }: Props) {
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const token = getToken();

      if (token && token !== "") {
        setIsAuthenticated(true);
      } else {
        removeToken("token");
        navigate("/login");
      }

      setIsCheckingAuth(false);
    };

    checkAuth();
  }, []);

  if (isCheckingAuth) {
    return <Preloader />;
  }

  return <>{isAuthenticated ? children : null}</>;
}
