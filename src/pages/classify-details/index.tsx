import React, { useState, useEffect, FC } from 'react';
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
  Upload,
  Image,
  message,
  Typography,
  Tooltip,
  Popconfirm,
} from 'antd';
import moment from 'moment';
import { CopyOutlined } from '@ant-design/icons';
import SelectCom from '@/components/SelectCom';
import RanderMarkdown from '@/components/RanderMarkdown';
import {
  getOnlyDictObj,
  getDictObj,
  getSubDictObj,
} from '@/utils/globalDataUtils';
import api from '@/api';
import { isAuth } from '@/utils/authorityUtils';
import { localGet } from '@/utils/local';
import UploadImg from '@/components/UploadImg';
import ReadFileUpload from '@/components/ReadFileUpload';
import SysIcon from '@/components/SysIcon';
import style from './index.less';

const { Paragraph } = Typography;
const { classify, user } = api;

interface ClassifyObj {
  id: number;
  title: string;
  author: string;
  author_id: number;
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

const ClassifyDetails: FC = (props: any) => {
  const { id } = props.match.params;

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [classifyObj, setClassifyObj] = useState<ClassifyObj>({
    time_str: null,
    last_edit_time: null,
  } as any);
  const [classifySubList, setClassifySubList] = useState<any[]>([]);
  const [copyImg, setCopyImg] = useState<string>('上传后显示图片地址');
  const [form] = Form.useForm();
  const format = 'YYYY-MM-DD HH:mm:ss';

  // 获取详情信息
  const getObj = async () => {
    setLoading(true);
    await classify
      ._getClassifyDetails({ params: { id } })
      .then(({ data }) => {
        if (data.code === 200) {
          const { time_str, last_edit_time } = data.data;

          setClassifyObj({
            ...data.data,
            time_str: time_str ? moment(new Date(time_str), format) : null,
            last_edit_time: last_edit_time
              ? moment(new Date(last_edit_time), format)
              : null,
          });
          setClassifySubList(
            getDictObj('bowen_class_sub', data.data?.classify_id).children?.map(
              (item) => ({
                label: item.value,
                value: item.id,
              }),
            ),
          );
          form.resetFields();
        } else {
          message.error(data.msg);
          history.push('/classify');
        }
      })
      .finally(() => setLoading(false));
  };

  // 彻底删除删除
  const deleteBowenObj = async (id) => {
    await classify._deleteClassifyDetails({ id }).then(({ data }) => {
      if (data.code === 200) {
        message.success(data.msg);
        history.push('/classify');
      } else {
        message.error(data.msg);
      }
    });
  };

  useEffect(() => {
    !isEdit && getObj();
    isEdit && form.resetFields();
  }, [id, isEdit]);

  const onFinish = (values: any) => {
    const newValues = { ...classifyObj };
    newValues.time_str = moment(new Date(newValues?.time_str)).format(format);
    newValues.last_edit_time = moment(new Date()).format(format);
    setLoading(true);
    classify
      ._putClassifyDetails(newValues)
      .then(({ data }) => {
        if (data.code === 200) {
          message.success(data.msg);
        } else {
          message.error(data.msg);
        }
        setIsEdit(false);
      })
      .finally(() => setLoading(false));
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
    if ('storage_type' === Object.keys(value)[0]) {
      const dictObj = getDictObj('bowen_type', Object.values(value)[0] as any);
      setClassifyObj((data: ClassifyObj) => ({
        ...data,
        ...value,
        storage_desc: dictObj.value,
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
            博文详情页
          </div>
          <div className={style.headerBtnBox}>
            {(isAuth('edit@classify') ||
              localGet('user')?.uid === classifyObj?.author_id) && (
              <Button
                type="primary"
                shape="round"
                onClick={() => setIsEdit(!isEdit)}
              >
                {isEdit ? '取消' : '编辑'}
              </Button>
            )}
            {isAuth('delete@classify') && (
              <Popconfirm
                title="将彻底删除该条数据，不可恢复，要继续吗？"
                onConfirm={() => deleteBowenObj(classifyObj.id)}
                okText="确定"
                cancelText="取消"
                placement="topRight"
              >
                <Button
                  style={{ marginLeft: '10px' }}
                  type="primary"
                  danger
                  shape="round"
                >
                  删除
                </Button>
              </Popconfirm>
            )}
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
            {isEdit ? (
              <Input />
            ) : (
              <div className={style.form_item_con}>{classifyObj?.title}</div>
            )}
          </Form.Item>
          <Form.Item
            className={style.form_item}
            label="博文作者"
            name="author_id"
            rules={[{ required: true }]}
          >
            {isEdit ? (
              <SelectCom
                optionItem={{ label: 'name', value: 'uid' }}
                fun={user._searchUserList}
                placeholder="请输入关键字搜索"
                showSearch={true}
                defaultOptions={[
                  { label: classifyObj?.author, value: classifyObj?.author_id },
                ]}
                defaultValue={[classifyObj?.author_id]}
                onChange={onValuesChange}
                keyName="author_id"
              />
            ) : (
              <div className={style.form_item_con}>{classifyObj?.author}</div>
            )}
          </Form.Item>
          <Form.Item
            className={style.form_item}
            label="创建时间"
            name="time_str"
          >
            {isEdit ? (
              <DatePicker
                disabled={!isAuth('update@time')}
                format={format}
                showTime
              />
            ) : (
              <div className={style.form_item_con}>
                {moment(classifyObj?.time_str).format(format)}
              </div>
            )}
          </Form.Item>
          <Form.Item
            className={style.form_item}
            label="最后修改时间"
            name="last_edit_time"
          >
            {isEdit ? (
              <DatePicker
                disabled={!isAuth('update@time')}
                format={format}
                showTime
              />
            ) : (
              <div className={style.form_item_con}>
                {moment(classifyObj?.last_edit_time).format(format)}
              </div>
            )}
          </Form.Item>
          <Form.Item
            className={style.form_item}
            label="一级类"
            name="classify_id"
            rules={[{ required: true }]}
          >
            {isEdit ? (
              <Select
                options={getOnlyDictObj('bowen_class')?.map((item) => ({
                  label: item.value,
                  value: item.id,
                }))}
                onChange={onClassifyChange}
                defaultValue={classifyObj?.classify_id}
              />
            ) : (
              <div className={style.form_item_con}>{classifyObj?.classify}</div>
            )}
          </Form.Item>
          <Form.Item
            className={style.form_item}
            label="二级类"
            name="classify_sub_id"
            rules={[{ required: true }]}
          >
            {isEdit ? (
              <Select options={classifySubList} />
            ) : (
              <div className={style.form_item_con}>
                {classifyObj?.classify_sub}
              </div>
            )}
          </Form.Item>
          <Form.Item
            className={style.form_item}
            label="是否精选博文"
            name="selected"
            valuePropName={'checked'}
          >
            {isEdit ? (
              <Switch />
            ) : (
              <div className={style.form_item_con}>
                {classifyObj?.selected ? 'Yes' : 'No'}
              </div>
            )}
          </Form.Item>
          <Form.Item
            className={style.form_item}
            label="是否放入回收站"
            name="isDelete"
            valuePropName={'checked'}
          >
            {isEdit ? (
              <Switch />
            ) : (
              <div className={style.form_item_con}>
                {classifyObj?.isDelete ? 'Yes' : 'No'}
              </div>
            )}
          </Form.Item>
          <Form.Item
            className={style.form_item}
            label="图片"
            name="img"
            rules={[{ required: true }]}
          >
            {isEdit ? (
              <UploadImg
                isCopy={true}
                callback={(v) => onValuesChange(v, {}, 'img')}
              />
            ) : (
              <div className={style.form_item_con}>
                <Image
                  className={style.list_img}
                  src={classifyObj?.img}
                  alt={classifyObj?.title}
                />
              </div>
            )}
          </Form.Item>
          <Form.Item
            className={style.form_item}
            label="博文简介"
            name="desc"
            rules={[{ required: true }]}
          >
            {isEdit ? (
              <Input.TextArea />
            ) : (
              <div className={style.form_item_con}>{classifyObj?.desc}</div>
            )}
          </Form.Item>
          <Form.Item
            className={style.form_item}
            label="文档类型"
            name="storage_type"
            rules={[{ required: true }]}
          >
            {isEdit ? (
              <Select
                options={getOnlyDictObj('bowen_type')?.map((item) => ({
                  label: item.value,
                  value: item.id,
                }))}
                placeholder="请选择文档类型（提倡markdown）"
              />
            ) : (
              <div className={style.form_item_con}>
                {classifyObj?.storage_desc}
              </div>
            )}
          </Form.Item>
          {isEdit && classifyObj?.storage_type === '1' && (
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
                isEdit && classifyObj?.storage_type === '1'
                  ? style.form_item
                  : style.form_item_1
              } ${style.form_item_noBottom}`}
              label="博文内容"
              name="content"
              rules={[{ required: true }]}
            >
              {isEdit ? (
                <Input.TextArea className={style.textarea} />
              ) : classifyObj?.storage_type === '1' ? (
                <div className={style.form_item_markdown}>
                  <RanderMarkdown markdown={classifyObj?.content} />
                </div>
              ) : (
                <div className={style.form_item_con}>
                  {classifyObj?.content}
                </div>
              )}
            </Form.Item>
            {isEdit && classifyObj?.storage_type === '1' ? (
              <div className={style.form_item_markdown_1}>
                <RanderMarkdown markdown={classifyObj?.content} />
              </div>
            ) : (
              ''
            )}
          </div>
          {isEdit ? (
            <>
              <Divider />
              <div className={style.uploadImg}>
                <Tooltip title="用于在详情中插入图片" placement="topLeft">
                  <div className={style.uploadImgTitle}>
                    上传图片并获取图片地址
                  </div>
                </Tooltip>
                <UploadImg isCopy={true} callback={(v) => setCopyImg(v)} />
                <Paragraph copyable>{copyImg}</Paragraph>
              </div>
              <Divider />
            </>
          ) : (
            ''
          )}
          {isEdit &&
          (isAuth('edit@classify') ||
            localGet('user')?.uid === classifyObj?.author_id) ? (
            <div className={style.form_btn}>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  提交
                </Button>
              </Form.Item>
            </div>
          ) : (
            ''
          )}
        </Form>
      </Spin>
    </div>
  );
};

export default ClassifyDetails;
