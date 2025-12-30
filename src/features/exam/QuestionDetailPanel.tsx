"use client";

import React, { useState, useEffect } from "react";
import { Drawer, Table, Input, Select, Button, Space, Tag, Rate } from "antd";
import { CloseOutlined, CheckOutlined, CloseCircleOutlined, StarFilled } from "@ant-design/icons";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";

// ==================== 类型定义 ====================

/**
 * 题目分析记录（与QuestionAnalysisTab中的类型保持一致）
 */
export interface QuestionAnalysisRecord {
  key: string;
  questionNumber: string;
  knowledgePoints: string;
  answerCount: number | null;
  correctCount: number | null;
  accuracyRate: string;
  totalScore: number;
  avgScore: number | string;
  level?: number;
  parentKey?: string;
  hasChildren?: boolean;
  children?: QuestionAnalysisRecord[];
}

/**
 * 学员答题记录
 */
interface StudentAnswerRecord {
  key: string;
  studentName: string;
  answerResult: "correct" | "wrong" | "no_answer";
  score: number | string;
  wrongAnswer?: string;
}

/**
 * 组件 Props
 */
export interface QuestionDetailPanelProps {
  open: boolean;
  onClose: () => void;
  record: QuestionAnalysisRecord | null;
}

// ==================== Mock 数据生成 ====================

const generateMockStudents = (): StudentAnswerRecord[] => {
  return [
    {
      key: "1",
      studentName: "李建刚",
      answerResult: "correct",
      score: "12 分",
    },
    {
      key: "2",
      studentName: "孙楚一",
      answerResult: "correct",
      score: "12 分",
    },
    {
      key: "3",
      studentName: "周源源",
      answerResult: "correct",
      score: "12 分",
    },
    {
      key: "4",
      studentName: "李娉",
      answerResult: "correct",
      score: "12 分",
    },
    {
      key: "5",
      studentName: "郑砚鹳",
      answerResult: "correct",
      score: "12 分",
    },
    {
      key: "6",
      studentName: "赵宵蕙",
      answerResult: "wrong",
      score: "-",
      wrongAnswer: "A",
    },
    {
      key: "7",
      studentName: "冯爱勇",
      answerResult: "wrong",
      score: "-",
      wrongAnswer: "B",
    },
    {
      key: "8",
      studentName: "郑彬",
      answerResult: "correct",
      score: "12 分",
    },
    {
      key: "9",
      studentName: "郑宇涵",
      answerResult: "wrong",
      score: "0 分",
      wrongAnswer: "A",
    },
    {
      key: "10",
      studentName: "李菊英",
      answerResult: "wrong",
      score: "0 分",
      wrongAnswer: "A",
    },
  ];
};

// ==================== 主组件 ====================

