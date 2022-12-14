/**
 * 腾讯云对象储存实例
 */
import COS from 'cos-js-sdk-v5';
import type { GetBucketParams } from 'cos-js-sdk-v5';
import api from '@/api';

const { all } = api;

// 存储桶名称，由bucketname-appid 组成，appid必须填入，可以在COS控制台查看存储桶名称。 https://console.cloud.tencent.com/cos5/bucket
const Bucket = 'img-1302605407'; /* 存储桶，必须字段 */
// 存储桶region可以在COS控制台指定存储桶的概览页查看 https://console.cloud.tencent.com/cos5/bucket/
// 关于地域的详情见 https://cloud.tencent.com/document/product/436/6224
const Region = 'ap-beijing'; /* 存储桶所在地域，必须字段 */

const cos = new COS({
  // 可选参数
  FileParallelLimit: 3, // 控制文件上传并发数
  ChunkParallelLimit: 3, // 控制单个文件下分片上传并发数
  ChunkSize: 1024 * 1024, // 控制分片大小，单位 B
  ProgressInterval: 50, // 控制 onProgress 回调的间隔
  ChunkRetryTimes: 3, // 控制文件切片后单片上传失败后重试次数
  UploadCheckContentMd5: true, // 上传过程计算 Content-MD5
  getAuthorization: async (options, callback) => {
    // 异步获取临时密钥
    // 服务端 JS 和 PHP 例子：https://github.com/tencentyun/cos-js-sdk-v5/blob/master/server/
    // 服务端其他语言参考 COS STS SDK ：https://github.com/tencentyun/qcloud-cos-sts-sdk
    // STS 详细文档指引看：https://cloud.tencent.com/document/product/436/14048
    await all._getCosKeyTemporary().then(({ data }) => {
      callback({
        TmpSecretId: data.credentials.tmpSecretId,
        TmpSecretKey: data.credentials.tmpSecretKey,
        SecurityToken: data.credentials.sessionToken,
        // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
        StartTime: data.startTime, // 时间戳，单位秒，如：1580000000
        ExpiredTime: data.expiredTime, // 时间戳，单位秒，如：1580000000
      });
    });
  },
});

// 接下来可以通过 cos 实例调用 COS 请求。

// 上传对象
export const putCos = ({
  file,
  StorageClass = 'STANDARD',
  onProgress,
  onSuccess,
  onError,
}) => {
  cos.putObject(
    {
      Bucket /* 必须 */,
      Region /* 存储桶所在地域，必须字段 */,
      Key: file.name /* 必须 */,
      StorageClass: StorageClass as any,
      Body: file, // 上传文件对象
      ContentType: file.type,
      onProgress,
      onTaskReady: onSuccess,
      // onTaskStart: (TaskInfo) => {
      //   console.log(TaskInfo);
      // },
    },
    function (err, data) {
      err ? onError(err) : onSuccess(data);
    },
  );
};

// 查询对象列表
export const getCosList = (callback, opt?: GetBucketParams) => {
  cos.getBucket(
    {
      Bucket /* 必须 */,
      Region /* 存储桶所在地域，必须字段 */,
      ...opt,
    },
    function (err, data) {
      callback(err || data);
    },
  );
};

// 下载对象
export const getCosObj = (name, callback) => {
  cos.getObject(
    {
      Bucket /* 必须 */,
      Region /* 存储桶所在地域，必须字段 */,
      Key: name /* 必须 */,
      // QueryString: `watermark/3/type/1/image/aHR0cDovL2V4YW1wbGVzLTEyNTEwMDAwMDQucGljc2gubXlxY2xvdWQuY29tL3NodWl5aW4uanBn`, // 加水印
      DataType: 'blob',
    },
    function (err, data) {
      callback(err || data.Body);
    },
  );
};

// 删除对象
export const delCosObj = (name, callback) => {
  cos.deleteObject(
    {
      Bucket /* 必须 */,
      Region /* 存储桶所在地域，必须字段 */,
      Key: name /* 必须 */,
    },
    function (err, data) {
      callback(err || data);
    },
  );
};
