<template>
    <div class="vcp-input-box">
        {{message}}
    </div>
</template>

<script>
export default {
    name: 'car-number-box',
    data () {
        return {
            message: 'plugin test'
        }
    }
}
</script>

<style lang="sass" scoped>
$color-txt-default: #f00;
.vcp-input-box {
    color: $color-txt-default;
}

</style>
