"use client";

import React from "react";

// ==================== 类型定义 ====================

/**
 * 组件 Props
 */
interface PaperDetailTabProps {
  examId?: string;
}

// ==================== 主组件 ====================

/**
 * 试卷详情 Tab 组件
 * 显示内嵌详情页的占位内容
 */
const PaperDetailTab: React.FC<PaperDetailTabProps> = ({ examId }) => {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: 626,
        background: "#f5f5f5",
        overflow: "hidden",
      }}
    >
      {/* 对角线背景装饰 - 左上到右下 */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 1119.4,
          height: 2,
          background: "#e0e0e0",
          transform: "translate(-50%, -50%) rotate(34deg)",
          transformOrigin: "center",
        }}
      />

      {/* 对角线背景装饰 - 右上到左下 */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 1119.4,
          height: 2,
          background: "#e0e0e0",
          transform: "translate(-50%, -50%) rotate(146deg)",
          transformOrigin: "center",
        }}
      />

      {/* 中心文字区域 */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f5f5f5",
          padding: "12px 24px",
          zIndex: 1,
        }}
      >
        <p
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: "#333",
            margin: 0,
            lineHeight: "22px",
          }}
        >
          内嵌详情页
        </p>
      </div>
    </div>
  );
};

export default PaperDetailTab;