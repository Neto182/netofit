// app/(tabs)/index.tsx

import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { MaterialIcons } from '@expo/vector-icons';
import { Card } from '@/components/Card';
import { useRouter } from 'expo-router';

type WorkoutDay = {
  id: string;
  day: string;
  muscleGroup: string;
  route: string;    // <- aqui
};

export default function HomeScreen() {
  const router = useRouter();

  const workoutDays: WorkoutDay[] = [
    { id: '1', day: 'Segunda-feira', muscleGroup: 'Peito e Tríceps', route: '/segunda' },
    { id: '2', day: 'Terça-feira', muscleGroup: 'Costas e Bíceps',  route: '/terca'  },
    { id: '3', day: 'Quarta-feira', muscleGroup: 'Perna',            route: '/quarta' },
    { id: '4', day: 'Quinta-feira', muscleGroup: 'Ombros e Trapézio', route: '/quinta' },
    { id: '5', day: 'Sexta-feira', muscleGroup: 'Glúteos e Posterior',route: '/sexta'  },
    { id: '6', day: 'Sábado',      muscleGroup: 'Cardio e Abdômen',   route: '/sabado' },
    // domingo você não precisa de rota
  ];

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ThemedView style={styles.header}>
          <ThemedText type="title">Neto-Fit</ThemedText>
          <ThemedText type="subtitle">App pipipi popoó de musculação(ainda vou criar algo</ThemedText>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
            Treinos da Semana
          </ThemedText>
          
          {workoutDays.map((day) => (
            <Card
              key={day.id}
              title={day.day}
              description={day.muscleGroup}
              icon={<MaterialIcons name="chevron-right" size={24} />}
              onPress={() => router.push(day.route)}  // agora existe!
            />
          ))}
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container:      { flex: 1 },
  scrollContainer:{ padding: 16 },
  header:         { marginBottom: 24, paddingTop: 60 },
  section:        { marginBottom: 24 },
  sectionTitle:   { fontSize: 20, marginBottom: 12 },
});
