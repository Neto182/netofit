// app/(tabs)/myWorkouts.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { supabase } from '../../src/lib/supabase';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../../src/context/AuthContext';

interface WorkoutTemplate {
  id: string;
  name: string;
}

export default function MyWorkoutsScreen() {
  const [templates, setTemplates] = useState<WorkoutTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { session } = useAuth();

  const fetchWorkoutTemplates = useCallback(async () => {
    if (!session) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('workout_templates')
      .select('id, name')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false });

    if (error) {
      Alert.alert('Erro', 'Não foi possível carregar os seus treinos.');
      console.error(error);
    } else {
      setTemplates(data || []);
    }
    setLoading(false);
  }, [session]);

  useEffect(() => {
    fetchWorkoutTemplates();
  }, [fetchWorkoutTemplates]);

  useFocusEffect(
    useCallback(() => {
      fetchWorkoutTemplates();
    }, [fetchWorkoutTemplates])
  );

  if (loading) {
    return (
      <ThemedView style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title">Os Meus Treinos</ThemedText>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => router.push('/create-workout')}
        >
          <MaterialIcons name="add" size={24} color="#fff" />
          <ThemedText style={styles.createButtonText}>Criar Novo</ThemedText>
        </TouchableOpacity>
      </View>

      <FlatList
        data={templates}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => {/* opcional: navegar para detalhes */}}>
            <ThemedText style={styles.cardTitle}>{item.name}</ThemedText>
            <MaterialIcons name="chevron-right" size={24} color="#888" />
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <ThemedText style={styles.emptyText}>Ainda não criou nenhum treino.</ThemedText>
            <ThemedText style={styles.emptySubText}>Clique em "Criar Novo" para começar!</ThemedText>
          </View>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 32, paddingBottom: 24 },
  createButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#007BFF', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 20 },
  createButtonText: { color: '#fff', marginLeft: 8, fontWeight: 'bold' },
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, marginBottom: 12, backgroundColor: '#fff', borderRadius: 8, elevation: 2, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4 },
  cardTitle: { fontSize: 18, fontWeight: '600' },
  emptyContainer: { flex: 1, marginTop: 100, alignItems: 'center', justifyContent: 'center' },
  emptyText: { fontSize: 18, fontWeight: 'bold', color: '#666' },
  emptySubText: { fontSize: 14, color: '#888', marginTop: 8 },
});
