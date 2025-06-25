// app/screens/LoginScreen.tsx

import React, { useState } from 'react';
// NOVO: Adicionamos Text aqui, caso não estivesse
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native'; 
import { Link } from 'expo-router'; // NOVO: Importamos o componente de Link

import { supabase } from '../../src/lib/supabase';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // Em app/screens/LoginScreen.tsx

async function handleSignIn() {
    // Espião 1: Confirma que o clique no botão chamou a função.
    console.log('--- GATILHO DISPARADO: Função handleSignIn iniciada. ---');
    setLoading(true);

    // Espião 2: Mostra os dados que estamos enviando.
    console.log('Tentando fazer login com:', { email, password });

    const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    // Espião 3: Mostra o resultado que o Supabase retornou.
    console.log('Resposta do Supabase:', { error });

    if (error) {
        console.log('O código entrou no bloco IF (erro).');
        Alert.alert('Erro no Login', error.message);
    } else {
        console.log('O código entrou no bloco ELSE (sucesso). O redirecionamento deve acontecer.');
        // O alerta aqui é opcional, pois o redirecionamento já é a confirmação.
    }

    setLoading(false);
    console.log('--- FIM DA FUNÇÃO handleSignIn. ---');
}

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Entrar</Text>
            
            <TextInput
                style={styles.input}
                placeholder="Seu e-mail"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            
            <TextInput
                style={styles.input}
                placeholder="Sua senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            
            <Button
                title={loading ? 'Entrando...' : 'Entrar'}
                onPress={handleSignIn}
                disabled={loading}
            />

            {/* NOVO: Adicionamos esta seção para o link de cadastro */}
            <View style={styles.linkContainer}>
                <Text style={styles.linkText}>Não tem uma conta?</Text>
                <Link href="/screens/CadastroScreen" style={styles.link}>
                    Cadastre-se
                </Link>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        backgroundColor: '#fff',
        fontSize: 16,
    },
    // NOVO: Estilos para o container do link e o próprio link
    linkContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    linkText: {
        fontSize: 16,
    },
    link: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007BFF', // Um azul padrão para links
        marginLeft: 5,
    },
});