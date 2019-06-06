import carNumberBox from './carNumberBox';
import carKeyboard from './carKeyboard';

export default {
    install: function (Vue, options) {
        Vue.component(carNumberBox.name, carNumberBox);
        Vue.component(carKeyboard.name, carKeyboard);
    }
}