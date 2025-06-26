import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card } from '@/components/Card';

export default function PRsScreen() {
  const [prs, setPRs] = useState<any>(null);

  useEffect(() => {
    const fetchPRs = async () => {
      try {
        const data = await AsyncStorage.getItem('prs');
        if (data) {
          setPRs(JSON.parse(data));
        }
      } catch (error) {
        console.error('Erro ao carregar PRs:', error);
      }
    };

    fetchPRs();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <ThemedText type="title" style={styles.title}>
          Seus PRs Registrados
        </ThemedText>

        {prs ? (
          Object.entries(prs).map(([exercise, { weight, reps }]: any, index) => (
            <Card
              key={index}
              title={exercise.charAt(0).toUpperCase() + exercise.slice(1)}
              description={`Peso: ${weight} kg — Repetições: ${reps}`}
              icon={<MaterialIcons name="fitness-center" size={24} />}
              onPress={() => {}}
            />
          ))
        ) : (
          <ThemedText type="default">Nenhum PR registrado ainda.</ThemedText>
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16 },
  title: { paddingTop: 60, fontSize: 24, marginBottom: 16, textAlign: 'center' },
});
