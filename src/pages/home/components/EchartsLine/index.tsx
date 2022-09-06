/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-08-17 17:19:35
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-09-02 18:10:50
 */
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import style from './index.less';

const EchartsLine = (props: any) => {
  const dom = useRef<any>();

  const init = () => {
    const option = {
      title: {
        text: '',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985',
          },
        },
      },
      legend: {
        data: ['Email', 'Union', 'Video', 'Direct', 'Search'],
        itemGap: 30,
        top: '10px',
      },
      toolbox: {},
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: 'Email',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series',
          },
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: 'Union',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series',
          },
          data: [220, 182, 191, 234, 290, 330, 310],
        },
        {
          name: 'Video',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series',
          },
          data: [150, 232, 201, 154, 190, 330, 410],
        },
        {
          name: 'Direct',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series',
          },
          data: [320, 332, 301, 334, 390, 330, 320],
        },
        {
          name: 'Search',
          type: 'line',
          stack: 'Total',
          label: {
            show: true,
            position: 'top',
          },
          areaStyle: {},
          emphasis: {
            focus: 'series',
          },
          data: [820, 932, 901, 934, 1290, 1330, 1320],
        },
      ],
    };

    const myChart = echarts.init(
      document.getElementById('echartsLineHome') as any,
    );

    option && myChart.setOption(option);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className={style.echartsLine}>
      <div className={style.title}>图表数据</div>
      <div className={style.content}>
        <div
          className={style.echartsCon}
          id="echartsLineHome"
          ref={dom.current}
        />
      </div>
    </div>
  );
};

export default EchartsLine;
