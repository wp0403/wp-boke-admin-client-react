### 回到顶部组件

本组件使用了 antd 回到顶部的函数方法，也算是一种对 antd 源码的解读吧

个人开发遇到的问题，在全局布局组件中，页面加载过程中，会优先加载全局 loading 组件，故而获取不到所需要的 dom 元素，所以最初的在全局中置入回到顶部组件思路失败

那么只能在所需要的页面中引入该组件使用了

#### 使用

```javascript
import BackTopCom from '@/components/BackTopCom';

interface Props {
  target?: () => HTMLElement | Window | Document; // 当前滚动的元素
  visibilityHeight?: number; // 距离顶部多少显示
  icon?: string; // 自定义的icon
  duration?: number; // 回到顶部的时间
  style?: React.CSSProperties; // 自定义行内样式
  onClick?: React.MouseEventHandler<HTMLElement>; // 点击事件
  className?: string; // 类名
}

<BackTopCom visibilityHeight={100} target={() => layoutContent} />;
```
