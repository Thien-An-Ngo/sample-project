<template>
  <div class="home">
    <router-link
      :to="{
        name: 'UserTable',
      }"
      >To User Table</router-link
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomeView',
  components: {},
})
</script>
