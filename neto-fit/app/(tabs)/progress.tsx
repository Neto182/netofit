// app/(tabs)/progress.tsx
import React from 'react';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function ProgressScreen() {
  return (
    <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ThemedText type="title">Progresso</ThemedText>
      <ThemedText>Gráficos de progressão serão exibidos aqui.</ThemedText>
    </ThemedView>
  );
}