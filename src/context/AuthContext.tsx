// src/context/AuthContext.tsx

import React, { useState, useEffect, createContext, useContext } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase'; // Nosso cliente supabase

// Define o tipo de dados que nosso contexto vai fornecer.
// Neste caso, a sessão do Supabase, que pode ser nula se não estiver logado.
type AuthData = {
  session: Session | null;
};

// Cria o Contexto de Autenticação. É como um túnel de dados global.
const AuthContext = createContext<AuthData>({ session: null });

// Cria o "Provedor" do nosso contexto. É ele quem vai gerenciar o estado de autenticação.
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Tentamos pegar a sessão inicial assim que o app carrega.
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    };

    fetchSession();

    // A MÁGICA ACONTECE AQUI: onAuthStateChange
    // O Supabase nos notifica sobre qualquer mudança no estado de autenticação:
    // LOGIN, LOGOUT, TOKEN REFRESHED, etc.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // Esta função é chamada quando o componente é "desmontado" (sai da tela).
    // Ela remove o "ouvinte" para evitar vazamentos de memória.
    return () => subscription.unsubscribe();
  }, []);

  // O AuthProvider "envolve" partes do nosso app e fornece o estado 'session'.
  // O 'value' é o que outros componentes poderão acessar.
  // Por enquanto, não mostramos nada até que o carregamento inicial da sessão termine.
  if (loading) {
    return null; 
  }

  return (
    <AuthContext.Provider value={{ session }}>
      {children}
    </AuthContext.Provider>
  );
};

// Cria um "hook" customizado para facilitar o acesso ao contexto.
// Em vez de importar o AuthContext em todo lugar, só importamos e usamos o useAuth().
export const useAuth = () => {
  return useContext(AuthContext);
};