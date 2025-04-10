import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AddIcon from '@mui/icons-material/Add';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import EditIcon from '@mui/icons-material/Edit';
import ReceiptIcon from '@mui/icons-material/Receipt';
import StarIcon from '@mui/icons-material/Star';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { useState } from 'react';

// 样式组件
const SectionContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(5),
}));

const SectionHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
}));

const SettingsIcon = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  padding: theme.spacing(1),
  marginRight: theme.spacing(2),
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  color: theme.palette.primary.main,
}));

const SettingsContainer = styled(Box)(({ theme }) => ({
  backgroundColor: alpha('#f5f5f5', 0.5),
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const PlanCard = styled(Card)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius * 2,
  transition: 'all 0.2s',
  '&:hover': {
    boxShadow: theme.shadows[2],
  },
}));

const PlanCardHighlight = styled(Card)(({ theme }) => ({
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: `0 0 0 1px ${alpha(theme.palette.primary.main, 0.3)}`,
  position: 'relative',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: -1,
    left: -1,
    right: -1,
    height: 4,
    backgroundColor: theme.palette.primary.main,
    borderRadius: `${theme.shape.borderRadius * 2}px ${theme.shape.borderRadius * 2}px 0 0`,
  },
  transition: 'all 0.2s',
  '&:hover': {
    boxShadow: theme.shadows[3],
  },
}));

// 创建示例数据
const paymentMethods = [
  { id: 'card1', type: 'visa', last4: '4242', expiry: '04/26', name: '张三', default: true },
  { id: 'card2', type: 'mastercard', last4: '8888', expiry: '09/25', name: '张三', default: false },
];

const invoices = [
  { id: 'INV-001', date: '2023-04-01', amount: '¥199.00', status: '已支付', plan: '团队版' },
  { id: 'INV-002', date: '2023-05-01', amount: '¥199.00', status: '已支付', plan: '团队版' },
  { id: 'INV-003', date: '2023-06-01', amount: '¥199.00', status: '已支付', plan: '团队版' },
  { id: 'INV-004', date: '2023-07-01', amount: '¥199.00', status: '已支付', plan: '团队版' },
];

const plans = [
  {
    id: 'free',
    name: '免费版',
    price: '¥0',
    period: '永久',
    features: ['最多3个用户', '基础功能', '社区支持'],
    current: false,
    popular: false,
  },
  {
    id: 'pro',
    name: '专业版',
    price: '¥99',
    period: '每月',
    features: ['最多10个用户', '所有基础功能', '优先支持', '高级分析'],
    current: false,
    popular: false,
  },
  {
    id: 'team',
    name: '团队版',
    price: '¥199',
    period: '每月',
    features: ['最多25个用户', '所有专业版功能', '团队协作工具', '24/7支持'],
    current: true,
    popular: true,
  },
  {
    id: 'enterprise',
    name: '企业版',
    price: '联系我们',
    period: '定制',
    features: ['无限用户', '所有团队版功能', '专属客户经理', '定制化功能', 'SLA保障'],
    current: false,
    popular: false,
  },
];

