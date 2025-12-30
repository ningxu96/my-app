"use client";

import React, { useState } from "react";
import { Drawer, Tabs, Tag } from "antd";
import {
  CloseOutlined,
  CheckOutlined,
  CloseCircleOutlined,
  UpOutlined,
  DownOutlined,
  StarFilled,
} from "@ant-design/icons";
import type { TabsProps } from "antd";

// ==================== 类型定义 ====================

/**
 * 学员作答记录（与StudentAnswersTab中的类型保持一致）
 */
export interface StudentAnswerRecord {
  key: string;
  studentName: string;
  phone: string;
  status: "submitted" | "not_submitted";
  score: number | null;
  answerCount: number;
  duration: string | null;
  submitTime: string | null;
}

/**
 * 题目详情
 */
interface QuestionDetail {
  questionNumber: string;
  totalScore: number;
  earnedScore: number;
  studentAnswer: string;
  answerHistory: string;
  isCorrect: boolean | null; // true: 正确, false: 错误, null: 待批改
  // 新增题目内容字段
  questionTitle?: string;
  questionTags?: string[];
  difficulty?: number;
  questionId?: string;
  updatedAt?: string;
  subQuestions?: Array<{ label: string; score: number }>;
}

/**
 * 组件 Props
 */
export interface StudentAnswerDetailPanelProps {
  open: boolean;
  onClose: () => void;
  record: StudentAnswerRecord | null;
}

// ==================== Mock 题目数据 ====================

