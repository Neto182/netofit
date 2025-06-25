// app/(tabs)/register.tsx
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TextInput } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { MaterialIcons } from '@expo/vector-icons';
import { Button } from '@/components/ui/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function RegisterScreen() {
  const [exercises, setExercises] = useState({
    benchPress: { weight: '', reps: '' },
    deadlift: { weight: '', reps: '' },
    squat: { weight: '', reps: '' }
  });

  const handleInputChange = (exercise: string, field: string, value: string) => {
    setExercises(prev => ({
      ...prev,
      [exercise]: {
        ...prev[exercise as keyof typeof exercises],
        [field]: value
      }
    }));
  };

  const handleSubmit = async () => {
  try {
    await AsyncStorage.setItem('prs', JSON.stringify(exercises));
    alert('PRs registrados com sucesso!');
  } catch (error) {
    console.error('Erro ao salvar PRs:', error);
    alert('Erro ao salvar PRs.');
  }
};


  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ThemedText type="title" style={styles.title}>Registrar PRs</ThemedText>
        
        {/* Supino */}
        <ThemedView style={styles.exerciseContainer}>
          <ThemedText type="defaultSemiBold" style={styles.exerciseTitle}>
            <MaterialIcons name="fitness-center" size={20} /> Supino
          </ThemedText>
          <ThemedView style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Peso (kg)"
              keyboardType="numeric"
              value={exercises.benchPress.weight}
              onChangeText={(text) => handleInputChange('benchPress', 'weight', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Repetições"
              keyboardType="numeric"
              value={exercises.benchPress.reps}
              onChangeText={(text) => handleInputChange('benchPress', 'reps', text)}
              
            />
          </ThemedView>
        </ThemedView>

        {/* Deadlift */}
        <ThemedView style={styles.exerciseContainer}>
          <ThemedText type="defaultSemiBold" style={styles.exerciseTitle}>
            <MaterialIcons name="fitness-center" size={20} /> Deadlift
          </ThemedText>
          <ThemedView style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Peso (kg)"
              keyboardType="numeric"
              value={exercises.deadlift.weight}
              onChangeText={(text) => handleInputChange('deadlift', 'weight', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Repetições"
              keyboardType="numeric"
              value={exercises.deadlift.reps}
              onChangeText={(text) => handleInputChange('deadlift', 'reps', text)}
            />
          </ThemedView>
        </ThemedView>

        {/* Agachamento */}
        <ThemedView style={styles.exerciseContainer}>
          <ThemedText type="defaultSemiBold" style={styles.exerciseTitle}>
            <MaterialIcons name="fitness-center" size={20} /> Agachamento
          </ThemedText>
          <ThemedView style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Peso (kg)"
              keyboardType="numeric"
              value={exercises.squat.weight}
              onChangeText={(text) => handleInputChange('squat', 'weight', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Repetições"
              keyboardType="numeric"
              value={exercises.squat.reps}
              onChangeText={(text) => handleInputChange('squat', 'reps', text)}
            />
          </ThemedView>
        </ThemedView>

        <Button 
          title="Salvar Registros" 
          onPress={handleSubmit} 
          style={styles.button}
          icon={<MaterialIcons name="save" size={20} color="white" />}
        />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
  },
  title: {
    marginBottom: 24,
    textAlign: 'center',
  },
  exerciseContainer: {
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
  },
  exerciseTitle: {
    fontSize: 18,
    marginBottom: 12,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
  },
  button: {
    marginTop: 16,
  },
});