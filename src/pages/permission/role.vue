<template>
    <vxe-table :border="true" height="600" :scroll-y="{ enabled: false }" :span-method="rowspanMethod" :data="tableData">
        <vxe-column field="name1" title="菜单权限">
            <template #default="{ row }">
                <vxe-checkbox v-model="row.check1" @change="check1ChangeEvent(row, row.check1)">{{ row.name1
                }}</vxe-checkbox>
            </template>
        </vxe-column>
        <vxe-column field="name2" title="详细功能">
            <template #default="{ row }">
                <vxe-checkbox v-model="row.check2" @change="check2ChangeEvent(row, row.check2)">{{ row.name2
                }}</vxe-checkbox>
            </template>
        </vxe-column>
        <!-- <vxe-column field="name3" title="权限类型">
            <template #default="{ row }">
                <vxe-checkbox v-model="row.check3" @change="check3ChangeEvent(row, row.check3)">{{ row.name3
                }}</vxe-checkbox>
            </template>
        </vxe-column>
        <vxe-column field="name4" title="权限列表">
            <template #default="{ row }">
                <vxe-checkbox v-model="row.check4" @change="check4ChangeEvent(row, row.check4)">{{ row.name4
                }}</vxe-checkbox>
            </template>
        </vxe-column> -->
    </vxe-table>
</template>
<script setup>
import XEUtils from 'xe-utils'
// const demo1 = reactive({
//   tableData: []
// })
import * as VueconfigInfo from 'vue'
console.log(VueconfigInfo,'vue的全部配置')

const tableData = ref([])
const check4ChangeEvent = (row, checked) => {
    let childList = tableData.value.filter(item => item.id3 === row.id3 && item.name4 === row.name4)
    childList.forEach(item => {
        item.check4 = checked
    })
    childList = tableData.value.filter(item => item.id3 === row.id3)
    const isChecked3 = childList.every(item => item.check4)
    childList.forEach(item => {
        item.check3 = isChecked3
    })
    childList = tableData.value.filter(item => item.id2 === row.id2)
    const isChecked2 = childList.every(item => item.check3)
    childList.forEach(item => {
        item.check2 = isChecked2
    })
    childList = tableData.value.filter(item => item.id1 === row.id1)
    const isChecked1 = childList.every(item => item.check2)
    childList.forEach(item => {
        item.check1 = isChecked1
    })
}

const check3ChangeEvent = (row, checked) => {
    let childList = tableData.value.filter(item => item.id2 === row.id2 && item.name3 === row.name3)
    childList.forEach(item => {
        item.check3 = checked
    })
    childList = tableData.value.filter(item => item.id3 === row.id3)
    childList.forEach(item => {
        check4ChangeEvent(item, checked)
    })
}

const check2ChangeEvent = (row, checked) => {
    let childList = tableData.value.filter(item => item.id1 === row.id1 && item.name2 === row.name2)
    childList.forEach(item => {
        item.check2 = checked
    })
    childList = tableData.value.filter(item => item.id2 === row.id2)
    childList.forEach(item => {
        check3ChangeEvent(item, checked)
    })
}

const check1ChangeEvent = (row, checked) => {
    let childList = tableData.value.filter(item => item.name1 === row.name1)
    childList.forEach(item => {
        item.check1 = checked
    })
    childList = tableData.value.filter(item => item.id1 === row.id1)
    childList.forEach(item => {
        check2ChangeEvent(item, checked)
    })
}

