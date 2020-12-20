<template>
  <v-container>
    <v-row>
      <v-col class="pa-4"
        ><h1>Pasajeros</h1>
<div class="pa-2"></div>
<v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Crear pasajero
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Crear pasajero</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field
              v-model="nombreNuevoPasajero"
              label="Nombre"
              required
            ></v-text-field>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">
            Cerrar
          </v-btn>
          <div></div>
          <v-btn color="green darken-1" text @click="crearPasajero">
            Crear pasajero
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
<div class="pa-2"></div>
        <template v-if="todosPasajeros == null">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular
        ></template>

        <template v-else>
          <v-virtual-scroll :items="todosPasajeros" item-height="120px">
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

      <v-col
        ><h1>Asignar pasajero</h1>
        <v-select
          v-model="idPasajeroAsignar"
          :items="todosPasajeros"
          item-text="nombre"
          item-value="id"
          label="Pasajero"
          required
        ></v-select>
        <v-select
          v-model="idAeronaveAsignar"
          :items="aeronaves"
          item-text="nombre"
          item-value="id"
          label="Aeronave"
          required
        ></v-select>

        <v-btn elevation="2" :loading="asignandoPasajero" @click="asignarPasajero">Asignar</v-btn>
      </v-col>
      <v-col
        ><h1>Bajar pasajero</h1>

        <v-select
          v-model="idPasajeroBajar"
          :items="todosPasajeros"
          item-text="nombre"
          item-value="id"
          label="Pasajero"
          required
        ></v-select>

        <v-select
          v-model="idAeronaveBajar"
          :items="aeronaves"
          item-text="nombre"
          item-value="id"
          label="Aeronave"
          required
        ></v-select>

        <v-btn elevation="2" :loading="bajandoPasajero" @click="bajarPasajero">Bajar</v-btn>
      </v-col>
    </v-row>

    
    <v-snackbar v-model="snackbar" :timeout="3000">
        {{ textoAviso }}

        <template v-slot:action="{ attrs }">
          <v-btn color="green" text v-bind="attrs" @click="snackbar = false">
            Cerrar
          </v-btn>
        </template>
      </v-snackbar>
  </v-container>
</template>

<script>
import * as crudAeronaves from "../database/CrudAeronaves";
import * as crudNaveNodriza from "../database/CrudNaveNodriza.js";
import * as crudPasajeros from "../database/CrudPasajero";

export default {
  data: () => ({
    todosPasajeros: null,
    aeronaves: null,
    navesNodrizas: null,
    idPasajeroBajar: "",
    idPasajeroAsignar: "",
    idAeronaveBajar: "",
    idAeronaveAsignar: "",
    naveDestino: "",
    nombreNuevoPasajero: "",
    asignandoPasajero:false,
    bajandoPasajero:false,
    dialog: false,

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
    crudPasajeros.obtenerPasajeros(
      (listaPasajeros) => {
        this.todosPasajeros = listaPasajeros;
      },
      (error) => {
        (this.aeronaves = []), this.showError(error);
      }
    );
  },

  methods: {
    showError(error) {
      this.textoAviso = error;
      this.snackbar = true;
    },
    crearPasajero() {
      //var id = this.idNaveNueva;
      //var nombre = this.nombreNaveNueva;
      this.creandoAeronave = true;

      crudPasajeros.crearPasajero(
        this.nombreNuevoPasajero,
        () => {
          crudPasajeros.obtenerPasajeros(
            (listaPasajeros) => {
              this.todosPasajeros = listaPasajeros;
              this.dialog = false;
            },
            (error) => {
              (this.aeronaves = []), this.showError(error);
            }
          );
        },
        (error) => {
          this.creandoAeronave = false;
          this.showError(error);
        }
      );
    },

    asignarPasajero() {
      this.asignandoPasajero = true;

      crudAeronaves.anadirPasajero(
        this.idAeronaveAsignar,
        this.idPasajeroAsignar,
        () => {
          this.asignandoPasajero = false;
        },
        (error) => {
          this.asignandoPasajero = false;
          this.showError(error);
        }
      );
    },

    bajarPasajero() {
      this.bajandoPasajero = true;

      crudAeronaves.bajarPasajero(
        this.idAeronaveBajar,
        this.idPasajeroBajar,
        () => {
          this.bajandoPasajero = false;
        },
        (error) => {
          this.bajandoPasajero = false;
          this.showError(error);
        }
      );
    },
  },
};
</script>

<style></style>
