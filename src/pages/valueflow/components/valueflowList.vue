<template>
    <globalList :modeType="modeType">      
    </globalList>
</template>
<script setup>
import globalList from '@/components/globalList.vue';
let modeType = {
    type:'valueflow',
    list:'valueflowList',
    add:'valueflowAdd',
    edit:'valueflowEdit',
    delete:'valueflowDelete',
    detail:'valueflowDetail'
}
</script>
<style lang="less">

</style>