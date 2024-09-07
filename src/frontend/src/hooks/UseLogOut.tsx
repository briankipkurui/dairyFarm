
import axios from "axios";
import useAuth from "./useAuth";

const useLogout = () => {
    const { setAuth } = useAuth();

    const logout = async () => {
        setAuth({})
        try {
            await axios('/api/v1/authenticate/signOut', {
                withCredentials: true
            });
        } catch (err) {
            console.error(err)
        }
    }

    return logout;
}

export default useLogout