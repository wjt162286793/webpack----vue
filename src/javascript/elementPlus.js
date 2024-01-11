import {
    // ElAffix,
    // ElAlert,
    // ElAutocomplete,
    // ElAutoResizer,
    // ElAvatar,
    // ElBacktop,
    // ElBadge,
    // ElDivider,
    // ElCalendar,
    // ElCarousel,
    // ElCarouselItem,
    // ElCascader,
    // ElCascaderPanel,
    // ElImage,
    // ElImageViewer,
    // ElSelectV2,
    // ElSkeleton,
    // ElSkeletonItem,
    // ElSlider,
    // ElSpace,
    // ElStatistic,
    // ElCountdown,
    // ElButtonGroup,
    // ElCard,
    // ElCheckTag,
    // ElCheckboxGroup,
    // ElCheckboxButton,
    // ElCollapseTransition,
    
    // ElContainer,
    // ElAside,
    // ElFooter,
    // ElHeader,
    // ElMain,
    // ElDescriptions,
    // ElDescriptionsItem,
    // ElDropdown,
    // ElDropdownItem,
    // ElDropdownMenu,
    // ElEmpty,
    // ElPopover,
    // ElPopper,
    // ElProgress,
    // ElRadioGroup,
    // ElPopconfirm,
    // ElRate,
    // ElResult,
    // ElScrollbar,
    // ElTableV2,
    // ElTimePicker,
    // ElTimeSelect,
    // ElTimeline,
    // ElTimelineItem,
    // ElTransfer,
    // ElTreeV2,

    ElBreadcrumb,
    ElBreadcrumbItem,
    ElButton,
    ElConfigProvider,
    ElCheckbox,
    ElCol,
    ElCollapse,
    ElCollapseItem,
    ElColorPicker,
    ElDatePicker,
    ElDialog,
    ElDrawer,
    ElPageHeader,
    ElForm,
    ElFormItem,
    ElIcon,
    ElInput,
    ElInputNumber,
    ElLink,
    ElMenu,
    ElMenuItem,
    ElMenuItemGroup,
    ElSubMenu,
    ElPagination,
    ElRadio,
    ElRadioButton,
    ElRow,
    ElSelect,
    ElOption,
    ElOptionGroup,
    ElSteps,
    ElStep,
    ElSwitch,
    ElTable,
    ElTableColumn,
    ElTabs,
    ElTabPane,
    ElTag,
    ElText,
    ElTooltip,
    ElTree,
    ElTreeSelect,
    ElUpload
} from 'element-plus';   // 按需引入组件
import {
    Tools, Tickets, Delete, Edit, WarnTriangleFilled, Location, Document, Setting, View, SetUp
} from '@element-plus/icons-vue'  // 按需引入 Icon 图标 


// // 全局注册组件
// app.component('ElButton', ElButton)
// // 全局注册 Icon 图标
// app.component('Edit', Edit)




export let componentList = [
    {
        name: 'ElButton',
        element: ElButton
    },
    {
        name: 'ElBreadcrumb',
        element: ElBreadcrumb
    },
    {
        name: 'ElBreadcrumbItem',
        element: ElBreadcrumbItem
    },
    {
        name: 'ElCheckbox',
        element: ElCheckbox
    },
    {
        name: 'ElBreadcrumbItem',
        element: ElBreadcrumbItem
    },
    {
        name: 'ElCol',
        element: ElCol
    },
    {
        name: 'ElCollapse',
        element: ElCollapse
    },
    {
        name: 'ElCollapseItem',
        element: ElCollapseItem
    },
    {
        name: 'ElColorPicker',
        element: ElColorPicker
    },
    {
        name: 'ElDatePicker',
        element: ElDatePicker
    },
    {
        name: 'ElDialog',
        element: ElDialog
    },
    {
        name: 'ElDrawer',
        element: ElDrawer
    },
    {
        name: 'ElForm',
        element: ElForm
    },
    {
        name: 'ElFormItem',
        element: ElFormItem
    },
    {
        name: 'ElIcon',
        element: ElIcon
    },
    {
        name: 'ElInput',
        element: ElInput
    },
    {
        name: 'ElInputNumber',
        element: ElInputNumber
    },
    {
        name: 'ElLink',
        element: ElLink
    },
    {
        name: 'ElMenu',
        element: ElMenu
    },
    {
        name: 'ElMenuItem',
        element: ElMenuItem
    },
    {
        name: 'ElMenuItemGroup',
        element: ElMenuItemGroup    
    },
    {
        name: 'ElSubMenu',
        element: ElSubMenu
    },
    {
        name: 'ElPageHeader',
        element: ElPageHeader
    },
    {
        name: 'ElPagination',
        element: ElPagination
    },
    {
        name: 'ElRadio',
        element: ElRadio
    },
    {
        name: 'ElRadioButton',
        element: ElRadioButton
    },
    {
        name: 'ElRow',
        element: ElRow
    },
    {
        name: 'ElSelect',
        element: ElSelect
    },
    {
        name: 'ElOption',
        element: ElOption
    },
    {
        name: 'ElOptionGroup',
        element: ElOptionGroup
    },
    {
        name: 'ElSteps',
        element: ElSteps
    },
    {
        name: 'ElStep',
        element: ElStep
    },
    {
        name: 'ElSwitch',
        element: ElSwitch
    },
    {
        name: 'ElTable',
        element: ElTable
    },
    {
        name: 'ElTableColumn',
        element: ElTableColumn
    },
    {
        name: 'ElTabs',
        element: ElTabs
    },
    {
        name: 'ElTabPane',
        element: ElTabPane
    },
    {
        name: 'ElTag',
        element: ElTag
    },
    {
        name: 'ElText',
        element: ElText
    },
    {
        name: 'ElTooltip',
        element: ElTooltip
    },
    {
        name: 'ElTree',
        element: ElTree
    },
    {
        name: 'ElTreeSelect',
        element: ElTreeSelect
    },
    {
        name: 'ElUpload',
        element: ElUpload
    },
    {
        name:'ElConfigProvider',
        element:ElConfigProvider
    }
]
export let iconList = [
    {
        name: 'Tools',
        element: Tools
    }, {
        name: 'Tickets',
        element: Tickets
    }, {
        name: 'Delete',
        element: Delete
    }, {
        name: 'Edit',
        element: Edit
    }, {
        name: 'WarnTriangleFilled',
        element: WarnTriangleFilled
    }, {
        name: 'Location',
        element: Location
    }, {
        name: 'Document',
        element: Document
    },{
        name: 'Setting',
        element: Setting
    }, {
        name: 'View',
        element: View
    }, {
        name: 'SetUp',
        element: SetUp
    }
]
