import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { isFun, isPromise } from "js-common-library";

function MyButton(props) {
  const [loading, setLoading] = useState(false);
  const { onClick, to, ...rest } = props;
  const handleClick = () => {
    if (isFun(onClick)) {
      const back = onClick();
      if (isPromise(back)) {
        setLoading(true);
        back.finally(() => {
          setLoading(false);
        });
      }
    }
  };
  const Btn = (
    <Button
      {...rest}
      loading={loading}
      onClick={to ? undefined : handleClick}
    ></Button>
  );

  if (to) {
    return <Link to={to}>{Btn}</Link>;
  }

  return Btn;
}

export default MyButton;
