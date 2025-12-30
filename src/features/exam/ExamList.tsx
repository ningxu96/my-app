"use client";

import React, { useState, useEffect } from "react";
import { Form, Input, Select, Button, Table, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs, { Dayjs } from "dayjs";
import ExamDetailPanel from "./ExamDetailPanel";
import type { ExamRecord } from "./ExamDetailPanel";

const { Option } = Select;

// ==================== 类型定义 ====================

interface SearchFormValues {
  className?: string;
  examType?: string;
  chapter?: string;
  dateRange?: [Dayjs, Dayjs];
}

interface PaginationConfig {
  current: number;
  pageSize: number;
  total: number;
}

// ==================== API 接口预留 ====================

/**
 * 获取考试列表数据
 */
const fetchExamList = async (query: {
  className?: string;
  examType?: string;
  chapter?: string;
  startDate?: string;
  endDate?: string;
  page: number;
  pageSize: number;
}): Promise<{
  data: ExamRecord[];
  total: number;
}> => {
  console.log("API 调用参数:", query);
  await new Promise((resolve) => setTimeout(resolve, 300));
  return {
    data: getMockData(),
    total: 15,
  };
};

// ==================== Mock 数据 ====================

const getMockData = (): ExamRecord[] => {
  return [
    {
      key: "1",
      examName: "考试名称考试名称考试名...",
      className: "这是一个很长班级名...",
      examType: "日常考试",
      teacher: "李建东",
      examDateRange: "2023-12-24～2023-12-24",
      totalQuestions: 120,
      onlineCount1: 198,
      onlineCount2: "-",
      // 详情数据
      createDate: "2023-12-24",
      answerDateRange: "2023-12-24～2023-12-24",
      questionCount: 20,
      totalScore: 100,
      shouldSubmitCount: 124,
      submittedCount: 50,
      submitRate: "45%",
      avgDuration: 100,
      avgScore: 65.2,
    },
    {
      key: "2",
      examName: "考试名称考试名称考试名...",
      className: "这是一个很长班级名...",
      examType: "通用考试",
      teacher: "何桢",
      examDateRange: "2023-12-24～2023-12-24",
      totalQuestions: 120,
      onlineCount1: 195,
      onlineCount2: 44,
      createDate: "2023-12-24",
      answerDateRange: "2023-12-24～2023-12-24",
      questionCount: 20,
      totalScore: 100,
      shouldSubmitCount: 120,
      submittedCount: 48,
      submitRate: "40%",
      avgDuration: 95,
      avgScore: 68.5,
    },
    {
      key: "3",
      examName: "考试名称考试名称考试名...",
      className: "这是一个很长班级名...",
      examType: "结课测",
      teacher: "吴易奚",
      examDateRange: "2023-12-24～2023-12-24",
      totalQuestions: 120,
      onlineCount1: "-",
      onlineCount2: 192,
      createDate: "2023-12-24",
      answerDateRange: "2023-12-24～2023-12-24",
      questionCount: 20,
      totalScore: 100,
      shouldSubmitCount: 115,
      submittedCount: 52,
      submitRate: "45.2%",
      avgDuration: 88,
      avgScore: 72.3,
    },
    {
      key: "4",
      examName: "考试名称考试名称考试名...",
      className: "这是一个很长班级名...",
      examType: "通用考试",
      teacher: "赵玉凤",
      examDateRange: "2023-12-24～2023-12-24",
      totalQuestions: 120,
      onlineCount1: 110,
      onlineCount2: 100,
      createDate: "2023-12-24",
      answerDateRange: "2023-12-24～2023-12-24",
      questionCount: 20,
      totalScore: 100,
      shouldSubmitCount: 118,
      submittedCount: 55,
      submitRate: "46.6%",
      avgDuration: 102,
      avgScore: 63.8,
    },
    {
      key: "5",
      examName: "考试名称考试名称考试名...",
      className: "这是一个很长班级名...",
      examType: "摸底测",
      teacher: "孙芳",
      examDateRange: "2023-12-24～2023-12-24",
      totalQuestions: 120,
      onlineCount1: "-",
      onlineCount2: 137,
      createDate: "2023-12-24",
      answerDateRange: "2023-12-24～2023-12-24",
      questionCount: 20,
      totalScore: 100,
      shouldSubmitCount: 130,
      submittedCount: 60,
      submitRate: "46.2%",
      avgDuration: 98,
      avgScore: 59.5,
    },
    {
      key: "6",
      examName: "考试名称考试名称考试名...",
      className: "这是一个很长班级名...",
      examType: "阶段测",
      teacher: "赵慧",
      examDateRange: "2023-12-24～2023-12-24",
      totalQuestions: 120,
      onlineCount1: 25,
      onlineCount2: 89,
      createDate: "2023-12-24",
      answerDateRange: "2023-12-24～2023-12-24",
      questionCount: 20,
      totalScore: 100,
      shouldSubmitCount: 110,
      submittedCount: 45,
      submitRate: "40.9%",
      avgDuration: 105,
      avgScore: 70.2,
    },
    {
      key: "7",
      examName: "考试名称考试名称考试名...",
      className: "这是一个很长班级名...",
      examType: "通用考试",
      teacher: "吴诗琪",
      examDateRange: "2023-12-24～2023-12-24",
      totalQuestions: 120,
      onlineCount1: 16,
      onlineCount2: 186,
      createDate: "2023-12-24",
      answerDateRange: "2023-12-24～2023-12-24",
      questionCount: 20,
      totalScore: 100,
      shouldSubmitCount: 125,
      submittedCount: 58,
      submitRate: "46.4%",
      avgDuration: 92,
      avgScore: 66.8,
    },
    {
      key: "8",
      examName: "考试名称考试名称考试名...",
      className: "这是一个很长班级名...",
      examType: "阶段测",
      teacher: "周琎",
      examDateRange: "2023-12-24～2023-12-24",
      totalQuestions: 120,
      onlineCount1: 173,
      onlineCount2: 193,
      createDate: "2023-12-24",
      answerDateRange: "2023-12-24～2023-12-24",
      questionCount: 20,
      totalScore: 100,
      shouldSubmitCount: 128,
      submittedCount: 62,
      submitRate: "48.4%",
      avgDuration: 110,
      avgScore: 71.5,
    },
    {
      key: "9",
      examName: "考试名称考试名称考试名...",
      className: "这是一个很长班级名...",
      examType: "阶段测",
      teacher: "郑雅",
      examDateRange: "2023-12-24～2023-12-24",
      totalQuestions: 120,
      onlineCount1: 102,
      onlineCount2: 165,
      createDate: "2023-12-24",
      answerDateRange: "2023-12-24～2023-12-24",
      questionCount: 20,
      totalScore: 100,
      shouldSubmitCount: 122,
      submittedCount: 54,
      submitRate: "44.3%",
      avgDuration: 97,
      avgScore: 64.7,
    },
    {
      key: "10",
      examName: "考试名称考试名称考试名...",
      className: "这是一个很长班级名...",
      examType: "日常考试",
      teacher: "李炎",
      examDateRange: "2023-12-24～2023-12-24",
      totalQuestions: 120,
      onlineCount1: 80,
      onlineCount2: 75,
      createDate: "2023-12-24",
      answerDateRange: "2023-12-24～2023-12-24",
      questionCount: 20,
      totalScore: 100,
      shouldSubmitCount: 116,
      submittedCount: 49,
      submitRate: "42.2%",
      avgDuration: 103,
      avgScore: 62.3,
    },
    {
      key: "11",
      examName: "考试名称考试名称考试名...",
      className: "这是一个很长班级名...",
      examType: "通用考试",
      teacher: "钱琳",
      examDateRange: "2023-12-24～2023-12-24",
      totalQuestions: 120,
      onlineCount1: "-",
      onlineCount2: "-",
      createDate: "2023-12-24",
      answerDateRange: "2023-12-24～2023-12-24",
      questionCount: 20,
      totalScore: 100,
      shouldSubmitCount: 105,
      submittedCount: 42,
      submitRate: "40.0%",
      avgDuration: 85,
      avgScore: 58.9,
    },
    {
      key: "12",
      examName: "考试名称考试名称考试名...",
      className: "这是一个很长班级名...",
      examType: "阶段测",
      teacher: "李炯泽",
      examDateRange: "2023-12-24～2023-12-24",
      totalQuestions: 120,
      onlineCount1: 32,
      onlineCount2: "-",
      createDate: "2023-12-24",
      answerDateRange: "2023-12-24～2023-12-24",
      questionCount: 20,
      totalScore: 100,
      shouldSubmitCount: 132,
      submittedCount: 65,
      submitRate: "49.2%",
      avgDuration: 108,
      avgScore: 69.8,
    },
    {
      key: "13",
      examName: "考试名称考试名称考试名...",
      className: "这是一个很长班级名...",
      examType: "结课测",
      teacher: "钱乐惜",
      examDateRange: "2023-12-24～2023-12-24",
      totalQuestions: 120,
      onlineCount1: 10,
      onlineCount2: 112,
      createDate: "2023-12-24",
      answerDateRange: "2023-12-24～2023-12-24",
      questionCount: 20,
      totalScore: 100,
      shouldSubmitCount: 119,
      submittedCount: 51,
      submitRate: "42.9%",
      avgDuration: 94,
      avgScore: 67.2,
    },
    {
      key: "14",
      examName: "考试名称考试名称考试名...",
      className: "这是一个很长班级名...",
      examType: "通用考试",
      teacher: "冯梅",
      examDateRange: "2023-12-24～2023-12-24",
      totalQuestions: 120,
      onlineCount1: 104,
      onlineCount2: 195,
      createDate: "2023-12-24",
      answerDateRange: "2023-12-24～2023-12-24",
      questionCount: 20,
      totalScore: 100,
      shouldSubmitCount: 127,
      submittedCount: 59,
      submitRate: "46.5%",
      avgDuration: 101,
      avgScore: 68.3,
    },
    {
      key: "15",
      examName: "考试名称考试名称考试名...",
      className: "这是一个很长班级名...",
      examType: "日常考试",
      teacher: "郑思雅",
      examDateRange: "2023-12-24～2023-12-24",
      totalQuestions: 120,
      onlineCount1: 19,
      onlineCount2: 52,
      createDate: "2023-12-24",
      answerDateRange: "2023-12-24～2023-12-24",
      questionCount: 20,
      totalScore: 100,
      shouldSubmitCount: 112,
      submittedCount: 47,
      submitRate: "42.0%",
      avgDuration: 96,
      avgScore: 61.5,
    },
  ];
};

// ==================== 主组件 ====================

const ExamList: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<ExamRecord[]>([]);
  const [pagination, setPagination] = useState<PaginationConfig>({
    current: 1,
    pageSize: 100,
    total: 0,
  });

  // ==================== 详情面板状态 ====================
  const [detailOpen, setDetailOpen] = useState<boolean>(false);
  const [currentExam, setCurrentExam] = useState<ExamRecord | null>(null);

  // ==================== 表格列定义 ====================

  const columns: ColumnsType<ExamRecord> = [
    {
      title: "考试名称",
      dataIndex: "examName",
      key: "examName",
      width: 150,
      ellipsis: true,
    },
    {
      title: "班级名称",
      dataIndex: "className",
      key: "className",
      width: 150,
      ellipsis: true,
    },
    {
      title: "考试类型",
      dataIndex: "examType",
      key: "examType",
      width: 100,
    },
    {
      title: "带班老师",
      dataIndex: "teacher",
      key: "teacher",
      width: 100,
    },
    {
      title: "考试作答日期",
      dataIndex: "examDateRange",
      key: "examDateRange",
      width: 180,
    },
    {
      title: "考试题数",
      dataIndex: "totalQuestions",
      key: "totalQuestions",
      width: 80,
      align: "center",
    },
    {
      title: "考试在...",
      dataIndex: "onlineCount1",
      key: "onlineCount1",
      width: 80,
      align: "center",
    },
    {
      title: "考试在...",
      dataIndex: "onlineCount2",
      key: "onlineCount2",
      width: 80,
      align: "center",
    },
{
  title: "操作",
  key: "action",
  width: 80,
  fixed: "right",
  render: (_, record) => (
    <a
      style={{ color: "#2266FF" }}
      onClick={() => handleViewDetail(record)}
    >
      详情
    </a>
  ),
},
  ];

  // ==================== 事件处理 ====================

  /**
   * 加载考试列表数据
   */
  const loadData = async (searchParams?: SearchFormValues) => {
    setLoading(true);
    try {
      const params = {
        className: searchParams?.className,
        examType: searchParams?.examType,
        chapter: searchParams?.chapter,
        startDate: searchParams?.dateRange?.[0]?.format("YYYY-MM-DD"),
        endDate: searchParams?.dateRange?.[1]?.format("YYYY-MM-DD"),
        page: pagination.current,
        pageSize: pagination.pageSize,
      };

      const response = await fetchExamList(params);

      setDataSource(response.data);
      setPagination({
        ...pagination,
        total: response.total,
      });
    } catch (error) {
      console.error("加载考试列表失败:", error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * 查询按钮点击
   */
  const handleSearch = () => {
    const values = form.getFieldsValue();
    setPagination({ ...pagination, current: 1 });
    loadData(values);
  };

  /**
   * 重置按钮点击
   */
  const handleReset = () => {
    form.resetFields();
    form.setFieldsValue({
      className: "这是默认的班级名称不支持清空",
    });
    setPagination({ ...pagination, current: 1 });
    loadData();
  };

  /**
   * 分页、排序、筛选变化时触发
   */
  const handleTableChange = (newPagination: any) => {
    setPagination({
      current: newPagination.current,
      pageSize: newPagination.pageSize,
      total: pagination.total,
    });
    const values = form.getFieldsValue();
    loadData(values);
  };

  /**
   * 查看详情 - 打开详情面板
   */
  const handleViewDetail = (record: ExamRecord) => {
    setCurrentExam(record);
    setDetailOpen(true);
  };

  /**
   * 关闭详情面板
   */
  const handleCloseDetail = () => {
    setDetailOpen(false);
    // 延迟清空数据，等待关闭动画完成
    setTimeout(() => {
      setCurrentExam(null);
    }, 300);
  };

  // ==================== 生命周期 ====================

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ==================== 渲染 ====================

  return (
    <>
      <div style={{ padding: "16px", background: "#fff" }}>
        {/* 筛选表单区域 */}
        <Form
          form={form}
          layout="inline"
          style={{ marginBottom: 16 }}
          initialValues={{
            className: "这是默认的班级名称不支持清空",
          }}
        >
          <Form.Item name="className" style={{ width: 240 }}>
            <Input placeholder="请输入班级名称" disabled />
          </Form.Item>

          <Form.Item name="examType" style={{ width: 160 }}>
            <Select placeholder="考试类型" allowClear>
              <Option value="日常考试">日常考试</Option>
              <Option value="通用考试">通用考试</Option>
              <Option value="结课测">结课测</Option>
              <Option value="摸底测">摸底测</Option>
              <Option value="阶段测">阶段测</Option>
            </Select>
          </Form.Item>

          <Form.Item name="chapter" style={{ width: 160 }}>
            <Select placeholder="章节" allowClear>
              <Option value="章三02">章三02</Option>
              <Option value="章三03">章三03</Option>
              <Option value="章三04">章三04</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Space>
              <Button onClick={handleReset}>重 置</Button>
              <Button type="primary" onClick={handleSearch}>
                查 询
              </Button>
            </Space>
          </Form.Item>
        </Form>

        {/* 表格区域 */}
        <Table
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          pagination={{
            ...pagination,
            showSizeChanger: true,
            showQuickJumper: false,
            showTotal: (total) => `共 ${total} 条数据`,
            pageSizeOptions: ["10", "20", "50", "100"],
          }}
          onChange={handleTableChange}
          scroll={{ x: 1200 }}
          size="small"
        />
      </div>

      {/* 详情面板 */}
      <ExamDetailPanel
        open={detailOpen}
        exam={currentExam}
        onClose={handleCloseDetail}
      />
    </>
  );
};

export default ExamList;