import { defineStore } from 'pinia'
import { supabase } from '@/supabaseClient' // Importamos nossa conexão

// 1. Definimos o "cérebro"
export const useUserStore = defineStore('user', {
  
  // 2. O 'state' é a memória: onde guardamos o nome e a foto
  state: () => ({
    profile: null, // Começa como nulo
  }),

  // 3. O 'getter' é como o app lê a memória de forma fácil
  getters: {
    userName: (state) => state.profile?.name || 'Visitante',
    userPhotoUrl: (state) => state.profile?.foto_url || null,
  },

  // 4. A 'action' é como o cérebro "age": aqui ele busca os dados
  actions: {
    async fetchUserProfile() {
      try {
        // 5. Vai no Supabase e...
        const { data, error } = await supabase
          .from('profiles') // ...na tabela 'profiles'
          .select('*') // ...pega todas as colunas
          .order('created_at', { ascending: false }) // ...ordena pelo mais novo
          .limit(1) // ...pega apenas o último (o mais novo)
          .single() // ...e nos dá como um objeto só.

        if (error) {
          // Se o usuário 'id 6' não existir, ele pode dar um erro aqui,
          // então vamos tratar isso de forma suave.
          console.warn('Erro ao buscar perfil (pode ser o primeiro login):', error.message)
          this.profile = null
        } else {
          // 6. SUCESSO! Guarda os dados na "memória" (state)
          this.profile = data
          console.log('Perfil carregado no cérebro:', this.profile)
        }
      } catch (err) {
        console.error('Erro geral ao buscar perfil:', err)
      }
    },
  },
})