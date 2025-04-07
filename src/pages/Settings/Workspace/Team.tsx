import { zodResolver } from '@hookform/resolvers/zod';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import FilterListIcon from '@mui/icons-material/FilterList';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import { bindMenu, bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';
import { MuiChipsInput } from 'mui-chips-input';
import React, { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

// 模拟成员数据
const teamMembers = [
  {
    id: 1,
    name: '张三',
    email: 'zhangsan@example.com',
    role: '管理员',
    avatar: '/avatars/avatar-1.jpg',
    status: '活跃',
    lastActive: '今天',
  },
  {
    id: 2,
    name: '李四',
    email: 'lisi@example.com',
    role: '成员',
    avatar: '/avatars/avatar-2.jpg',
    status: '活跃',
    lastActive: '昨天',
  },
  {
    id: 3,
    name: '王五',
    email: 'wangwu@example.com',
    role: '成员',
    avatar: '/avatars/avatar-3.jpg',
    status: '活跃',
    lastActive: '3天前',
  },
  {
    id: 4,
    name: '赵六',
    email: 'zhaoliu@example.com',
    role: '只读',
    avatar: '/avatars/avatar-4.jpg',
    status: '离线',
    lastActive: '1周前',
  },
  {
    id: 5,
    name: '钱七',
    email: 'qianqi@example.com',
    role: '成员',
    avatar: '/avatars/avatar-5.jpg',
    status: '活跃',
    lastActive: '今天',
  },
];

// 成员类型定义
interface TeamMember {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string;
  status: string;
  lastActive: string;
}

// 角色选项
const roles = [
  { value: 'admin', label: '管理员' },
  { value: 'member', label: '成员' },
  { value: 'readonly', label: '只读' },
];

// 验证邮箱格式
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// 表单验证 schema
const inviteFormSchema = z.object({
  emails: z
    .array(z.string().email({ message: '请输入有效的邮箱地址' }))
    .min(1, { message: '至少需要添加一个邮箱' }),
  role: z.enum(['admin', 'member', 'readonly']),
  sendWelcomeEmail: z.boolean().optional(),
});

type InviteFormValues = z.infer<typeof inviteFormSchema>;

// 成员行组件
const MemberRow = ({
  member,
  onEdit,
  onDelete,
}: {
  member: TeamMember;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}) => {
  const popupState = usePopupState({
    variant: 'popover',
    popupId: `member-menu-${member.id}`,
  });

  return (
    <TableRow key={member.id}>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar src={member.avatar} sx={{ mr: 2 }}>
            {member.name.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="subtitle2">{member.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {member.email}
            </Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell>
        <Chip
          label={member.role}
          color={member.role === '管理员' ? 'primary' : 'default'}
          size="small"
        />
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              bgcolor: member.status === '活跃' ? 'success.main' : 'text.disabled',
              mr: 1,
            }}
          />
          {member.status}
        </Box>
      </TableCell>
      <TableCell>{member.lastActive}</TableCell>
      <TableCell align="right">
        <IconButton size="small" {...bindTrigger(popupState)}>
          <MoreVertIcon fontSize="small" />
        </IconButton>
        <Menu
          {...bindMenu(popupState)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem
            onClick={() => {
              onEdit(member.id);
              popupState.close();
            }}
          >
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>编辑成员</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              onDelete(member.id);
              popupState.close();
            }}
            sx={{ color: 'error.main' }}
          >
            <ListItemIcon>
              <DeleteIcon fontSize="small" sx={{ color: 'error.main' }} />
            </ListItemIcon>
            <ListItemText>移除成员</ListItemText>
          </MenuItem>
        </Menu>
      </TableCell>
    </TableRow>
  );
};

export default function WorkspaceTeamSettings() {
  const [searchTerm, setSearchTerm] = useState('');
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);

  // 使用 react-hook-form 管理表单
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<InviteFormValues>({
    resolver: zodResolver(inviteFormSchema),
    defaultValues: {
      emails: [],
      role: 'member',
      sendWelcomeEmail: true,
    },
  });

  const handleInvite = useCallback(
    (data: InviteFormValues) => {
      setIsSubmitting(true);

      // 这里处理邀请逻辑
      console.log('邀请', data);

      // 模拟 API 调用
      setTimeout(() => {
        setIsSubmitting(false);
        setInviteDialogOpen(false);
        reset();

        // 这里可以添加通知提示
        alert('邀请已发送');
      }, 1500);
    },
    [reset],
  );

  const handleCloseDialog = () => {
    setInviteDialogOpen(false);
    reset();
  };

  const handleValidateEmail = useCallback(
    (email: string) => {
      if (!isValidEmail(email)) {
        return {
          isError: true,
          textError: `${email} 不是有效的邮箱地址`,
        };
      }

      const emails = getValues('emails');
      if (emails.includes(email)) {
        return {
          isError: true,
          textError: `${email} 已经添加过了`,
        };
      }

      return true;
    },
    [getValues],
  );

  const handleEditMember = useCallback((id: number) => {
    console.log(`编辑成员 ID: ${id}`);
    // 这里添加编辑成员逻辑
  }, []);

  const handleDeleteMember = useCallback((id: number) => {
    console.log(`删除成员 ID: ${id}`);
    // 这里添加删除成员逻辑
  }, []);

  const filteredMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold">
        团队成员
      </Typography>
      <Typography color="text.secondary" variant="body1" sx={{ mt: 1, mb: 4 }}>
        管理工作区成员，设置访问级别，并在计划限制内邀请新用户
      </Typography>

      <Divider sx={{ mb: 4 }} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <TextField
          size="small"
          placeholder="搜索成员..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: 250 }}
        />

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            onClick={() => setFilterMenuOpen(true)}
          >
            筛选
          </Button>

          <Button
            variant="contained"
            startIcon={<PersonAddIcon />}
            onClick={() => setInviteDialogOpen(true)}
          >
            邀请成员
          </Button>
        </Box>
      </Box>

      <Card variant="outlined">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>成员</TableCell>
                <TableCell>访问级别</TableCell>
                <TableCell>状态</TableCell>
                <TableCell>加入日期</TableCell>
                <TableCell align="right">操作</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredMembers.map((member) => (
                <MemberRow
                  key={member.id}
                  member={member}
                  onEdit={handleEditMember}
                  onDelete={handleDeleteMember}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {filteredMembers.length === 0 && (
          <Box sx={{ py: 4, textAlign: 'center' }}>
            <Typography color="text.secondary">未找到匹配的成员</Typography>
          </Box>
        )}
      </Card>

      <Card variant="outlined" sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="subtitle1" fontWeight="medium" sx={{ mb: 3 }}>
            待定邀请
          </Typography>

          <Box sx={{ p: 3, bgcolor: alpha('#000', 0.03), borderRadius: 1, textAlign: 'center' }}>
            <Typography color="text.secondary">目前没有待定邀请</Typography>
          </Box>
        </CardContent>
      </Card>

      {/* 邀请成员对话框 */}
      <Dialog open={inviteDialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>邀请团队成员</DialogTitle>
        <form onSubmit={handleSubmit(handleInvite)}>
          <DialogContent>
            <DialogContentText sx={{ mb: 3 }}>
              通过输入邮箱地址邀请新成员加入您的工作区。他们将收到一封包含邀请链接的邮件。
            </DialogContentText>

            <Stack spacing={3}>
              <FormControl fullWidth error={!!errors.emails}>
                <Controller
                  name="emails"
                  control={control}
                  render={({ field }) => (
                    <>
                      <MuiChipsInput
                        label="邀请发送至..."
                        placeholder="user@example.com"
                        value={field.value}
                        onChange={field.onChange}
                        addOnBlur
                        validate={handleValidateEmail}
                        fullWidth
                        variant="outlined"
                        renderChip={(Component, key, props) => (
                          <Component key={key} icon={<EmailIcon />} {...props} size="medium" />
                        )}
                      />
                      {errors.emails && (
                        <FormHelperText error>{errors.emails.message}</FormHelperText>
                      )}
                    </>
                  )}
                />
              </FormControl>

              <FormControl fullWidth error={!!errors.role}>
                <InputLabel id="invite-role-label">邀请为</InputLabel>
                <Controller
                  name="role"
                  control={control}
                  render={({ field }) => (
                    <Select labelId="invite-role-label" label="邀请为" {...field}>
                      {roles.map((role) => (
                        <MenuItem key={role.value} value={role.value}>
                          {role.label}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {errors.role && <FormHelperText error>{errors.role.message}</FormHelperText>}
              </FormControl>

              <Controller
                name="sendWelcomeEmail"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Switch
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                    }
                    label="发送欢迎邮件"
                  />
                )}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>取消</Button>
            <Button
              variant="contained"
              type="submit"
              disabled={isSubmitting}
              startIcon={isSubmitting ? <CircularProgress size={16} color="inherit" /> : null}
            >
              {isSubmitting ? '发送中...' : '发送邀请'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}
