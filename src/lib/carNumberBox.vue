<template>
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
                >{{val[i]}}</li>
        </ul>
    </div>
</template>

<script>

export default {
    name: 'car-number-box',
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
            'default': '粤BF04'
        }
    },
    computed: {
    },
    methods: {
        // 激活其中某个输入框
        active (i) {
            // 点击的框前面有空白时不响应
            if (i > this.val.length)
                return false;
            this.activeIndex = i
        }
    },

}
</script>

<style lang="css">
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

.__vcp-number-box ul > li.active::before {
    content: "";
    height: 2px;
    width: 60%;
    position: absolute;
    background-color: aqua;
    left: 20%;
    bottom: 3px;
}

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


</style>
