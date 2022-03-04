import RcImage from "rc-image";
import "./index.less";
import PreviewGroup, { icons } from "./PreviewGroup";

function Image(props) {
  const { preivew, ...restProps } = props;
  const myPreview = () => {
    if (preivew === false) {
      return preivew;
    }
    const _preview = preivew || {};
    return {
      mask: <div className="rc-image-mask-info">预览</div>,
      icons,
      ..._preview,
    };
  };

  return <RcImage preview={myPreview()} {...restProps}></RcImage>;
}

Image.PreviewGroup = PreviewGroup;
export default Image;
