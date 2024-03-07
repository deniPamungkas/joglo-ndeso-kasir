import axios from "axios";
import { ReactNode, createContext, useEffect, useState } from "react";

interface authContextType {
    children: ReactNode
}
export const AuthContext = createContext<authContextType | undefined>(undefined)
const AuthContextComp = (props) => {
    //handle userData from/to session storage
    const [userData, setUserData] = useState(JSON.parse(window.sessionStorage.getItem('userData')) || null)
    useEffect(() => {
        window.sessionStorage.setItem('userData', JSON.stringify(userData))
    }, [userData])
    //handle state
    const [error, setError] = useState(null)
    const [warning, setWarning] = useState(null)
    const [loading, setLoading] = useState(false)
    //handle login function
    const login = async (e) => {
        try {
            setLoading(true)
            const response = await axios.post("http://localhost:5500/auth/v1/login", e, { withCredentials: true })
            setError(null)
            //check apakah akun telah diaktivasi atau belum
            if (response.data.message == "akun belum diverifikasi, silahkan verifikasi terlebih dahulu melalui email yang kami kirim") {
                setWarning(response.data)
            } else {
                window.location.pathname = "/dashboard";
            }
            setUserData(response.data)
            return response
        } catch (error) {
            setLoading(true)
            setError(error)
            return error
        } finally {
            setLoading(false)
        }
    }
    return (
        <AuthContext.Provider value={{ login, error, loading, setError, userData, warning, setWarning }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextComp