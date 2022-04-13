import { FC } from 'react'
import { ButtonProps } from 'antd/es/button'

export interface MyButtonProps extends ButtonProps {
  to?: string
}

declare const MyButton: FC<MyButtonProps>
export default MyButton