function WorkspaceBilling() {
  const [autoRenew, setAutoRenew] = useState(true);

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold">
        账单与计划
      </Typography>
      <Typography color="text.secondary" variant="body1" sx={{ mt: 1, mb: 4 }}>
        管理您的订阅计划、查看账单历史并更新付款方式
      </Typography>

      <Divider sx={{ mb: 4 }} />

      {/* 当前计划 */}
      <SectionContainer>
        <SectionHeader>
          <SettingsIcon>
            <StarIcon />
          </SettingsIcon>
          <Typography variant="h6" fontWeight="medium">
            当前计划
          </Typography>
        </SectionHeader>

        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3, pl: { xs: 0, sm: 6 } }}>
          查看和管理您当前的订阅计划
        </Typography>

        <Box sx={{ pl: { xs: 0, sm: 6 } }}>
          <SettingsContainer>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" fontWeight="medium">
                团队版
              </Typography>
              <Typography variant="body2" color="text.secondary">
                您当前的计划于2023年8月1日续费
              </Typography>
            </Box>

            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}
            >
              <Box>
                <Typography variant="h5" fontWeight="bold" color="primary">
                  ¥199.00
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  每月
                </Typography>
              </Box>
              <Chip label="当前计划" color="primary" size="small" variant="outlined" />
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={autoRenew}
                    onChange={(e) => setAutoRenew(e.target.checked)}
                    color="primary"
                  />
                }
                label={
                  <Box>
                    <Typography variant="subtitle2">自动续订</Typography>
                    <Typography variant="body2" color="text.secondary">
                      到期时自动续订您的订阅
                    </Typography>
                  </Box>
                }
              />
              <Button variant="outlined" color="primary">
                更改计划
              </Button>
            </Box>
          </SettingsContainer>
        </Box>
      </SectionContainer>

      <Divider sx={{ my: 4 }} />

      {/* 付款方式 */}
      <SectionContainer>
        <SectionHeader>
          <SettingsIcon>
            <CreditCardIcon />
          </SettingsIcon>
          <Typography variant="h6" fontWeight="medium">
            付款方式
          </Typography>
        </SectionHeader>

        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3, pl: { xs: 0, sm: 6 } }}>
          管理您的付款方式和账单信息
        </Typography>

        <Box sx={{ pl: { xs: 0, sm: 6 } }}>
          <SettingsContainer>
            {paymentMethods.map((method) => (
              <Box
                key={method.id}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  p: 2,
                  mb: 2,
                  border: '1px solid',
                  borderColor: method.default ? 'primary.main' : 'divider',
                  borderRadius: 2,
                  bgcolor: method.default ? alpha('#f5f5f5', 0.8) : 'transparent',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ mr: 2 }}>
                    {method.type === 'visa' ? (
                      <CreditCardIcon color="primary" />
                    ) : (
                      <CreditCardIcon color="secondary" />
                    )}
                  </Box>
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="subtitle2">
                        {method.type === 'visa' ? 'Visa' : 'Mastercard'} **** {method.last4}
                      </Typography>
                      {method.default ? (
                        <Chip
                          label="默认"
                          size="small"
                          color="primary"
                          variant="outlined"
                          sx={{ ml: 1, height: 20 }}
                        />
                      ) : null}
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      到期日: {method.expiry}
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <IconButton size="small">
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" color="error">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            ))}
            <Button startIcon={<AddIcon />} variant="outlined" sx={{ mt: 1 }}>
              添加新付款方式
            </Button>
          </SettingsContainer>
        </Box>
      </SectionContainer>

      <Divider sx={{ my: 4 }} />

      {/* 账单历史 */}
      <SectionContainer>
        <SectionHeader>
          <SettingsIcon>
            <ReceiptIcon />
          </SettingsIcon>
          <Typography variant="h6" fontWeight="medium">
            账单历史
          </Typography>
        </SectionHeader>

        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3, pl: { xs: 0, sm: 6 } }}>
          查看和下载您的历史账单和发票
        </Typography>

        <Box sx={{ pl: { xs: 0, sm: 6 } }}>
          <SettingsContainer>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>发票号</TableCell>
                    <TableCell>日期</TableCell>
                    <TableCell>计划</TableCell>
                    <TableCell>金额</TableCell>
                    <TableCell>状态</TableCell>
                    <TableCell align="right">操作</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell>{invoice.id}</TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>{invoice.plan}</TableCell>
                      <TableCell>{invoice.amount}</TableCell>
                      <TableCell>
                        <Chip
                          label={invoice.status}
                          color="success"
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton size="small">
                          <DownloadIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </SettingsContainer>
        </Box>
      </SectionContainer>

      <Divider sx={{ my: 4 }} />

      {/* 可用计划 */}
      <SectionContainer>
        <SectionHeader>
          <SettingsIcon>
            <AccountBalanceIcon />
          </SettingsIcon>
          <Typography variant="h6" fontWeight="medium">
            可用计划
          </Typography>
        </SectionHeader>

        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3, pl: { xs: 0, sm: 6 } }}>
          浏览我们的订阅计划并找到最适合您团队的选择
        </Typography>

        <Box sx={{ pl: { xs: 0, sm: 6 } }}>
          <Grid container spacing={3}>
            {plans.map((plan) => {
              const PlanCardComponent = plan.popular ? PlanCardHighlight : PlanCard;

              return (
                <Grid key={plan.id} size={{ xs: 12, md: 6 }}>
                  <PlanCardComponent>
                    <CardHeader
                      title={
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Typography variant="h6">{plan.name}</Typography>
                          {plan.popular ? (
                            <Chip
                              label="最受欢迎"
                              size="small"
                              color="primary"
                              sx={{ height: 20 }}
                            />
                          ) : null}
                        </Box>
                      }
                      subheader={
                        <Box sx={{ mt: 1 }}>
                          <Typography
                            variant="h5"
                            fontWeight="bold"
                            color={plan.current ? 'primary' : 'inherit'}
                          >
                            {plan.price}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {plan.period}
                          </Typography>
                        </Box>
                      }
                    />
                    <CardContent>
                      <Divider sx={{ mb: 2 }} />
                      <Stack spacing={1}>
                        {plan.features.map((feature, index) => (
                          <Typography key={index} variant="body2">
                            • {feature}
                          </Typography>
                        ))}
                      </Stack>
                      <Button
                        variant={plan.current ? 'outlined' : 'contained'}
                        fullWidth
                        color="primary"
                        sx={{ mt: 3 }}
                      >
                        {plan.current ? '当前计划' : '选择计划'}
                      </Button>
                    </CardContent>
                  </PlanCardComponent>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </SectionContainer>
    </Box>
  );
}

export const Component = WorkspaceBilling;
