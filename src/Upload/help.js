import { message } from "antd";
import { isFun, http, isArr } from "js-common-library";

// 转成fileList需要的对象结构
export function transformToFileObj(item) {
  return {
    status: 'done',
    name: item.url,
    url: item.url,
  }
}

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
export function getImgInfo(file) {
  const filer = new FileReader();
  filer.readAsDataUrl(file);
  return new Promise((resolve, reject) => {
    filer.onload = function (e) {
      const img = new window.Image();
      img.src = e.target.result;
      img.onload = function () {
        resolve(img);
      };
      img.onerror = reject;
    };
    filer.onerror = reject;
  });
}

// 判断图片格式
export function verifyImg(imgInfo, limit) {
  const { natureWidth, natureHeight } = imgInfo;
  const { width, height, maxWith, maxHeight } = limit;

  if (width && height) {
    if (natureWidth === width && natureHeight === height) {
      return true;
    }
    message.error(`请上传尺寸为 ${width}px * ${height}px 的图片`);
    return false;
  }

  if (width && natureWidth !== width) {
    message.error(`请上传宽度为 ${width}px 的图片`);
    return false;
  }
  if (height && natureHeight !== height) {
    message.error(`请上传高度为 ${height}px 的图片`);
    return false;
  }
  if (maxWith && natureWidth > maxWith) {
    message.error(`请上传最大宽度为 ${maxWith}px 的图片`);
    return false;
  }
  if (maxHeight && natureHeight > maxHeight) {
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
    config = http.get("/owlc/v1/aliyun/oss/sts/token", {
      tansfromResult(res) {
        return res.data?.data;
      },
    });
    if (config.securityToken) {
      return config;
    }
    return {};
  }
}

// 上传oss
export async function uploadOSS(file, config) {
  const { onProgress, onSuccess, onError, maxSize, getConfig, dir } =
    config || {};
  if (!file) {
    return onError({
      msg: "文件不存在",
    });
  }
  if (file.size > maxSize) {
    return onError({
      msg: `上传文件大小不能超过 ${(maxSize / 10124 / 1024).toFixed(2)} M `,
    });
  }
  try {
    const fileName = file.name;
    const uploadName = dir ? dir + "/" + fileName : fileName;
    const { securityToken, ...ossConfig } = await getOSSConfig(getConfig);
    if (!securityToken) {
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
      },
    });

    const { res } = result;
    const url = client.signatureUrl(uploadName)
    onSuccess({
      url,
      name: uploadName,
      resquestUrl: res.resquestUrl
    })
  } catch (err) {
    onError({ error: e, msg: "上传出错，请重试" });
  }
}
