<template>
    <h1>StoreTestComponent2</h1>
    <p>count : {{ getCount }}</p>
    <v-btn color="red" @click="incrementCount"> incrementCount count</v-btn>

    <input type="text" v-model="message">
    <v-btn color="red" @click="updateMessage">update message</v-btn>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
    data() {
        return {
            count: 0
        }
    },
    computed:{
        // 참조 변수값잉 변할 때 실행 함수
        ...mapGetters(['getCount'])
    },
    methods:{
        incrementCount() {
            // this.count++;
            this.$store.dispatch('incrementCount')
        }
        // updateMessage() {
        //     this.$store.dispatch('newMessage', this.message)
        // }
    }
}
</script>