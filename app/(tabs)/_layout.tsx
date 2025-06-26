// app/(tabs)/_layout.tsx

import React from 'react';
import { Tabs } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

// Este é um componente de ícone genérico que você pode ter no seu projeto.
const TabBarIcon = (props: { name: React.ComponentProps<typeof MaterialIcons>['name']; color: string }) => {
  return <MaterialIcons size={28} style={{ marginBottom: -3 }} {...props} />;
};

export default function TabLayout() {
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].primary,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: Colors[colorScheme].background,
        },
        headerShown: false,
      }}>
      
      {/* Aba 1: Início */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      
      {/* Aba 2: Os Meus Treinos (NOVA) */}
      <Tabs.Screen
        name="myWorkouts" // O nome do ficheiro que criámos: myWorkouts.tsx
        options={{
          title: 'Os Meus Treinos',
          tabBarIcon: ({ color }) => <TabBarIcon name="list-alt" color={color} />, // Ícone de lista
        }}
      />

      {/* Aba 3: Enciclopédia de Exercícios */}
      <Tabs.Screen
        name="exercises"
        options={{
          title: 'Exercícios',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="dumbbell" size={28} color={color} />,
        }}
      />
      
      {/* Aba 4: Perfil */}
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => <TabBarIcon name="person" color={color} />,
        }}
      />
    </Tabs>
  );
}
