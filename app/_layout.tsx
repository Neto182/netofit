// app/_layout.tsx

// A LINHA DA SOLUÇÃO DO ERRO ANTERIOR, ESSENCIAL!
import 'react-native-url-polyfill/auto';

import { Stack, router } from 'expo-router';
import { AuthProvider, useAuth } from '../src/context/AuthContext'; // Importamos nosso provedor e hook
import { useEffect } from 'react';

// Este componente é o "miolo" do nosso app.
// Ele decide para onde o usuário deve ir.
function RootLayoutNav() {
  const { session } = useAuth(); // Pega o estado da sessão do nosso contexto

  useEffect(() => {
    // Este efeito roda sempre que o estado da 'session' muda.
    if (session) {
      // Se existe uma sessão (usuário logado), mandamos ele para a tela principal (as abas).
      // 'replace' impede que o usuário volte para a tela de login com o botão "voltar".
      router.replace('/(tabs)');
    } else {
      // Se não há sessão, mandamos ele para a tela de login.
      router.replace('/screens/LoginScreen');
    }
  }, [session]); // O array de dependências garante que isso só rode quando 'session' mudar.

  return (
    // A 'Stack' é o nosso roteador principal.
    // Definimos quais telas fazem parte da navegação inicial.
    <Stack>
      {/* A tela principal é o nosso grupo de abas, mas o nome é apenas '(tabs)' */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      {/* Nossas telas de autenticação */}
      <Stack.Screen name="screens/LoginScreen" options={{ title: 'Login' }} />
      <Stack.Screen name="screens/CadastroScreen" options={{ title: 'Cadastro' }} />
    </Stack>
  );
}

// Este é o componente raiz de todo o app.
export default function RootLayout() {
  return (
    // Envolvemos nosso navegador no AuthProvider para que todas as telas
    // tenham acesso ao estado de autenticação.
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}