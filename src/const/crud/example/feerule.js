import { feeRuleTypeMap } from '@/const/setting/index'

const validateNum = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入计费单价'))
  } else if (isNaN(value)) {
    callback(new Error('请输入数字类型'))
  } else {
    callback()
  }
}

export const changeRadio = value => {
  tableOption.column.forEach(element => {
    if (value === '0') {
      // 标准计费
      if (element.prop === 'feeUnit') {
        element.display = true
      }
      if (element.prop === 'interval') {
        element.display = false
      }
    } else {
      // 区间计费
      if (element.prop === 'feeUnit') {
        element.display = false
      }
      if (element.prop === 'interval') {
        element.display = true
      }
    }
  })
}

const labelWidth = 135
const dialogHeight = 500

export const tableOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  editBtn: false,
  delBtn: false,
  align: 'center',
  addBtn: false,
  viewBtn: false,
  searchShow: true,
  labelWidth: labelWidth,
  menuWidth: 200,
  dialogHeight: dialogHeight,
  column: [
    {
      label: 'ID',
      prop: 'feeRuleId',
      hide: true,
      editDisabled: true,
      addDisplay: false,
      editDisplay: false,
    },
    {
      width: 140,
      label: '计费类型',
      prop: 'feeRuleType',
      slot: true,
      valueDefault: '0',
      type: 'radio',
      border: true,
      search: true,
      rules: [
        {
          required: true,
          message: '请选择计费类型',
          trigger: 'blur',
        },
      ],
      dicData: feeRuleTypeMap,
      change: ({ value, column }) => {
        changeRadio(value)
      },
    },
    {
      label: '计费描述',
      prop: 'feeDesc',
      type: 'textarea',
      minRows: 2,
      span: 24,
      search: true,
      rules: [
        {
          required: true,
          message: '请输入计费描述',
          trigger: 'blur',
        },
      ],
    },
    {
      width: 140,
      label: '计费单价(元/分钟)',
      prop: 'feeUnit',
      display: true,
      slot: true,
      rules: [
        {
          required: true,
          validator: validateNum,
          trigger: 'blur',
        },
      ],
    },
    {
      width: 160,
      label: '创建时间',
      prop: 'createTime',
      type: 'datetime',
      format: 'yyyy-MM-dd HH:mm:ss',
      valueFormat: 'yyyy-MM-dd HH:mm:ss',
      addDisplay: false,
      editDisplay: false,
    },
    {
      width: 160,
      label: '更新时间',
      prop: 'updateTime',
      type: 'datetime',
      format: 'yyyy-MM-dd HH:mm:ss',
      valueFormat: 'yyyy-MM-dd HH:mm:ss',
      addDisplay: false,
      editDisplay: false,
    },
    {
      label: '规则明细',
      prop: 'interval',
      span: 24,
      hide: true,
      formslot: true,
      display: false,
    },
  ],
}

export const intervalOption = {
  border: true,
  menuBtn: true,
  page: false,
  addBtn: false,
  editBtn: true,
  delBtn: true,
  align: 'center',
  menuAlign: 'center',
  labelWidth: labelWidth,
  dialogHeight: dialogHeight,
  column: [
    {
      label: 'ID',
      prop: 'feeRuleId',
      type: 'text',
      readonly: true,
      hide: true,
      display: false,
    },
    {
      label: '开始时间',
      prop: 'beginTime',
      type: 'time',
      slot: true,
      format: 'HH:mm:ss',
      valueFormat: 'HH:mm:ss',
    },
    {
      label: '结束时间',
      prop: 'endTime',
      type: 'time',
      slot: true,
      format: 'HH:mm:ss',
      valueFormat: 'HH:mm:ss',
    },
    {
      label: '计费单价(元/分钟)',
      prop: 'feeUnit',
      rules: [
        {
          required: true,
          validator: validateNum,
          trigger: 'blur',
        },
      ],
    },
  ],
}
