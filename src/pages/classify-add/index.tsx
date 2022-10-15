import React, { useState, FC } from 'react';
import { history } from 'umi';
import {
  Button,
  Divider,
  Form,
  Input,
  Spin,
  Select,
  Switch,
  DatePicker,
  message,
  Typography,
  Tooltip,
} from 'antd';
import moment from 'moment';
import { CopyOutlined } from '@ant-design/icons';
import SelectCom from '@/components/SelectCom';
import {
  getOnlyDictObj,
  getDictObj,
  getSubDictObj,
} from '@/utils/globalDataUtils';
import api from '@/api';
import RanderMarkdown from '@/components/RanderMarkdown';
import UploadImg from '@/components/UploadImg';
import DictSelectCom from '@/components/DictSelectCom';
import ReadFileUpload from '@/components/ReadFileUpload';
import SysIcon from '@/components/SysIcon';
import style from './index.less';

const { Paragraph } = Typography;
const { classify, user } = api;

interface ClassifyObj {
  title: string;
  author: string;
  classify: string;
  classify_id: string;
  classify_sub: string;
  classify_sub_id: string;
  time_str: any;
  last_edit_time: any;
  desc: string;
  selected: number;
  isDelete: number;
  img: string;
  storage_type: string;
  storage_desc: string;
  content: string;
}

