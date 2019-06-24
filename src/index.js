import Vue from 'vue';
import VueCarPlateKeyboard from './lib/index';

Vue.config.productionTip = false;
Vue.use(VueCarPlateKeyboard);
new Vue({
    el: '#app',
    data: function () {
        return {
            message: 'hello vue!'
        }
    },
    methods: {
        tapedKey (data) {
            console.log(data);
        },
        tapedBox (data) {
            console.log(data);
        },
        tapedDel (data) {
            console.log(data);
        },
        tapedOk (data) {
            console.log(data);
        } 
    }
})