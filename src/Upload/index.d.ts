import React from 'react'
import { UploadProps } from 'antd/es/upload'

interface UploadValueObj {
  url:string,
  name?: string
}
interface OssConfig {
  accessKeyId: string,
  accessKeySecret: string,
  bucket: string,
  region: string,
  securityToken: string
}
interface ImgLimit {
  witdh?: number,
  height?: number,
  maxWidth?: number,
  maxHeight?: number
}

export interface MyUploadProps extends UploadProps {
  maxSize?: number;
  value: Array<UploadValueObj>;
  getOSSconfig?: Promise<OssConfig>;
  dirname?: string;
  maxCount?: number;
  imgLimit?: ImgLimit;
}

declare const MyUpload: React.FC<MyUploadProps>

export default MyUpload