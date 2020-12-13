<template>
  <v-container>
    <v-row no-gutters
      ><v-col class="pa-4"
        ><h1>Naves nodrizas</h1>
        <template v-if="navesNodrizas==null"> <v-progress-circular indeterminate color="primary"></v-progress-circular></template>
      


        <template v-else>
        <v-virtual-scroll :items="navesNodrizas" item-height="100%">
          <template v-slot:default="{ item }">
            <v-card :key="componentKey" class="pa-4" outlined>
              <p class="display-1 text--primary">
                {{ item.name }}
              </p>
              <div class="text--primary">ID: {{ item.id }}</div>
            </v-card>
          </template>
        </v-virtual-scroll>
        </template>
      </v-col>
      <v-col class="pa-4"
        ><h1>Crear nave nodriza</h1>
        <v-text-field v-model="idNaveNueva" label="ID" required></v-text-field>

        <v-text-field
          v-model="nombreNaveNueva"
          label="Nombre"
          required
        ></v-text-field>

        <template>
          <v-btn block :loading="guardandoNave" @click="guardarNave">
            Guardar
          </v-btn>
        </template></v-col
      ></v-row
    ></v-container
  >
</template>

      </v-col>
       </v-row
  ></v-container>
</template>

<script>
import * as crudNaveNodriza from "../database/CrudNaveNodriza.js";
export default {
  data: () => ({
    navesNodrizas: null,
    idNaveNueva: "",
    nombreNaveNueva: "",
    guardandoNave: false,
  }),

mounted(){
    crudNaveNodriza.obtenerNavesNodrizas((listaDeNaves)=>{this.navesNodrizas=listaDeNaves},(error)=>{});


},

  methods: {
    guardarNave() {
      var id = this.idNaveNueva;
      var nombre = this.nombreNaveNueva;
      this.guardandoNave = true;
      crudNaveNodriza.crearNaveNodriza(
        id,
        nombre,
        () => {
          this.guardandoNave = false;
          this.navesNodrizas.push(new NaveNodriza(id, nombre));
        },
        (error) => {}
      );
    },
  },
};
</script>

<style>
</style>