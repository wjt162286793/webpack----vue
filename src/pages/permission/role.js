export const roleList = [
    {
      roleName: {
        label: "超级管理员",
        name: "super",
      },
      menuName: [
        {
          label: "实体",
          name: "entiry",
          flag: true,
          indeterminate:true,
          disabled:true
        },
        {
          label: "业务领域",
          name: "business",
          flag: true,
          indeterminate:false,
          disabled:true
        },
        {
          label: "任务",
          name: "task",
          flag: true,
          indeterminate:true,
          disabled:true
        },
        {
            label: "价值流",
            name: "valueflow",
            flag: true,
            indeterminate:false,
            disabled:true
        },
        {
            label: "统计图表",
            name: "graph",
            flag: true,
            indeterminate:false,
            disabled:true
        },
        {
            label: "风险管理",
            name: "risk",
            flag: true,
            indeterminate:false,
            disabled:true
        },
        {
            label: "权限管理",
            name: "permission",
            flag: true,
            indeterminate:false,
            disabled:true
        },
        {
            label: "文本编辑",
            name: "editor",
            flag: true,
            indeterminate:false,
            disabled:true
        },
      ],
      doneName: [
        [
          {
            parent: "entiry",
            name: "add",
            label: "新增",
            flag: true,
            disabled:true
          },
          {
            parent: "entiry",
            name: "edit",
            label: "编辑",
            flag: true,
            disabled:true
          },
          {
            parent: "entiry",
            name: "delete",
            label: "删除",
            flag: true,
            disabled:true
          },
        ],
        [
          {
            parent: "business",
            name: "add",
            label: "新增",
            flag: true,
            disabled:true
          },
          {
            parent: "business",
            name: "edit",
            label: "编辑",
            flag: true,
            disabled:true
          },
          {
            parent: "business",
            name: "delete",
            label: "删除",
            flag: true,
            disabled:true
          },
        ],
        [
          {
            parent: "task",
            name: "add",
            label: "新增",
            flag: true,
            disabled:true
          },
          {
            parent: "task",
            name: "edit",
            label: "编辑",
            flag: true,
            disabled:true
          },
          {
            parent: "task",
            name: "delete",
            label: "删除",
            flag: true,
            disabled:true
          },
        ],
        [
            {
              parent: "valueflow",
              name: "add",
              label: "新增",
              flag: true,
              disabled:true
            },
            {
              parent: "valueflow",
              name: "edit",
              label: "编辑",
              flag: true,
              disabled:true
            },
            {
              parent: "valueflow",
              name: "delete",
              label: "删除",
              flag: true,
              disabled:true
            },
          ],
          [
            {
              parent: "graph",
              name: "use",
              label: "查看",
              flag: true,
              disabled:true
            }
          ],
          [
            {
              parent: "risk",
              name: "add",
              label: "查询",
              flag: true,
              disabled:true
            },
            {
              parent: "risk",
              name: "edit",
              label: "绘图",
              flag: true,
              disabled:true
            },
            {
              parent: "risk",
              name: "delete",
              label: "解除",
              flag: true,
              disabled:true
            },
          ],
          [
            {
                parent: "permission",
                name: "check",
                label: "查看",
                flag: true,
                disabled:true
            },
            {
                parent: "permission",
                name: "edit",
                label: "修改",
                flag: true,
                disabled:true
            },
            {
                parent: "permission",
                name: "set",
                label: "自定义",
                flag: true,
                disabled:true
            }
          ],
          [
            {
                parent:"edittor",
                name:'use',
                label:"编辑",
                flag:true,
                disabled:true
            }
          ]
      ],
    },
  ]