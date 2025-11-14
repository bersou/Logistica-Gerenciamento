import { createClient } from '@supabase/supabase-js'

// 1. O código agora "lê" a URL secreta do arquivo-cofre (.env)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL

// 2. O código agora "lê" a Chave secreta do arquivo-cofre (.env)
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY

// 3. Cria e exporta o cliente Supabase
export const supabase = createClient(supabaseUrl, supabaseKey)