import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Card } from '@/components/Card';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function SabadoScreen() {
  const router = useRouter();

  const exercises = [
    'Caminhada 8km',
    'Prancha',
    'Abdominal supra',
    'Elevação de pernas',
  ];

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <ThemedText type="title" style={styles.title}>
          Sábado: Cardio e Abdômen
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
