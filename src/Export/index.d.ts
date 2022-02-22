import { FC } from "react";
import { ButtonProps } from "antd/es/button";

export interface ExportProps extends ButtonProps {
  // 导出接口url
  url: string;
  // 导出文件名
  name?: string;
  // 导出条件对象
  params?: object;
}

declare const Export: FC<ExportProps>
export default Export


