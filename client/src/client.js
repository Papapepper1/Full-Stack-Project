import { createClient } from '@supabase/supabase-js'

const URL = 'https://ufkjgcfaissdehsnzeho.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVma2pnY2ZhaXNzZGVoc256ZWhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQwODQ5NTIsImV4cCI6MjAyOTY2MDk1Mn0.EjPTz4xR0cN-Zgsv0bWoPl74-OBCu_h4TGR7gR1G5DA';

export const supabase = createClient(URL, API_KEY);