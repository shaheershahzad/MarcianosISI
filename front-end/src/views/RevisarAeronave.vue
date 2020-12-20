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
          <v-virtual-scroll :items="historicoRevisiones" item-height="200px">
            <template v-slot:default="{ item }">
              <v-card :key="componentKey" class="pa-4" outlined>
                <p class="display-1 text--primary">
                  {{ item.fechaRevision }}
                </p>
                <div class="text--primary">ID: {{ item.id }}</div>
                <div class="text--primary">
                  Nombre revisor: {{ item.nombreRevisor }}
                </div>
                <div class="text--primary">Aeronave: {{ item.idAeronave }}</div>
                <div class="text--primary">Pasajeros a bordo: {{ item.pasajeros.length }}</div>
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
<v-date-picker
      v-model="fechaRevision"
      color="green lighten-1"
    ></v-date-picker>

                <div class="text--primary">Pasajeros</div>

        <v-card :key="componentKey" class="pa-4" outlined>
          <template v-if="listaPasajeros==null"><div class="text--primary">No se ha seleccionado aeronave</div></template>

          <template v-else-if="listaPasajeros.length>0"><div v-for="pasajero in listaPasajeros" :key="pasajero.id">
            <div class="text--primary">{{ pasajero.nombre }}</div>
          </div></template>
          <template v-else><div class="text--primary">Aeronave vacia</div></template>
          
        </v-card>
        <div class="pa-2"></div>

        <template>
          <v-btn block :loading="creandoRevision" @click="guardarRevision">
            Generar revision
          </v-btn>
        </template></v-col
      ></v-row
    >
    <v-snackbar v-model="snackbar" :timeout="3000">
        {{ textoAviso }}

        <template v-slot:action="{ attrs }">
          <v-btn color="green" text v-bind="attrs" @click="snackbar = false">
            Cerrar
          </v-btn>
        </template>
      </v-snackbar>
    
    </v-container
  >
</template>

<script>
import * as crudAeronaves from "../database/CrudAeronaves";
import * as crudNaveNodriza from "../database/CrudNaveNodriza.js";
import * as crudPasajeros from "../database/CrudPasajero";
import * as crudRevisiones from "../database/CrudRevision";
import { getListaPasajerosDeNave,getListaIdsPasajerosDeNave } from "../utils";

export default {
  data: () => ({
    navesNodrizas: null,
    aeronaves: null,
    todosPasajeros: null,

    historicoRevisiones: null,
    idRevisión: "",
    nombreRevisor: "",
    idNaveRevisada: 0,
    fechaRevision: new Date().toISOString().substr(0, 10),
    listaPasajeros: null,

    creandoRevision: false,


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

    showError(error) {
      this.textoAviso = error;
      this.snackbar = true;
    },
    guardarRevision() {
      this.creandoRevision = true;
      crudRevisiones.crearRevision(
        this.idNaveRevisada,
        this.nombreRevisor,
        this.parseDate(this.fechaRevision),
        getListaIdsPasajerosDeNave(this.idNaveRevisada,this.aeronaves),
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

    parseDate (date) {
        if (!date) return null
        const [year, month, day] = date.split('-')
        return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`
      },
  },
};
</script>

<style></style>
