import { useState } from 'react'
import { Select, Checkbox, Divider } from 'antd'

const { Option } = Select

function filterOption(input, option) {
  return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
}

function mySelect({
  data = [],
  children,
  placeholder = '请选择',
  showAll,
  allChange,
  showAllText = '全选',
  ...rest
}) {
  let child = children
  if (data.length) {
    child = data.map((item) => {
      return (
        <Option key={item.key} value={item.key}>
          {item.label}
        </Option>
      )
    })
  }
  return (
    <Select
      placeholder={placeholder}
      allowClear
      showSearch
      filterOption={filterOption}
      {...rest}
      dropdownRender={
        showAll &&
        ((menu) => (
          <>
            {menu}
            <Divider style={{ margin: '2px 0' }} />
            <div style={{ padding: '4px 8px 8px 8px', cursor: 'pointer' }}>
              <Checkbox
                disabled={data.length === 0}
                // checked={all}
                onChange={(e) => {
                  if (e.target.checked) {
                    const list = data.map((item) => {
                      return item.key
                    })
                    allChange(list)
                  } else {
                    allChange([])
                  }
                }}
              >
                {showAllText}
              </Checkbox>
            </div>
          </>
        ))
      }
    >
      {child}
    </Select>
  )
}

mySelect.Option = Option

export default mySelect
