import { Form, Col } from "antd";

const { Item } = Form;

function SearchItem(props) {
  const { children, span = 6, ...rest } = props;
  return (
    <Col span={span}>
      <Item {...rest}>{children}</Item>
    </Col>
  );
}

export default SearchItem;
