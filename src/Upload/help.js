import { message } from "antd";
import { isFun, http, isArr } from "js-common-library";

// 转成fileList需要的对象结构
export function transformToFileObj(item) {
  return {
    status: 'done',
    name: item.name || item.url,
    url: item.url,
  }
}

// 初始化数据转化格式
export function optimizeValue(value) {
  if (!isArr(value)) {
    return [];
  }
  return value.map(transformToFileObj).filter(Boolean);
}

// 判断是否为图片类型的文件
export function isImg(file) {
  return file.type.includes("image");
}

// 获取图片信息
export function getImgInfo(imgFile) {
  const fileReader = new FileReader();
  fileReader.readAsDataURL(imgFile);
  return new Promise((resolve, reject) => {
    fileReader.onload = (e) => {
      const img = new window.Image();
      img.src = e.target.result;
      img.onload = () => {
        resolve(img);
      };
      img.onerror = reject;
    };
    fileReader.onerror = reject;
  });
}

// 判断图片格式
export function verifyImg(imgInfo, limit) {
  const { naturalWidth, naturalHeight } = imgInfo;
  const { width, height, maxWidth, maxHeight } = limit;

  if (width && height) {
    if (naturalWidth === width && naturalHeight === height) {
      return true;
    }
    message.error(`请上传尺寸为 ${width}px * ${height}px 的图片`);
    return false;
  }

  if (width && naturalWidth !== width) {
    message.error(`请上传宽度为 ${width}px 的图片`);
    return false;
  }
  if (height && naturalHeight !== height) {
    message.error(`请上传高度为 ${height}px 的图片`);
    return false;
  }
  if (maxWidth && naturalWidth > maxWidth) {
    message.error(`请上传最大宽度为 ${maxWidth}px 的图片`);
    return false;
  }
  if (maxHeight && naturalHeight > maxHeight) {
    message.error(`请上传最大高度为 ${maxHeight}px 的图片`);
    return false;
  }
  return true;
}

// 加载ossSdk
export function loadSdk(callback) {
  const script = document.createElement("script");
  script.src = "https://gosspublic.alicdn.com/aliyun-oss-sdk-6.8.0.min.js";
  document.body.appendChild(script);
  script.onload = function () {
    callback?.();
  };
  script.onerror = function () {
    callback?.({ msg: "加载oss-sdk脚本失败" });
  };
}

// 获取oss密匙
export async function getOSSConfig(getConfig) {
  let config;
  if (isFun(getConfig)) {
    config = await getConfig();
  } else {
    // 默认请求STS
    config = await http.get("/owlc/v1/aliyun/oss/sts/token", {
      tansfromResult(res) {
        return res.data?.data;
      },
    });
  }
  if (config?.securityToken) {
    return config;
  }
  return {};
}

// oss上传文件
export async function uploadOSS(file, config) {
  const { onProgress, onSuccess, onError, getConfig, dirname } =
    config || {};
  try {
    const fileName = file.name;
    const uploadName = dirname ? dirname + "/" + fileName : fileName;

    const { securityToken, ...ossConfig } = await getOSSConfig(getConfig);
    if (!securityToken) {
      message.destroy();
      message.error('获取OSS配置失败')
      return onError({
        msg: "获取OSS配置失败",
      });
    }

    const Client = window.OSS.Wrapper || window.OSS;
    const client = new Client({
      stsToken: securityToken,
      ...ossConfig,
    });

    const result = await client.multipartUpload(uploadName, file, {
      async onProgress(percent) {
        onProgress?.({
          percent: percent * 100,
        });
      }
    });
    const { res, name } = result;
    const url = client.signatureUrl(uploadName)
    onSuccess({
      url,
      name,
      resquestUrls: res.requestUrls
    });

  } catch (err) {
    message.error("上传出错，请重试");
    onError({ error: err, msg: "上传出错，请重试" });
  }
}
