import inputBox from './carNumberBox';

export default {
    install: function (Vue, options) {
        Vue.component(inputBox.name, inputBox);
    }
}