<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card elevation="2">
          <v-card-title class="d-flex align-center pa-4">
            Acompanhamento de Entregas
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              label="Buscar Entrega (ID, Motorista, Destino...)"
              prepend-inner-icon="mdi-magnify"
              density="compact"
              hide-details
              single-line
              variant="solo"
              style="max-width: 400px;"
            ></v-text-field>
          </v-card-title>
          
          <v-data-table
            :headers="headers"
            :items="items"
            :search="search"
            class="elevation-0"
            items-per-page-text="Itens por página"
          >
            <template v-slot:item.status="{ item }">
              <v-chip :color="getStatusColor(item.status)" dark small>
                {{ item.status }}
              </v-chip>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'EntregasView',
  
  data: () => ({
    // O texto que o usuário digita na busca
    search: '',
    
    // Definição das colunas (cabeçalhos) da tabela
    headers: [
      { title: 'ID Pedido', key: 'id', align: 'start' },
      { title: 'Destino (Cliente)', key: 'destino' },
      { title: 'Motorista', key: 'motorista' },
      { title: 'Placa', key: 'placa' },
      { title: 'Status', key: 'status' },
    ],
    
    // Nossos dados de exemplo (em um app real, isso viria de uma API)
    items: [
      { id: 'PED-1001', destino: 'Cliente A (SP)', motorista: 'Carlos Silva', placa: 'ABC-1234', status: 'Em Rota' },
      { id: 'PED-1002', destino: 'Cliente B (RJ)', motorista: 'Maria Souza', placa: 'DEF-5678', status: 'Pendente' },
      { id: 'PED-1003', destino: 'Cliente C (MG)', motorista: 'João Pereira', placa: 'GHI-9012', status: 'Entregue' },
      { id: 'PED-1004', destino: 'Cliente D (RS)', motorista: 'Ana Costa', placa: 'JKL-3456', status: 'Em Rota' },
      { id: 'PED-1005', destino: 'Cliente E (BA)', motorista: 'Carlos Silva', placa: 'ABC-1234', status: 'Atrasado' },
      { id: 'PED-1006', destino: 'Cliente F (SC)', motorista: 'Maria Souza', placa: 'DEF-5678', status: 'Entregue' },
      { id: 'PED-1007', destino: 'Cliente G (PE)', motorista: 'Bruno Alves', placa: 'MNO-7890', status: 'Pendente' },
    ],
  }),

  methods: {
    // Método simples para retornar uma cor baseada no status
    getStatusColor(status) {
      switch (status) {
        case 'Entregue': return 'green';
        case 'Em Rota': return 'blue';
        case 'Atrasado': return 'red';
        case 'Pendente': return 'orange';
        default: return 'grey';
      }
    },
  },
}
</script>

<style>
/* Podemos adicionar estilos específicos aqui se precisarmos */
.v-data-table-header__cell {
  background-color: #f5f5f5;
  font-weight: bold !important;
}
</style>