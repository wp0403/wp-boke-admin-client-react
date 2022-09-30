/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-06-08 14:04:40
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-09-30 16:57:03
 */
import React, { useEffect } from 'react';

const projectLibrary = () => {
  useEffect(() => {
    // // #获取显示摄像头数据的video
    // const video = document.querySelector('video');
    // // #getUserMedia 参数，这里只获取视频
    // const constraints = {
    //   audio: false,
    //   video: false,
    // };
    // // 把摄像头的数据展示在video上
    // function handleSuccess(stream) {
    //   window.stream = stream;
    //   video.srcObject = stream;
    // }
    // // #错误处理
    // function handleError(error) {
    //   console.log(
    //     'navigator.MediaDevices.getUserMedia error: ',
    //     error.message,
    //     error.name,
    //   );
    // }
    // // #获取摄像头数据并回调
    // navigator.mediaDevices
    //   .getUserMedia(constraints)
    //   .then(handleSuccess)
    //   .catch(handleError);
  });

  // useEffect(() => {
  //   // #获取显示摄像头数据的video
  //   const video = document.querySelector('video');

  //   // #getUserMedia 参数，这里只获取视频
  //   const constraints = {
  //     audio: false,
  //     video: true,
  //   };

  //   // 把摄像头的数据展示在video上
  //   function handleSuccess(stream) {
  //     window.stream = stream;
  //     video.srcObject = stream;
  //   }

  //   // #错误处理
  //   function handleError(error) {
  //     console.log(
  //       'navigator.MediaDevices.getUserMedia error: ',
  //       error.message,
  //       error.name,
  //     );
  //   }

  //   // #获取桌面程序数据并回调
  //   navigator.mediaDevices
  //     .getDisplayMedia(constraints)
  //     .then(handleSuccess)
  //     .catch(handleError);

  //   // 设备枚举
  //   navigator.mediaDevices
  //     .enumerateDevices()
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch(handleError);
  // });

  return <div>{/* <video playsInline autoPlay></video> */}</div>;
};

export default projectLibrary;
