<template>
  <v-container>
    <v-row no-gutters
      ><v-col class="pa-4"
        ><h1>Aeronaves</h1>
        <template v-if="aeronaves == null">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular
        ></template>

        <template v-else>
          <v-virtual-scroll :items="aeronaves" item-height="230px">
            <template v-slot:default="{ item }">
              <v-card :key="componentKey" class="pa-4" outlined>
                <p class="display-1 text--primary">
                  {{ item.nombre }}
                </p>
                <div class="text--primary">ID: {{ item.id }}</div>
                <div class="text--primary">Desde: {{ item.naveOrigen }}</div>
                <div class="text--primary">Hasta: {{ item.naveDestino }}</div>
                <div class="text--primary">Maximo pasajeros: {{ item.maxPasajeros }}</div>

                <v-card :key="componentKey" class="pa-4" outlined>
            <div v-for="marciano in item.pasajeros" :key="marciano">

            <div  class="text--primary">{{ marciano }}</div>

            </div>
              
            </v-card>


              </v-card>
            </template>
          </v-virtual-scroll>
        </template>
      </v-col>
      <v-col class="pa-4"
        ><h1>Crear aeronave</h1>

        <v-text-field
          v-model="nombreNaveNueva"
          label="Nombre aeronave"
          required
        ></v-text-field>
        <v-text-field
          v-model="maximoMarcianosNaveNueva"
          label="Maximo marcianos"
          required
        ></v-text-field>
        <v-row>
          <v-select
            v-model="naveOrigen"
            :items="navesNodrizas"
            item-text="nombre"
            item-value="id"
            label="Nave nodriza origen"
            required
          ></v-select>

          <v-select
            v-model="naveDestino"
            :items="navesNodrizas"
            item-text="nombre"
            item-value="id"
            label="Nave nodriza destino"
            required
          ></v-select>
        </v-row>

        <template>
          <v-btn block :loading="creandoAeronave" @click="guardarNave">
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
    </v-row></v-container
  >
</template>

<script>
import * as crudAeronaves from "../database/CrudAeronaves";
import * as crudNaveNodriza from "../database/CrudNaveNodriza.js";

import Aeronave from "../objects/aeronave";
export default {
  data: () => ({
    navesNodrizas: null,
    aeronaves: null,
    nombreNaveNueva: "",
    maximoMarcianosNaveNueva: 0,
    naveOrigen: "",
    naveDestino: "",
    creandoAeronave: false,

    textoAviso: "",
    snackbar: false,
  }),

  mounted() {

crudNaveNodriza.obtenerNavesNodrizas(
      (listaDeNaves) => {
        this.navesNodrizas = listaDeNaves;
        crudAeronaves.obtenerAeronaves(
          this.navesNodrizas,
      (listaDeNaves) => {
        this.aeronaves = listaDeNaves;
      },
      (error) => {
        (this.aeronaves = []), this.showError(error);
      }
    );
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
      //var id = this.idNaveNueva;
      //var nombre = this.nombreNaveNueva;
      this.creandoAeronave = true;

      crudAeronaves.crearAeronave(
        this.nombreNaveNueva,
        this.maximoMarcianosNaveNueva,
        this.naveOrigen,
        this.naveDestino,
        [],
        () => {
          crudAeronaves.obtenerAeronaves(
            this.navesNodrizas,
            (listaDeNaves) => {
              this.aeronaves = listaDeNaves;
              this.creandoAeronave = false;
            },
            (error) => {this.creandoAeronave = false;this.showError(error)}
          );

          //this.aeronaves.push(new aeronaves(id, nombre));
        },
        (error) => {this.creandoAeronave = false;this.showError(error)}
      );
    },
  },
};
</script>

<style></style>
