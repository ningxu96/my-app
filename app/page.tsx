"use client";

import React, { useState } from "react";
import {
  Layout,
  Menu,
  Typography,
  Avatar,
  Button,
  Card,
  Space,
  Input,
  DatePicker,
  Table,
  Tag,
  Pagination,
  message,
} from "antd";
import {
  HomeOutlined,
  ProfileOutlined,
  AppstoreOutlined,
  ToolOutlined,
  MessageOutlined,
  BellOutlined,
  UserOutlined,
  TagsOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import type { RangePickerProps } from "antd/es/date-picker";

const { Sider, Content } = Layout;
const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

interface TagRecord {
  key: string;
  group: string;
  value: string;
  scope: string;
  lastUsedAt: string;
  userCount: number;
  wechatCount: number;
}

const mockData: TagRecord[] = [
  {
    key: "1",
    group: "意向等级",
    value: "高意向",
    scope: "全渠道",
    lastUsedAt: "2025-02-10",
    userCount: 152,
    wechatCount: 98,
  },
  {
    key: "2",
    group: "意向等级",
    value: "中意向",
    scope: "企业微信",
    lastUsedAt: "2025-02-08",
    userCount: 320,
    wechatCount: 210,
  },
  {
    key: "3",
    group: "客户阶段",
    value: "已成交",
    scope: "线索系统",
    lastUsedAt: "2025-02-09",
    userCount: 68,
    wechatCount: 45,
  },
  {
    key: "4",
    group: "客户阶段",
    value: "跟进中",
    scope: "企业微信",
    lastUsedAt: "2025-02-11",
    userCount: 430,
    wechatCount: 300,
  },
];

const columns: ColumnsType<TagRecord> = [
  {
    title: "标签组",
    dataIndex: "group",
    key: "group",
    width: 140,
  },
  {
    title: "标签值",
    dataIndex: "value",
    key: "value",
    render: (text: string) => <Tag color="blue">{text}</Tag>,
    width: 160,
  },
  {
    title: "适用范围",
    dataIndex: "scope",
    key: "scope",
    width: 160,
  },
  {
    title: "最近使用日期",
    dataIndex: "lastUsedAt",
    key: "lastUsedAt",
    width: 160,
  },
  {
    title: "使用人数",
    dataIndex: "userCount",
    key: "userCount",
    width: 130,
  },
  {
    title: "标记微信数",
    dataIndex: "wechatCount",
    key: "wechatCount",
    width: 150,
  },
  {
    title: "操作",
    key: "action",
    width: 120,
    render: () => (
      <Button
        type="link"
        size="small"
        onClick={() => message.info("点击了编辑（示例）")}
      >
        编辑
      </Button>
    ),
  },
];

export default function TagManagementPage() {
  const [searchText, setSearchText] = useState("");
  const [dateRange, setDateRange] = useState<RangePickerProps["value"]>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = () => {
    // 这里只做前端模拟：打印参数 + 提示
    // 真正接后端时可以把这些参数传给接口
    /* eslint-disable no-console */
    console.log("查询参数：", {
      searchText,
      dateRange,
      currentPage,
    });
    /* eslint-enable no-console */
    message.success("保存成功（示例）：已根据筛选条件刷新标签列表");
  };

  const handleSyncWechatTags = () => {
    message.loading({
      content: "正在同步企微标签（示例）...",
      duration: 1.5,
    });
  };

  const handleExport = () => {
    message.success("导出成功（示例）：已导出当前筛选结果");
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
        background: "#f5f5f5",
      }}
    >
      {/* 左侧主导航区域（8% 宽） */}
      <Sider
        width="8%"
        style={{
          background: "#001529",
          display: "flex",
          flexDirection: "column",
          padding: "16px 8px",
        }}
      >
        {/* Logo 区域 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 24,
            padding: "0 8px",
          }}
        >
          <Avatar size="small" style={{ backgroundColor: "#1890ff" }}>
            L
          </Avatar>
          <Text style={{ color: "#fff", fontWeight: 500 }} ellipsis>
            EES
          </Text>
        </div>

        {/* 功能导航菜单 */}
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["operation"]}
          items={[
            {
              key: "home",
              icon: <HomeOutlined />,
              label: "首页",
            },
            {
              key: "task",
              icon: <ProfileOutlined />,
              label: "任务",
            },
            {
              key: "operation",
              icon: <AppstoreOutlined />,
              label: "运营",
            },
          ]}
        />
      </Sider>

      {/* 右侧整体区域（包含中列和右列） */}
      <Layout>
        {/* 中间页面侧边导航区域（16% 宽） */}
        <Sider
          width="16%"
          style={{
            background: "#ffffff",
            borderRight: "1px solid #f0f0f0",
            padding: "24px 16px",
          }}
        >
          <Title level={4} style={{ marginBottom: 24 }}>
            运营
          </Title>

          <Space direction="vertical" style={{ width: "100%" }}>
            {/* 这里用 Button 模拟 Tab */}
            <Button
              type="text"
              block
              style={{ justifyContent: "flex-start" }}
            >
              服务阶段管理
            </Button>
            <Button
              type="text"
              block
              style={{ justifyContent: "flex-start" }}
            >
              线索上限管理
            </Button>
            <Button
              type="text"
              block
              icon={<TagsOutlined />}
              style={{
                justifyContent: "flex-start",
                background: "#e6f4ff",
                color: "#1677ff",
              }}
            >
              企微标签管理
            </Button>
          </Space>
        </Sider>

        {/* 右侧页面内容区域（76% 宽） */}
        <Layout
          style={{
            padding: "16px 24px",
            background: "#f5f5f5",
          }}
        >
          {/* 顶部功能性按钮区域（高度约 8%） */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              marginBottom: 16,
              gap: 24,
            }}
          >
            <Space>
              <ToolOutlined />
              <Text>工具箱</Text>
            </Space>
            <Space>
              <MessageOutlined />
              <Text>反馈</Text>
            </Space>
            <Space>
              <BellOutlined />
              <Text>消息</Text>
            </Space>
            <Avatar icon={<UserOutlined />} />
          </div>

          {/* 页面白底大卡片（四周 12px 灰色区域） */}
          <div
            style={{
              padding: 12,
              background: "#f0f2f5",
              borderRadius: 8,
            }}
          >
            <Card
              styles={{
                body: {
                  padding: 24,
                },
              }}
              style={{
                borderRadius: 8,
                boxShadow:
                  "0 1px 2px rgba(0,0,0,0.03), 0 1px 6px rgba(0,0,0,0.06)",
              }}
            >
              {/* 卡片标题 + 右上角功能按钮 */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 24,
                }}
              >
                <Title level={4} style={{ margin: 0 }}>
                  标签管理
                </Title>
                <Space>
                  <Button onClick={handleExport}>导出</Button>
                  <Button type="primary" onClick={handleSyncWechatTags}>
                   同步企微标签
                  </Button>
                </Space>
              </div>

              {/* 标题下方筛选区域 */}
              <Space
                style={{ marginBottom: 24 }}
                wrap
                align="center"
                size="middle"
              >
                <Input
                  style={{ width: 220 }}
                  placeholder="搜索标签"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <RangePicker
                  value={dateRange as any}
                  onChange={(v) => setDateRange(v)}
                />
                <Button type="primary" onClick={handleSearch}>
                  查询
                </Button>
              </Space>

              {/* 表格区域 */}
              <Table<TagRecord>
                columns={columns}
                dataSource={mockData}
                pagination={false}
                size="middle"
                bordered={false}
              />

              {/* 右下角分页组件 */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: 16,
                }}
              >
                <Pagination
                  current={currentPage}
                  pageSize={10}
                  total={120}
                  onChange={setCurrentPage}
                  showSizeChanger={false}
                />
              </div>
            </Card>
          </div>
        </Layout>
      </Layout>
    </Layout>
  );
}