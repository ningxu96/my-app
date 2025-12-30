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
  Modal,
  Radio,
  message,
} from "antd";
import {
  SearchOutlined,
  DownOutlined,
  CopyOutlined,
  CloseOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { MenuProps, CheckboxProps } from "antd";
import StudentAnswerDetailPanel from "./StudentAnswerDetailPanel";

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

// ==================== Mock 数据生成 ====================

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
    {
      key: "6",
      studentName: "郑贵雅",
      phone: "*2507",
      status: "not_submitted",
      score: null,
      answerCount: 5,
      duration: null,
      submitTime: null,
    },
    {
      key: "7",
      studentName: "戴怡瑶",
      phone: "*2507",
      status: "submitted",
      score: 0,
      answerCount: 3,
      duration: "120min",
      submitTime: "2024-04-07 12:00",
    },
    {
      key: "8",
      studentName: "王怡秋",
      phone: "*2507",
      status: "submitted",
      score: 12,
      answerCount: 10,
      duration: "120min",
      submitTime: "2024-04-07 12:00",
    },
    {
      key: "9",
      studentName: "王怡秋",
      phone: "*2507",
      status: "submitted",
      score: 12,
      answerCount: 10,
      duration: "120min",
      submitTime: "2024-04-07 12:00",
    },
    {
      key: "10",
      studentName: "王怡秋",
      phone: "*2507",
      status: "submitted",
      score: 12,
      answerCount: 10,
      duration: "120min",
      submitTime: "2024-04-07 12:00",
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

  // 筛选条件状态
  const [searchText, setSearchText] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
  const [scoreFilter, setScoreFilter] = useState<string | undefined>(undefined);
  const [dateRange, setDateRange] = useState<[any, any] | null>(null);

  // 详情面板状态
  const [detailOpen, setDetailOpen] = useState<boolean>(false);
  const [currentRecord, setCurrentRecord] =
    useState<StudentAnswerRecord | null>(null);

  // 发考试对话框状态
  const [publishModalOpen, setPublishModalOpen] = useState<boolean>(false);
  const [examType, setExamType] = useState<string>("");
  const [selectedExam, setSelectedExam] = useState<string>("");
  const [logoType, setLogoType] = useState<string>("tutu");

  // 筛选数据
  const filterData = (data: StudentAnswerRecord[]): StudentAnswerRecord[] => {
    let filtered = [...data];

    // 按姓名/ID/手机号搜索（模糊匹配）
    if (searchText) {
      const search = searchText.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.studentName.toLowerCase().includes(search) ||
          item.key.includes(search) ||
          item.phone.includes(search)
      );
    }

    // 按考试状态筛选
    if (statusFilter && statusFilter !== "all") {
      filtered = filtered.filter((item) => item.status === statusFilter);
    }

    // 按考试分数筛选
    if (scoreFilter && scoreFilter !== "all") {
      filtered = filtered.filter((item) => {
        if (item.score === null) return false;
        
        switch (scoreFilter) {
          case "high":
            return item.score >= 90;
          case "medium":
            return item.score >= 60 && item.score < 90;
          case "low":
            return item.score < 60;
          default:
            return true;
        }
      });
    }

    // 按提交时间筛选
    if (dateRange && dateRange[0] && dateRange[1]) {
      const startDate = dateRange[0].format("YYYY-MM-DD");
      const endDate = dateRange[1].format("YYYY-MM-DD");
      
      filtered = filtered.filter((item) => {
        if (!item.submitTime) return false;
        const itemDate = item.submitTime.split(" ")[0];
        return itemDate >= startDate && itemDate <= endDate;
      });
    }

    return filtered;
  };

  const loadData = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const mockData = generateMockData();
      
      // 应用筛选
      const filtered = filterData(mockData);
      
      // 分页处理
      const start = ((pagination.current || 1) - 1) * (pagination.pageSize || 10);
      const end = start + (pagination.pageSize || 10);
      const paginatedData = filtered.slice(start, end);
      
      setDataSource(paginatedData);
      setPagination({
        ...pagination,
        total: filtered.length,
      });
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
  }, [examId]);

  // 查询按钮点击
  const handleSearch = () => {
    setPagination({ ...pagination, current: 1 });
    loadData();
  };

  // 重置按钮点击
  const handleReset = () => {
    setSearchText("");
    setStatusFilter(undefined);
    setScoreFilter(undefined);
    setDateRange(null);
    setPagination({ ...pagination, current: 1 });
    // 延迟调用 loadData，等待状态更新
    setTimeout(() => {
      loadData();
    }, 0);
  };

  // 监听筛选条件变化（可选：自动查询）
  useEffect(() => {
    // 如果需要自动查询，取消注释下面这行
    // loadData();
  }, [searchText, statusFilter, scoreFilter, dateRange]);

  // 查看详情
  const handleViewDetail = (record: StudentAnswerRecord) => {
    setCurrentRecord(record);
    setDetailOpen(true);
  };

  // 关闭详情面板
  const handleDetailClose = () => {
    setDetailOpen(false);
    setCurrentRecord(null);
  };

  // 企微群发菜单
  const wechatWorkMenuItems: MenuProps["items"] = [
    {
      key: "group",
      label: "企微群发",
    },
    {
      key: "individual",
      label: "单独发送",
    },
  ];

  // 发微信菜单
  const wechatMenuItems: MenuProps["items"] = [
    {
      key: "assistant",
      label: "微信助手",
    },
    {
      key: "template",
      label: "模板消息",
    },
  ];

  const handleWechatWorkClick: MenuProps["onClick"] = ({ key }) => {
    if (selectedRowKeys.length === 0) {
      message.warning("请先选择学员");
      return;
    }
    message.info(`企微群发: ${key}`);
  };

  const handleWechatClick: MenuProps["onClick"] = ({ key }) => {
    if (selectedRowKeys.length === 0) {
      message.warning("请先选择学员");
      return;
    }
    message.info(`发微信: ${key}`);
  };

  // 打开发考试对话框
  const handlePublishExam = () => {
    if (selectedRowKeys.length === 0) {
      message.warning("请先选择学员");
      return;
    }
    setPublishModalOpen(true);
  };

  // 提交发考试
  const handlePublishSubmit = (type: "wechat" | "enterprise_wechat") => {
    if (!examType) {
      message.warning("请选择考试类型");
      return;
    }
    if (!selectedExam) {
      message.warning("请选择考试");
      return;
    }

    const typeName = type === "wechat" ? "微信助手" : "企微";
    message.success(
      `已通过${typeName}发送考试给 ${selectedRowKeys.length} 位学员`
    );
    setPublishModalOpen(false);
  };

  // 取消对话框
  const handlePublishCancel = () => {
    setPublishModalOpen(false);
    setExamType("");
    setSelectedExam("");
    setLogoType("tutu");
  };

  // 全选复选框变化
  const handleSelectAll: CheckboxProps["onChange"] = (e) => {
    if (e.target.checked) {
      setSelectedRowKeys(dataSource.map((item) => item.key));
    } else {
      setSelectedRowKeys([]);
    }
  };

  // 表格列定义
  const columns: ColumnsType<StudentAnswerRecord> = [
    {
      title: () => (
        <Checkbox
          checked={
            selectedRowKeys.length > 0 &&
            selectedRowKeys.length === dataSource.length
          }
          indeterminate={
            selectedRowKeys.length > 0 &&
            selectedRowKeys.length < dataSource.length
          }
          onChange={handleSelectAll}
        />
      ),
      dataIndex: "checkbox",
      key: "checkbox",
      width: 50,
      render: (_: any, record: StudentAnswerRecord) => {
        const checked = selectedRowKeys.includes(record.key);
        return (
          <Checkbox
            checked={checked}
            onChange={(e) => {
              const newSelectedKeys = e.target.checked
                ? [...selectedRowKeys, record.key]
                : selectedRowKeys.filter((key) => key !== record.key);
              setSelectedRowKeys(newSelectedKeys);
            }}
          />
        );
      },
    },
    {
      title: "姓名",
      dataIndex: "studentName",
      key: "studentName",
      width: 100,
      render: (name: string) => (
        <span style={{ fontSize: 12, color: "#2266FF" }}>{name}</span>
      ),
    },
    {
      title: "手机号",
      dataIndex: "phone",
      key: "phone",
      width: 120,
      render: (phone: string) => (
        <Space size={4}>
          <span style={{ fontSize: 12, color: "rgba(0,0,0,0.85)" }}>
            {phone}
          </span>
          <CopyOutlined
            style={{ fontSize: 12, color: "#2266FF", cursor: "pointer" }}
            onClick={() => message.success("已复制")}
          />
        </Space>
      ),
    },
    {
      title: "考试状态",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status: StudentAnswerRecord["status"]) => {
        if (status === "submitted") {
          return (
            <Badge
              status="success"
              text={<span style={{ fontSize: 12 }}>已提交</span>}
            />
          );
        }
        return (
          <Badge
            status="error"
            text={<span style={{ fontSize: 12 }}>未提交</span>}
          />
        );
      },
    },
    {
      title: () => (
        <Space size={4}>
          <span style={{ fontSize: 12 }}>考试分数</span>
          <DownOutlined style={{ fontSize: 10, color: "#999" }} />
        </Space>
      ),
      dataIndex: "score",
      key: "score",
      width: 100,
      align: "center" as const,
      render: (score: number | null) => (
        <span style={{ fontSize: 12, color: "#333" }}>
          {score !== null ? score : "-"}
        </span>
      ),
    },
    {
      title: "答题数",
      dataIndex: "answerCount",
      key: "answerCount",
      width: 90,
      align: "center" as const,
      render: (count: number) => (
        <span style={{ fontSize: 12, color: "#333" }}>{count}</span>
      ),
    },
    {
      title: "答题时长",
      dataIndex: "duration",
      key: "duration",
      width: 110,
      align: "center" as const,
      render: (duration: string | null) => (
        <span style={{ fontSize: 12, color: "#333" }}>{duration || "-"}</span>
      ),
    },
    {
      title: () => (
        <Space size={4}>
          <span style={{ fontSize: 12 }}>提交时间</span>
          <DownOutlined style={{ fontSize: 10, color: "#999" }} />
        </Space>
      ),
      dataIndex: "submitTime",
      key: "submitTime",
      width: 160,
      align: "center" as const,
      render: (time: string | null) => (
        <span style={{ fontSize: 12, color: "#333" }}>{time || "-"}</span>
      ),
    },
    {
      title: "操作",
      key: "action",
      width: 160,
      render: (_: any, record: StudentAnswerRecord) => (
        <Space size={12} style={{ fontSize: 12 }}>
          <a
            style={{ color: "#2266FF" }}
            onClick={() => handleViewDetail(record)}
          >
            详情
          </a>
          <a style={{ color: "#2266FF" }}>微信</a>
          <a style={{ color: "#2266FF" }}>电话</a>
          <a style={{ color: "#2266FF" }}>报告</a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div style={{ padding: "16px 0" }}>
        {/* 筛选条件 */}
        <div
          style={{
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Input
            placeholder="搜索学员姓名/ID/手机号"
            style={{ width: 240, fontSize: 12 }}
            size="middle"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onPressEnter={handleSearch}
            allowClear
          />
          <Select
            placeholder="考试状态"
            style={{ width: 160, fontSize: 12 }}
            size="middle"
            value={statusFilter}
            onChange={setStatusFilter}
            allowClear
            options={[
              { value: "all", label: "全部" },
              { value: "submitted", label: "已提交" },
              { value: "not_submitted", label: "未提交" },
            ]}
          />
          <Select
            placeholder="考试分数"
            style={{ width: 160, fontSize: 12 }}
            size="middle"
            value={scoreFilter}
            onChange={setScoreFilter}
            allowClear
            options={[
              { value: "all", label: "全部" },
              { value: "high", label: "90分以上" },
              { value: "medium", label: "60-90分" },
              { value: "low", label: "60分以下" },
            ]}
          />
          <RangePicker
            placeholder={["提交时间", "提交时间"]}
            style={{ width: 216, fontSize: 12 }}
            size="middle"
            value={dateRange}
            onChange={setDateRange}
          />
          <Button size="middle" onClick={handleReset}>
            重 置
          </Button>
          <Button type="primary" size="middle" onClick={handleSearch}>
            查 询
          </Button>
        </div>

        {/* 数据表格 */}
        <Table
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          pagination={false}
          scroll={{ x: 1200 }}
          size="small"
          bordered
        />

        {/* 底部操作栏 */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 16,
          }}
        >
          {/* 左侧：已选和操作按钮 */}
          <Space size={8}>
            <span style={{ fontSize: 12, color: "rgba(0,0,0,0.65)" }}>
              已选 <span style={{ color: "#2266FF" }}>{selectedRowKeys.length}</span> 项
            </span>
            <a
              style={{ fontSize: 12, color: "#2266FF" }}
              onClick={() => setSelectedRowKeys([])}
            >
              清空
            </a>
            <Dropdown
              menu={{ items: wechatWorkMenuItems, onClick: handleWechatWorkClick }}
            >
              <Button size="middle">
                企微群发 <DownOutlined />
              </Button>
            </Dropdown>
            <Dropdown
              menu={{ items: wechatMenuItems, onClick: handleWechatClick }}
            >
              <Button size="middle">
                发微信 <DownOutlined />
              </Button>
            </Dropdown>
            <Button size="middle" onClick={handlePublishExam}>
              发考试
            </Button>
          </Space>

          {/* 右侧：分页 */}
          <Space size={12}>
            <span style={{ fontSize: 12, color: "rgba(0,0,0,0.65)" }}>
              共 {pagination.total} 条数据
            </span>
            <Space size={4}>
              <Button
                size="small"
                disabled={pagination.current === 1}
                onClick={() => {
                  const newPage = (pagination.current || 1) - 1;
                  setPagination({ ...pagination, current: newPage });
                  setTimeout(() => loadData(), 0);
                }}
              >
                {"<"}
              </Button>
              <Button size="small" type="primary" style={{ minWidth: 28 }}>
                {pagination.current}
              </Button>
              <Button
                size="small"
                disabled={
                  pagination.current ===
                  Math.ceil((pagination.total || 0) / (pagination.pageSize || 10))
                }
                onClick={() => {
                  const newPage = (pagination.current || 1) + 1;
                  setPagination({ ...pagination, current: newPage });
                  setTimeout(() => loadData(), 0);
                }}
              >
                {">"}
              </Button>
            </Space>
          </Space>
        </div>
      </div>

      {/* 学员详情面板 */}
      <StudentAnswerDetailPanel
        open={detailOpen}
        onClose={handleDetailClose}
        record={currentRecord}
      />

      {/* 发考试对话框 */}
      <Modal
        title="发考试"
        open={publishModalOpen}
        onCancel={handlePublishCancel}
        footer={null}
        width={480}
        centered
        closeIcon={<CloseOutlined style={{ fontSize: 14 }} />}
        styles={{
          header: {
            padding: "14px 24px",
            borderBottom: "1px solid #ebebeb",
          },
          body: {
            padding: "24px",
          },
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* 已选择学员 */}
          <div style={{ display: "flex", alignItems: "center", fontSize: 12 }}>
            <span
              style={{
                width: 76,
                textAlign: "right",
                marginRight: 16,
                color: "rgba(0,0,0,0.85)",
              }}
            >
              已选择学员
            </span>
            <span style={{ color: "rgba(0,0,0,0.85)" }}>
              {selectedRowKeys.length} 人
            </span>
          </div>

          {/* 考试类型 */}
          <div style={{ display: "flex", alignItems: "center", fontSize: 12 }}>
            <span
              style={{
                width: 76,
                textAlign: "right",
                marginRight: 16,
                color: "rgba(0,0,0,0.85)",
              }}
            >
              <span style={{ color: "#ff4d4d", marginRight: 4 }}>*</span>
              考试类型
            </span>
            <Select
              placeholder="通用测评"
              value={examType}
              onChange={setExamType}
              style={{ width: 240, fontSize: 12 }}
              size="middle"
              options={[
                { value: "general", label: "通用测评" },
                { value: "special", label: "专项测评" },
                { value: "mock", label: "模拟考试" },
              ]}
            />
          </div>

          {/* 选择考试 */}
          <div style={{ display: "flex", alignItems: "center", fontSize: 12 }}>
            <span
              style={{
                width: 76,
                textAlign: "right",
                marginRight: 16,
                color: "rgba(0,0,0,0.85)",
              }}
            >
              <span style={{ color: "#ff4d4d", marginRight: 4 }}>*</span>
              选择考试
            </span>
            <Select
              placeholder="这是一条考试名称"
              value={selectedExam}
              onChange={setSelectedExam}
              style={{ width: 240, fontSize: 12 }}
              size="middle"
              options={[
                { value: "exam1", label: "这是一条考试名称" },
                { value: "exam2", label: "期中考试测评" },
                { value: "exam3", label: "期末综合测试" },
              ]}
            />
          </div>

          {/* 选择logo */}
          <div style={{ display: "flex", alignItems: "center", fontSize: 12 }}>
            <span
              style={{
                width: 76,
                textAlign: "right",
                marginRight: 16,
                color: "rgba(0,0,0,0.85)",
              }}
            >
              选择logo
            </span>
            <Radio.Group
              value={logoType}
              onChange={(e) => setLogoType(e.target.value)}
            >
              <Space size={16}>
                <Radio value="tutu" style={{ fontSize: 12 }}>
                  途途
                </Radio>
                <Radio value="tutu_class" style={{ fontSize: 12 }}>
                  途途课堂
                </Radio>
                <Radio value="gaotu" style={{ fontSize: 12 }}>
                  高途高中规划
                </Radio>
              </Space>
            </Radio.Group>
          </div>

          {/* 考试信息预览 */}
          {selectedExam && (
            <div
              style={{
                marginLeft: 92,
                background: "#f9f9f9",
                border: "1px solid #f5f5f5",
                borderRadius: 4,
                padding: 12,
                minHeight: 92,
              }}
            >
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "rgba(0,0,0,0.85)",
                  marginBottom: 8,
                  lineHeight: "20px",
                }}
              >
                这是一条考试名称这是一条考试名称这是一条考试名称这是一条考试名称
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "rgba(0,0,0,0.45)",
                  lineHeight: "20px",
                }}
              >
                2020-12-31 12:59 ～ 2021-12-31 12:59
              </div>
            </div>
          )}
        </div>

        {/* 对话框底部按钮 */}
        <div
          style={{
            marginTop: 24,
            paddingTop: 12,
            borderTop: "1px solid #ebebeb",
            display: "flex",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <Button size="middle" onClick={handlePublishCancel}>
            取 消
          </Button>
          <Button
            type="primary"
            size="middle"
            icon={<DownloadOutlined />}
            onClick={() => handlePublishSubmit("wechat")}
          >
            微信助手发送
          </Button>
          <Button
            type="primary"
            size="middle"
            icon={<DownloadOutlined />}
            onClick={() => handlePublishSubmit("enterprise_wechat")}
          >
            企微发送
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default StudentAnswersTab;