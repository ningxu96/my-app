"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  Input,
  Select,
  Button,
  Space,
  Badge,
  Checkbox,
  DatePicker,
  Dropdown,
  message,
} from "antd";
import {
  SearchOutlined,
  DownOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { MenuProps } from "antd";

const { RangePicker } = DatePicker;

// ==================== 类型定义 ====================

interface StudentAnswerRecord {
  key: string;
  studentName: string;
  phone: string;
  status: "submitted" | "not_submitted";
  score: number | null;
  answerCount: number;
  duration: string | null;
  submitTime: string | null;
}

interface StudentAnswersTabProps {
  examId?: string;
}

// ==================== Mock 数据 ====================

const generateMockData = (): StudentAnswerRecord[] => {
  return [
    {
      key: "1",
      studentName: "陈怡平",
      phone: "*2507",
      status: "submitted",
      score: 173,
      answerCount: 12,
      duration: "120min",
      submitTime: "2024-04-07 12:00",
    },
    {
      key: "2",
      studentName: "胡德平",
      phone: "*2507",
      status: "not_submitted",
      score: null,
      answerCount: 10,
      duration: null,
      submitTime: null,
    },
    {
      key: "3",
      studentName: "赵中锴",
      phone: "*2507",
      status: "submitted",
      score: 99,
      answerCount: 14,
      duration: "120min",
      submitTime: "2024-04-07 12:00",
    },
    {
      key: "4",
      studentName: "孙国奇",
      phone: "*2507",
      status: "submitted",
      score: 124,
      answerCount: 18,
      duration: "120min",
      submitTime: "2024-04-07 12:00",
    },
    {
      key: "5",
      studentName: "李亚倩",
      phone: "*2507",
      status: "not_submitted",
      score: null,
      answerCount: 1,
      duration: null,
      submitTime: null,
    },
  ];
};

// ==================== 主组件 ====================

const StudentAnswersTab: React.FC<StudentAnswersTabProps> = ({ examId }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<StudentAnswerRecord[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const loadData = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const mockData = generateMockData();
      setDataSource(mockData);
      setPagination({ ...pagination, total: 15 });
    } catch (error) {
      console.error("加载失败:", error);
      message.error("加载数据失败");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleReset = () => {
    message.info("重置筛选条件");
  };

  const handleSearch = () => {
    message.info("执行查询");
  };

  const handleClearSelection = () => {
    setSelectedRowKeys([]);
  };

  const handleAction = (action: string, record: StudentAnswerRecord) => {
    message.info(`${action}: ${record.studentName}`);
  };

  const weChatMenu: MenuProps["items"] = [
    { key: "qunfa", label: "企微群发" },
    { key: "danfa", label: "企微单发" },
  ];

  const sendWeChatMenu: MenuProps["items"] = [
    { key: "report", label: "发报告" },
    { key: "message", label: "发消息" },
  ];

  const columns: ColumnsType<StudentAnswerRecord> = [
    {
      title: (
        <Checkbox
          checked={selectedRowKeys.length === dataSource.length && dataSource.length > 0}
          indeterminate={selectedRowKeys.length > 0 && selectedRowKeys.length < dataSource.length}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedRowKeys(dataSource.map((item) => item.key));
            } else {
              setSelectedRowKeys([]);
            }
          }}
        />
      ),
      dataIndex: "selection",
      key: "selection",
      width: 40,
      fixed: "left",
      render: (_: any, record: StudentAnswerRecord) => (
        <Checkbox
          checked={selectedRowKeys.includes(record.key)}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedRowKeys([...selectedRowKeys, record.key]);
            } else {
              setSelectedRowKeys(selectedRowKeys.filter((key) => key !== record.key));
            }
          }}
        />
      ),
    },
    {
      title: "姓名",
      dataIndex: "studentName",
      key: "studentName",
      width: 90,
      fixed: "left",
      render: (name: string) => <span style={{ color: "#2266FF" }}>{name}</span>,
    },
    {
      title: "手机号",
      dataIndex: "phone",
      key: "phone",
      width: 100,
      render: (phone: string) => (
        <Space size={4}>
          <span>{phone}</span>
          <CopyOutlined
            style={{ color: "#999", fontSize: 12, cursor: "pointer" }}
            onClick={() => message.success("已复制")}
          />
        </Space>
      ),
    },
    {
      title: "考试状态",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (status: StudentAnswerRecord["status"]) => {
        const config = {
          submitted: { text: "已提交", badgeStatus: "success" as const },
          not_submitted: { text: "未提交", badgeStatus: "error" as const },
        };
        const { text, badgeStatus } = config[status];
        return (
          <Space size={4}>
            <Badge status={badgeStatus} />
            <span style={{ fontSize: 12 }}>{text}</span>
          </Space>
        );
      },
    },
    {
      title: (
        <Space size={4}>
          <span>考试分数</span>
          <DownOutlined style={{ fontSize: 10 }} />
        </Space>
      ),
      dataIndex: "score",
      key: "score",
      width: 90,
      align: "center",
      render: (score: number | null) => <span style={{ fontSize: 12 }}>{score !== null ? score : "-"}</span>,
      sorter: (a, b) => (a.score || 0) - (b.score || 0),
    },
    {
      title: "答题数",
      dataIndex: "answerCount",
      key: "answerCount",
      width: 80,
      align: "center",
      render: (count: number) => <span style={{ fontSize: 12 }}>{count}</span>,
    },
    {
      title: "答题时长",
      dataIndex: "duration",
      key: "duration",
      width: 100,
      align: "center",
      render: (duration: string | null) => <span style={{ fontSize: 12 }}>{duration || "-"}</span>,
    },
    {
      title: (
        <Space size={4}>
          <span>提交时间</span>
          <DownOutlined style={{ fontSize: 10 }} />
        </Space>
      ),
      dataIndex: "submitTime",
      key: "submitTime",
      width: 150,
      align: "center",
      render: (time: string | null) => <span style={{ fontSize: 12 }}>{time || "-"}</span>,
    },
    {
      title: "操作",
      key: "action",
      width: 160,
      fixed: "right",
      align: "center",
      render: (_: any, record: StudentAnswerRecord) => (
        <Space size={12} style={{ fontSize: 12 }}>
          <a style={{ color: "#2266FF" }} onClick={() => handleAction("详情", record)}>
            详情
          </a>
          <a style={{ color: "#2266FF" }} onClick={() => handleAction("报告", record)}>
            报告
          </a>
          <a style={{ color: "#2266FF" }} onClick={() => handleAction("微信", record)}>
            微信
          </a>
          <a style={{ color: "#2266FF" }} onClick={() => handleAction("电话", record)}>
            电话
          </a>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "16px 0" }}>
      <Space size={8} style={{ marginBottom: 16 }} wrap>
        <Input placeholder="搜索学员姓名/ID/手机号" style={{ width: 240, fontSize: 12 }} size="middle" />
        <Select
          placeholder="考试状态"
          style={{ width: 160, fontSize: 12 }}
          size="middle"
          suffixIcon={<DownOutlined style={{ fontSize: 10 }} />}
        >
          <Select.Option value="submitted">已提交</Select.Option>
          <Select.Option value="not_submitted">未提交</Select.Option>
        </Select>
        <Select
          placeholder="考试分数"
          style={{ width: 160, fontSize: 12 }}
          size="middle"
          suffixIcon={<DownOutlined style={{ fontSize: 10 }} />}
        >
          <Select.Option value="0-60">0-60分</Select.Option>
          <Select.Option value="60-80">60-80分</Select.Option>
          <Select.Option value="80-100">80-100分</Select.Option>
        </Select>
        <RangePicker placeholder={["提交时间", "提交时间"]} style={{ width: 216, fontSize: 12 }} size="middle" />
        <Button size="middle" onClick={handleReset}>
          重 置
        </Button>
        <Button type="primary" size="middle" onClick={handleSearch}>
          查 询
        </Button>
      </Space>

      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        pagination={false}
        scroll={{ x: 1200 }}
        size="small"
        bordered
        style={{ marginBottom: 16 }}
      />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Space size={8}>
          <span style={{ fontSize: 12, color: "rgba(0,0,0,0.65)" }}>
            已选 <span style={{ color: "#2266FF" }}>{selectedRowKeys.length}</span> 项
          </span>
          <a style={{ fontSize: 12, color: "#2266FF" }} onClick={handleClearSelection}>
            清空
          </a>
          <Dropdown menu={{ items: weChatMenu }} trigger={["click"]}>
            <Button size="middle">
              企微群发 <DownOutlined style={{ fontSize: 10 }} />
            </Button>
          </Dropdown>
          <Dropdown menu={{ items: sendWeChatMenu }} trigger={["click"]}>
            <Button size="middle">
              发微信 <DownOutlined style={{ fontSize: 10 }} />
            </Button>
          </Dropdown>
          <Button size="middle">发考试</Button>
        </Space>

        <Space size={12}>
          <span style={{ fontSize: 12, color: "rgba(0,0,0,0.65)" }}>共 {pagination.total} 条数据</span>
          <Space size={4}>
            <Button size="small" disabled={pagination.current === 1}>
              {"<"}
            </Button>
            <Button size="small" type="primary" style={{ minWidth: 28 }}>
              {pagination.current}
            </Button>
            <Button
              size="small"
              disabled={pagination.current === Math.ceil((pagination.total || 0) / (pagination.pageSize || 10))}
            >
              {">"}
            </Button>
          </Space>
        </Space>
      </div>
    </div>
  );
};

export default StudentAnswersTab;