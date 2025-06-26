// app/exercicio/[id].tsx

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { supabase } from '../../src/lib/supabase'; // O caminho muda (3x '../')
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

// Esta é a "forma" do nosso objeto de exercício, para o TypeScript saber o que esperar.
interface ExerciseDetails {
  id: string;
  name: string;
  muscle_group: string;
  type: string;
  equipment: string;
  instructions: string;
}

export default function ExerciseDetailScreen() {
  // O hook 'useLocalSearchParams' do Expo Router é como pegamos o ID do exercício da URL.
  const { id } = useLocalSearchParams();
  
  // Estados para guardar os detalhes do exercício e controlar o carregamento.
  const [exercise, setExercise] = useState<ExerciseDetails | null>(null);
  const [loading, setLoading] = useState(true);

  // Este useEffect roda assim que a tela abre, para buscar os dados do exercício.
  useEffect(() => {
    // A função só executa se o 'id' realmente existir.
    if (id) {
      async function fetchExerciseDetails() {
        setLoading(true);
        // Usamos o Supabase para buscar na tabela 'exercises' apenas a linha
        // onde a coluna 'id' é igual ao 'id' que recebemos da URL.
        // O '.single()' garante que recebemos um único objeto, não uma lista.
        const { data, error } = await supabase
          .from('exercises')
          .select('*')
          .eq('id', id as string) // Informamos ao TS que 'id' é uma string
          .single();

        if (error) {
          console.error('Erro ao buscar detalhes do exercício:', error.message);
        } else {
          setExercise(data);
        }
        setLoading(false);
      }

      fetchExerciseDetails();
    }
  }, [id]); // Este efeito depende do 'id', então ele roda novamente se o id mudar.

  // Enquanto os dados não chegam, mostramos uma animação de carregamento.
  if (loading) {
    return (
      <ThemedView style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

  // Se, após carregar, não encontrarmos o exercício, mostramos uma mensagem.
  if (!exercise) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Exercício não encontrado.</ThemedText>
      </ThemedView>
    );
  }

  // Se tudo deu certo, mostramos os detalhes do exercício.
  return (
    <ThemedView style={{flex: 1}}>
      {/* O Stack.Screen permite configurar o cabeçalho desta página específica. */}
      {/* Aqui, estamos definindo o título da página para ser o nome do exercício. */}
      <Stack.Screen options={{ title: exercise.name, headerShown: true }} />

      <ScrollView contentContainerStyle={styles.container}>
        <ThemedText type="title" style={styles.title}>{exercise.name}</ThemedText>
        
        <View style={styles.infoBox}>
          <ThemedText style={styles.infoTitle}>Grupo Muscular:</ThemedText>
          <ThemedText style={styles.infoContent}>{exercise.muscle_group}</ThemedText>
        </View>
        
        <View style={styles.infoBox}>
          <ThemedText style={styles.infoTitle}>Equipamento:</ThemedText>
          <ThemedText style={styles.infoContent}>{exercise.equipment}</ThemedText>
        </View>
        
        <ThemedText type="subtitle" style={styles.instructionsTitle}>Como Executar</ThemedText>
        <ThemedText style={styles.instructions}>{exercise.instructions}</ThemedText>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginBottom: 24,
  },
  infoBox: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#f9f9f9', // Cor de fundo para o box de info
    borderRadius: 8,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#888'
  },
  infoContent: {
    fontSize: 18,
  },
  instructionsTitle: {
    marginTop: 24,
    marginBottom: 8,
    fontSize: 20,
  },
  instructions: {
    fontSize: 16,
    lineHeight: 24, // Melhora a legibilidade do texto de instruções
  },
});
