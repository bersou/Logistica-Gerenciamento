<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4">
        <v-card 
          class="pa-4 kpi-card" 
          elevation="2" 
          @click="showKpiDetails('pendentes')"
        >
          <div class="d-flex align-center">
            <v-icon color="blue" size="x-large">mdi-truck-fast</v-icon>
            <div class="ml-4">
              <v-card-title class="pa-0">Entregas Pendentes</v-card-title>
              <v-card-text class="pa-0 text-h4 text-blue-darken-2">
                42
              </v-card-text>
            </div>
          </div>
        </v-card>
      </v-col>
      
      <v-col cols="12" md="4">
        <v-card 
          class="pa-4 kpi-card" 
          elevation="2"
          @click="showKpiDetails('concluidas')"
        >
          <div class="d-flex align-center">
            <v-icon color="green" size="x-large">mdi-check-circle</v-icon>
            <div class="ml-4">
              <v-card-title class="pa-0">Entregas Concluídas</v-card-title>
              <v-card-text class="pa-0 text-h4 text-green-darken-2">
                128
              </v-card-text>
            </div>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card 
          class="pa-4 kpi-card" 
          elevation="2"
          @click="showKpiDetails('alertas')"
        >
           <div class="d-flex align-center">
            <v-icon color="red" size="x-large">mdi-alert-circle</v-icon>
            <div class="ml-4">
              <v-card-title class="pa-0">Alertas</v-card-title>
              <v-card-text class="pa-0 text-h4 text-red-darken-2">
                3
              </v-card-text>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col cols="12">
        <v-card elevation="2">
          <v-card-title class="pa-4">
            <v-icon color="primary" class="mr-2">mdi-robot-outline</v-icon>
            Assistente de Logística
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text ref="messageContainer" class="message-container">
            <div v-for="(msg, index) in messages" :key="index" :class="['message', msg.from]">
              <div class="bubble">
                {{ msg.text }}
              </div>
            </div>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="pa-4">
            <v-text-field
              v-model="newMessage"
              label="Pergunte algo sobre logística..."
              variant="outlined"
              density="compact"
              hide-details
              @keydown.enter="sendMessage"
            ></v-text-field>
            <v-btn 
              color="primary" 
              icon="mdi-send" 
              class="ml-2"
              @click="sendMessage"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="kpiDialog" max-width="800px">
      <v-card>
        <v-card-title class="pa-4 d-flex align-center">
          <v-icon :color="kpiDialogData.iconColor" class="mr-3">{{ kpiDialogData.icon }}</v-icon>
          {{ kpiDialogData.title }}
          <v-spacer></v-spacer>
          <v-btn icon="mdi-close" variant="text" @click="kpiDialog = false"></v-btn>
        </v-card-title>
        
        <v-divider></v-divider>

        <v-card-text class="pa-0">
          <v-list lines="two">
            <v-list-item
              v-for="item in kpiDialogData.items"
              :key="item.id"
              :title="item.title"
              :subtitle="item.subtitle"
            >
              <template v-slot:prepend>
                <v-avatar :color="kpiDialogData.iconColor" size="40" class="mr-4">
                  <span class="white--text text-h6">{{ item.id.slice(-2) }}</span>
                </v-avatar>
              </template>
            </v-list-item>
          </v-list>
        </v-card-text>

        <v-divider></v-divider>
        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn color="grey-darken-1" variant="text" @click="kpiDialog = false">
            Fechar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-container>
</template>

