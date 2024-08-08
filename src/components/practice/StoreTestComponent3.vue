<template>
    <div>
      <h1>StoreTestComponent3</h1>
      <p>count : {{ getCount }}</p>
      <p>message: {{ getMessage }}</p>
      <button @click="incrementCount">Increment</button>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  
  export default {
    computed: {
      ...mapGetters(['getCount', 'getMessage'])
    },
    methods: {
      ...mapActions(['incrementCount']),
    }
  }
  </script>
  