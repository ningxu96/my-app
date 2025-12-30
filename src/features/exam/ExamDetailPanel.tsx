"use client";

import React from "react";
import { Drawer, Tabs } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import type { TabsProps } from "antd";
import StudentAnswersTab from "./StudentAnswersTab";
import QuestionAnalysisTab from "./QuestionAnalysisTab";
import PaperDetailTab from "./PaperDetailTab";

// ==================== 类型定义 ====================

/**
 * 考试记录类型
 */
export interface ExamRecord {
  key: string;
  examName: string;
  className: string;
  examType: string;
  teacher: string;
  examDateRange: string;
  totalQuestions: number;
  onlineCount1: number | string;
  onlineCount2: number | string;
  // 详情面板额外字段
  createDate?: string;
  answerDateRange?: string;
  questionCount?: number;
  totalScore?: number;
  shouldSubmitCount?: number;
  submittedCount?: number;
  submitRate?: string;
  avgDuration?: number;
  avgScore?: number;
}

/**
 * 详情面板 Props
 */
export interface ExamDetailPanelProps {
  open: boolean;
  exam: ExamRecord | null;
  onClose: () => void;
}

// ==================== 成绩分布数据类型 ====================

interface ScoreDistribution {
  range: string;
  count: number;
}

// ==================== 子组件：考试统计 Tab ====================

const ExamStatisticsTab: React.FC<{ exam: ExamRecord }> = ({ exam }) => {
  const scoreDistribution: ScoreDistribution[] = [
    { range: "未作答", count: 30 },
    { range: "0~60", count: 50 },
    { range: "60~70", count: 70 },
    { range: "70~80", count: 95 },
    { range: "80~90", count: 90 },
    { range: "90~100", count: 50 },
  ];

  const maxCount = Math.max(...scoreDistribution.map((item) => item.count));

  return (
    <div style={{ padding: "16px 0" }}>
      {/* 答题数据卡片 */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #e2e2e2",
          borderRadius: 4,
          padding: "12px 16px 16px",
          marginBottom: 24,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            height: 22,
            marginBottom: 12,
          }}
        >
          <div
            style={{
              width: 2,
              height: 14,
              background: "#2266FF",
              borderRadius: 1,
            }}
          />
          <span
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: "rgba(0,0,0,0.85)",
            }}
          >
            答题数据
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px 16px",
          }}
        >
          <StatisticItem
            label="考试应提交人数"
            value={exam.shouldSubmitCount?.toString() || "124"}
          />
          <StatisticItem
            label="考试提交人数"
            value={exam.submittedCount?.toString() || "50"}
          />
          <StatisticItem
            label="考试提交率"
            value={exam.submitRate || "45%"}
          />
          <StatisticItem
            label="平均答题时长"
            value={exam.avgDuration?.toString() || "100"}
            unit="分钟"
          />
          <StatisticItem
            label="考试平均分"
            value={exam.avgScore?.toString() || "65.2"}
          />
        </div>
      </div>

      {/* 成绩分布 */}
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            height: 22,
            marginBottom: 16,
          }}
        >
          <div
            style={{
              width: 2,
              height: 14,
              background: "#2266FF",
              borderRadius: 1,
            }}
          />
          <span
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: "rgba(0,0,0,0.85)",
            }}
          >
            成绩分布
          </span>
        </div>

        {/* 柱状图 */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: 16,
            height: 240,
            padding: "20px 0",
            borderBottom: "1px solid #e8e8e8",
          }}
        >
          {scoreDistribution.map((item, index) => (
            <div
              key={index}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: `${(item.count / maxCount) * 180}px`,
                  background: "#2266FF",
                  borderRadius: "4px 4px 0 0",
                  transition: "all 0.3s",
                }}
              />
              <span style={{ fontSize: 12, color: "#666" }}>{item.range}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ==================== 子组件：统计数据项 ====================

const StatisticItem: React.FC<{
  label: string;
  value: string;
  unit?: string;
}> = ({ label, value, unit }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
    <span
      style={{
        fontSize: 12,
        color: "#666",
        opacity: 0.8,
      }}
    >
      {label}
    </span>
    <div style={{ display: "flex", alignItems: "flex-end", gap: 4 }}>
      <span
        style={{
          fontSize: unit ? 14 : 16,
          fontWeight: 500,
          color: "#333",
        }}
      >
        {value}
      </span>
      {unit && (
        <span
          style={{
            fontSize: 12,
            color: "#999",
            paddingBottom: 1,
          }}
        >
          {unit}
        </span>
      )}
    </div>
  </div>
);

// ==================== 主组件 ====================

const ExamDetailPanel: React.FC<ExamDetailPanelProps> = ({
  open,
  exam,
  onClose,
}) => {
  if (!exam) return null;

  const tabItems: TabsProps["items"] = [
    {
      key: "statistics",
      label: "考试统计",
      children: <ExamStatisticsTab exam={exam} />,
    },
    {
      key: "answers",
      label: "学员作答",
      children: <StudentAnswersTab examId={exam.key} />,
    },
    {
      key: "analysis",
      label: "题目分析",
      children: <QuestionAnalysisTab examId={exam.key} />,
    },
    {
      key: "detail",
      label: "试卷详情",
      children: <PaperDetailTab examId={exam.key} />,
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
          {exam.examName}
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
            <span style={{ color: "#999" }}>创建日期：</span>
            {exam.createDate || "2023-12-24"}
          </span>
          <span>
            <span style={{ color: "#999" }}>作答日期：</span>
            {exam.answerDateRange || exam.examDateRange}
          </span>
          <span>
            <span style={{ color: "#999" }}>考试题目数：</span>
            {exam.questionCount || exam.totalQuestions}
          </span>
          <span>
            <span style={{ color: "#999" }}>考试总分：</span>
            {exam.totalScore || 100}分
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
          defaultActiveKey="statistics"
          items={tabItems}
          tabBarStyle={{
            marginBottom: 0,
          }}
        />
      </div>
    </Drawer>
  );
};

export default ExamDetailPanel;