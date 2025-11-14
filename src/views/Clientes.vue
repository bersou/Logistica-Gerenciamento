<template>
  <v-container>
    <v-row class="mb-4" align="center">
      <v-col cols="6">
        <h2 class="">Nossos Clientes</h2>
      </v-col>
      <v-col cols="6" class="text-right">
        <v-btn color="primary" @click="openNewClientDialog">
          <v-icon left>mdi-plus-circle</v-icon>
          Adicionar Novo Cliente
        </v-btn>
      </v-col>
    </v-row>

    
    <v-row>
      
      <v-col cols="12" md="6" lg="4" v-for="cliente in clientes" :key="cliente.id">
        <v-card class="mx-auto" max-width="400" elevation="2">
          <v-card-item class="d-flex align-center pa-4">
            
            <v-avatar size="50" class="mr-4" color="grey-lighten-2">
              <v-img 
                :src="'https://logo.clearbit.com/' + cliente.domain" 
                :alt="cliente.nome"
                @error="cliente.logoError = true"
              >
                <template v-slot:error>
                  <span class="text-h5 grey-darken-1">
                    {{ cliente.nome.substring(0, 2).toUpperCase() }}
                  </span>
                </template>
              </v-img>
            </v-avatar>
            
            <div>
              <v-card-title class="pa-0 mb-1">
                {{ cliente.nome }}
              </v-card-title>
              <v-card-subtitle class="pa-0">
                {{ cliente.local }}
              </v-card-subtitle>
            </div>
          </v-card-item>
          
          <v-divider></v-divider>
          
          <v-card-text class="py-4">
            <strong>Último Pedido:</strong> {{ cliente.ultimoPedido }} <br>
            <strong>Status:</strong> <v-chip small :color="cliente.statusCor">{{ cliente.status }}</v-chip>
          </v-card-text>

          <v-card-actions class="pa-4">
            <v-btn variant="outlined" color="primary" @click="showDeliveries(cliente)">
              <v-icon left>mdi-truck</v-icon>
              Ver Entregas
            </v-btn>
            <v-btn variant="text" color="grey-darken-1" @click="showDetails(cliente)">
              Detalhes
            </v-btn>
            </v-card-actions>
        </v-card>
      </v-col>
      
    </v-row>

    <v-dialog v-model="detailsDialog" max-width="600px">
      <v-card v-if="selectedClient">
        <v-card-title class="d-flex align-center pa-4">
          <v-avatar size="40" class="mr-3" color="grey-lighten-2">
            <v-img 
              :src="'https://logo.clearbit.com/' + selectedClient.domain" 
              :alt="selectedClient.nome"
            >
              <template v-slot:error>
                <span class="grey-darken-1">
                  {{ selectedClient.nome.substring(0, 2).toUpperCase() }}
                </span>
              </template>
            </v-img>
          </v-avatar>
          Detalhes de: {{ selectedClient.nome }}
          <v-spacer></v-spacer>
          <v-btn icon="mdi-close" variant="text" @click="detailsDialog = false"></v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pa-5">
          <v-list-item title="Localização" :subtitle="selectedClient.local"></v-list-item>
          <v-list-item title="CNPJ (Exemplo)" subtitle="00.123.456/0001-00"></v-list-item>
          <v-list-item title="Contato Principal" subtitle="contato@cliente.com"></v-list-item>
        </v-card-text>
      </v-card>
    </v-dialog>


    <v-dialog v-model="newClientDialog" max-width="600px">
      <v-card>
        <v-card-title class="pa-4">
          <v-icon color="primary" class="mr-3">mdi-account-group-outline</v-icon>
          Cadastrar Novo Cliente
        </v-card-title>
        <v-card-text class="pa-5">
          <v-form>
            <v-text-field
              v-model="newClientForm.nome"
              label="Nome da Empresa"
              variant="outlined" class="mb-4"
            ></v-text-field>
            <v-text-field
              v-model="newClientForm.local"
              label="Localização (Ex: São Paulo, SP)"
              variant="outlined" class="mb-4"
            ></v-text-field>
            <v-text-field
              v-model="newClientForm.domain"
              label="Website (Ex: empresa.com)"
              variant="outlined" class="mb-4"
            ></v-text-field>
            <v-text-field
              v-model="newClientForm.email"
              label="Email de Contato"
              variant="outlined"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn color="grey-darken-1" variant="text" @click="newClientDialog = false">
            Cancelar
          </v-btn>
          <v-btn color="primary" variant="flat" @click="saveNewClient">
            Salvar Cliente
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deliveriesDialog" max-width="700px">
      <v-card v-if="selectedClient">
        <v-card-title class="pa-4 d-flex align-center">
          <v-icon color="primary" class="mr-3">mdi-truck-delivery</v-icon>
          Entregas para: {{ selectedClient.nome }}
          <v-spacer></v-spacer>
          <v-btn icon="mdi-close" variant="text" @click="deliveriesDialog = false"></v-btn>
        </v-card-title>
        
        <v-divider></v-divider>

        <v-card-text class="pa-0">
          <v-list lines="two">
            <v-list-item
              v-for="entrega in selectedClientDeliveries"
              :key="entrega.id"
              :title="entrega.id"
              :subtitle="entrega.motorista"
            >
              <template v-slot:append>
                <v-chip :color="entrega.statusColor" small>
                  {{ entrega.status }}
                </v-chip>
              </template>
            </v-list-item>
          </v-list>
        </v-card-text>

        <v-divider></v-divider>
        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn color="grey-darken-1" variant="text" @click="deliveriesDialog = false">
            Fechar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-container>
