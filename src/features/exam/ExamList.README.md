# 考试管理列表页面 - 组件说明

## 📐 Figma 设计与代码对应关系

### 1. **顶部筛选区域（Search Filter Section）**

**Figma 设计元素：**
- 搜索输入框（带搜索图标）
- 状态下拉选择器
- 时间范围选择器（双日期选择器）
- 操作按钮组（查询、重置）

**代码对应组件：**
```tsx
<Form layout="inline">
  <Form.Item name="keyword">
    <Input prefix={<SearchOutlined />} placeholder="请输入考试名称或编号" />
  </Form.Item>
  
  <Form.Item name="status">
    <Select placeholder="考试状态">...</Select>
  </Form.Item>
  
  <Form.Item name="dateRange">
    <RangePicker placeholder={['开始时间', '结束时间']} />
  </Form.Item>
  
  <Form.Item>
    <Button type="primary">查询</Button>
    <Button>重置</Button>
  </Form.Item>
</Form>
```

---

### 2. **操作栏区域（Action Bar）**

**Figma 设计元素：**
- 主要操作按钮（新建考试）
- 可选的批量操作按钮

**代码对应组件：**
```tsx
<div style={{ marginBottom: 16 }}>
  <Button type="primary" icon={<PlusOutlined />}>
    新建考试
  </Button>
</div>
```

---

### 3. **数据表格区域（Data Table）**

**Figma 设计元素：**
- 表头行（列标题）
- 数据行（多行考试记录）
- 状态标签（彩色标签）
- 操作列（查看、编辑、删除按钮）

**代码对应组件：**
```tsx
<Table
  columns={[
    { title: '考试编号', dataIndex: 'examCode' },
    { title: '考试名称', dataIndex: 'examName' },
    { title: '考试时间', dataIndex: 'examTime' },
    { 
      title: '状态', 
      dataIndex: 'status',
      render: (status) => <Tag color={...}>{...}</Tag>
    },
    { title: '参与人数', dataIndex: 'participants' },
    { 
      title: '操作',
      render: (_, record) => (
        <Space>
          <Button icon={<EyeOutlined />}>查看</Button>
          <Button icon={<EditOutlined />}>编辑</Button>
          <Popconfirm><Button danger>删除</Button></Popconfirm>
        </Space>
      )
    }
  ]}
  dataSource={dataSource}
/>
```

**状态标签映射：**
- 未开始（pending）→ 灰色标签
- 进行中（ongoing）→ 蓝色标签
- 已完成（completed）→ 绿色标签
- 已取消（cancelled）→ 红色标签

---

### 4. **底部分页区域（Pagination）**

**Figma 设计元素：**
- 分页控件（页码、上一页、下一页）
- 每页显示数量选择器
- 总记录数显示

**代码对应组件：**
```tsx
<Pagination
  current={currentPage}
  pageSize={pageSize}
  total={total}
  showSizeChanger
  showQuickJumper
  showTotal={(total) => `共 ${total} 条记录`}
  onChange={handlePageChange}
/>
```

---

## 🎨 设计规范映射

| Figma 设计元素 | Ant Design 组件 | 说明 |
|---------------|----------------|------|
| 输入框 | `<Input />` | 带前缀图标的搜索框 |
| 下拉选择器 | `<Select />` | 状态选择器 |
| 日期范围选择器 | `<RangePicker />` | 双日期选择 |
| 主按钮 | `<Button type="primary" />` | 查询、新建等主要操作 |
| 次按钮 | `<Button />` | 重置等次要操作 |
| 状态标签 | `<Tag />` | 彩色状态指示器 |
| 数据表格 | `<Table />` | 数据列表展示 |
| 分页器 | `<Pagination />` | 底部分页控件 |
| 操作菜单 | `<Space />` + `<Button type="link" />` | 行内操作按钮组 |
| 确认对话框 | `<Popconfirm />` | 删除确认 |

---

## 🔧 安装依赖

```bash
npm install antd dayjs @ant-design/icons
# 或
yarn add antd dayjs @ant-design/icons
```

## 📦 使用方式

```tsx
import ExamListPage from './ExamListPage';

function App() {
  return <ExamListPage />;
}
```

## 🔌 API 集成说明

代码中已预留 `fetchExamList` 函数，需要替换 Mock 实现：

```typescript
// 当前 Mock 实现（第 62-102 行）
const fetchExamList = async (params: QueryParams): Promise<ExamListResponse> => {
  // Mock 数据...
};

// 替换为实际 API 调用
const fetchExamList = async (params: QueryParams): Promise<ExamListResponse> => {
  const response = await axios.get('/api/exams', { params });
  return response.data;
};
```

## 📊 数据结构

```typescript
interface ExamRecord {
  id: string;              // 考试 ID
  examCode: string;        // 考试编号
  examName: string;        // 考试名称
  examTime: string;        // 考试时间
  status: 'pending' | 'ongoing' | 'completed' | 'cancelled'; // 状态
  participants: number;    // 参与人数
  createdAt: string;       // 创建时间
}
```

## 🎯 功能清单

- ✅ 关键字搜索（考试名称/编号）
- ✅ 状态筛选（未开始/进行中/已完成/已取消）
- ✅ 时间范围筛选
- ✅ 数据表格展示
- ✅ 状态标签展示
- ✅ 分页功能
- ✅ 新建考试（预留）
- ✅ 查看详情（预留）
- ✅ 编辑功能（预留）
- ✅ 删除确认（预留）

## 🎨 视觉还原度

根据 Figma 设计：
- ✅ 布局结构完全一致（筛选 → 操作栏 → 表格 → 分页）
- ✅ 组件类型匹配（输入框、选择器、日期范围、表格）
- ✅ 状态标签颜色语义化
- ✅ 响应式分页控件
- ✅ 操作按钮图标化

## 📝 待实现功能

1. **API 集成**：替换 Mock 数据为真实 API
2. **路由跳转**：新建、编辑、详情页面路由
3. **权限控制**：根据用户权限显示/隐藏操作按钮
4. **批量操作**：勾选多行进行批量删除等操作
5. **导出功能**：导出考试列表为 Excel
6. **高级筛选**：更多筛选条件（创建人、科目等）

---

**文件位置：** `/home/claude/ExamListPage.tsx`
