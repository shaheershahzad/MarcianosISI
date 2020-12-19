Vue.Component('Navbar', {
<template>
  <div class="navbar">
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">SIGEM</div>

      <v-tabs centered>
        <v-tab to="/crearNaveNodriza">Crear Nave Nodriza </v-tab>
        <v-tab to="/crearAeronave">Crear Aeronave </v-tab>
        <v-tab to="/gestionarPasajeros"> Gestionar Pasajeros</v-tab>
        <v-tab to="/revisarAeronave"> Revisar Aeronave </v-tab>
      </v-tabs>
    </v-app-bar>

    <v-main>
      <div></div>
    </v-main>
  </div>
</template>

<script>
import router from "../router.js";

export default {
  props: ["userName"],
  data() {
    return {};
  },
};
</script>

<style></style>
})
