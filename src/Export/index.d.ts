import { FC } from "react"
import { ButtonProps } from "antd/es/button"
export interface ExportProps extends ButtonProps {
  // 导出文件名
  name?: string
  // 获取导出Blob流
  getBlob: Function
}

declare const Export: FC<ExportProps>
export default Export
