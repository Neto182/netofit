// app/screens/LoginScreen.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native'; 
import { Link } from 'expo-router';

import { supabase } from '../../src/lib/supabase';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSignIn() {
        setLoading(true);

        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            Alert.alert('Erro no Login', error.message);
        }
        // Se não houver erro, o AuthContext e o _layout.tsx
        // cuidarão do redirecionamento automático.
        
        setLoading(false);
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
