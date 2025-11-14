<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        
        <v-card elevation="2">
          <v-card-title class="pa-4 d-flex align-center">
            <v-icon color="primary" class="mr-3">mdi-account-circle</v-icon>
            Perfil do Usuário
          </v-card-title>
          <v-card-subtitle>
            Preencha seus dados para cadastro
          </v-card-subtitle>
          
          <v-divider></v-divider>
          
          <v-card-text>
            <v-form>
              <v-row>
                
                <v-col cols="12" class="d-flex justify-center">
                  <v-avatar size="120" color="grey-lighten-2" class="avatar-clickable" @click="triggerUpload">
                    <v-img 
                      v-if="fotoPreview" 
                      :src="fotoPreview" 
                      cover 
                      alt="Preview da foto"
                    ></v-img>
                    <v-icon v-else size="60">mdi-camera-plus-outline</v-icon>

                    <v-btn
                      icon="mdi-pencil"
                      size="small"
                      color="primary"
                      class="avatar-edit-icon"
                      @click.stop="triggerUpload"
                    ></v-btn>
                  </v-avatar>

                  <v-file-input
                    ref="fileUploader"
                    @change="onFileSelected"
                    accept="image/png, image/jpeg"
                    class="d-none"
                  ></v-file-input>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="nome"
                    label="Nome Completo"
                    prepend-inner-icon="mdi-account"
                    variant="outlined"
                    :disabled="loading"
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    v-model="email"
                    label="Email"
                    prepend-inner-icon="mdi-email"
                    variant="outlined"
                    type="email"
                    :disabled="loading"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="senha"
                    label="Senha"
                    prepend-inner-icon="mdi-lock"
                    variant="outlined"
                    type="password"
                    :disabled="loading"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="confirmarSenha"
                    label="Confirmar Senha"
                    prepend-inner-icon="mdi-lock-check"
                    variant="outlined"
                    type="password"
                    :disabled="loading"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions class="pa-4">
            <v-spacer></v-spacer>
            <v-btn variant="text" color="grey-darken-1" :disabled="loading">
              Cancelar
            </v-btn>
            
            <v-btn 
              color="primary" 
              variant="flat" 
              @click="salvarCadastro"
              :loading="loading"
              :disabled="loading"
            >
              Salvar Cadastro
            </v-btn>
            </v-card-actions>
        </v-card>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { supabase } from '@/supabaseClient.js'

export default {
  name: 'PerfilViewNovo',
  data: () => ({
    // Campos do formulário
    nome: '', 
    email: '',
    senha: '',
    confirmarSenha: '',
    
    selectedFile: null, // Guarda o ARQUIVO da foto para o upload
    fotoPreview: null,  // Guarda a PRÉ-VISUALIZAÇÃO da foto
    
    loading: false,
  }),

  methods: {
    // ESTA FUNÇÃO RODA AO CLICAR EM "SALVAR CADASTRO"
    async salvarCadastro() {
      this.loading = true;
      let fotoUrlParaSalvar = null;
      const file = this.selectedFile; // Pega o arquivo que guardamos

      // --- PASSO 1: FAZER UPLOAD DA FOTO (SE ELA EXISTIR) ---
      if (file) {
        try {
          const timestamp = Date.now();
          const nomeArquivo = `${timestamp}-${file.name}`;
          
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('avatars') // Seu "depósito"
            .upload(nomeArquivo, file); 

          if (uploadError) { throw uploadError; }

          const { data: urlData } = supabase.storage
            .from('avatars')
            .getPublicUrl(nomeArquivo);

          fotoUrlParaSalvar = urlData.publicUrl; // Guarda o link

        } catch (err) {
          console.error('Erro no upload da foto:', err.message);
          alert('Erro ao fazer upload da foto: ' + err.message);
          this.loading = false;
          return; 
        }
      }

      // --- PASSO 2: SALVAR O TEXTO E O LINK NO BANCO DE DADOS ---
      try {
        const { data, error } = await supabase
          .from('profiles') // Sua tabela
          .insert([
            { 
              name: this.nome, 
              email: this.email,
              foto_url: fotoUrlParaSalvar // Salva o LINK da foto (ou NULL)
            }
          ])
          .select() 

        if (error) { throw error; }
        
        console.log('Dados salvos no banco:', data);
        alert('Cadastro realizado com sucesso!');
        
        // RECARREGA A PÁGINA (Para forçar o "cérebro" a ler os dados novos)
        window.location.reload();

      } catch (err) {
        console.error('Erro ao salvar no banco:', err.message);
        alert('Erro ao salvar o cadastro: ' + err.message);
      
      } finally {
        this.loading = false;
      }
    },

    // --- LÓGICA NOVA PARA O UPLOAD DE FOTO ---
    
    // 1. Este método é chamado quando clicamos no avatar
    triggerUpload() {
      // Ele "clica" no campo de upload escondido
      this.$refs.fileUploader.click();
    },

    // 2. Este método é chamado quando o campo escondido seleciona um arquivo
    onFileSelected(event) {
      const file = event.target.files[0]; // Pega o arquivo
      
      if (file && file instanceof File) { 
        this.selectedFile = file; // Guarda o ARQUIVO para o 'salvarCadastro'
        
        // Gera a PRÉ-VISUALIZAÇÃO (para o usuário ver)
        const reader = new FileReader();
        reader.onload = (e) => {
          this.fotoPreview = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        this.selectedFile = null;
        this.fotoPreview = null;
      }
    }
  }
}
</script>

<style>
.avatar-clickable {
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease-in-out;
}
.avatar-clickable:hover {
  opacity: 0.8;
}
.avatar-edit-icon {
  position: absolute;
  bottom: 4px;
  right: 4px;
}
</style>