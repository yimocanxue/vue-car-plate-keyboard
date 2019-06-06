<template>
    <div class="__vcp-keyboard-panel">
        <div class="__vcp-keyboard-panel-bar">
            <a class="close-board-btn">确定</a>
        </div>
        <ul>
            <li v-for="k in keys"
                :key="k"
            ><a>{{k}}</a></li>
        </ul>
        <div class="__vcp-keyboard-del-btn"><span></span><a>×</a></div>
    </div>

</template>

<script>
const COLUMNS = 10
const KEY_SPACE = 4
const PROVINCE = ['京', '沪', '津', '渝', '冀', '晋', '蒙', '辽', '吉', '黑',
  '苏', '浙', '皖', '闽', '赣', '鲁', '豫', '鄂', '湘', '粤',
  '桂', '琼', '川', '贵', '云', '藏', '陕', '甘', '青', '宁',
  '新']
// 字母，去掉了车牌里不会出现的I、O
const ALPHABET = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K',
  'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V',
  'W', 'X', 'Y', 'Z']
const NUMBER = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const SPECIAL_SUFFIX = ['港', '澳', '学', '警']
export default {
    name: 'car-keyboard',
    data () {
        return {

        }
    },
    computed: {
        // 键盘类型province,alphabet,num_alph,mixed
        keyBoardType () {
            if (this.activeIndex === 0) { return 'province' }
            if (this.activeIndex === 1) { return 'alphabet' }
            if (this.activeIndex === 7 || (this.activeIndex === 6 && this.val < 8)) { return 'mixed' }
            return 'num_alph'
        },
        // 按键
        keys () {
            if (this.keyBoardType === 'province') { return PROVINCE }
            if (this.keyBoardType === 'alphabet') { return ALPHABET }
            if (this.keyBoardType === 'num_alph') { return NUMBER.concat(ALPHABET) }
            if (this.keyBoardType === 'mixed') { return NUMBER.concat(ALPHABET, SPECIAL_SUFFIX) }
        }
    }
}
</script>

<style>
.__vcp-keyboard-panel{
    width: 100%;
    background: #e5e5e5;
    position: fixed;
    left: 0;
    z-index: 100;
    border-top: 1px solid #ccc;
    padding:4px 0 0 0;
    visibility: visible;
    bottom: 0;
}
.__vcp-keyboard-panel-bar {
    height: 35px;
    width: 100%;
    background-color: #ffffff;
    position: absolute;
    left: 0;
    top: 0;
}
.__vcp-keyboard-panel > ul{
    padding:35px 0 0 0;
    margin: 0;
    list-style: none;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: stretch;
    align-content: stretch;
}
 .__vcp-keyboard-panel > ul > li{
    text-align: center;
    border: none;
    background: transparent;
    height: 30px;
    margin: 0 0 4px 0;
    line-height: 30px;
    flex: 0 1 10%;
}
 .__vcp-keyboard-panel > ul > li a {
    font-size: 16px;
    display: block;
    margin: 0 3px 0 0;
    border-radius: 4px;
    background:#ffffff;
 }
.__vcp-keyboard-panel > ul > li:nth-child(10n) a{
    margin-right: 0;
}
 .__vcp-keyboard-panel > ul > li a:active{
    color: #ffffff;
    font-size: 20px;
    font-weight: bold;
    background: #1a84e7; 
}
.__vcp-keyboard-del-btn{
    width: 20%;
    height: 30px;
    line-height: 30px;
    position: absolute;
    bottom: 4px;
    right: 0;
    text-align: center;
    border-radius: 4px;
    color: #ffffff;
    background-color: #1a84e7;
}
.__vcp-keyboard-del-btn span{
    height: 20px;
    width: 40px;
    position: absolute;
    display: block;
    text-align: center;
    top: 5px;
    left: 50%;
    transform: translateX(-50%);
    background-color: transparent;
}
.__vcp-keyboard-del-btn:active{
    opacity: 0.8;
}

.__vcp-keyboard-del-btn span::before{
    content: '';
    width: 0;
    height: 0;
    display: block;
    position: absolute;
    left: -5px;
    border-style: solid;
    border-width: 10px;
    border-color: transparent #ffffff transparent transparent;
}
.__vcp-keyboard-del-btn span::after{
    content: '';
    width: 25px;
    height: 100%;
    background-color: #ffffff;
    display: block;
    position: absolute;
    right: 0;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
}
.__vcp-keyboard-del-btn a {
    position: absolute;
    z-index: 1;
    font-size: 18px;
    margin-left: 2%;
    color: #1a84e7;
}
</style>
