import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';
import { adicionarAoCarrinho } from '../services/homeService';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Tentar recuperar o usuário do localStorage ao carregar a página
        const storagedUser = localStorage.getItem('@SaborSenac:user');

        if (storagedUser) {
            setUser(JSON.parse(storagedUser));
        }
        setLoading(false);
    }, []);

    async function login(email, senha) {
        try {
            const response = await api.post('/login', { email, senha });
            
            const userData = response.data.user;
            
            setUser(userData);
            localStorage.setItem('@SaborSenac:user', JSON.stringify(userData));

            // Sincronizar carrinho local se existir
            const localCart = JSON.parse(localStorage.getItem('@SaborSenac:localCart') || '[]');
            if (localCart.length > 0) {
                for (const item of localCart) {
                    try {
                        await adicionarAoCarrinho(
                            userData.id_pessoa,
                            item.id_produto,
                            item.quantidade,
                            item.preco_unitario
                        );
                    } catch (syncError) {
                        console.error('Erro ao sincronizar item do carrinho:', syncError);
                    }
                }
                localStorage.removeItem('@SaborSenac:localCart');
            }
            
            return { success: true };
        } catch (error) {
            console.error('Erro no login:', error);
            const message = error.response?.data?.error || 'Erro ao realizar login. Verifique suas credenciais.';
            return { success: false, message };
        }
    }

    function logout() {
        localStorage.removeItem('@SaborSenac:user');
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}
