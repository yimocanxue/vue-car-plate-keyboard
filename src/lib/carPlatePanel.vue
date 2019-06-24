<template>
    <div class="__vcp-panel">
        <!--输入框Start-->
        <div class="__vcp-number-box">
            <ul>
                <li v-for="i in nums"
                    :key="i"
                    @click="active(i)"
                    :class="{
                        active: activeIndex === i, 
                        'split-line': i == 0 || (i > 1 && i < 6) || (i == 6 && (activeIndex == 7 || val.length == 8)),
                        'last-blank-key': i == 7 && val.length < 8 && activeIndex < 7
                    }"
                    ><span v-bind:style="{backgroundColor: activeColor}"></span>{{val[i]}}</li>
            </ul>
        </div>
        <!--键盘Start-->
        <div class="__vcp-keyboard-panel" :class="{hide: activeIndex == -1}">
            <div class="__vcp-keyboard-panel-bar">
                <a 
                    class="close-board-btn" 
                    @click="close" 
                    v-bind:style="{color: activeColor}">{{okBtnText}}
                </a>
            </div>
            <ul>
                <li v-for="k in keys"
                    :key="k"
                ><a @click="taped($event)">{{k}}</a></li>
            </ul>
            <div 
                class="__vcp-keyboard-del-btn" 
                @click='delback' 
                v-bind:style="{backgroundColor: activeColor}"
            >
                <span></span>
                <a v-bind:style="{color: activeColor}">×</a>
            </div>
        </div>

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
const NUMBER = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
const SPECIAL_SUFFIX = ['港', '澳', '学', '警']


