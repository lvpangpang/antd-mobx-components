import { Select, Divider, Checkbox } from "antd";
import { isStr, isArr } from "js-common-library";
import { Children } from "react";

const { Option, OptGroup } = Select;

const filterOption = (input, option) => {
  if (isStr(option.children)) {
    return option.children.toLowerCase().includes(input.toLowerCase());
  }
  return false;
};
function MySelect(props) {
  const {
    showAll,
    mode,
    options,
    children,
    checkAllAction,
    value,
    onChange,
    ...restProps
  } = props;

  const child =
    children ||
    options.map((item) => {
      let value = item.value || item.key;
      let label = item.label;
      return <Option value={value} key={value}>{label}</Option>;
    });

  const optionCount = Children.count(child);
  const showCheckAllAction =
    ["multiple", "tags"].includes(mode) && optionCount > 0 && !!checkAllAction;

  let allOption;
  if (showAll && !showCheckAllAction) {
    allOption = <Option value="">全部</Option>;
  }
  
  // 全选
  const checkAll = (e) => {
    if (e.target.checked) {
      const allValues = Children.map(child, (node) => {
        const { value: nodeValue } = node.props;
        return nodeValue;
      });
      onChange?.(allValues);
    } else {
      onChange?.(undefined);
    }
  };

  const valueCount = isArr(value) ? value.length : 0;
  const hasAllChecked = valueCount > 0 && optionCount === valueCount;
  const indeterminate = valueCount > 0 && valueCount < optionCount;
  const dropdownRender = (menu) => {
    return (
      <div>
        {menu}
        <Divider style={{ margin: "4px 0" }}></Divider>
        <Checkbox
          style={{ padding: 8 }}
          indeterminate={indeterminate}
          checked={hasAllChecked}
          onChange={checkAll}
        >
          全选
        </Checkbox>
      </div>
    );
  };

  return (
    <Select
      filterOption={filterOption}
      allowClear
      showSearch
      dropdownRender={showCheckAllAction && dropdownRender}
      value={value}
      mode={mode}
      onChange={onChange}
      {...restProps}
    >
      {allOption}
      {child}
    </Select>
  );
}

MySelect.Option = Option;
MySelect.OptGroup = OptGroup;

export default MySelect;
