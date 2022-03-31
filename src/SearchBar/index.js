import React, { useEffect } from 'react'
import { Button, Form, Space, Row } from 'antd'
import { observer } from 'mobx-react-lite'
import { SearchOutlined, RollbackOutlined } from '@ant-design/icons'
import './index.less'
import SearchBarItem from './Item'
import SearchContext from './context'
function SearchBar(props) {
  const {
    style,
    store,
    extra,
    children,
    initialValues,
    itemCol = { span: 6 },
    cache = true,
    showSearch = true,
    searchButtonProps,
    searchButtonText = '搜索',
    showRest = true,
    restButtonProps,
    restButtonText = '重置',
    ...restProps
  } = props

  // 当配合table使用的时候，store为TableStore的实例，需要通过调用getSearchBarStore方法获取SearchBar的store实例
  let searchBarStore = store.$table ? store.$table.getSearchBarStore() : store

  const [form] = Form.useForm()

  searchBarStore.setFormInstance(form)
  searchBarStore.setSearchParams({ ...initialValues, ...searchBarStore.searchParams })

  const hanleSearch = () => {
    searchBarStore.search()
  }

  const handleRest = () => {
    searchBarStore.reset()
  }

  useEffect(() => {
    if (cache && searchBarStore) {
      form.setFieldsValue(searchBarStore.searchParams)
      return () => {
        if (!cache && searchBarStore) {
          searchBarStore.reset()
        }
      }
    }
  }, [])

  return (
    <SearchContext.Provider value={{
      itemCol
    }}>
      <Form
        form={form}
        initialValues={initialValues}
        labelCol={{ span: 9 }}
        wrapperCol={{ span: 15 }}
        className="searchBar"
        {...restProps}
      >
        <Row>{children}</Row>
        <Space size={16} className="extra">
          {showSearch && (
            <Button
              icon={<SearchOutlined />}
              type="primary"
              onClick={hanleSearch}
              {...searchButtonProps}
            >
              {searchButtonText}
            </Button>
          )}
          {showRest && (
            <Button icon={<RollbackOutlined />} onClick={handleRest} {...restButtonProps}>
              {restButtonText}
            </Button>
          )}
          {extra}
        </Space>
      </Form>
    </SearchContext.Provider>
  )
}

SearchBar.Item = SearchBarItem
export default observer(SearchBar)
