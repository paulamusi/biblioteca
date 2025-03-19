<script setup lang="ts">
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
import { ref } from "vue";

const position = ref([-34.8026431, -55.9139114]);
</script>

<template>
  <LMap
    style="height: 350px"
    :zoom="17"
    :center="position"
    :use-global-leaflet="false"
  >
    <LTileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
      layer-type="base"
      name="OpenStreetMap"
    />
    <LMarker :lat-lng="position">
        <LPopup>📍 Biblioteca</LPopup>
    </LMarker>
  </LMap>
</template>