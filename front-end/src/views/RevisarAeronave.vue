<template>
  <v-container>
    <v-row no-gutters
      ><v-col class="pa-4"
        ><h1>Historico revisiones</h1>
        <template v-if="historicoRevisiones==null"> <v-progress-circular indeterminate color="primary"></v-progress-circular></template>
      


        <template v-else>
        <v-virtual-scroll :items="historicoRevisiones" item-height="100%">
          <template v-slot:default="{ item }">
            <v-card :key="componentKey" class="pa-4" outlined>
              <p class="display-1 text--primary">
                {{ item.name }}
              </p>
              <div class="text--primary">ID: {{ item.id }}</div>
              <div class="text--primary">Desde: {{ item.id }}</div>
              <div class="text--primary">Hasta: {{ item.id }}</div>
            </v-card>
          </template>
        </v-virtual-scroll>
        </template>
      </v-col>
      <v-col class="pa-4"
        ><h1>Crear aeronave</h1>
        <v-text-field v-model="idRevisión" label="Id revisión" required></v-text-field>

        <v-text-field
          v-model="nombreRevisor"
          label="Nombre revisor"
          required
        ></v-text-field>
        <v-text-field
          v-model="idNaveRevisada"
          label="Id nave revisada"
          required
        ></v-text-field>
        <v-text-field
          v-model="fechaRevision"
          label="Fecha"
          required
        ></v-text-field>
        <v-card :key="componentKey" class="pa-4" outlined>
            <div v-for="marciano in listaMarcianos" :key="marciano">

            <div  class="text--primary">{{ marciano }}</div>

            </div>
              
            </v-card>

        <template>
          <v-btn block :loading="guardandoNave" @click="guardarNave">
            Generar revision 
          </v-btn>
        </template></v-col
      ></v-row
    ></v-container
  >
</template>

<script>
import * as crudAeronaves from "../database/CrudAeronaves";
export default {
  data: () => ({
    historicoRevisiones: null,
    idRevisión: "",
    nombreRevisor: "",
    idNaveRevisada: 0,
    fechaRevision:"",
    listaMarcianos:[],
    guardandoNave: false,
  }),

mounted(){
    crudAeronaves.obtenerAeronaves((listaDeNaves)=>{this.historicoRevisiones=listaDeNaves},(error)=>{});


},

  methods: {
    guardarNave() {
      var id = this.idRevisión;
      var nombre = this.nombreRevisor;
      this.guardandoNave = true;
      crudAeronaves.crearAeronave(
        id,
        nombre,
        () => {
          this.guardandoNave = false;
          this.historicoRevisiones.push(new historicoRevisiones(id, nombre));
        },
        (error) => {}
      );
    },
  },
};
</script>

<style>

</style>