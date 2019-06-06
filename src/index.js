import Vue from 'vue';
import VueCarPlateKeyboard from './lib/index';
//import VueCarPlateKeyboard from 'vue-car-plate-keyboard';

Vue.config.productionTip = false;
Vue.use(VueCarPlateKeyboard);
new Vue({
    el: '#app',
    data: function () {
        return {
            message: 'hello vue!'
        }
    }
})