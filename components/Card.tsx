// components/Card.tsx
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export function Card({
  title,
  description,
  icon,
  onPress,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  onPress?: () => void;
}) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <ThemedView 
        style={[
          styles.card, 
          { 
            backgroundColor: colors.cardBackground,
            borderColor: colors.border 
          }
        ]}
      >
        <ThemedView style={styles.cardContent}>
          <ThemedText type="defaultSemiBold" style={{ color: colors.text }}>
            {title}
          </ThemedText>
          <ThemedText 
            type="default" 
            style={[styles.cardText, { color: colors.secondaryText }]}
          >
            {description}
          </ThemedText>
        </ThemedView>
        {icon}
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  cardContent: {
    flex: 1,
  },
  cardText: {
    marginTop: 4,
  },
});