const ClassifyDetails: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [classifyObj, setClassifyObj] = useState<ClassifyObj>({
    time_str: null,
    last_edit_time: null,
    selected: false,
    isDelete: false,
  } as any);
  const [classifySubList, setClassifySubList] = useState<any[]>([]);
  const [copyImg, setCopyImg] = useState<string>('上传后显示图片地址');
  const [form] = Form.useForm();
  const format = 'YYYY-MM-DD HH:mm:ss';

  // 提交表单
  const onFinish = (values: any) => {
    classifyObj.time_str = moment(
      classifyObj?.time_str ? new Date(classifyObj?.time_str) : new Date(),
    ).format(format);
    classifyObj.last_edit_time = moment(
      classifyObj?.last_edit_time
        ? new Date(classifyObj?.last_edit_time)
        : new Date(),
    ).format(format);
    setLoading(true);
    classify
      ._createClassifyDetails(classifyObj)
      .then(({ data }) => {
        if (data.code === 200) {
          message.success(data.msg);
          history.push(`/classify/${data.data}/details`);
        } else {
          message.error(data.msg);
        }
      })
      .finally(() => setLoading(false));
  };
  // 重置表单
  const onReset = async () => {
    await setClassifyObj({
      time_str: null,
      last_edit_time: null,
      selected: 0,
      isDelete: 0,
    } as any);
    await form.resetFields();
  };

  // 一级类切换事件
  const onClassifyChange = (value: string, option) => {
    form.setFieldsValue({ classify_sub: '', classify_sub_id: '' });
    setClassifySubList(
      getDictObj('bowen_class_sub', value).children?.map((item) => ({
        label: item.value,
        value: item.id,
      })),
    );
  };
  // 表单的字段值更新事件
  const onValuesChange = (value, option, keyName?) => {
    if (!value) return;
    if ('classify_id' === Object.keys(value)[0]) {
      const dictObj = getDictObj('bowen_class', Object.values(value)[0] as any);
      setClassifyObj((data: ClassifyObj) => ({
        ...data,
        classify: dictObj.value,
      }));
    }
    if ('classify_sub_id' === Object.keys(value)[0]) {
      const dictObj = getSubDictObj(
        'bowen_class_sub',
        classifyObj.classify_id,
        Object.values(value)[0] as any,
      );
      setClassifyObj((data: ClassifyObj) => ({
        ...data,
        classify_sub: dictObj.value,
      }));
    }
    if ('img' === keyName) {
      form.setFieldsValue({ img: value });
      setClassifyObj((data: ClassifyObj) => ({
        ...data,
        img: value,
      }));
      return;
    }
    if (typeof value !== 'object' && keyName === 'author_id') {
      setClassifyObj((data: ClassifyObj) => ({
        ...data,
        [keyName]: value,
        author: option?.name,
      }));
      return;
    }
    if ('storage_type' === Object.keys(value)[0]) {
      const dictObj = getDictObj('bowen_type', Object.values(value)[0] as any);
      setClassifyObj((data: ClassifyObj) => ({
        ...data,
        ...value,
        storage_desc: dictObj.value,
      }));
      return;
    }
    if ('content' === keyName) {
      form.setFieldsValue(value);
    }
    setClassifyObj((data: ClassifyObj) => ({
      ...data,
      ...value,
    }));
  };

  return (
    <div className={style.classifyDetails}>
      <Spin tip="Loading..." spinning={loading}>
        <div className={style.header}>
          <div className={style.headerPageTitle}>
            <CopyOutlined style={{ paddingRight: '20px' }} />
            新增博文页
          </div>
        </div>
        <Divider />
        <Form
          className={style.form}
          name="basic"
          initialValues={classifyObj}
          onFinish={onFinish}
          autoComplete="off"
          scrollToFirstError
          form={form}
          onValuesChange={onValuesChange}
        >
          <Form.Item
            className={style.form_item}
            label="博文标题"
            name="title"
            rules={[{ required: true }]}
          >
            <Input placeholder="请输入博文标题" />
          </Form.Item>
          <Form.Item
            className={style.form_item}
            label="博文作者"
            name="author"
            rules={[{ required: true }]}
          >
            <SelectCom
              optionItem={{ label: 'name', value: 'uid' }}
              fun={user._searchUserList}
              placeholder="请输入关键字搜索"
              showSearch={true}
              onChange={onValuesChange}
              keyName="author_id"
            />
          </Form.Item>
          <Form.Item
            className={style.form_item}
            label="创建时间"
            name="time_str"
          >
            <DatePicker format={format} showTime />
          </Form.Item>
          <Form.Item
            className={style.form_item}
            label="最后修改时间"
            name="last_edit_time"
          >
            <DatePicker format={format} showTime />
          </Form.Item>
          <Form.Item
            className={style.form_item}
            label="一级类"
            name="classify_id"
            rules={[{ required: true }]}
          >
            <DictSelectCom
              code="bowen_class"
              placeholder="请选择一级分类"
              onChange={onClassifyChange}
            />
          </Form.Item>
          <Form.Item
            className={style.form_item}
            label="二级类"
            name="classify_sub_id"
            rules={[{ required: true }]}
          >
            <Select placeholder="请选择二级分类" options={classifySubList} />
          </Form.Item>
          <Form.Item
            className={style.form_item}
            label="是否精选博文"
            name="selected"
            valuePropName={'checked'}
          >
            <Switch />
          </Form.Item>
          <Form.Item
            className={style.form_item}
            label="是否放入回收站"
            name="isDelete"
            valuePropName={'checked'}
          >
            <Switch />
          </Form.Item>
          <Form.Item
            className={style.form_item}
            label="图片"
            name="img"
            rules={[{ required: true }]}
          >
            <UploadImg
              isCopy={true}
              callback={(v) => onValuesChange(v, {}, 'img')}
            />
          </Form.Item>
          <Form.Item
            className={style.form_item}
            label="博文简介"
            name="desc"
            rules={[{ required: true }]}
          >
            <Input.TextArea placeholder="请输入博文简介" />
          </Form.Item>
          <Form.Item
            className={style.form_item}
            label="文档类型"
            name="storage_type"
            rules={[{ required: true }]}
          >
            <Select
              options={getOnlyDictObj('bowen_type')?.map((item) => ({
                label: item.value,
                value: item.id,
              }))}
              placeholder="请选择文档类型（提倡markdown）"
            />
          </Form.Item>
          {classifyObj?.storage_type === '1' && (
            <div className={style.read_file_upload}>
              <ReadFileUpload
                onChange={(v) => onValuesChange({ content: v }, {}, 'content')}
              />
              <Tooltip title="该操作将清空现有博文内容，请谨慎操作。">
                <SysIcon
                  className={style.read_file_upload_icon}
                  type="icon-jinggao2"
                />
              </Tooltip>
            </div>
          )}
          <div className={style.form_item_2}>
            <Form.Item
              className={`${
                classifyObj?.storage_type === '1'
                  ? style.form_item
                  : style.form_item_1
              } ${style.form_item_noBottom}`}
              label="博文内容"
              name="content"
              rules={[{ required: true }]}
            >
              <Input.TextArea
                placeholder="请输入博文内容（支持Markdown、HTML、TEXT）"
                className={style.textarea}
              />
            </Form.Item>
            {classifyObj?.storage_type === '1' && (
              <div className={style.form_item_markdown_1}>
                <RanderMarkdown markdown={classifyObj?.content} />
              </div>
            )}
          </div>
          <Divider />
          <div className={style.uploadImg}>
            <Tooltip title="用于在详情中插入图片" placement="topLeft">
              <div className={style.uploadImgTitle}>上传图片并获取图片地址</div>
            </Tooltip>
            <UploadImg isCopy={true} callback={(v) => setCopyImg(v)} />
            <Paragraph copyable>{copyImg}</Paragraph>
          </div>
          <Divider />
          <div className={style.form_btn}>
            <Form.Item>
              <Button
                htmlType="button"
                onClick={onReset}
                style={{ marginRight: '10px' }}
              >
                重置
              </Button>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Spin>
    </div>
  );
};

export default ClassifyDetails;
