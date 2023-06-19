<template>
    <globalList :modeType="modeType">      
    </globalList>
</template>
<script setup>
import globalList from '@/components/globalList.vue';
let modeType = {
    type:'task',
    list:'taskList',
    add:'taskAdd',
    edit:'taskEdit',
    delete:'taskDelete',
    detail:'taskDetail'
}
</script>
<style lang="less">

</style>