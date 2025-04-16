import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';

const meta = {
  title: 'MUI/Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'subtitle1',
        'subtitle2',
        'body1',
        'body2',
        'button',
        'caption',
        'overline',
      ],
    },
    align: {
      control: 'select',
      options: ['inherit', 'left', 'center', 'right', 'justify'],
    },
    color: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'error',
        'warning',
        'info',
        'success',
        'text.primary',
        'text.secondary',
        'text.disabled',
      ],
    },
    gutterBottom: { control: 'boolean' },
    noWrap: { control: 'boolean' },
    paragraph: { control: 'boolean' },
    children: { control: 'text' },
  },
  args: {
    children: '这是一个Typography示例文本',
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Variants: Story = {
  render: () => (
    <Stack spacing={2}>
      <Typography variant="h1">标题 1</Typography>
      <Typography variant="h2">标题 2</Typography>
      <Typography variant="h3">标题 3</Typography>
      <Typography variant="h4">标题 4</Typography>
      <Typography variant="h5">标题 5</Typography>
      <Typography variant="h6">标题 6</Typography>
      <Typography variant="subtitle1">副标题 1</Typography>
      <Typography variant="subtitle2">副标题 2</Typography>
      <Typography variant="body1">
        正文 1：这是一段较长的文本，用于展示正文排版。正文通常用于页面的主要内容区域。
      </Typography>
      <Typography variant="body2">
        正文 2：这是一段较长的文本，用于展示正文排版。通常比正文1小一些。
      </Typography>
      <Typography variant="button">按钮文本</Typography>
      <Typography variant="caption">说明文本：用于辅助说明</Typography>
      <Typography variant="overline">上标文本</Typography>
    </Stack>
  ),
};

export const Alignment: Story = {
  render: () => (
    <Stack spacing={2} sx={{ width: '100%', maxWidth: 500 }}>
      <Typography variant="h6" align="left">
        左对齐文本
      </Typography>
      <Typography variant="h6" align="center">
        居中对齐文本
      </Typography>
      <Typography variant="h6" align="right">
        右对齐文本
      </Typography>
      <Typography variant="body1" align="justify">
        两端对齐文本。这是一段较长的文本示例，用于展示两端对齐效果。文本会在容器的两侧对齐，中间的空白会自动调整，使得每一行的长度尽可能一致。
      </Typography>
    </Stack>
  ),
};

export const Colors: Story = {
  render: () => (
    <Stack spacing={1}>
      <Typography color="primary">主色文本</Typography>
      <Typography color="secondary">次色文本</Typography>
      <Typography color="error">错误色文本</Typography>
      <Typography color="warning.main">警告色文本</Typography>
      <Typography color="info.main">信息色文本</Typography>
      <Typography color="success.main">成功色文本</Typography>
      <Typography color="text.primary">主要文本色</Typography>
      <Typography color="text.secondary">次要文本色</Typography>
      <Typography color="text.disabled">禁用文本色</Typography>
    </Stack>
  ),
};

export const TextProperties: Story = {
  render: () => (
    <Stack spacing={3} sx={{ width: '100%', maxWidth: 350 }}>
      <Typography variant="h6">默认标题</Typography>

      <Typography variant="h6" gutterBottom>
        带底部边距的标题
      </Typography>

      <div style={{ width: 200, border: '1px dashed grey', padding: 8 }}>
        <Typography noWrap>
          这是一段很长的文本，当启用noWrap属性时，文本不会换行而是被截断并显示省略号...
        </Typography>
      </div>

      <Typography paragraph>
        这是一个段落。当使用paragraph属性时，Typography会渲染为一个p元素，并自动添加底部边距。这有助于创建适当的文本间距。
      </Typography>
    </Stack>
  ),
};

export const Responsive: Story = {
  render: () => (
    <Typography
      sx={{
        typography: {
          xs: 'body2', // 在超小屏幕上显示为body2
          sm: 'body1', // 在小屏幕上显示为body1
          md: 'h6', // 在中等屏幕上显示为h6
          lg: 'h5', // 在大屏幕上显示为h5
          xl: 'h4', // 在超大屏幕上显示为h4
        },
      }}
    >
      响应式文本 - 根据屏幕大小变化
    </Typography>
  ),
};
