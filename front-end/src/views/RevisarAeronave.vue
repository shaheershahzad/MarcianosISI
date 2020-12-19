<template>
  <v-container>
    <v-row no-gutters
      ><v-col class="pa-4"
        ><h1>Historico revisiones</h1>
        <template v-if="historicoRevisiones == null">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular
        ></template>

        <template v-else>
          <v-virtual-scroll :items="historicoRevisiones" item-height="100%">
            <template v-slot:default="{ item }">
              <v-card :key="componentKey" class="pa-4" outlined>
                <p class="display-1 text--primary">
                  {{ item.fechaRevision }}
                </p>
                <div class="text--primary">ID: {{ item.id }}</div>
                <div class="text--primary">Nombre revisor: {{ item.nombreRevisor }}</div>
                <div class="text--primary">Aeronave: {{ item.idAeronave }}</div>
              </v-card>
            </template>
          </v-virtual-scroll>
        </template>
      </v-col>
      <v-col class="pa-4"
        ><h1>Crear revisión</h1>
        <!--<v-text-field
          v-model="idRevisión"
          label="Id revisión"
          required
        ></v-text-field>-->

        <v-text-field
          v-model="nombreRevisor"
          label="Nombre revisor"
          required
        ></v-text-field>
        <v-select
          @change="onChangeNave"
          v-model="idNaveRevisada"
          :items="aeronaves"
          item-text="nombre"
          item-value="id"
          label="Aeronave"
          required
        ></v-select>

        <v-text-field
          v-model="fechaRevision"
          label="Fecha"
          required
        ></v-text-field>
        <v-card :key="componentKey" class="pa-4" outlined>
          <div v-for="pasajero in listaPasajeros" :key="pasajero.id">
            <div class="text--primary">{{ pasajero.nombre }}</div>
          </div>
        </v-card>

        <template>
          <v-btn block :loading="creandoRevision" @click="guardarRevision">
            Generar revision
          </v-btn>
        </template></v-col
      ></v-row
    ></v-container
  >
</template>

<script>
import * as crudAeronaves from "../database/CrudAeronaves";
import * as crudNaveNodriza from "../database/CrudNaveNodriza.js";
import * as crudPasajeros from "../database/CrudPasajero";
import * as crudRevisiones from "../database/CrudRevision";
import { getListaPasajerosDeNave } from "../utils";

export default {
  data: () => ({
    navesNodrizas: null,
    aeronaves: null,
    todosPasajeros: null,

    historicoRevisiones: null,
    idRevisión: "",
    nombreRevisor: "",
    idNaveRevisada: 0,
    fechaRevision: "",
    listaPasajeros: [],

    creandoRevision: false,
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

    crudRevisiones.obtenerRevisiones(
      (listaRevisiones) => {
        this.historicoRevisiones = listaRevisiones;
      },
      (error) => {
        (this.historicoRevisiones = []), this.showError(error);
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
    guardarRevision() {
      this.creandoRevision = true;
      crudRevisiones.crearRevision(
        this.idNaveRevisada,
        this.nombreRevisor,
        this.fechaRevision,
        () => {
          this.creandoRevision = false;
          crudRevisiones.obtenerRevisiones(
            (listaRevisiones) => {
              this.historicoRevisiones = listaRevisiones;
            },
            (error) => {
              (this.historicoRevisiones = []), this.showError(error);
            }
          );
        },
        (error) => {
          this.creandoRevision = false;
          this.showError(error);
        }
      );
    },

    onChangeNave(idNave) {
      this.listaPasajeros = getListaPasajerosDeNave(
        idNave,
        this.aeronaves,
        this.todosPasajeros
      );
    },
  },
};
</script>

<style></style>
