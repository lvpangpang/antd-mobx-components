import { forwardRef, useState, useEffect } from "react"
import { Upload, message, Button } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import { isFun } from "js-common-library"
import {
  loadSdk,
  isImg,
  getImgInfo,
  verifyImg,
  uploadOSS,
  optimizeValue,
} from "./help"

const FILE_IGNORE = "FILE_IGNORE" // 是否在fileList中显示的标识

function MyUpload(
  {
    value,
    onChange,
    maxSize,
    children,
    getOSSConfig,
    dirname,
    maxCount = 100,
    beforeUpload,
    imgLimit,
    listType = "picture-card",
    ...restProps
  },
  ref
) {
  const [list, setList] = useState(optimizeValue(value))
  const overCount = list.length >= maxCount
  const hideUpload = overCount

  /* 
    file - 当前上传的单个文件(不管你选择了几个)
    fileList- 当前上传的文件列表（一次性选择2个文件上传，这个对象长度就是2）
  */
  const handleBeforeUpload = async (file, fileList) => {
    const total = list.length + fileList.length

    // 文件数量限制
    if (total > maxCount) {
      message.destroy()
      message.error(`上传文件数量不能大于 ${maxCount} 个`)
      file[FILE_IGNORE] = true
      return Promise.reject()
    }

    // 文件尺寸限制
    if (file.size > maxSize) {
      message.destroy()
      message.error(
        `上传文件的大小不能大于 ${(maxSize / 1024 / 1024).toFixed(2)} M`
      )
      file[FILE_IGNORE] = true
      return Promise.reject()
    }

    // 图片格式校验(图片大小，宽高，最大宽高限制等等)
    if (
      (listType === "picture-card" || listType === "picture") &&
      !isImg(file)
    ) {
      file[FILE_IGNORE] = true
      message.destroy()
      message.error(`请上传图片格式的文件`)
      return Promise.reject()
    }
    if (isImg(file) && imgLimit) {
      try {
        const imgInfo = await getImgInfo(file)
        const pass = verifyImg(imgInfo, imgLimit)
        if (!pass) {
          file[FILE_IGNORE] = true
          return Promise.reject()
        }
        return true
      } catch (err) {
        return Promise.reject()
      }
    }

    // 其他自定义上传前效验
    if (isFun(beforeUpload)) {
      try {
        const shouldUp = await beforeUpload(file, fileList)
        if (!shouldUp) {
          file[FILE_IGNORE] = true
          return Promise.reject()
        }
      } catch {
        return Promise.reject()
      }
    }

    return true
  }

  /* 
    file - 当前上传的单个文件(不管你选择了几个)
    fileList- 所有已经上传的文件列表，包括当前上传的
  */
  const handleChange = ({ file, fileList }) => {
    const resList = fileList
      .map((item) => {
        const { response, ...other } = item
        return {
          ...other,
          ...response,
        }
      })
      .filter((item) => item.FILE_IGNORE !== true && item.status !== "error")
    setList(resList)
    onChange?.(resList)
  }

  // 自定义上传OSS请求
  const customRequest = (e) => {
    const { file, onProgress, onSuccess, onError } = e
    uploadOSS(file, {
      onProgress,
      onSuccess,
      onError,
      dirname,
      getConfig: getOSSConfig,
    })
  }

  useEffect(() => {
    onChange?.(list)
    loadSdk()
  }, [])

  return (
    <Upload
      ref={ref}
      listType={listType}
      multiple
      fileList={list}
      beforeUpload={handleBeforeUpload}
      customRequest={customRequest}
      onChange={handleChange}
      {...restProps}
    >
      {hideUpload ? null : children || listType === "text" ? (
        <Button type='primary'>上传文件</Button>
      ) : (
        <div>
          <PlusOutlined></PlusOutlined>
          <div className='ant-upload-text'>上传</div>
        </div>
      )}
    </Upload>
  )
}

export default forwardRef(MyUpload)
