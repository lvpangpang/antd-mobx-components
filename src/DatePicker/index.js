import { DatePicker } from "antd";
import "./index.less";

const { RangePicker } = DatePicker;

function MyPicker(props) {
  const { addonBefore, pickerType, ...restProps } = props;
  const Picker = pickerType === "RangePicker" ? RangePicker : DatePicker;
  if (!addonBefore) {
    return <Picker {...restProps}></Picker>;
  }
  return (
    <div className="my-picker">
      {addonBefore}
      <Picker {...restProps}></Picker>
    </div>
  );
}

MyPicker.RangePicker = (props) => {
  return <MyPicker pickerType="RangePicker" {...props}></MyPicker>;
};

export default MyPicker;
