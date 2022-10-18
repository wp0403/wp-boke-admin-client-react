/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-10-18 10:41:02
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-10-18 11:07:01
 */

interface State {
  type: string;
  data: any;
}

interface ListenerItem {
  type: string;
  list: Function[];
}

// 全局的state列表
const stateList: State[] = [];
// 订阅state变更的列表

// 设置state
const setState = (newState: State) => {
  if (!stateList.find((v) => v.type === newState.type)) {
    stateList.push(newState);
  }
  stateList.forEach((v) => {
    if (v.type === newState.type) {
      v = { ...v, ...newState };
    }
  });
};

// 订阅state
const useCustom = () => {};

// 调用实例
// useGlobalStore('user',setUser);

// const {setState} = useGlobalStore();

// setState({
//     type: 'user',
//     data: {},
// })
