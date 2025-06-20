import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Card } from '@/components/Card';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function TercaScreen() {
  const router = useRouter();

  const exercises = [
    'Puxada alta',
    'Remada curvada',
    'Remada baixa',
    'Rosca direta',
    'Rosca alternada',
  ];

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <ThemedText type="title" style={styles.title}>
          Terça-feira: Costas e Bíceps
        </ThemedText>

        {exercises.map((name, index) => (
          <Card
            key={index}
            title={name}
            description="Toque para ver detalhes"
            icon={<MaterialIcons name="chevron-right" size={24} />}
            onPress={() => router.push(`/exercicio/${encodeURIComponent(name)}`)}
          />
        ))}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16 },
  title: { fontSize: 24, marginBottom: 16, textAlign: 'center' },
});