export default {
    name: 'car-plate-keyboard',
    data () {
        return {
            // 当前激活输入框的索引，从0开始
            activeIndex: -1,
            // 输入最终结果
            val: this.carNumber,
            nums: [0, 1, 2, 3, 4, 5, 6, 7]
        }
    },
    props: {
        // 初始车牌号
        carNumber: {
            'type': String,
            'default': '',
            'validator':  function (value) {
                if (value.length > 8) { return false }
                if (value.length == 0) { return true }
                const validKeys = i => {
                    if (i == 0) { return PROVINCE }
                    if (i == 1) { return ALPHABET }
                    if ((value.length == 7 && i == 6) || (value.length == 8 && i == 7)) { return NUMBER.concat(ALPHABET, SPECIAL_SUFFIX) }
                    return NUMBER.concat(ALPHABET)
                }
                return value.split('').every((k, i) => validKeys(i).indexOf(k) > -1 )
            }
        },
        // 激活状态颜色
        activeColor: {
            'type': String,
            'default': '#1a84e7',
            'validator':  color => /^#[a-fA-F\d]{6}$/.test(color)
        },
        okBtnText: {
            'type': String,
            'default': '确定'
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
    },
    methods: {
        // 激活其中某个输入框
        active (i) {
            // 点击的框前面有空白时不响应
            if (i > this.val.length)
                return false;
            this.activeIndex = i
            // 触发自定义事件
            this.$emit('tap-box', {keyIndex: this.activeIndex, value: this.val, valid: this.$validCarPlateNo(this.val)});
        },
        // 点击某个按键
        taped (e) {
            e.target.style.cssText = `color: #ffffff; font-size: 20px; font-weight: bold; background-color: ${this.activeColor}`;
            setTimeout(() => {
                 e.target.style.cssText = `color: #000000; font-size: 16px; font-weight: normal; background-color: #ffffff`;
            }, 100);
            const key = e.target.text;
            this.val = this.nums.reduce((res, v) => {
                res += v == this.activeIndex ? key : (this.val[v]||'');
                return res;
            }, '');
            // 触发自定义事件
            this.$emit('tap-key', {key, keyIndex: this.activeIndex, value: this.val, valid: this.$validCarPlateNo(this.val)});
            this.activeIndex = this.activeIndex < 7 ? this.activeIndex + 1 : -1;
        },
        // 回删
        delback () {
            this.val = this.nums.reduce((res, v) => {
                res +=  v >= this.activeIndex ? '' : (this.val[v]||'');
                return res;
            }, '');
            // 触发自定义事件
            this.$emit('tap-del', {keyIndex: this.activeIndex, value: this.val, valid: this.$validCarPlateNo(this.val)});
            this.activeIndex = this.activeIndex > 0 ? this.activeIndex - 1 : 0;
        },
        // 点击确定按钮
        close () {
            this.activeIndex = -1;
            // 触发自定义事件
            this.$emit('tap-ok', {value: this.val, valid: this.$validCarPlateNo(this.val)});
        }
    },

}
</script>

<style lang="css">
/*输入框样式*/
.__vcp-number-box { 
    font-size: 12px;
    background: transparent;
    width: 100%;
    padding: 0;
    box-sizing: border-box;
    overflow: hidden;
    margin: 0;
    font-family: "Helvetica Neue", Helvetica, sans-serif;
}
.__vcp-number-box ul {
    width: 100%;
    list-style: none;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: stretch;
    padding: 0;
    height: 40px;
}
.__vcp-number-box ul > li {
    border-top: 1px solid #cccccc;
    border-bottom: 1px solid #cccccc;
    flex: 1 2 30px;
    margin-right: 0;
    text-align: center;
    font-size: 16px;
    line-height: 40px;
    position: relative;
}
.__vcp-number-box ul > li:first-child{
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    border-left: 1px solid #cccccc;
}
.__vcp-number-box ul > li.split-line::after{
    content: "";
    position: absolute;
    height: 80%;
    width: 1px;
    right: 0;
    background-color: #cccccc;
    top: 10%;
}
.__vcp-number-box ul > li:nth-child(2){
    margin-right: 8px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    border-right: 1px solid #cccccc;
}
.__vcp-number-box ul > li:nth-child(3){
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    border-left: 1px solid #cccccc;
}

.__vcp-number-box ul > li > span { display: none; }
.__vcp-number-box ul > li.active > span { 
    display: block; 
    height: 2px;
    width: 60%;
    position: absolute;
    background-color: #1a84e7;
    left: 20%;
    bottom: 3px;
}
/*
.__vcp-number-box ul > li.active::before {
    content: "";
    height: 2px;
    width: 60%;
    position: absolute;
    background-color: #1a84e7;
    left: 20%;
    bottom: 3px;
}*/

/*最后一个特殊按键[新能源]*/
.__vcp-number-box ul > li.last-blank-key{
   
    background-color: #cccccc;
}
.__vcp-number-box ul > li.last-blank-key::after {
    content: "+";
    width: 100%;
    height: 100%;
    background-color: #cccccc;
    text-align: center;
    color: #aaaaaa;
    font-size: 24px;
    font-weight: 100;
    left: 0;
    top: 0;
}
.__vcp-number-box ul > li:last-child{
    margin-right: 0;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    border-right: 1px solid #cccccc;
}
.__vcp-number-box ul > li:last-child.active{background-color: inherit;}
.__vcp-number-box ul > li:last-child.active::after {display: none;}

/* 键盘样式 */
.__vcp-keyboard-panel{
    width: 100%;
    background: #e5e5e5;
    position: fixed;
    left: 0;
    z-index: 100;
    padding:4px 0 0 0;
    visibility: visible;
    bottom: 0;
    box-shadow: 1px -5px 10px #cccccc;
}
.__vcp-keyboard-panel.hide{
    bottom: -500px;
}
.__vcp-keyboard-panel-bar {
    height: 35px;
    width: 100%;
    background-color: #ffffff;
    position: absolute;
    left: 0;
    top: 0;
}
.__vcp-keyboard-panel-bar .close-board-btn {
    height: 100%;
    padding: 0 10px;
    line-height: 35px;
    display: inline-block;
    position: absolute;
    right: 0;
    top:0;
    font-size: 16px;
    color: #1a84e7;
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

/* .__vcp-keyboard-panel > ul > li a:active,
.__vcp-keyboard-panel > ul > li a.active{
    color: #ffffff;
    font-size: 20px;
    font-weight: bold;
    background: #1a84e7; 
}*/
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
