// app/screens/CadastroScreen.tsx




// Minhas Anotações de Aprendizado:


// Aqui eu importo o básico do React e as ferramentas do React Native que vou usar.
// O 'useState' é o que me permite guardar informações que mudam, como o texto nos campos.
import React, { useState } from 'react';




// Aqui eu pego os blocos de construção visuais: View (a base de tudo), Text (para textos),
// TextInput (campos de formulário), Button (o botão), StyleSheet (para organizar o CSS) e Alert (para pop-ups).
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';




// O Link do 'expo-router' é como eu crio a navegação entre as telas. Foi o que eu usei
// para criar o botão "Faça o login".
import { Link } from 'expo-router'; 






// Importei a conexão com o Supabase que agora, finalmente, está funcionando 100%.
// Esse é o meu "portal" para o backend.
import { supabase } from '../../src/lib/supabase';



// Aqui começa o meu componente, a tela de Cadastro em si.
export default function CadastroScreen() {
    
    // ANOTAÇÃO: Estes são os "cérebros" da minha tela.
    // Eu criei um estado para guardar o email que o usuário digita. Começa vazio.
    const [email, setEmail] = useState('');
    
    
    // Criei outro estado para a senha.
    const [password, setPassword] = useState('');
    
    
    // E um estado para controlar o "carregando". Aprendi que isso é importante
    // para desabilitar o botão e evitar que o usuário clique várias vezes.
    const [loading, setLoading] = useState(false);

    // ANOTAÇÃO: Esta é a função principal, a ação que acontece quando eu clico no botão.
    // Coloquei 'async' porque ela vai ter que "esperar" pela resposta da internet (do Supabase).
    async function handleSignUp() {
    
        // Primeiro, eu ativo o modo "carregando". O botão vai mudar de texto e ser desabilitado.
        setLoading(true);
   
        // Aqui eu chamo a função 'signUp' do Supabase. Mando o email e a senha
        // que guardei nos meus estados.
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });
    
        // ANOTAÇÃO: Essa lógica de if/else é o controle de qualidade.
        if (error) {
        
            // Se o Supabase responder com um erro, eu mostro um alerta para o usuário.
            Alert.alert('Erro no Cadastro', error.message);
        } else {
        
        
        
            // Se não houver erro, significa que o cadastro no Supabase deu certo.
            // Eu mostro um alerta de sucesso.
            // Como desligamos a confirmação de email no Supabase, o usuário
            // será logado e redirecionado automaticamente pelo _layout.tsx.
            Alert.alert(
                'Cadastro Realizado!',
                'Você será redirecionado em instantes.'
            );
        }

        // No final de tudo, independente de ter dado certo ou errado,
        // eu desativo o modo "carregando". O botão volta ao normal.
        setLoading(false);
    }
    
    // ANOTAÇÃO: Isso é o que a tela vai de fato desenhar. É a parte visual.
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Crie sua Conta</Text>
            
            <TextInput
                style={styles.input}
                placeholder="Seu e-mail"
                value={email} // O valor do campo é o meu estado 'email'
                onChangeText={setEmail} // Qualquer mudança no texto atualiza o estado 'email'
                autoCapitalize="none" // Aprendi que isso impede a primeira letra maiúscula automática
                keyboardType="email-address" // Isso otimiza o teclado do celular para emails
            />
            
            <TextInput
                style={styles.input}
                placeholder="Sua senha"
                value={password} // O valor é o estado 'password'
                onChangeText={setPassword} // Atualiza o estado 'password'
                secureTextEntry // Essa propriedade esconde a senha (mostra bolinhas)
            />
            
            <Button
                // O texto do botão muda se 'loading' for verdadeiro.
                title={loading ? 'Cadastrando...' : 'Cadastrar'}
                // A ação de pressionar chama a minha função 'handleSignUp'.
                onPress={handleSignUp}
                // O botão fica desabilitado se 'loading' for verdadeiro.
                disabled={loading}
            />

            <View style={styles.linkContainer}>
                <Text style={styles.linkText}>Já tem uma conta?</Text>
                {/* Aqui está o meu link de navegação para a tela de Login */}
                <Link href="/screens/LoginScreen" style={styles.link}>
                    Faça o login
                </Link>
            </View>
        </View>
    );
}

// ANOTAÇÃO: Aqui eu defino toda a aparência da minha tela.
// Usar StyleSheet é melhor para a performance do que colocar os estilos direto nos componentes.
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
