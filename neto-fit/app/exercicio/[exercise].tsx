// app/exercicio/[exercise].tsx
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function ExerciseDetail() {
  // Agora usamos useLocalSearchParams para rotas dinâmicas
  const { exercise } = useLocalSearchParams<{ exercise: string }>();
  const decoded = decodeURIComponent(exercise);

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <ThemedText type="title" style={styles.title}>
          {decoded}
        </ThemedText>

        {/* Espaço reservado para a foto */}
        <View style={styles.imagePlaceholder}>
          <ThemedText type="default">[Insira aqui a foto do exercício]</ThemedText>
        </View>

        {/* Texto tutorial */}
        <ThemedText type="default" style={styles.tutorial}>
          Tutorial de execução de {decoded}:{'\n\n'}
          1. Posicione-se corretamente...{'\n'}
          2. Mantenha o tronco firme...{'\n'}
          3. Execute o movimento com controle...{'\n'}
          4. Retorne à posição inicial de forma lenta.
        </ThemedText>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16 },
  title: { fontSize: 24, marginBottom: 16, textAlign: 'center' },
  imagePlaceholder: {
    height: 200,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderRadius: 8,
  },
  tutorial: { fontSize: 16, lineHeight: 22 },
});
