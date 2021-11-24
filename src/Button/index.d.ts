import { FC } from 'react'
import { ButtonProps } from 'antd'
import { LocationDescriptorObject } from 'history'

export interface SdButtonProps extends ButtonProps {
  to?: string | LocationDescriptorObject
  /**
   * 按钮权限标识
   */
  auth?: string | number
}
declare const SdButton: FC<SdButtonProps>
export default SdButton
