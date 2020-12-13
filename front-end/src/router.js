import Vue from "vue";
import VueRouter from "vue-router";
import CrearNaveNodriza from "./views/CrearNaveNodriza.vue";
import CrearAeronave from "./views/CrearAeronave.vue";
import GestionarPasajeros from "./views/GestionarPasajeros.vue";
import RevisarAeronave from "./views/RevisarAeronave.vue";

Vue.use(VueRouter);

const routes = [
      {
        path: "/crearNaveNodriza",
        name: "crearNaveNodriza",
        component: CrearNaveNodriza,
      },
      {
        path: "/crearAeronave",
        name: "crearAeronave",
        component: CrearAeronave,
      },
      {
        path: "/gestionarPasajeros",
        name: "gestionarPasajeros",
        component: GestionarPasajeros,
      },
      {
        path: "/revisarAeronave",
        name: "revisarAeronave",
        component: RevisarAeronave,
      },
    
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
