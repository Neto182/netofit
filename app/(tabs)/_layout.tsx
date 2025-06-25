// app/(tabs)/_layout.tsx

import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '../../constants/Colors';


 // ou './Colors', depende do caminho correto

import { ColorScheme } from '@/constants/Colors';

export default function TabLayout() {
  const colorScheme = useColorScheme() as NonNullable<ColorScheme>;
  const colors = Colors[colorScheme];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary, // Usando 'primary' em vez de 'tint'
        tabBarInactiveTintColor: colors.secondaryText,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: 'Progresso',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="show-chart" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="register"
        options={{
          title: 'Registrar',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="add-circle-outline" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}