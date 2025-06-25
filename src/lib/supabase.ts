// src/lib/supabase.ts

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

// TENTATIVA FINAL E MAIS ROBUSTA:
const extra = Constants.expoConfig?.extra ?? Constants.manifest?.extra;

const supabaseUrl = "https://lkvzijbavrwoomudlrrv.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxrdnppamJhdnJ3b29tdWRscnJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3NzkxNzgsImV4cCI6MjA2NjM1NTE3OH0.Mx30fbwzm24GmLgocLDhQdsS_8YLDEIqldkN9JXdsVc";
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("As chaves SUPABASE_URL e SUPABASE_ANON_KEY não foram encontradas na configuração do app. Verifique seu app.config.js");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    ...(Platform.OS !== 'web' ? { storage: AsyncStorage } : {}),
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