const QuestionDetailPanel: React.FC<QuestionDetailPanelProps> = ({
  open,
  onClose,
  record,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<StudentAnswerRecord[]>([]);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const loadData = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const mockData = generateMockStudents();
      setDataSource(mockData);
      setPagination({ ...pagination, total: 15 });
    } catch (error) {
      console.error("加载失败:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open && record) {
      loadData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, record]);

  if (!record) return null;

  const columns: ColumnsType<StudentAnswerRecord> = [
    {
      title: "姓名",
      dataIndex: "studentName",
      key: "studentName",
      width: 224,
      render: (name: string) => (
        <span style={{ fontSize: 12, color: "#333" }}>{name}</span>
      ),
    },
    {
      title: "答题结果",
      dataIndex: "answerResult",
      key: "answerResult",
      width: 232,
      align: "center" as const,
      render: (result: StudentAnswerRecord["answerResult"]) => {
        if (result === "correct") {
          return <CheckOutlined style={{ color: "#52c41a", fontSize: 16 }} />;
        } else if (result === "wrong") {
          return <CloseCircleOutlined style={{ color: "#ff4d4f", fontSize: 16 }} />;
        }
        return <span style={{ fontSize: 12 }}>-</span>;
      },
    },
    {
      title: "题目得分",
      dataIndex: "score",
      key: "score",
      width: 232,
      align: "center" as const,
      render: (score: number | string) => (
        <span style={{ fontSize: 12, color: "#333" }}>{score}</span>
      ),
    },
    {
      title: (
        <span style={{ fontSize: 12 }}>
          错误作答<span style={{ color: "#999" }}>（选择题）</span>
        </span>
      ),
      dataIndex: "wrongAnswer",
      key: "wrongAnswer",
      width: 240,
      align: "center" as const,
      render: (answer: string | undefined) => (
        <span style={{ fontSize: 12, color: "#333" }}>{answer || "-"}</span>
      ),
    },
  ];

  return (
    <Drawer
      title={null}
      placement="right"
      width={960}
      open={open}
      onClose={onClose}
      closable={false}
      mask={true}
      maskClosable={false}
      zIndex={1001}
      styles={{
        body: { padding: 0, background: "#f5f5f5" },
        header: { display: "none" },
      }}
      destroyOnClose
    >
      {/* 关闭按钮 */}
      <div
        style={{
          position: "absolute",
          left: -32,
          top: 12,
          width: 32,
          height: 36,
          background: "#2266FF",
          borderRadius: "4px 0 0 4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 10,
        }}
        onClick={onClose}
      >
        <CloseOutlined style={{ color: "#fff", fontSize: 16 }} />
      </div>

      {/* 头部信息区域 */}
      <div
        style={{
          background: "#fff",
          padding: "16px 24px",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <h3
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: "#333",
            margin: 0,
            marginBottom: 16,
          }}
        >
          {record.questionNumber}
        </h3>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px 40px",
            fontSize: 12,
            color: "#333",
          }}
        >
          <span>
            <span style={{ color: "#999" }}>关联知识点：</span>
            {record.knowledgePoints}
          </span>
          <span>
            <span style={{ color: "#999" }}>答题人数：</span>
            {record.answerCount !== null ? record.answerCount : "-"}
          </span>
          <span>
            <span style={{ color: "#999" }}>正确人数：</span>
            {record.correctCount !== null ? record.correctCount : "-"}
          </span>
          <span>
            <span style={{ color: "#999" }}>正确率：</span>
            {record.accuracyRate}
          </span>
          <span>
            <span style={{ color: "#999" }}>题目总分：</span>
            {record.totalScore}
          </span>
          <span>
            <span style={{ color: "#999" }}>平均分：</span>
            {record.avgScore}
          </span>
        </div>
      </div>

      {/* 内容区域 */}
      <div style={{ padding: "16px 24px" }}>
        {/* 题目内容区域 */}
        <div
          style={{
            background: "#fff",
            border: "1px solid #e2e2e2",
            borderRadius: 4,
            padding: 12,
            marginBottom: 16,
            minHeight: 134,
          }}
        >
          {/* 题目标签和难度 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 12,
            }}
          >
            <Tag
              style={{
                background: "#FFF7E6",
                border: "1px solid #FFD666",
                color: "#D46B08",
                fontSize: 12,
                margin: 0,
                padding: "2px 8px",
                borderRadius: 2,
              }}
            >
              现代文阅读
            </Tag>
            <Tag
              style={{
                background: "#E6F7FF",
                border: "1px solid #91D5FF",
                color: "#0958D9",
                fontSize: 12,
                margin: 0,
                padding: "2px 8px",
                borderRadius: 2,
              }}
            >
              推荐必刷题
            </Tag>
            <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
              <StarFilled style={{ color: "#FAAD14", fontSize: 14 }} />
              <StarFilled style={{ color: "#FAAD14", fontSize: 14 }} />
              <StarFilled style={{ color: "#e8e8e8", fontSize: 14 }} />
              <StarFilled style={{ color: "#e8e8e8", fontSize: 14 }} />
              <StarFilled style={{ color: "#e8e8e8", fontSize: 14 }} />
            </div>
          </div>

          {/* 题目标题 */}
          <h4
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: "#333",
              margin: "0 0 8px 0",
              lineHeight: "20px",
            }}
          >
            复合年年岁岁价
          </h4>

          {/* 题目选项 */}
          <div style={{ fontSize: 12, color: "#666", lineHeight: "20px" }}>
            <div style={{ marginBottom: 4 }}>
              <span style={{ color: "#333", fontWeight: 500 }}>（1）</span>
              <span style={{ marginLeft: 8 }}>（4分）试述__1__</span>
            </div>
            <div style={{ marginBottom: 8 }}>
              <span style={{ color: "#333", fontWeight: 500 }}>（2）</span>
              <span style={{ marginLeft: 8 }}>（5分）子题解答</span>
            </div>
          </div>

          {/* 题目元数据 */}
          <div
            style={{
              fontSize: 11,
              color: "#999",
              lineHeight: "16px",
              marginTop: 8,
            }}
          >
            <div>题目ID：41261581750389552</div>
            <div>更新时间：2024-1-13</div>
          </div>
        </div>

        {/* 筛选区域 */}
        <Space size={8} style={{ marginBottom: 12 }}>
          <Input
            placeholder="搜索学员姓名/ID/手机号"
            style={{ width: 240, fontSize: 12 }}
            size="middle"
          />
          <Select
            placeholder="答题结果"
            style={{ width: 160, fontSize: 12 }}
            size="middle"
          >
            <Select.Option value="correct">正确</Select.Option>
            <Select.Option value="wrong">错误</Select.Option>
            <Select.Option value="no_answer">未作答</Select.Option>
          </Select>
          <Button size="middle">重 置</Button>
          <Button type="primary" size="middle">
            查 询
          </Button>
        </Space>

        {/* 学员答题列表 */}
        <Table
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          pagination={false}
          scroll={{ x: 928 }}
          size="small"
          bordered
          style={{ marginBottom: 16 }}
        />

        {/* 分页 */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Space size={12}>
            <span style={{ fontSize: 12, color: "rgba(0,0,0,0.65)" }}>
              共 {pagination.total} 条数据
            </span>
            <Space size={4}>
              <Button size="small" disabled={pagination.current === 1}>
                {"<"}
              </Button>
              <Button size="small" type="primary" style={{ minWidth: 28 }}>
                {pagination.current}
              </Button>
              <Button
                size="small"
                disabled={
                  pagination.current ===
                  Math.ceil(
                    (pagination.total || 0) / (pagination.pageSize || 10)
                  )
                }
              >
                {">"}
              </Button>
            </Space>
          </Space>
        </div>
      </div>
    </Drawer>
  );
};

export default QuestionDetailPanel;