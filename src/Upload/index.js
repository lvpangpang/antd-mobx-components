import { forwardRef, useEffect } from "react";
import { Upload, message } from "antd";
import { PlusOutlined } from '@ant-design/icons'
import { loadSdk, isImg, getImgInfo, verifyImg, uploadOSS, optimizeValue } from "./help";
import { isFun } from "js-common-library";

function MyUpload(
  {
    maxSize,
    value,
    children,
    getOssConfig,
    dirname,
    maxCount = 3,
    beforeUpload,
    imgLimit,
    ...restProps
  },
  ref
) {
  const list = optimizeValue(value)
  const overCount = list.length >= maxCount;
  const hideUpload = overCount;

  /* 
    file - 当前上传的单个文件
    fileList- 已经上传的文件列表 
  */
  const handleBeforeUpload = async (file, fileList) => {
    const total = fileList.length + list.length;

    // 文件数量限制
    if (total > maxCount) {
      message.error(`上传文件数量不能大于 ${maxCount} 个`);
      return Promise.reject();
    }

    // 文件尺寸限制
    if (file.size > maxSize) {
      message.error(
        `上传文件的大小不能大于 ${(maxSize / 1024 / 1024).toFixed(2)} M`
      );
      return Promise.reject();
    }

    // 图片格式校验
    if (isImg(file) && imgLimit) {
      try {
        const imgInfo = await getImgInfo(file);
        const pass = verifyImg(imgInfo);
        if (!pass) {
          return Promise.reject();
        }
        return true;
      } catch (err) {
        return Promise.reject();
      }
    }

    // 其他自定义上传前效验
    if (isFun(beforeUpload)) {
      try {
        const shouldUp = await beforeUpload(file, fileList);
        if (!shouldUp) {
          return Promise.reject();
        }
      } catch {
        return Promise.reject();
      }
    }

    return true;
  };

  // 自定义上传OSS请求
  const customRequest = (e) => {
    console.log('自定义上传', e)
    const { file, onProgress, onSuccess, onError } = e;
    uploadOSS(file, {
      onProgress,
      onSuccess,
      onError,
      maxSize,
      dirname,
      getOssConfig,
    });
  };

  useEffect(() => {
    loadSdk();
  }, []);
  return (
    <Upload
      ref={ref}
      fileList={value}
      beforeUpload={handleBeforeUpload}
      customRequest={customRequest}
      listType={children ? "text" : "picture-card"}
      multiple
      {...restProps}
    >
      {hideUpload
        ? null
        : children || (
            <div>
              <PlusOutlined></PlusOutlined>
              <div className="ant-upload-text">上传</div>
            </div>
          )}
    </Upload>
  );
}

export default forwardRef(MyUpload);
