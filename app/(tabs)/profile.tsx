// app/(tabs)/profile.tsx

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { supabase } from '../../src/lib/supabase';
import { useAuth } from '../../src/context/AuthContext'; // Nosso hook de autenticação

export default function ProfileScreen() {
  // Usamos nosso hook para pegar a sessão atual. Simples assim!
  const { session } = useAuth();

  // Função para fazer logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    // O onAuthStateChange no nosso AuthContext vai detectar o logout
    // e o roteador vai nos redirecionar automaticamente.
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Perfil</Text>
      
      {/* Mostramos o e-mail do usuário se a sessão existir */}
      {session && <Text style={styles.email}>Logado como: {session.user.email}</Text>}
      
      <Button title="Sair (Logout)" onPress={handleLogout} color="#ff6347" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  email: {
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
  },
});