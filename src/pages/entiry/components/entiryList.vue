<template>
    <globalList :modeType="modeType">      
    </globalList>
</template>
<script setup>
import globalList from '@/components/globalList.vue';
let modeType = {
    type:'entiry',
    list:'entiryList',
    add:'entiryAdd',
    edit:'entiryEdit',
    delete:'entiryDelete',
    detail:'entiryDetail'
}
</script>
<style lang="less">

</style>