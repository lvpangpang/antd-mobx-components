import { useContext, cloneElement, isValidElement } from 'react'
import { Form, Col } from 'antd'
import SearchContext from './context'

const { Item } = Form

function SearchItem(props) {
  const { itemCol } = useContext(SearchContext)
  const { children, col, autoPlaceholder = true, label, ...rest } = props
  const _itemCol = { ...itemCol, ...col }
  let child = children
  if (isValidElement(child)) {
    child = cloneElement(child, {
      ...(autoPlaceholder ? { placeholder: children.props.placeholder ?? label } : {}),
    })
  }
  return (
    <Col {..._itemCol}>
      <Item label={label} {...rest} style={{ marginBottom: '10px' }}>
        {child}
      </Item>
    </Col>
  )
}

export default SearchItem
