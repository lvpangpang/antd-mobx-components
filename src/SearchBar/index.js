import React, { useEffect } from "react";
import { Button, Form, Space, Row } from "antd";
import { observer } from "mobx-react-lite";
import { SearchOutlined, RollbackOutlined } from "@ant-design/icons";
import "./index.less";
import SearchBarItem from "./Item";
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
    searchButtonText = "搜索",
    showRest = true,
    restButtonProps,
    restButtonText = "重置",
    ...restProps
  } = props;

  const searchBarStore = store.getSearchBarStore
    ? store.getSearchBarStore()
    : store;
  const [form] = Form.useForm();

  searchBarStore.setFormInstance(form);
  searchBarStore.setSearchParams(initialValues);

  const hanleSearch = () => {
    searchBarStore.search();
  };

  const handleRest = () => {
    searchBarStore.reset();
  };

  useEffect(() => {
    if (cache && searchBarStore) {
      form.setFieldsValue(searchBarStore.searchParams);
      return () => {
        if (!cache && searchBarStore) {
          searchBarStore.reset();
        }
      };
    }
  }, []);

  return (
    <Form
      form={form}
      initialValues={initialValues}
      onFinish={hanleSearch}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
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
          <Button
            icon={<RollbackOutlined />}
            onClick={handleRest}
            {...restButtonProps}
          >
            {restButtonText}
          </Button>
        )}
        {extra}
      </Space>
    </Form>
  );
}

SearchBar.Item = SearchBarItem;
export default observer(SearchBar);