</template>

<script>
export default {
  name: 'ClientesView',
  data: () => ({
    // Pop-up "Detalhes"
    detailsDialog: false, 
    selectedClient: null, 

    // Pop-up "Novo Cliente"
    newClientDialog: false, 
    newClientForm: { 
      nome: '', local: '', email: '', domain: ''
    },

    // --- NOVAS VARIÁVEIS PARA O POP-UP "VER ENTREGAS" ---
    deliveriesDialog: false,
    selectedClientDeliveries: [],
    // --- FIM DAS NOVAS VARIÁVEIS ---

    //
    // --- LISTA DE CLIENTES ATUALIZADA (LOGOS CORRIGIDOS) ---
    //
    clientes: [
      { id: 6, nome: 'GKN Driveline', domain: 'gknautomotive.com', local: 'Gravataí, RS', ultimoPedido: 'PED-1006', status: 'Ativo', statusCor: 'green' },
      
      // LOGO CORRIGIDO: Era 'ibm.com' (quebrou), agora 'microsoft.com'
      { id: 1, nome: 'TechCorp Solutions', domain: 'microsoft.com', local: 'São Paulo, SP', ultimoPedido: 'PED-1001', status: 'Ativo', statusCor: 'green' },
      
      { id: 2, nome: 'Varejista Rápido', domain: 'magazineluiza.com.br', local: 'Rio de Janeiro, RJ', ultimoPedido: 'PED-1002', status: 'Ativo', statusCor: 'green' },
      { id: 3, nome: 'Indústrias Minas', domain: 'vale.com', local: 'Belo Horizonte, MG', ultimoPedido: 'PED-1003', status: 'Inativo', statusCor: 'red' },
      { id: 4, nome: 'AgroSul', domain: 'cargill.com.br', local: 'Porto Alegre, RS', ultimoPedido: 'PED-1004', status: 'Ativo', statusCor: 'green' },

      // LOGO CORRIGIDO: Era 'totvs.com' (quebrou), agora 'oracle.com'
      { id: 5, nome: 'Norte Log', domain: 'oracle.com', local: 'Salvador, BA', ultimoPedido: 'PED-1005', status: 'Ativo', statusCor: 'green' },
    ]
  }),

  methods: {
    // Método para o pop-up "Detalhes"
    showDetails(cliente) {
      this.selectedClient = cliente; 
      this.detailsDialog = true; 
    },
    
    // Método para o pop-up "Novo Cliente"
    openNewClientDialog() {
      this.newClientForm = { nome: '', local: '', email: '', domain: '' };
      this.newClientDialog = true;
    },

    // Método para salvar o "Novo Cliente" (simulado)
    saveNewClient() {
      const novoCliente = {
        id: this.clientes.length + 10, 
        nome: this.newClientForm.nome,
        domain: this.newClientForm.domain,
        local: this.newClientForm.local,
        ultimoPedido: 'N/A',
        status: 'Ativo',
        statusCor: 'green'
      };
      this.clientes.unshift(novoCliente);
      this.newClientDialog = false;
      alert('Cliente "' + novoCliente.nome + '" cadastrado com sucesso! (Simulação)');
    },

    // --- NOVO MÉTODO PARA O POP-UP "VER ENTREGAS" ---
    showDeliveries(cliente) {
      this.selectedClient = cliente; // Reutiliza o cliente selecionado

      // Dados fictícios de entrega (você pode mudar isso)
      this.selectedClientDeliveries = [
        { id: cliente.ultimoPedido, motorista: 'Carlos Silva', status: 'Em Rota', statusColor: 'blue' },
        { id: 'PED-850', motorista: 'Ana Costa', status: 'Entregue', statusColor: 'green' },
        { id: 'PED-849', motorista: 'Ana Costa', status: 'Entregue', statusColor: 'green' },
      ];

      this.deliveriesDialog = true; // Abre o novo pop-up
    }
    // --- FIM DO NOVO MÉTODO ---
  }
}
</script>

<style>
/* Estilos para o Card (opcional) */
</style>