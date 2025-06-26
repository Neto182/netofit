// app/create-workout.tsx
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Alert, FlatList, ActivityIndicator } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { supabase } from '../src/lib/supabase';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../src/context/AuthContext';

interface Exercise { id: string; name: string; }

export default function CreateWorkoutScreen() {
  const [templateName, setTemplateName] = useState('');
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Exercise[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { session } = useAuth();

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.length < 2) { setSearchResults([]); return; }
    setIsSearching(true);
    const { data, error } = await supabase
      .from('exercises')
      .select('id, name')
      .ilike('name', `%${query}%`)
      .limit(10);
    if (!error) setSearchResults(data || []);
    setIsSearching(false);
  };

  const handleSelectExercise = (exercise: Exercise) => {
    if (!selectedExercises.some(ex => ex.id === exercise.id)) {
      setSelectedExercises(prev => [...prev, exercise]);
    }
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleRemoveExercise = (id: string) => {
    setSelectedExercises(prev => prev.filter(ex => ex.id !== id));
  };

  const handleSaveWorkout = async () => {
    if (!templateName.trim()) { Alert.alert('Erro', 'Por favor, dê um nome ao seu treino.'); return; }
    if (selectedExercises.length === 0) { Alert.alert('Erro', 'Adicione pelo menos um exercício.'); return; }
    if (!session) { Alert.alert('Erro', 'Usuário não autenticado.'); return; }
    setLoading(true);

    const { data: tpl, error: tplError } = await supabase
      .from('workout_templates')
      .insert({ name: templateName, user_id: session.user.id })
      .select('id')
      .single();

    if (tplError || !tpl) {
      Alert.alert('Erro', 'Não foi possível criar o treino.');
      setLoading(false);
      return;
    }

    const toInsert = selectedExercises.map((ex, idx) => ({ template_id: tpl.id, exercise_id: ex.id, order: idx+1 }));
    const { error: exError } = await supabase.from('template_exercises').insert(toInsert);

    if (exError) {
      Alert.alert('Erro', 'Treino criado, mas falha ao adicionar exercícios.');
    } else {
      Alert.alert('Sucesso!', 'Treino salvo com sucesso.');
      router.replace('/myWorkouts');
    }
    setLoading(false);
  };

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: 'Criar Novo Treino', headerBackTitle: 'Voltar' }} />
      <ThemedText style={styles.label}>Nome do Treino</ThemedText>
      <TextInput style={styles.input} placeholder="Ex: Dia de Peito" value={templateName} onChangeText={setTemplateName} />

      <ThemedText style={styles.label}>Adicionar Exercício</ThemedText>
      <TextInput style={styles.input} placeholder="Busque um exercício..." value={searchQuery} onChangeText={handleSearch} />
      {isSearching && <ActivityIndicator style={{ marginVertical: 10 }} />}
      <FlatList data={searchResults} keyExtractor={item => item.id} renderItem={({ item }) => (
        <TouchableOpacity style={styles.searchResultItem} onPress={() => handleSelectExercise(item)}>
          <ThemedText>{item.name}</ThemedText>
        </TouchableOpacity>
      )} style={styles.searchResultsContainer} />

      <FlatList data={selectedExercises} keyExtractor={item => item.id} renderItem={({ item }) => (
        <View style={styles.exerciseItem}>
          <ThemedText style={styles.exerciseName}>{item.name}</ThemedText>
          <TouchableOpacity onPress={() => handleRemoveExercise(item.id)}><MaterialIcons name="delete-outline" size={24} color="#ff6347" /></TouchableOpacity>
        </View>
      )} ListHeaderComponent={<ThemedText style={styles.listHeader}>Exercícios no Treino:</ThemedText>} style={{ marginTop: 10 }} />

      <TouchableOpacity style={[styles.saveButton, loading && styles.saveButtonDisabled]} onPress={handleSaveWorkout} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <ThemedText style={styles.saveButtonText}>Guardar Treino</ThemedText>}
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontSize: 16, marginBottom: 8, fontWeight: '600' },
  input: { height: 50, backgroundColor: '#fff', borderRadius: 8, paddingHorizontal: 15, fontSize: 16, marginBottom: 10, borderColor: '#ddd', borderWidth: 1 },
  searchResultsContainer: { maxHeight: 150, borderColor: '#ddd', borderWidth: 1, borderRadius: 8, marginBottom: 20 },
  searchResultItem: { padding: 12, borderBottomWidth: 1, borderBottomColor: '#eee', backgroundColor: '#fff' },
  listHeader: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  exerciseItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#fff', borderRadius: 8, marginBottom: 8, borderWidth: 1, borderColor: '#eee' },
  exerciseName: { fontSize: 16, flex: 1 },
  saveButton: { backgroundColor: '#007BFF', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 20 },
  saveButtonDisabled: { backgroundColor: '#a9a9a9' },
  saveButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
