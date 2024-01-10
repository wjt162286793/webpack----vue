const prodConfig = {
    mode: 'production',
    externals:{
        'vue':'Vue',
        'element-plus':'ElementPlus',
        'axios':'axios',
        'relation-graph/vue3':'RelationGraph',  
        'vxe-table':'VXETable',
        'jsplumb':'JSPLUMB'
    }
}

module.exports = prodConfig