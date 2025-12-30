"use client";

import React, { useState, useEffect } from "react";
import { Table, message } from "antd";
import { PlusSquareOutlined, MinusSquareOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

// ==================== 类型定义 ====================

/**
 * 题目分析记录
 */
interface QuestionAnalysisRecord {
  key: string;
  questionNumber: string;
  knowledgePoints: string;
  answerCount: number | null;
  correctCount: number | null;
  accuracyRate: string;
  totalScore: number;
  avgScore: number | string;
  level?: number; // 题目层级，用于子题目
  parentKey?: string; // 父题目key
  hasChildren?: boolean; // 是否有子题目
  children?: QuestionAnalysisRecord[];
}

/**
 * 组件 Props
 */
interface QuestionAnalysisTabProps {
  examId?: string;
}

// ==================== Mock 数据生成 ====================

const generateMockData = (): QuestionAnalysisRecord[] => {
  return [
    {
      key: "1",
      questionNumber: "第 1 题",
      knowledgePoints: "知识点一，知识点二，知识点三",
      answerCount: 173,
      correctCount: 12,
      accuracyRate: "10.32%",
      totalScore: 5,
      avgScore: 4.52,
      hasChildren: false,
    },
    {
      key: "2",
      questionNumber: "第 2 题",
      knowledgePoints: "知识点一，知识点二",
      answerCount: 0,
      correctCount: 0,
      accuracyRate: "0%",
      totalScore: 10,
      avgScore: 4.52,
      hasChildren: false,
    },
    {
      key: "3",
      questionNumber: "第 3 题",
      knowledgePoints: "知识点一",
      answerCount: 99,
      correctCount: 14,
      accuracyRate: "10.3%",
      totalScore: 10,
      avgScore: 4.52,
      hasChildren: true,
      children: [
        {
          key: "3-1",
          questionNumber: "第 3.1 题",
          knowledgePoints: "知识点一，知识点二，知识点三，知识点...",
          answerCount: 124,
          correctCount: 18,
          accuracyRate: "10.32%",
          totalScore: 10,
          avgScore: 4.52,
          level: 1,
          parentKey: "3",
        },
      ],
    },
    {
      key: "4",
      questionNumber: "第 4 题",
      knowledgePoints: "知识点一，知识点二，知识",
      answerCount: null,
      correctCount: null,
      accuracyRate: "-",
      totalScore: 10,
      avgScore: "-",
      hasChildren: false,
    },
    {
      key: "5",
      questionNumber: "第 5 题",
      knowledgePoints: "知识点一",
      answerCount: null,
      correctCount: null,
      accuracyRate: "-",
      totalScore: 10,
      avgScore: "-",
      hasChildren: false,
    },
    {
      key: "6",
      questionNumber: "第 6 题",
      knowledgePoints: "知识点一，知识点二",
      answerCount: 0,
      correctCount: 3,
      accuracyRate: "10.32%",
      totalScore: 10,
      avgScore: 4,
      hasChildren: false,
    },
    {
      key: "7",
      questionNumber: "第 7 题",
      knowledgePoints: "知识点一，知识点二",
      answerCount: 12,
      correctCount: 10,
      accuracyRate: "10.32%",
      totalScore: 10,
      avgScore: 6.2,
      hasChildren: false,
    },
    {
      key: "8",
      questionNumber: "第 8 题",
      knowledgePoints: "知识点一，知识点二，知识",
      answerCount: 12,
      correctCount: 10,
      accuracyRate: "10.32%",
      totalScore: 10,
      avgScore: 4.52,
      hasChildren: false,
    },
    {
      key: "9",
      questionNumber: "第 9 题",
      knowledgePoints: "知识点一",
      answerCount: 12,
      correctCount: 12,
      accuracyRate: "100%",
      totalScore: 10,
      avgScore: 4.52,
      hasChildren: false,
    },
    {
      key: "10",
      questionNumber: "第 10 题",
      knowledgePoints: "知识点一",
      answerCount: 12,
      correctCount: 12,
      accuracyRate: "100%",
      totalScore: 10,
      avgScore: 4.52,
      hasChildren: false,
    },
    {
      key: "11",
      questionNumber: "第 11 题",
      knowledgePoints: "知识点一，知识点二，知识点三",
      answerCount: 12,
      correctCount: 12,
      accuracyRate: "100%",
      totalScore: 10,
      avgScore: 4.52,
      hasChildren: false,
    },
    {
      key: "12",
      questionNumber: "第 12 题",
      knowledgePoints: "知识点一",
      answerCount: 12,
      correctCount: 12,
      accuracyRate: "100%",
      totalScore: 10,
      avgScore: 4.52,
      hasChildren: false,
    },
    {
      key: "13",
      questionNumber: "第 13 题",
      knowledgePoints: "知识点一，知识点二，知识点三",
      answerCount: 12,
      correctCount: 12,
      accuracyRate: "100%",
      totalScore: 10,
      avgScore: 4.52,
      hasChildren: false,
    },
    {
      key: "14",
      questionNumber: "第 14 题",
      knowledgePoints: "知识点一，知识点二，知识点三",
      answerCount: 12,
      correctCount: 12,
      accuracyRate: "100%",
      totalScore: 10,
      avgScore: 4.52,
      hasChildren: false,
    },
    {
      key: "15",
      questionNumber: "第 15 题",
      knowledgePoints: "知识点一",
      answerCount: 12,
      correctCount: 12,
      accuracyRate: "100%",
      totalScore: 10,
      avgScore: 4.52,
      hasChildren: false,
    },
  ];
};

// ==================== 主组件 ====================

const QuestionAnalysisTab: React.FC<QuestionAnalysisTabProps> = ({ examId }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<QuestionAnalysisRecord[]>([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);

  // ==================== 数据加载 ====================

  const loadData = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const mockData = generateMockData();
      setDataSource(mockData);
    } catch (error) {
      console.error("加载题目分析数据失败:", error);
      message.error("加载数据失败");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ==================== 事件处理 ====================

  /**
   * 查看详情
   */
  const handleViewDetail = (record: QuestionAnalysisRecord) => {
    message.info(`查看 ${record.questionNumber} 的详情`);
  };

  /**
   * 展开/收起子题目
   */
  const handleExpand = (expanded: boolean, record: QuestionAnalysisRecord) => {
    if (expanded) {
      setExpandedRowKeys([...expandedRowKeys, record.key]);
    } else {
      setExpandedRowKeys(expandedRowKeys.filter((key) => key !== record.key));
    }
  };

  // ==================== 表格列定义 ====================

  const columns: ColumnsType<QuestionAnalysisRecord> = [
    {
      title: "题目序号",
      dataIndex: "questionNumber",
      key: "questionNumber",
      width: 100,
      fixed: "left",
      render: (text: string, record: QuestionAnalysisRecord) => {
        const isExpanded = expandedRowKeys.includes(record.key);
        const hasChildren = record.hasChildren;
        const isSubQuestion = record.level === 1;

        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              paddingLeft: isSubQuestion ? 48 : 0,
            }}
          >
            {hasChildren && (
              <span
                style={{ cursor: "pointer", fontSize: 14 }}
                onClick={() => handleExpand(!isExpanded, record)}
              >
                {isExpanded ? (
                  <MinusSquareOutlined style={{ color: "#2266FF" }} />
                ) : (
                  <PlusSquareOutlined style={{ color: "#999" }} />
                )}
              </span>
            )}
            {!hasChildren && !isSubQuestion && (
              <PlusSquareOutlined style={{ color: "#999", fontSize: 14 }} />
            )}
            <span
              style={{
                fontSize: 12,
                color: record.key === "3" ? "#2266FF" : "#333",
              }}
            >
              {text}
            </span>
          </div>
        );
      },
    },
    {
      title: "关联知识点",
      dataIndex: "knowledgePoints",
      key: "knowledgePoints",
      width: 240,
      ellipsis: true,
      render: (text: string) => (
        <span style={{ fontSize: 12, color: "#333" }}>{text}</span>
      ),
    },
    {
      title: "答题人数",
      dataIndex: "answerCount",
      key: "answerCount",
      width: 90,
      align: "center",
      render: (count: number | null) => (
        <span style={{ fontSize: 12, color: "#333" }}>
          {count !== null ? count : "-"}
        </span>
      ),
    },
    {
      title: "正确人数",
      dataIndex: "correctCount",
      key: "correctCount",
      width: 90,
      align: "center",
      render: (count: number | null) => (
        <span style={{ fontSize: 12, color: "#333" }}>
          {count !== null ? count : "-"}
        </span>
      ),
    },
    {
      title: "正确率",
      dataIndex: "accuracyRate",
      key: "accuracyRate",
      width: 90,
      align: "center",
      render: (rate: string) => (
        <span style={{ fontSize: 12, color: "#333" }}>{rate}</span>
      ),
    },
    {
      title: "题目总分",
      dataIndex: "totalScore",
      key: "totalScore",
      width: 90,
      align: "center",
      render: (score: number) => (
        <span style={{ fontSize: 12, color: "#333" }}>{score}</span>
      ),
    },
    {
      title: "平均分",
      dataIndex: "avgScore",
      key: "avgScore",
      width: 90,
      align: "center",
      render: (score: number | string) => (
        <span style={{ fontSize: 12, color: "#333" }}>{score}</span>
      ),
    },
    {
      title: "操作",
      key: "action",
      width: 80,
      fixed: "right",
      align: "center",
      render: (_: any, record: QuestionAnalysisRecord) => (
        <a
          style={{ fontSize: 12, color: "#2266FF" }}
          onClick={() => handleViewDetail(record)}
        >
          详情
        </a>
      ),
    },
  ];

  // ==================== 渲染 ====================

  return (
    <div style={{ padding: "16px 0" }}>
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        pagination={false}
        scroll={{ x: 1200 }}
        size="small"
        bordered
        expandable={{
          expandedRowKeys,
          onExpand: handleExpand,
          expandIcon: () => null, // 隐藏默认展开图标，使用自定义图标
          indentSize: 0,
        }}
      />
    </div>
  );
};

export default QuestionAnalysisTab;