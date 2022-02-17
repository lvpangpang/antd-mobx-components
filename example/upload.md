## Upload

```jsx
import React, { useState } from "react";
import { Upload } from "antd-mobx-components";
import { http } from "js-common-library";

function Index() {
  const [value, setValue] = useState([
    {
      url:
        "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      url:
        "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);
  const onChange = (e) => {
    // console.log(e)
    setValue(e);
  };
  const getConfig = async () => {
    try {
      const { data } = await http(
        "https://satweb-gateway.lingxichuxing.com/owlc/v1/aliyun/oss/sts/token",
        {
          headers: {
            contextId: "dss",
            "skio-token":
              "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJib3NzX2F1dGhfaXNzdWVyIiwiY29udGV4dElkIjoiZHNzIiwiZXhwIjoxNjI4ODY1MjM0LCJ1c2VySWQiOjE3MH0.Kc5kpiTcg2HUGiervewbEqqYDwbhdEM5kk_upXXP4fc",
          },
        }
      );
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  const beforeUpload = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });
  };
  return (
    <div>
      <Upload
        accept="image/png, image/jpeg"
        maxCount={3}
        // value={value}
        onChange={onChange}
        getOSSConfig={getConfig}
        dirname="static-resourses"
        // beforeUpload={beforeUpload}
        imgLimit={
          {
            // maxWidth: 100,
          }
        }
        multiple
      ></Upload>
    </div>
  );
}
export default Index;
```
