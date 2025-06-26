// app/_layout.tsx

import React, { useEffect } from 'react';
import { Stack, router } from 'expo-router';
import { AuthProvider, useAuth } from '../src/context/AuthContext';
// Removi WorkoutCreationProvider, pois a lógica está contida no ecrã agora

function RootLayoutNav() {
  const { session } = useAuth();

  useEffect(() => {
    if (session) {
      router.replace('/(tabs)');
    } else {
      router.replace('/screens/LoginScreen');
    }
  }, [session]);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="screens/LoginScreen" options={{ title: 'Login' }} />
      <Stack.Screen name="screens/CadastroScreen" options={{ title: 'Cadastro' }} />
      
      {/* CORREÇÃO AQUI: 'href: null' esconde esta rota de menus automáticos */}
      <Stack.Screen 
        name="create-workout" 
        options={{ 
          presentation: 'modal', 
          title: 'Criar Novo Treino',
          
          
        }} 
      />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
