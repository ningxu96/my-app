"use client";

import React, { useState } from "react";
import {
  Layout,
  Menu,
  Avatar,
  Typography,
  Space,
  Dropdown,
  Badge,
} from "antd";
import type { MenuProps } from "antd";
import {
  HomeOutlined,
  BookOutlined,
  UserOutlined,
  ShoppingOutlined,
  FileTextOutlined,
  BarChartOutlined,
  SafetyOutlined,
  SettingOutlined,
  BellOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
  ToolOutlined,
  CustomerServiceOutlined,
  MessageOutlined,
} from "@ant-design/icons";

const { Sider, Header, Content } = Layout;
const { Text } = Typography;

// ==================== 类型定义 ====================

export interface AppLayoutProps {
  children: React.ReactNode;
}

// ==================== 菜单配置 ====================

/**
 * 左侧主导航菜单项
 */
const primaryMenuItems: MenuProps["items"] = [
  {
    key: "home",
    icon: <HomeOutlined />,
    label: "首页",
  },
  {
    key: "tasks",
    icon: <FileTextOutlined />,
    label: "任务",
  },
  {
    key: "leads",
    icon: <SearchOutlined />,
    label: "线索",
  },
  {
    key: "students",
    icon: <UserOutlined />,
    label: "学员",
  },
  {
    key: "orders",
    icon: <ShoppingOutlined />,
    label: "订单",
  },
  {
    key: "products",
    icon: <BookOutlined />,
    label: "商品",
  },
  {
    key: "data",
    icon: <BarChartOutlined />,
    label: "数据",
  },
  {
    key: "quality",
    icon: <SafetyOutlined />,
    label: "质检",
  },
  {
    key: "settings",
    icon: <SettingOutlined />,
    label: "配置",
  },
];

/**
 * 二级导航菜单项（学员模块）
 */
const secondaryMenuItems: MenuProps["items"] = [
  {
    key: "tutoring-management",
    label: "辅导班管理",
  },
  {
    key: "class-roster",
    label: "班级花名册",
  },
  {
    key: "course-management",
    label: "课节管理",
  },
  {
    key: "exam-management",
    label: "考试管理",
  },
  {
    key: "one-on-one",
    label: "一对一学员",
  },
];

/**
 * 用户下拉菜单
 */
const userMenuItems: MenuProps["items"] = [
  {
    key: "profile",
    label: "个人信息",
    icon: <UserOutlined />,
  },
  {
    key: "settings",
    label: "设置",
    icon: <SettingOutlined />,
  },
  {
    type: "divider",
  },
  {
    key: "logout",
    label: "退出登录",
  },
];

