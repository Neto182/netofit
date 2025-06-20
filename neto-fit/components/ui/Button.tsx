// components/ui/Button.tsx
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';
import { MaterialIcons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export function Button({
  title,
  onPress,
  style,
  icon,
}: {
  title: string;
  onPress: () => void;
  style?: any;
  icon?: React.ReactNode;
}) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <ThemedView 
        style={[
          styles.button, 
          { backgroundColor: colors.primary },
          style
        ]}
      >
        <ThemedText style={styles.buttonText}>
          {icon && <>{icon} </>}
          {title}
        </ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});