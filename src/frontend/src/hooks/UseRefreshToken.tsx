// import axios from "@/apiCalls/axios";
import useAuth from "@/hooks/useAuth";
import axios from "axios";



const useRefreshToken = () => {
    const { setAuth } = useAuth()

    const refresh = async () => {
        const response = await axios.get(`/api/v1/authenticate/refresh`, {
            withCredentials: true
        });
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.accessToken);
            return { ...prev, accessToken: response.data.accessToken }
        })
        
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;
