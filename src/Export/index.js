import { message } from "antd"
import Button from "../Button"

function Export(props) {
  const { children, name = "文件.xlsx", getBlob, ...restProps } = props
  const handelExport = async () => {
    try {
      const data = await getBlob()
      if (data) {
        // 导出错误信息提示
        if (data.type.includes("application/json")) {
          let reader = new FileReader()
          reader.onload = (e) => {
            if (e.target.readyState === 2) {
              let backJson = JSON.parse(e.target.result)
              message.destroy()
              message.error(`${backJson.msg}`)
            }
          }
          reader.readAsText(data)
        } else {
          const link = document.createElement("a")
          link.download = name
          link.href = window.URL.createObjectURL(data)
          link.click()
          window.URL.revokeObjectURL(link.href)
        }
      }
    } catch (err) {
      message.error("导出失败，请重试")
    }
  }
  return (
    <Button
      type="primary"
      onClick={handelExport}
      {...restProps}
    >
      {children || "导出"}
    </Button>
  )
}

export default Export
