import { useState } from "react";
import { Button, message } from "antd";
import { http } from "js-common-library";

function Export(props) {
  const { children, name = "文件.xlsx", url, params, ...restProps } = props;
  const [loading, setLoading] = useState(false);
  const handelExport = async () => {
    try {
      setLoading(true);
      const data = await http.get(url, {
        params,
        responseType: "blob",
      });
      console.log(data);
      if (data) {
        // 导出错误信息提示
        if (data.type.includes("application/json")) {
          let reader = new FileReader();
          reader.onload = (e) => {
            if (e.target.readyState === 2) {
              let backJson = JSON.parse(e.target.result);
              message.destroy();
              message.error(`${backJson.msg}`, 5);
              return Promise.reject(backJson);
            }
          };
          reader.readAsText(response.data);
        } else {
          const link = document.createElement("a");
          link.download = name;
          link.href = window.URL.createObjectURL(data);
          link.click();
          window.URL.revokeObjectURL(link.href);
        }
      }
    } catch (err) {
      message.error("导出失败，请重试");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      loading={loading}
      type="primary"
      onClick={handelExport}
      {...restProps}
    >
      {children || "导出"}
    </Button>
  );
}

export default Export;