const getList = () => {
    const list = [
        {id:'business',parentId:null,name:'业务领域'},
        {id:'list',parentId:'business',name:'列表'},
        {id:'add',parentId:'business',name:'新增'},
        {id:'update',parentId:'business',name:'修改'},
        {id:'delete',parentId:'business',name:'删除'},
        {id:'risksign',parentId:'business',name:'风险标记'},

        {id:'entiry',parentId:null,name:'实体'},
        {id:'list',parentId:'entiry',name:'列表'},
        {id:'add',parentId:'entiry',name:'新增'},
        {id:'update',parentId:'entiry',name:'修改'},
        {id:'delete',parentId:'entiry',name:'删除'},
        {id:'risksign',parentId:'entiry',name:'风险标记'},

        {id:'valueflow',parentId:null,name:'价值流'},
        {id:'list',parentId:'valueflow',name:'列表'},
        {id:'add',parentId:'valueflow',name:'新增'},
        {id:'update',parentId:'valueflow',name:'修改'},
        {id:'delete',parentId:'valueflow',name:'删除'},
        {id:'risksign',parentId:'valueflow',name:'风险标记'},

        {id:'task',parentId:null,name:'任务管理'},
        {id:'list',parentId:'task',name:'列表'},
        {id:'add',parentId:'task',name:'新增'},
        {id:'update',parentId:'task',name:'修改'},
        {id:'delete',parentId:'task',name:'删除'},
        {id:'risksign',parentId:'task',name:'风险标记'},

        {id:'risk',parentId:null,name:'风险管理'},
        {id:'read',parentId:'risk',name:'列表'},
        {id:'flow',parentId:'risk',name:'新增'},

        {id:'permission',parentId:null,name:'权限'},
        {id:'editor',parentId:null,name:'文本编辑'},
        // { id: '10000', parentId: null, name: '账号管理' },
        // { id: '11000', parentId: '10000', name: '用户管理' },
        // { id: '11100', parentId: '11000', name: '查看' },
        // { id: '11110', parentId: '11100', name: '用户列表' },
        // { id: '11200', parentId: '11000', name: '编辑' },
        // { id: '11210', parentId: '11200', name: '用户列表' },
        // { id: '11220', parentId: '11200', name: '新增用户' },
        // { id: '11300', parentId: '11000', name: '操作' },
        // { id: '11310', parentId: '11300', name: '新增' },
        // { id: '11320', parentId: '11300', name: '删除' },
        // { id: '11330', parentId: '11300', name: '修改' },
        // { id: '12000', parentId: '10000', name: '角色管理' },
        // { id: '12100', parentId: '12000', name: '查看' },
        // { id: '12110', parentId: '12100', name: '角色列表' },
        // { id: '12200', parentId: '12000', name: '编辑' },
        // { id: '122100', parentId: '12200', name: '角色列表' },
        // { id: '12220', parentId: '12200', name: '新增角色' },
        // { id: '12300', parentId: '12000', name: '操作' },
        // { id: '12310', parentId: '12300', name: '新增' },
        // { id: '12320', parentId: '12300', name: '删除' },
        // { id: '12330', parentId: '12300', name: '修改' },
        // { id: '20000', parentId: null, name: '个人中心' },
        // { id: '21000', parentId: '20000', name: '个性化设置' },
        // { id: '21100', parentId: '21000', name: '查看' },
        // { id: '21110', parentId: '21100', name: '信息列表' },
        // { id: '21200', parentId: '21000', name: '操作' },
        // { id: '21210', parentId: '21200', name: '重置信息' },
        // { id: '22000', parentId: '20000', name: '账户管理' },
        // { id: '22100', parentId: '22000', name: '查看' },
        // { id: '22110', parentId: '22100', name: '账户余额' },
        // { id: '22120', parentId: '22100', name: '帐变记录' }
    ]
    return list
}

// 将普通树结构转换为横向树列表
const toColTreeData = (treeData) => {
    const options = { children: 'children' }
    const list = []
    const keyMap = {}
    XEUtils.eachTree(treeData, (item, index, result, paths, parent) => {
        keyMap[item.id] = item
        item.keys = parent ? parent.keys.concat([item.id]) : [item.id]
        if (!item.children || !item.children.length) {
            const row = {}
            item.keys.forEach((key, index) => {
                const level = index + 1
                const obj = keyMap[key]
                row[`check${level}`] = false
                row[`id${level}`] = obj.id
                row[`name${level}`] = obj.name
            })
            list.push(row)
        }
    }, options)
    tableData.value = list
}

// 通用行合并函数（将相同多列数据合并为一行）
const rowspanMethod = ({ row, _rowIndex, column, visibleData }) => {
    const fields = ['name1', 'name2', 'name3']
    const cellValue = row[column.field]
    if (cellValue && fields.includes(column.field)) {
        const prevRow = visibleData[_rowIndex - 1]
        let nextRow = visibleData[_rowIndex + 1]
        if (prevRow && prevRow[column.field] === cellValue) {
            return { rowspan: 0, colspan: 0 }
        } else {
            let countRowspan = 1
            while (nextRow && nextRow[column.field] === cellValue) {
                nextRow = visibleData[++countRowspan + _rowIndex]
            }
            if (countRowspan > 1) {
                return { rowspan: countRowspan, colspan: 1 }
            }
        }
    }
}

const treeData = ref([])
treeData.value =  XEUtils.toArrayTree(getList())
toColTreeData(treeData.value)

onMounted(()=>{
    console.log(VueconfigInfo.useAttrs(),'组件当前配置')
})

</script>
<style lang="less" scoped></style>