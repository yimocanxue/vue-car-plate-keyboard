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
    }
})