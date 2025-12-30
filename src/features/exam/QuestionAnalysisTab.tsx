"use client";

import React, { useState, useEffect } from "react";
import { Table, message } from "antd";
import { PlusSquareOutlined, MinusSquareOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import QuestionDetailPanel from "./QuestionDetailPanel";

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
  level?: number; // 层级：0=大题，1=小题
  parentKey?: string; // 父题目key
  hasChildren?: boolean; // 是否有子题
  children?: QuestionAnalysisRecord[]; // 子题目
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
      level: 0,
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
      level: 0,
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
      level: 0,
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
      level: 0,
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
      level: 0,
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
      level: 0,
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
      level: 0,
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
      level: 0,
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
      level: 0,
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
      level: 0,
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
      level: 0,
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
      level: 0,
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
      level: 0,
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
      level: 0,
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
      level: 0,
      hasChildren: false,
    },
  ];
};

// ==================== 主组件 ====================

const QuestionAnalysisTab: React.FC<QuestionAnalysisTabProps> = ({
  examId,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<QuestionAnalysisRecord[]>([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);

  // 详情面板状态
  const [detailOpen, setDetailOpen] = useState<boolean>(false);
  const [currentRecord, setCurrentRecord] =
    useState<QuestionAnalysisRecord | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const mockData = generateMockData();
      setDataSource(mockData);
    } catch (error) {
      console.error("加载失败:", error);
      message.error("加载数据失败");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [examId]);

  const handleViewDetail = (record: QuestionAnalysisRecord) => {
    // 打开详情面板
    setCurrentRecord(record);
    setDetailOpen(true);
  };

  // 关闭详情面板
  const handleDetailClose = () => {
    setDetailOpen(false);
    setCurrentRecord(null);
  };

  const handleExpand = (expanded: boolean, record: QuestionAnalysisRecord) => {
    if (expanded) {
      setExpandedRowKeys([...expandedRowKeys, record.key]);
    } else {
      setExpandedRowKeys(expandedRowKeys.filter((key) => key !== record.key));
    }
  };

  const columns: ColumnsType<QuestionAnalysisRecord> = [
    {
      title: "题目序号",
      dataIndex: "questionNumber",
      key: "questionNumber",
      width: 100,
      fixed: "left" as const,
      render: (text: string, record: QuestionAnalysisRecord) => {
        const isExpanded = expandedRowKeys.includes(record.key);
        const isSubQuestion = record.level === 1;

        // 子题目样式：左侧缩进 48px
        const style: React.CSSProperties = {
          paddingLeft: isSubQuestion ? 48 : 0,
          color: record.questionNumber === "第 3 题" ? "#2266FF" : "#333",
          fontSize: 12,
          display: "flex",
          alignItems: "center",
          gap: 8,
        };

        return (
          <div style={style}>
            {/* 只有大题且有子题才显示展开图标 */}
            {record.hasChildren && record.level === 0 && (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  handleExpand(!isExpanded, record);
                }}
                style={{ cursor: "pointer", fontSize: 14 }}
              >
                {isExpanded ? (
                  <MinusSquareOutlined style={{ color: "#2266FF" }} />
                ) : (
                  <PlusSquareOutlined style={{ color: "#999" }} />
                )}
              </span>
            )}
            {/* 没有子题的大题也显示灰色加号（占位） */}
            {!record.hasChildren && record.level === 0 && (
              <PlusSquareOutlined
                style={{ color: "#999", fontSize: 14, visibility: "hidden" }}
              />
            )}
            <span>{text}</span>
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
      align: "center" as const,
      render: (count: number | null) => (
        <span style={{ fontSize: 12 }}>
          {count !== null ? count : "-"}
        </span>
      ),
    },
    {
      title: "正确人数",
      dataIndex: "correctCount",
      key: "correctCount",
      width: 90,
      align: "center" as const,
      render: (count: number | null) => (
        <span style={{ fontSize: 12 }}>
          {count !== null ? count : "-"}
        </span>
      ),
    },
    {
      title: "正确率",
      dataIndex: "accuracyRate",
      key: "accuracyRate",
      width: 90,
      align: "center" as const,
      render: (rate: string) => (
        <span style={{ fontSize: 12 }}>{rate}</span>
      ),
    },
    {
      title: "题目总分",
      dataIndex: "totalScore",
      key: "totalScore",
      width: 90,
      align: "center" as const,
      render: (score: number) => (
        <span style={{ fontSize: 12 }}>{score}</span>
      ),
    },
    {
      title: "平均分",
      dataIndex: "avgScore",
      key: "avgScore",
      width: 90,
      align: "center" as const,
      render: (score: number | string) => (
        <span style={{ fontSize: 12 }}>{score}</span>
      ),
    },
    {
      title: "操作",
      key: "action",
      width: 80,
      fixed: "right" as const,
      align: "center" as const,
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

  return (
    <>
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
            indentSize: 0, // 不使用默认缩进
          }}
        />
      </div>

      {/* 题目详情面板（独立的第二层Drawer） */}
      <QuestionDetailPanel
        open={detailOpen}
        onClose={handleDetailClose}
        record={currentRecord}
      />
    </>
  );
};

export default QuestionAnalysisTab;