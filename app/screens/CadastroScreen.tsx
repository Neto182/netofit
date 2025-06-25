// app/screens/CadastroScreen.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Link } from 'expo-router'; // NOVO: Importamos o componente de Link

import { supabase } from '../../src/lib/supabase';

export default function CadastroScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSignUp() {
    setLoading(true);
    // Usamos a mesma chamada de antes
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
    });

    // MUDANÇA AQUI: A lógica está mais simples e robusta
    if (error) {
        // Se houver qualquer erro, mostre o alerta de erro.
        Alert.alert('Erro no Cadastro', error.message);
    } else {
        // Se NÃO houver erro, a operação no Supabase foi um sucesso.
        // Mostramos o alerta para verificar o e-mail, cobrindo todos os casos de sucesso.
        Alert.alert(
            'Cadastro Realizado!',
            'Verifique seu e-mail para confirmar sua conta antes de fazer o login.'
        );
    }

    
        setLoading(false);
    }
    
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Crie sua Conta</Text>
            
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
                title={loading ? 'Cadastrando...' : 'Cadastrar'}
                onPress={handleSignUp}
                disabled={loading}
            />

            {/* NOVO: Adicionamos esta seção para o link de login */}
            <View style={styles.linkContainer}>
                <Text style={styles.linkText}>Já tem uma conta?</Text>
                <Link href="/screens/LoginScreen" style={styles.link}>
                    Faça o login
                </Link>
            </View>
        </View>
    );
}

// Adicione os mesmos estilos de link aqui
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
        color: '#007BFF',
        marginLeft: 5,
    },
});