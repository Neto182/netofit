// app/(tabs)/exercises.tsx

import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, View, TextInput, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { supabase } from '../../src/lib/supabase'; // Confirme se o caminho está correto
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { MaterialIcons } from '@expo/vector-icons';

// Definimos uma "interface" para dizer ao TypeScript como é um objeto de exercício.
interface Exercise {
  id: string;
  name: string;
  muscle_group: string;
}

export default function ExercisesScreen() {
  // Estado para a lista mestre de exercícios, vinda do Supabase.
  const [exercises, setExercises] = useState<Exercise[]>([]);
  // Estado para a lista que será exibida na tela, após os filtros.
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
  // Estado para controlar o texto da barra de pesquisa.
  const [searchQuery, setSearchQuery] = useState('');
  // Estado para guardar os grupos musculares únicos para os botões de filtro.
  const [muscleGroups, setMuscleGroups] = useState<string[]>([]);
  // Estado para guardar qual filtro de grupo muscular está ativo.
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string>('Todos');
  // Estado para controlar a animação de carregamento inicial.
  const [loading, setLoading] = useState(true);

  // useEffect para buscar os dados iniciais do Supabase. Roda apenas uma vez.
  useEffect(() => {
    async function fetchExercises() {
      const { data, error } = await supabase
        .from('exercises')
        .select('id, name, muscle_group')
        .order('name', { ascending: true });

      if (error) {
        console.error('Erro ao buscar exercícios:', error);
      } else if (data) {
        setExercises(data); // Guarda a lista completa
        setFilteredExercises(data); // Inicia a lista filtrada com todos os exercícios
        
        // Pega todos os grupos musculares, remove os duplicados e cria a lista de filtros.
        const uniqueGroups = [...new Set(data.map(ex => ex.muscle_group))].sort();
        setMuscleGroups(['Todos', ...uniqueGroups]);
      }
      setLoading(false);
    }

    fetchExercises();
  }, []);

  // useEffect para aplicar os filtros sempre que a pesquisa ou o filtro de grupo mudar.
  useEffect(() => {
    let result = exercises;

    // 1. Filtra por grupo muscular
    if (selectedMuscleGroup !== 'Todos') {
      result = result.filter(ex => ex.muscle_group === selectedMuscleGroup);
    }

    // 2. Filtra pelo texto da pesquisa (no resultado do passo anterior)
    if (searchQuery) {
      result = result.filter(ex => 
        ex.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredExercises(result);
  }, [searchQuery, selectedMuscleGroup, exercises]);


  if (loading) {
    return (
      <ThemedView style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
        <ThemedText>Carregando exercícios...</ThemedText>
      </ThemedView>
    );
  }
  
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>O que quer malhar?</ThemedText>
      
      {/* Barra de Pesquisa */}
      <TextInput
        style={styles.searchBar}
        placeholder="Pesquisar exercício..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Botões de Filtro */}
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterContainer}>
          {muscleGroups.map(group => (
            <TouchableOpacity
              key={group}
              style={[
                styles.filterButton,
                selectedMuscleGroup === group && styles.filterButtonActive
              ]}
              onPress={() => setSelectedMuscleGroup(group)}
            >
              <ThemedText style={[
                  styles.filterButtonText,
                  selectedMuscleGroup === group && styles.filterButtonTextActive
                ]}>
                {group}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Lista de Exercícios Filtrada */}
      <FlatList
        data={filteredExercises}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href={`/exercicio/${item.id}`} asChild>
            <TouchableOpacity style={styles.card}>
              <View style={styles.cardTextContainer}>
                <ThemedText style={styles.cardTitle}>{item.name}</ThemedText>
                <ThemedText style={styles.cardSubtitle}>{item.muscle_group}</ThemedText>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#888" />
            </TouchableOpacity>
          </Link>
        )}
        // Mostra uma mensagem se nenhum exercício for encontrado após filtrar.
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <ThemedText>Nenhum exercício encontrado.</ThemedText>
          </View>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    paddingTop: 60,
    paddingBottom: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 16,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  filterContainer: {
    paddingBottom: 24,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#e9e9e9',
    borderRadius: 20,
    marginRight: 10,
  },
  filterButtonActive: {
    backgroundColor: '#007BFF', // Adapte para a cor primária do seu tema
  },
  filterButtonText: {
    color: '#333',
  },
  filterButtonTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  emptyContainer: {
    flex: 1,
    marginTop: 50,
    alignItems: 'center',
  },
});
