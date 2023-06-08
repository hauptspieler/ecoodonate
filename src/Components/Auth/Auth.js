import React, { useState, useEffect, createContext } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useHistory } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true); // Adicione este estado
    const history = useHistory();

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false); // Atualize o estado de "carregamento" quando o Firebase terminar de verificar o estado de autenticação do usuário
        });
    }, []);

    function logout() {
        const auth = getAuth();
        signOut(auth).then(() => {
            console.log("Sign-out successful.");
            history.push("/login");
        }).catch((error) => {
            console.error("An error happened during sign-out:", error);
        });
    }

    if (loading) { // Se o estado de "carregamento" for verdadeiro, não renderize o restante do aplicativo
        return null;
    }

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
