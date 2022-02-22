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
        transformResult: (res) => {
          return res.data ?? res;
        },
      });
      // blob生成文件下载
      if (data) {
        const link = document.createElement("a");
        link.download = name;
        link.href = window.URL.createObjectURL(data);
        link.click();
        window.URL.revokeObjectURL(link.href);
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
