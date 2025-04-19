import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';

import { blue, brand, gray, green, orange, red } from '../theme/themePrimitives';

const meta = {
  title: '设计系统/颜色',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// 颜色卡片组件
const ColorSwatch = ({ color, name, value }: { color: string; name: string; value: string }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      mb: 2,
    }}
  >
    <Box
      sx={{
        bgcolor: color,
        width: '100%',
        height: 80,
        borderRadius: 1,
        mb: 1,
        boxShadow: 1,
      }}
    />
    <Typography variant="body2" fontWeight="bold">
      {name}
    </Typography>
    <Typography variant="caption" color="text.secondary">
      {value}
    </Typography>
  </Box>
);

// 色阶组件
const ColorScale = ({ title, colors }: { title: string; colors: Record<string, string> }) => {
  const theme = useTheme();

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {title}
      </Typography>
      <Grid container spacing={2}>
        {Object.entries(colors).map(([key, value]) => (
          <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }} key={key}>
            <ColorSwatch color={value} name={`${title} ${key}`} value={value} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

// 分层颜色组件
const LayeredColor = ({
  label,
  color,
  description,
}: {
  label: string;
  color: string;
  description: string;
}) => {
  const theme = useTheme();

  return (
    <Paper
      sx={{
        bgcolor: color,
        p: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Typography variant="h6">{label}</Typography>
      <Box>
        <Typography variant="body2" sx={{ mb: 1, opacity: 0.8 }}>
          {description}
        </Typography>
        <Typography variant="caption" sx={{ opacity: 0.6 }}>
          {color}
        </Typography>
      </Box>
    </Paper>
  );
};

export const 颜色色阶: Story = {
  render: () => {
    const RenderComponent = () => {
      const theme = useTheme();

      return (
        <Box sx={{ p: 4 }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            颜色色阶
          </Typography>
          <Typography variant="body2" sx={{ mb: 4 }}>
            当前主题模式: {theme.palette.mode === 'dark' ? '暗色' : '亮色'}
          </Typography>

          <ColorScale title="品牌色" colors={brand} />
          <ColorScale title="灰色" colors={gray} />
          <ColorScale title="绿色" colors={green} />
          <ColorScale title="橙色" colors={orange} />
          <ColorScale title="红色" colors={red} />
          <ColorScale title="蓝色" colors={blue} />
        </Box>
      );
    };

    return <RenderComponent />;
  },
};

export const 颜色分层: Story = {
  render: () => {
    const RenderComponent = () => {
      const theme = useTheme();
      console.log('Current theme mode:', theme.palette.mode);

      // 根据当前主题模式获取正确的颜色值
      const bgColors =
        theme.palette.mode === 'light'
          ? {
              background: 'hsl(0, 0.00%, 98.00%)',
              paper: 'hsl(0, 0.00%, 96.40%)',
              surface: 'hsl(0, 0.00%, 93.60%)',
              control: 'hsl(0, 0.00%, 94.80%)',
            }
          : {
              background: 'hsl(0, 0.00%, 9.00%)',
              paper: 'hsl(0, 0.00%, 12.00%)',
              surface: 'hsl(0, 0.00%, 15.00%)',
              control: 'hsl(0, 0.00%, 18.00%)',
            };

      return (
        <Box sx={{ p: 4 }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            颜色分层
          </Typography>
          <Typography variant="body2" sx={{ mb: 4 }}>
            当前主题模式: {theme.palette.mode === 'dark' ? '暗色' : '亮色'}
          </Typography>

          <Box
            sx={{
              p: 4,
              bgcolor: bgColors.background,
              borderRadius: 3,
              boxShadow: 3,
            }}
          >
            <Typography variant="h5" sx={{ mb: 3 }}>
              背景层次结构
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              颜色分层帮助创建视觉层次结构，使界面更易于理解和使用。
            </Typography>

            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                <LayeredColor
                  label="Background"
                  color={bgColors.background}
                  description="应用的主要背景颜色，最底层"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                <LayeredColor
                  label="Paper"
                  color={bgColors.paper}
                  description="卡片、面板等元素的背景"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                <LayeredColor
                  label="Surface"
                  color={bgColors.surface}
                  description="界面表面，比如表格、列表等"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                <LayeredColor
                  label="Control"
                  color={bgColors.control}
                  description="控件背景，如按钮、输入框等"
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      );
    };

    return <RenderComponent />;
  },
};

export const 颜色层次可视化: Story = {
  render: () => {
    const RenderComponent = () => {
      const theme = useTheme();

      // 根据当前主题模式获取正确的颜色值
      const bgColors =
        theme.palette.mode === 'light'
          ? {
              background: 'hsl(0, 0.00%, 98.00%)',
              paper: 'hsl(0, 0.00%, 96.40%)',
              surface: 'hsl(0, 0.00%, 93.60%)',
              control: 'hsl(0, 0.00%, 94.80%)',
            }
          : {
              background: 'hsl(0, 0.00%, 9.00%)',
              paper: 'hsl(0, 0.00%, 12.00%)',
              surface: 'hsl(0, 0.00%, 15.00%)',
              control: 'hsl(0, 0.00%, 18.00%)',
            };

      return (
        <Box sx={{ p: 4 }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            颜色层次结构可视化
          </Typography>
          <Typography variant="body2" sx={{ mb: 4 }}>
            当前主题模式: {theme.palette.mode === 'dark' ? '暗色' : '亮色'}
          </Typography>

          <Box
            sx={{
              p: 4,
              bgcolor: bgColors.background,
              borderRadius: 3,
              mb: 4,
              position: 'relative',
              minHeight: 550,
            }}
          >
            <Typography variant="overline" sx={{ position: 'absolute', top: 16, left: 16 }}>
              Background
            </Typography>

            <Box
              sx={{
                p: 3,
                bgcolor: bgColors.paper,
                borderRadius: 2,
                mt: 5,
                mx: 2,
                position: 'relative',
                minHeight: 450,
              }}
            >
              <Typography variant="overline" sx={{ position: 'absolute', top: 12, left: 12 }}>
                Paper
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  gap: 3,
                  mt: 5,
                }}
              >
                <Box
                  sx={{
                    flex: 2,
                    p: 3,
                    bgcolor: bgColors.surface,
                    borderRadius: 2,
                    position: 'relative',
                    minHeight: 350,
                  }}
                >
                  <Typography variant="overline" sx={{ position: 'absolute', top: 12, left: 12 }}>
                    Surface
                  </Typography>

                  <Stack spacing={2} sx={{ mt: 5 }}>
                    <Box
                      sx={{
                        p: 2,
                        bgcolor: bgColors.control,
                        borderRadius: 1,
                      }}
                    >
                      <Typography variant="overline">Control</Typography>
                      <Typography variant="body2">控件元素，如按钮、输入框等</Typography>
                    </Box>

                    <Box
                      sx={{
                        p: 2,
                        bgcolor: bgColors.control,
                        borderRadius: 1,
                      }}
                    >
                      <Typography variant="overline">Control</Typography>
                      <Typography variant="body2">控件元素示例</Typography>
                    </Box>
                  </Stack>
                </Box>

                <Box
                  sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                  }}
                >
                  <Box
                    sx={{
                      p: 3,
                      bgcolor: bgColors.surface,
                      borderRadius: 2,
                      position: 'relative',
                      flex: 1,
                    }}
                  >
                    <Typography variant="overline" sx={{ position: 'absolute', top: 12, left: 12 }}>
                      Surface
                    </Typography>

                    <Box
                      sx={{
                        p: 2,
                        mt: 5,
                        bgcolor: bgColors.control,
                        borderRadius: 1,
                      }}
                    >
                      <Typography variant="overline">Control</Typography>
                      <Typography variant="body2">控件</Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      p: 3,
                      bgcolor: bgColors.surface,
                      borderRadius: 2,
                      position: 'relative',
                      flex: 1,
                    }}
                  >
                    <Typography variant="overline" sx={{ position: 'absolute', top: 12, left: 12 }}>
                      Surface
                    </Typography>

                    <Box
                      sx={{
                        p: 2,
                        mt: 5,
                        bgcolor: bgColors.control,
                        borderRadius: 1,
                      }}
                    >
                      <Typography variant="overline">Control</Typography>
                      <Typography variant="body2">控件</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      );
    };

    return <RenderComponent />;
  },
};
