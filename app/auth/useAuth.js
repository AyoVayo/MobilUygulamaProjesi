import { useContext } from "react";

import authStorage from "./authStorage";
import AuthContext from "./context";

export default useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const logOut = () => {
    setUser(null);
    authStorage.removeToken();
  };

  return { user, logOut };
};
