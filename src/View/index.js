import { Breadcrumb } from 'antd'
import { useAppLayoutInfo } from '../AppLayout'
import './index.less'

const { Item } = Breadcrumb

function Index(props) {
  const { children, current = [] } = props
  const list = useAppLayoutInfo().concat(current)
  return (
    <div className="app-view">
      <Breadcrumb className="app-view-breadcrumb">
        {list?.map((item) => {
          return <Item key={item?.id || item}>{item?.title || item}</Item>
        })}
      </Breadcrumb>
      <div>{children}</div>
    </div>
  )
}

export default Index