const generateMockQuestions = (): QuestionDetail[] => {
  return [
    {
      questionNumber: "1.1",
      totalScore: 10,
      earnedScore: 10,
      studentAnswer: "B",
      answerHistory: "B",
      isCorrect: true,
      questionTitle: "复合年年岁岁价",
      questionTags: ["现代文阅读", "推荐必刷题"],
      difficulty: 2,
      questionId: "41261581750389552",
      updatedAt: "2024-1-13",
      subQuestions: [
        { label: "（1）（4分）试述__1__", score: 4 },
        { label: "（2）（5分）子题解答", score: 5 },
      ],
    },
    {
      questionNumber: "1.2",
      totalScore: 10,
      earnedScore: 10,
      studentAnswer: "B",
      answerHistory: "B",
      isCorrect: true,
      questionTitle: "复合年年岁岁价",
      questionTags: ["现代文阅读", "推荐必刷题"],
      difficulty: 2,
      questionId: "41261581750389552",
      updatedAt: "2024-1-13",
      subQuestions: [
        { label: "（1）（4分）试述__1__", score: 4 },
        { label: "（2）（5分）子题解答", score: 5 },
      ],
    },
    {
      questionNumber: "1.3",
      totalScore: 10,
      earnedScore: 0,
      studentAnswer: "A",
      answerHistory: "A",
      isCorrect: false,
      questionTitle: "复合年年岁岁价",
      questionTags: ["现代文阅读", "推荐必刷题"],
      difficulty: 2,
      questionId: "41261581750389552",
      updatedAt: "2024-1-13",
      subQuestions: [
        { label: "（1）（4分）试述__1__", score: 4 },
        { label: "（2）（5分）子题解答", score: 5 },
      ],
    },
    {
      questionNumber: "1.4",
      totalScore: 10,
      earnedScore: 10,
      studentAnswer: "C",
      answerHistory: "C",
      isCorrect: true,
      questionTitle: "复合年年岁岁价",
      questionTags: ["现代文阅读", "推荐必刷题"],
      difficulty: 2,
      questionId: "41261581750389552",
      updatedAt: "2024-1-13",
      subQuestions: [
        { label: "（1）（4分）试述__1__", score: 4 },
        { label: "（2）（5分）子题解答", score: 5 },
      ],
    },
    {
      questionNumber: "1.7",
      totalScore: 10,
      earnedScore: 0,
      studentAnswer: "D",
      answerHistory: "D",
      isCorrect: false,
      questionTitle: "复合年年岁岁价",
      questionTags: ["现代文阅读", "推荐必刷题"],
      difficulty: 2,
      questionId: "41261581750389552",
      updatedAt: "2024-1-13",
      subQuestions: [
        { label: "（1）（4分）试述__1__", score: 4 },
        { label: "（2）（5分）子题解答", score: 5 },
      ],
    },
    {
      questionNumber: "2.1",
      totalScore: 10,
      earnedScore: 10,
      studentAnswer: "A",
      answerHistory: "A",
      isCorrect: true,
      questionTitle: "复合年年岁岁价",
      questionTags: ["现代文阅读", "推荐必刷题"],
      difficulty: 2,
      questionId: "41261581750389552",
      updatedAt: "2024-1-13",
      subQuestions: [
        { label: "（1）（4分）试述__1__", score: 4 },
        { label: "（2）（5分）子题解答", score: 5 },
      ],
    },
    {
      questionNumber: "2.2",
      totalScore: 10,
      earnedScore: 10,
      studentAnswer: "B",
      answerHistory: "B",
      isCorrect: true,
      questionTitle: "复合年年岁岁价",
      questionTags: ["现代文阅读", "推荐必刷题"],
      difficulty: 2,
      questionId: "41261581750389552",
      updatedAt: "2024-1-13",
      subQuestions: [
        { label: "（1）（4分）试述__1__", score: 4 },
        { label: "（2）（5分）子题解答", score: 5 },
      ],
    },
    {
      questionNumber: "2.3",
      totalScore: 10,
      earnedScore: 10,
      studentAnswer: "C",
      answerHistory: "C",
      isCorrect: true,
      questionTitle: "复合年年岁岁价",
      questionTags: ["现代文阅读", "推荐必刷题"],
      difficulty: 2,
      questionId: "41261581750389552",
      updatedAt: "2024-1-13",
      subQuestions: [
        { label: "（1）（4分）试述__1__", score: 4 },
        { label: "（2）（5分）子题解答", score: 5 },
      ],
    },
    {
      questionNumber: "2.4",
      totalScore: 10,
      earnedScore: 10,
      studentAnswer: "D",
      answerHistory: "D",
      isCorrect: true,
      questionTitle: "复合年年岁岁价",
      questionTags: ["现代文阅读", "推荐必刷题"],
      difficulty: 2,
      questionId: "41261581750389552",
      updatedAt: "2024-1-13",
      subQuestions: [
        { label: "（1）（4分）试述__1__", score: 4 },
        { label: "（2）（5分）子题解答", score: 5 },
      ],
    },
    {
      questionNumber: "3",
      totalScore: 10,
      earnedScore: 10,
      studentAnswer: "A",
      answerHistory: "A",
      isCorrect: true,
      questionTitle: "复合年年岁岁价",
      questionTags: ["现代文阅读", "推荐必刷题"],
      difficulty: 2,
      questionId: "41261581750389552",
      updatedAt: "2024-1-13",
      subQuestions: [
        { label: "（1）（4分）试述__1__", score: 4 },
        { label: "（2）（5分）子题解答", score: 5 },
      ],
    },
    {
      questionNumber: "4",
      totalScore: 10,
      earnedScore: 10,
      studentAnswer: "B",
      answerHistory: "B",
      isCorrect: true,
      questionTitle: "复合年年岁岁价",
      questionTags: ["现代文阅读", "推荐必刷题"],
      difficulty: 2,
      questionId: "41261581750389552",
      updatedAt: "2024-1-13",
      subQuestions: [
        { label: "（1）（4分）试述__1__", score: 4 },
        { label: "（2）（5分）子题解答", score: 5 },
      ],
    },
    {
      questionNumber: "5",
      totalScore: 10,
      earnedScore: 10,
      studentAnswer: "C",
      answerHistory: "C",
      isCorrect: true,
      questionTitle: "复合年年岁岁价",
      questionTags: ["现代文阅读", "推荐必刷题"],
      difficulty: 2,
      questionId: "41261581750389552",
      updatedAt: "2024-1-13",
      subQuestions: [
        { label: "（1）（4分）试述__1__", score: 4 },
        { label: "（2）（5分）子题解答", score: 5 },
      ],
    },
    {
      questionNumber: "6",
      totalScore: 10,
      earnedScore: 0,
      studentAnswer: "待批改",
      answerHistory: "待批改",
      isCorrect: null,
      questionTitle: "复合年年岁岁价",
      questionTags: ["现代文阅读", "推荐必刷题"],
      difficulty: 2,
      questionId: "41261581750389552",
      updatedAt: "2024-1-13",
      subQuestions: [
        { label: "（1）（4分）试述__1__", score: 4 },
        { label: "（2）（5分）子题解答", score: 5 },
      ],
    },
    {
      questionNumber: "7",
      totalScore: 10,
      earnedScore: 10,
      studentAnswer: "D",
      answerHistory: "D",
      isCorrect: true,
      questionTitle: "复合年年岁岁价",
      questionTags: ["现代文阅读", "推荐必刷题"],
      difficulty: 2,
      questionId: "41261581750389552",
      updatedAt: "2024-1-13",
      subQuestions: [
        { label: "（1）（4分）试述__1__", score: 4 },
        { label: "（2）（5分）子题解答", score: 5 },
      ],
    },
  ];
};

