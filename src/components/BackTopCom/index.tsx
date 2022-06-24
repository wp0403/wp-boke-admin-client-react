/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-01-07 17:34:37
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-01-14 17:29:30
 */
import React, { useEffect, useState } from 'react';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import { throttleByAnimationFrame } from '@/utils/cloneUtils/throttleByAnimationFrame';
import { scrollTo, getScroll } from '@/utils/elementUtils';
import SysIcon from '@/components/SysIcon';
import styles from './index.less';

interface Props {
  target?: () => HTMLElement | Window | Document;
  visibilityHeight?: number;
  icon?: string;
  duration?: number;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLElement>;
  className?: string;
}

const BackTopCom = (props: Props) => {
  const {
    icon,
    target = () => window,
    visibilityHeight = 100,
    duration = 450,
    style,
    onClick,
    className,
  } = props;
  // 是否显示回到顶部
  const [visible, setVisible] = useState<boolean>(false);

  // 当前组件的实例
  const ref = React.createRef<HTMLDivElement>();
  // 当前的滚动元素
  const scrollEvent = React.useRef<any>();

  // 获取默认的滚动元素
  const getDefaultTarget = () =>
    ref.current && ref.current.ownerDocument
      ? ref.current.ownerDocument
      : window;

  const getTarget = target || getDefaultTarget;
  const container = getTarget();

  // 回到顶部事件
  const scrollToTop = (e: React.MouseEvent<HTMLDivElement>) => {
    scrollTo(0, {
      getContainer: target || getDefaultTarget,
      duration,
    });
    if (typeof onClick === 'function') {
      onClick(e);
    }
  };

  // 滚动事件
  const handleScroll = throttleByAnimationFrame(
    (e: React.UIEvent<HTMLElement> | { target: any }) => {
      // 获取距离顶部高度
      const scrollTop = getScroll(e.target, true);
      setVisible(scrollTop > visibilityHeight!);
    },
  );

  // 为滚动页面绑定滚动事件
  const bindScrollEvent = () => {
    // 为滚动元素绑定滚动事件
    scrollEvent.current = addEventListener(
      container,
      'scroll',
      (e: React.UIEvent<HTMLElement>) => {
        handleScroll(e);
      },
    );
    handleScroll({
      target: container,
    });
  };

  useEffect(() => {
    bindScrollEvent();
    return () => {
      if (scrollEvent.current) {
        scrollEvent.current.remove();
      }
      (handleScroll as any).cancel();
    };
  }, [props.target]);

  return (
    <div
      className={`${styles.backDom} ${className} ${
        visible && styles.backDom_active
      }`}
      ref={ref}
      style={style}
      onClick={scrollToTop}
    >
      <SysIcon
        className={styles.icon}
        type={icon ? icon : 'icon-a-zhidingdingbu'}
      />
    </div>
  );
};

export default BackTopCom;
