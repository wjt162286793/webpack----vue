<template>
    <div>
      <vxe-table
        :align="'center'"
        :data="tableData">
        <vxe-column field="roleName" title="角色名称" width="300" >
            <template #default="{row}">
              <span>{{ row.roleName.label }}</span>
            </template>
        </vxe-column>
        <vxe-column field="menuName" title="菜单名称" width="300">
            <template #default="{row}">
              <div class="columnBox" v-for="(item,index) in row.menuName" :key="index">
                 {{ item.label }}
              </div>
            </template>
        </vxe-column>
        <vxe-column field="doneName" title="操作名称">
            <template #default="{row}">
              <div class="columnBox" v-for="(item,index) in row.doneName" :key="index">
                 {{ item.label }}
              </div>
            </template>
        </vxe-column>
      </vxe-table>
    </div>
  </template>
  
  <script setup>
  const tableData = ref([
{
    roleName:{
        label:'超级管理员',
        name:'super'
    },
    menuName:[
        {
            label:'实体',
            name:'entiry',
            flag:true
        },
        {
            label:'业务领域',
            name:'bussiness',
            flag:true
        },
        {
            label:'任务',
            name:'task',
            flag:true
        }
    ],
    doneName:[
        {
            parent:'entiry',
            name:'add',
            label:'新增',
            flag:true
        },
        {
            parent:'entiry',
            name:'edit',
            label:'编辑',
            flag:true
        },
        {
            parent:'entiry',
            name:'delete',
            label:'删除',
            flag:true
        }
    ]
}
  ])
  </script>
  <style scoped lang="less">
    .columnBox{
        border: 1px solid #e6e8ec;
        border-top: none;
        padding:10px;
    }
    .vxe-header--column{
        height: 50px !important;
    }
    ::v-deep(.vxe-body--column){
    padding: 0px !important;
    }
    ::v-deep(.vxe-cell){
        padding-left: 0px !important;
        padding-right: 0px !important;
    }

  </style>