// ==================== 主组件 ====================

const StudentAnswerDetailPanel: React.FC<StudentAnswerDetailPanelProps> = ({
  open,
  onClose,
  record,
}) => {
  const [questions] = useState<QuestionDetail[]>(generateMockQuestions());
  const [expandedQuestions, setExpandedQuestions] = useState<boolean>(true);

  if (!record) return null;

  // 计算正确、错误题目数量
  const correctCount = questions.filter((q) => q.isCorrect === true).length;
  const wrongCount = questions.filter((q) => q.isCorrect === false).length;
  const totalQuestions = questions.length;

  // ==================== 题目卡片组件 ====================
  const QuestionCard: React.FC<{ question: QuestionDetail; index: number }> = ({
    question,
    index,
  }) => {
    return (
      <div
        key={index}
        style={{
          background: "#fff",
          border: "1px solid #e2e2e2",
          borderRadius: 4,
          padding: 12,
        }}
      >
        {/* 题目标题行 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 12,
            color: "#666",
            marginBottom: 12,
          }}
        >
          <span style={{ color: "#333", fontWeight: 500 }}>
            第 {question.questionNumber} 题
          </span>
          <span style={{ color: "#d6d6d6" }}>｜</span>
          <span>总分：{question.totalScore}分</span>
          <span style={{ color: "#d6d6d6" }}>｜</span>
          <span>得分：{question.earnedScore}分</span>
        </div>

        {/* 作答信息 */}
        <div
          style={{
            background: "#fafafa",
            border: "1px solid #f0f0f0",
            borderRadius: 4,
            padding: 12,
            marginBottom: 12,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 12,
              color: "#333",
              marginBottom: 12,
            }}
          >
            <span style={{ minWidth: 72 }}>学员作答：</span>
            <span>{question.studentAnswer}</span>
          </div>
          <div style={{ display: "flex", fontSize: 12, color: "#333" }}>
            <span style={{ minWidth: 72 }}>作答历史：</span>
            <span>{question.answerHistory}</span>
          </div>
        </div>

        {/* 题目内容区域 */}
        <div>
          {/* 题目标签和难度 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 8,
            }}
          >
            {question.questionTags?.map((tag, idx) => {
              const isFirst = idx === 0;
              return (
                <Tag
                  key={idx}
                  style={{
                    background: isFirst ? "#FFF7E6" : "#E6F7FF",
                    border: isFirst
                      ? "1px solid #FFD666"
                      : "1px solid #91D5FF",
                    color: isFirst ? "#D46B08" : "#0958D9",
                    fontSize: 12,
                    margin: 0,
                    padding: "2px 8px",
                    borderRadius: 2,
                  }}
                >
                  {tag}
                </Tag>
              );
            })}
            {question.difficulty && (
              <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
                {[...Array(5)].map((_, i) => (
                  <StarFilled
                    key={i}
                    style={{
                      color:
                        i < question.difficulty! ? "#FAAD14" : "#e8e8e8",
                      fontSize: 14,
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* 题目标题 */}
          {question.questionTitle && (
            <h4
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: "#333",
                margin: "0 0 8px 0",
                lineHeight: "20px",
              }}
            >
              {question.questionTitle}
            </h4>
          )}

          {/* 子题目 */}
          {question.subQuestions && (
            <div style={{ fontSize: 12, color: "#666", lineHeight: "20px" }}>
              {question.subQuestions.map((sub, idx) => (
                <div key={idx} style={{ marginBottom: 4 }}>
                  <span>{sub.label}</span>
                </div>
              ))}
            </div>
          )}

          {/* 题目元数据 */}
          {(question.questionId || question.updatedAt) && (
            <div
              style={{
                fontSize: 11,
                color: "#999",
                lineHeight: "16px",
                marginTop: 8,
              }}
            >
              {question.questionId && <div>题目ID：{question.questionId}</div>}
              {question.updatedAt && (
                <div>更新时间：{question.updatedAt}</div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  // ==================== Tab 内容 ====================

  const AllQuestionsTab = () => (
    <div style={{ padding: "16px 0" }}>
      {/* 题目编号列表 */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          marginBottom: 16,
          position: "relative",
        }}
      >
        {questions.map((question, index) => {
          let icon = null;

          if (question.isCorrect === true) {
            icon = (
              <CheckOutlined style={{ color: "#52c41a", fontSize: 16 }} />
            );
          } else if (question.isCorrect === false) {
            icon = (
              <CloseCircleOutlined style={{ color: "#ff4d4f", fontSize: 16 }} />
            );
          }

          return (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: "6px 10px",
                border: "1px solid #e2e2e2",
                borderRadius: 4,
                fontSize: 12,
                fontWeight: 500,
                color: "#666",
                minWidth: 85.6,
                height: 28,
              }}
            >
              <span>{question.questionNumber}</span>
              {question.isCorrect === null ? (
                <span
                  style={{ color: "#faad14", fontSize: 12, fontWeight: 400 }}
                >
                  待批改
                </span>
              ) : (
                icon
              )}
            </div>
          );
        })}

        {/* 收起按钮 */}
        <div
          style={{
            position: "absolute",
            right: 0,
            bottom: 36,
            display: "flex",
            alignItems: "center",
            gap: 4,
            cursor: "pointer",
            fontSize: 12,
            color: "#2266FF",
          }}
          onClick={() => setExpandedQuestions(!expandedQuestions)}
        >
          <span>收起</span>
          <UpOutlined style={{ fontSize: 10 }} />
        </div>
      </div>

      {/* 题目详情列表 */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {questions
          .slice(0, expandedQuestions ? questions.length : 2)
          .map((question, index) => (
            <QuestionCard key={index} question={question} index={index} />
          ))}
      </div>

      {!expandedQuestions && (
        <div
          style={{
            marginTop: 16,
            textAlign: "center",
            cursor: "pointer",
            color: "#2266FF",
            fontSize: 12,
          }}
          onClick={() => setExpandedQuestions(true)}
        >
          <DownOutlined style={{ fontSize: 10, marginRight: 4 }} />
          展开更多
        </div>
      )}
    </div>
  );

  const WrongQuestionsTab = () => (
    <div style={{ padding: "40px 0", textAlign: "center", color: "#999" }}>
      <p>错题列表</p>
      <p style={{ fontSize: 12, marginTop: 8 }}>共 {wrongCount} 道错题</p>
    </div>
  );

  const tabItems: TabsProps["items"] = [
    {
      key: "all",
      label: `全部题目 (${totalQuestions})`,
      children: <AllQuestionsTab />,
    },
    {
      key: "wrong",
      label: `错题 (${wrongCount})`,
      children: <WrongQuestionsTab />,
    },
  ];

  // ==================== 渲染 ====================

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
          {record.studentName}
        </h3>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px 40px",
            fontSize: 12,
            color: "#333",
          }}
        >
          <span>
            <span style={{ color: "#999" }}>考试提交时间：</span>
            {record.submitTime || "-"}
          </span>
          <span>
            <span style={{ color: "#999" }}>作答时长：</span>
            {record.duration || "-"}
          </span>
          <span>
            <span style={{ color: "#999" }}>考试分数：</span>
            {record.score !== null ? `${record.score} 分` : "-"}
          </span>
        </div>
      </div>

      {/* Tab 区域 */}
      <div
        style={{
          background: "#fff",
          padding: "0 24px",
        }}
      >
        <Tabs
          defaultActiveKey="all"
          items={tabItems}
          tabBarStyle={{
            marginBottom: 0,
          }}
        />
      </div>
    </Drawer>
  );
};

export default StudentAnswerDetailPanel;