<script>
  import { nextTick } from 'vue' 

  export default {
    name: 'DashboardView',
    data: () => ({
      // --- DADOS DO CHATBOT (Sem mudanças) ---
      newMessage: '',
      messages: [
        { text: 'Olá! Sou seu assistente de logística. Como posso ajudar hoje?', from: 'bot' }
      ],

      // --- NOVAS VARIÁVEIS PARA O POP-UP (DIALOG) ---
      kpiDialog: false, // Controla se o pop-up está aberto
      kpiDialogData: { // Guarda os dados a serem mostrados no pop-up
        title: '',
        icon: '',
        iconColor: '',
        items: []
      },
      
      // Dados de exemplo para os pop-ups
      mockData: {
        pendentes: [
          { id: 'PED-1020', title: 'Cliente: AgroSul', subtitle: 'Destino: Porto Alegre, RS' },
          { id: 'PED-1021', title: 'Cliente: Varejista Rápido', subtitle: 'Destino: Rio de Janeiro, RJ' },
          { id: 'PED-1022', title: 'Cliente: Norte Log', subtitle: 'Destino: Salvador, BA' },
          // ... (poderíamos adicionar mais 39)
        ],
        concluidas: [
          { id: 'PED-980', title: 'Cliente: TechCorp Solutions', subtitle: 'Entregue: 12/11/2025' },
          { id: 'PED-981', title: 'Cliente: Indústrias Minas', subtitle: 'Entregue: 11/11/2025' },
          // ... (etc)
        ],
        alertas: [
          { id: 'PED-1005', title: 'Cliente E (BA)', subtitle: 'Status: Atrasado - Previsto para 12/11, não entregue.' },
          { id: 'VEI-301', title: 'Veículo: JKL-3456', subtitle: 'Manutenção Preventiva Vencida.' },
          { id: 'PED-1021', title: 'Cliente: Varejista Rápido', subtitle: 'Parado na fiscalização - 2h.' },
        ]
      }
    }),
    methods: {
      // --- MÉTODOS DO CHATBOT (Sem mudanças) ---
      async sendMessage() {
        const text = this.newMessage.trim();
        if (text === '') return; 

        this.messages.push({ text: text, from: 'user' });
        this.newMessage = ''; 
        await this.scrollToBottom();

        this.messages.push({ text: 'Analisando sua pergunta...', from: 'bot-loading' });
        await this.scrollToBottom();

        setTimeout(async () => {
          this.messages.pop(); 
          const botResponse = this.getMockBotResponse(text);
          this.messages.push({ text: botResponse, from: 'bot' });
          await this.scrollToBottom();
        }, 1200); 
      },
      getMockBotResponse(userText) {
        const text = userText.toLowerCase();
        if (text.includes('rota') || text.includes('otimizada') || text.includes('abc-1234')) {
          return 'A rota mais otimizada para o veículo ABC-1234 é pela Rodovia dos Bandeirantes, com chegada estimada às 14:30. Deseja confirmar?';
        }
        if (text.includes('tempo') || text.includes('chegada') || text.includes('ped-1005')) {
          return 'O pedido PED-1005 (Cliente D, RS) está em trânsito e tem chegada estimada para hoje, às 16:45.';
        }
        if (text.includes('status') || text.includes('pendentes')) {
          return 'Atualmente, temos 42 entregas pendentes. 8 estão em rota e 34 aguardando coleta no centro de distribuição.';
        }
        if (text.includes('olá') || text.includes('oi') || text.includes('bom dia')) {
          return 'Olá! Estou pronto para analisar os dados. O que você gostaria de saber?';
        }
        return 'Entendido. Por favor, me dê mais detalhes sobre sua solicitação ou pergunte sobre "rotas", "status de pedidos" ou "tempo de chegada".';
      },
      async scrollToBottom() {
        await nextTick(); 
        const container = this.$refs.messageContainer;
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      },

      // --- NOVO MÉTODO PARA O POP-UP ---
      showKpiDetails(kpiType) {
        if (kpiType === 'pendentes') {
          this.kpiDialogData = {
            title: 'Detalhes das Entregas Pendentes (42)',
            icon: 'mdi-truck-fast',
            iconColor: 'blue',
            items: this.mockData.pendentes
          };
        } 
        else if (kpiType === 'concluidas') {
          this.kpiDialogData = {
            title: 'Detalhes das Entregas Concluídas (128)',
            icon: 'mdi-check-circle',
            iconColor: 'green',
            items: this.mockData.concluidas
          };
        }
        else if (kpiType === 'alertas') {
          this.kpiDialogData = {
            title: 'Detalhes dos Alertas (3)',
            icon: 'mdi-alert-circle',
            iconColor: 'red',
            items: this.mockData.alertas
          };
        }
        
        // Abre o pop-up
        this.kpiDialog = true;
      }
    }
  }
</script>

<style>
/* --- NOVO ESTILO PARA O CURSOR --- */
.kpi-card {
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}
.kpi-card:hover {
  transform: translateY(-4px); /* Faz o card "saltar" */
  box-shadow: 0 4px 15px rgba(0,0,0,0.1) !important; /* Adiciona mais sombra */
}


/* --- Estilos do Chatbot (sem mudanças) --- */
.message-container {
  height: 300px; 
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 16px;
}
.message {
  display: flex;
}
.bubble {
  padding: 10px 16px;
  border-radius: 20px;
  max-width: 75%;
  word-wrap: break-word;
}
.message.user {
  justify-content: flex-end; 
}
.message.user .bubble {
  background-color: rgb(var(--v-theme-primary)); 
  color: white;
  border-bottom-right-radius: 4px;
}
.message.bot {
  justify-content: flex-start;
}
.message.bot .bubble {
  background-color: #f1f1f1;
  color: black;
  border-bottom-left-radius: 4px; 
}
.message.bot-loading {
  justify-content: flex-start;
}
.message.bot-loading .bubble {
  background-color: #f1f1f1;
  color: #666;
  font-style: italic; 
  border-bottom-left-radius: 4px;
}
</style>