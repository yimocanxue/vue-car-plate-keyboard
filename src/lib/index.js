import CarPlateKeyboard from './carPlatePanel';

export default {
    install: function (Vue, options) {
        /**
        * 验证车牌号(支持新能源车牌)
        */
        Vue.prototype.$validCarPlateNo = (str) => /^[\u4eac\u6caa\u6d25\u6e1d\u5180\u664b\u8499\u8fbd\u5409\u9ed1\u82cf\u6d59\u7696\u95fd\u8d63\u9c81\u8c6b\u9102\u6e58\u7ca4\u6842\u743c\u5ddd\u8d35\u4e91\u85cf\u9655\u7518\u9752\u5b81\u65b0][a-zA-Z](([\da-zA-Z]{5,6}$)|([\da-zA-Z]{4,5}[\u6e2f\u6fb3\u5b66\u8b66]$))/.test(str)
       
        Vue.component(CarPlateKeyboard.name, CarPlateKeyboard);
    }
}