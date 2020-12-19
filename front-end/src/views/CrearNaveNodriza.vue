<template>
  <v-container>
    <v-row no-gutters
      ><v-col class="pa-4"
        ><h1>Naves nodrizas</h1>
        <template v-if="navesNodrizas == null">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular
        ></template>

        <template v-else>
          <v-virtual-scroll :items="navesNodrizas" item-height="100%">
            <template v-slot:default="{ item }">
              <v-card :key="componentKey" class="pa-4" outlined>
                <p class="display-1 text--primary">
                  {{ item.nombre }}
                </p>
                <div class="text--primary">ID: {{ item.id }}</div>
              </v-card>
            </template>
          </v-virtual-scroll>
        </template>
      </v-col>
      <v-col class="pa-4"
        ><h1>Crear nave nodriza</h1>
        <v-text-field
          v-model="nombreNaveNueva"
          label="Nombre"
          required
        ></v-text-field>

        <template>
          <v-btn block :loading="creandoNave" @click="guardarNave">
            Guardar
          </v-btn>
        </template></v-col
      >

      <v-snackbar v-model="snackbar" :timeout="3000">
        {{ textoAviso }}

        <template v-slot:action="{ attrs }">
          <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
            Cerrar
          </v-btn>
        </template>
      </v-snackbar>
    </v-row>
  </v-container>
</template>

<script>
import * as crudNaveNodriza from "../database/CrudNaveNodriza.js";
export default {
  data: () => ({
    navesNodrizas: null,
    nombreNaveNueva: "",
    creandoNave: false,
    textoAviso: "",
    snackbar: false,
  }),

  mounted() {
    crudNaveNodriza.obtenerNavesNodrizas(
      (listaDeNaves) => {
        this.navesNodrizas = listaDeNaves;
      },
      (error) => {
        (this.navesNodrizas = []), this.showError(error);
      }
    );
  },

  methods: {
    showError(error) {
      this.textoAviso = error;
      this.snackbar = true;
    },

    guardarNave() {
      var id = this.idNaveNueva;
      var nombre = this.nombreNaveNueva;
      this.creandoNave = true;
      crudNaveNodriza.crearNaveNodriza(
        nombre,
        () => {
          crudNaveNodriza.obtenerNavesNodrizas(
            (listaDeNaves) => {
              this.creandoNave = false;
              this.navesNodrizas = listaDeNaves;
            },
            (error) => {
              this.creandoNave = false;
              this.showError(error);
            }
          );

          //this.navesNodrizas.push(new NaveNodriza(id, nombre));
        },
        (error) => {
          this.creandoNave = false;
          this.showError(error);
        }
      );
    },
  },
};
</script>

<style></style>