// ==================== 主组件 ====================

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  // ==================== 状态管理 ====================
  
  const [primaryCollapsed, setPrimaryCollapsed] = useState(false);
  const [secondaryCollapsed, setSecondaryCollapsed] = useState(false);
  const [selectedPrimaryKey, setSelectedPrimaryKey] = useState("students");
  const [selectedSecondaryKey, setSelectedSecondaryKey] = useState("exam-management");

  // ==================== 事件处理 ====================

  /**
   * 主导航菜单点击
   */
  const handlePrimaryMenuClick: MenuProps["onClick"] = ({ key }) => {
    setSelectedPrimaryKey(key);
    console.log("主导航点击:", key);
    // TODO: 根据 key 进行路由跳转或状态更新
  };

  /**
   * 二级导航菜单点击
   */
  const handleSecondaryMenuClick: MenuProps["onClick"] = ({ key }) => {
    setSelectedSecondaryKey(key);
    console.log("二级导航点击:", key);
    // TODO: 根据 key 进行路由跳转
  };

  /**
   * 用户菜单点击
   */
  const handleUserMenuClick: MenuProps["onClick"] = ({ key }) => {
    console.log("用户菜单点击:", key);
    // TODO: 处理用户菜单操作（退出登录、个人设置等）
  };

  // ==================== 渲染 ====================

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* ==================== 左侧主导航 ==================== */}
      <Sider
        theme="dark"
        width={60}
        collapsed={true}
        collapsible={false}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          background: "#001529",
        }}
      >
        {/* Logo 区域 */}
        <div
          style={{
            height: 48,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "12px 0",
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "4px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            S
          </div>
        </div>

        {/* 主导航菜单 */}
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedPrimaryKey]}
          items={primaryMenuItems}
          onClick={handlePrimaryMenuClick}
          style={{
            borderRight: 0,
          }}
        />
      </Sider>

      {/* ==================== 左侧二级导航 ==================== */}
      <Sider
        theme="light"
        width={176}
        collapsed={secondaryCollapsed}
        collapsible={false}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 60,
          top: 0,
          bottom: 0,
          background: "#fff",
          borderRight: "1px solid #f0f0f0",
        }}
      >
        {/* 模块标题 */}
        <div
          style={{
            height: 48,
            display: "flex",
            alignItems: "center",
            padding: "0 16px",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          <Text strong style={{ fontSize: 16 }}>
            学员
          </Text>
        </div>

        {/* 二级导航菜单 */}
        <Menu
          mode="inline"
          selectedKeys={[selectedSecondaryKey]}
          items={secondaryMenuItems}
          onClick={handleSecondaryMenuClick}
          style={{
            borderRight: 0,
            marginTop: 8,
          }}
        />

        {/* 收起按钮 */}
        <div
          style={{
            position: "absolute",
            right: -10,
            top: "50%",
            transform: "translateY(-50%)",
            width: 10,
            height: 40,
            background: "#f0f0f0",
            borderRadius: "0 4px 4px 0",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setSecondaryCollapsed(!secondaryCollapsed)}
        >
          <div
            style={{
              width: 0,
              height: 0,
              borderTop: "4px solid transparent",
              borderBottom: "4px solid transparent",
              borderLeft: "4px solid #999",
              transform: secondaryCollapsed ? "rotate(180deg)" : "none",
            }}
          />
        </div>
      </Sider>

      {/* ==================== 主内容区 ==================== */}
      <Layout style={{ marginLeft: 236 }}>
        {/* ==================== 顶部导航栏 ==================== */}
        <Header
          style={{
            padding: "0 24px",
            background: "#fff",
            borderBottom: "1px solid #f0f0f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 48,
            lineHeight: "48px",
            position: "sticky",
            top: 0,
            zIndex: 1,
          }}
        >
          {/* 左侧：公告区域 */}
          <Space>
            <BellOutlined style={{ color: "#faad14" }} />
            <Text
              type="secondary"
              style={{ fontSize: 12, maxWidth: 400 }}
              ellipsis
            >
              平台迁移公告平台迁移公告平台迁移公告平台迁移公告平台迁移公告
            </Text>
          </Space>

          {/* 右侧：工具栏 + 用户信息 */}
          <Space size={16}>
            {/* 搜索框 */}
            <div
              style={{
                width: 200,
                height: 28,
                borderRadius: 2,
                border: "1px solid #d9d9d9",
                display: "flex",
                alignItems: "center",
                padding: "0 8px",
                background: "#fff",
              }}
            >
              <SearchOutlined
                style={{ color: "rgba(0,0,0,0.25)", marginRight: 4 }}
              />
              <input
                placeholder="搜索"
                style={{
                  border: "none",
                  outline: "none",
                  flex: 1,
                  fontSize: 12,
                  background: "transparent",
                }}
              />
            </div>

            {/* 图标工具栏 */}
            <Space size={8}>
              {/* 消息通知 */}
              <Badge count={3} size="small">
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 4,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "background 0.3s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#f5f5f5")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <BellOutlined style={{ fontSize: 16 }} />
                </div>
              </Badge>

              {/* 其他工具图标 */}
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 4,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "background 0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#f5f5f5")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                <ToolOutlined style={{ fontSize: 16 }} />
              </div>

              {/* 工具箱 */}
              <Space
                style={{
                  padding: "4px 8px",
                  borderRadius: 4,
                  cursor: "pointer",
                  transition: "background 0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#f5f5f5")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                <ToolOutlined style={{ fontSize: 14 }} />
                <Text style={{ fontSize: 12 }}>工具箱</Text>
              </Space>

              {/* 客服 */}
              <Space
                style={{
                  padding: "4px 8px",
                  borderRadius: 4,
                  cursor: "pointer",
                  transition: "background 0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#f5f5f5")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                <CustomerServiceOutlined style={{ fontSize: 14 }} />
                <Text style={{ fontSize: 12 }}>客服</Text>
              </Space>

              {/* 消息 */}
              <Badge count={3} size="small">
                <Space
                  style={{
                    padding: "4px 8px",
                    borderRadius: 4,
                    cursor: "pointer",
                    transition: "background 0.3s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#f5f5f5")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <MessageOutlined style={{ fontSize: 14 }} />
                  <Text style={{ fontSize: 12 }}>消息</Text>
                </Space>
              </Badge>

              {/* 用户头像下拉菜单 */}
              <Dropdown
                menu={{ items: userMenuItems, onClick: handleUserMenuClick }}
                placement="bottomRight"
              >
                <div
                  style={{
                    cursor: "pointer",
                    padding: "4px 0",
                  }}
                >
                  <Avatar
                    size={24}
                    style={{ background: "#2266FF" }}
                    icon={<UserOutlined />}
                  />
                </div>
              </Dropdown>
            </Space>
          </Space>
        </Header>

        {/* ==================== 内容区 ==================== */}
        <Content
          style={{
            margin: 0,
            padding: 0,
            minHeight: "calc(100vh - 48px)",
            background: "#f5f5f5",
          }}
        >
          {/* 渲染子组件 */}
          {children}
        </Content>
      </Layout>

      {/* ==================== 右下角客服按钮 ==================== */}
      <div
        style={{
          position: "fixed",
          right: 24,
          bottom: 24,
          width: 48,
          height: 48,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 1000,
          transition: "transform 0.3s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <QuestionCircleOutlined
          style={{ color: "#fff", fontSize: 20, marginBottom: 2 }}
        />
        <Text style={{ color: "#fff", fontSize: 11 }}>客服</Text>
      </div>
    </Layout>
  );
};

export default AppLayout;
