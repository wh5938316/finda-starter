import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import type { SelectChangeEvent } from '@mui/material/Select';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { Meta } from '@storybook/react';
import { useConfirm } from 'material-ui-confirm';
import * as React from 'react';

const meta = {
  title: 'MUI/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    fullScreen: { control: 'boolean' },
    maxWidth: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', false],
    },
    scroll: {
      control: 'select',
      options: ['body', 'paper'],
    },
  },
} satisfies Meta<typeof Dialog>;

export default meta;

// 基础对话框
export const Basic = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        打开对话框
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="basic-dialog-title"
        aria-describedby="basic-dialog-description"
      >
        <DialogTitle id="basic-dialog-title">基础对话框</DialogTitle>
        <DialogContent>
          <DialogContentText id="basic-dialog-description">
            这是一个基础对话框示例，展示了MUI Dialog组件的基本用法。
            对话框是一种模态窗口，它出现在应用内容的前面，用于提供关键信息或请求用户做出决定。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button onClick={handleClose} autoFocus>
            确认
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

// 表单对话框
export const FormDialog = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        打开表单对话框
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>表单对话框</DialogTitle>
        <DialogContent>
          <DialogContentText>请填写以下表单信息完成注册。所有字段均为必填项。</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="姓名"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="email"
            label="电子邮件"
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="password"
            label="密码"
            type="password"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button onClick={handleClose}>提交</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

// 自定义对话框（尺寸和全屏）
export const CustomDialog = () => {
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [fullScreen, setFullScreen] = React.useState(false);
  const [maxWidth, setMaxWidth] = React.useState<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('sm');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFullWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFullWidth(event.target.checked);
  };

  const handleFullScreenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFullScreen(event.target.checked);
  };

  const handleMaxWidthChange = (event: SelectChangeEvent) => {
    setMaxWidth(event.target.value as 'xs' | 'sm' | 'md' | 'lg' | 'xl');
  };

  return (
    <>
      <Stack direction="column" spacing={2} sx={{ mb: 2 }}>
        <FormControlLabel
          control={<Switch checked={fullWidth} onChange={handleFullWidthChange} />}
          label="全宽"
        />
        <FormControlLabel
          control={<Switch checked={fullScreen} onChange={handleFullScreenChange} />}
          label="全屏"
        />
        <FormControl>
          <InputLabel id="max-width-label">最大宽度</InputLabel>
          <Select
            labelId="max-width-label"
            value={maxWidth}
            onChange={handleMaxWidthChange}
            label="最大宽度"
          >
            <MenuItem value="xs">超小 (xs)</MenuItem>
            <MenuItem value="sm">小 (sm)</MenuItem>
            <MenuItem value="md">中 (md)</MenuItem>
            <MenuItem value="lg">大 (lg)</MenuItem>
            <MenuItem value="xl">超大 (xl)</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <Button variant="outlined" onClick={handleClickOpen}>
        打开自定义对话框
      </Button>

      <Dialog
        fullWidth={fullWidth}
        fullScreen={fullScreen}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>自定义对话框</DialogTitle>
        <DialogContent>
          <DialogContentText>
            这是一个自定义对话框示例，你可以通过上面的选项控制对话框的尺寸和显示方式。
            <br />
            当前配置：
            <span>{fullWidth ? '全宽' : '非全宽'}</span>,
            <span>{fullScreen ? '全屏' : '非全屏'}</span>, 最大宽度: <span>{maxWidth}</span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>关闭</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

// 滚动对话框
export const ScrollDialog = () => {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<'paper' | 'body'>('paper');

  const handleClickOpen = (scrollType: 'paper' | 'body') => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <Stack direction="row" spacing={2}>
      <Button onClick={handleClickOpen('paper')}>滚动内容区</Button>
      <Button onClick={handleClickOpen('body')}>滚动页面</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">滚动对话框</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {new Array(50)
              .fill(
                `这是大量文本内容，用于演示对话框的滚动效果。
              当内容过多时，对话框会显示滚动条。你可以选择让对话框内容区域滚动，
              或者让整个页面滚动。目前使用的是: ${scroll === 'paper' ? '内容区滚动' : '页面滚动'} 模式。`,
              )
              .join('\n')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button onClick={handleClose}>确认</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

// 确认对话框
export const ConfirmationDialog = () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('apple');
  const [selectedValue, setSelectedValue] = React.useState('apple');

  const options = [
    { name: '苹果', value: 'apple' },
    { name: '橙子', value: 'orange' },
    { name: '香蕉', value: 'banana' },
  ];

  const handleClickOpen = () => {
    setOpen(true);
    setValue(selectedValue);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const handleOk = () => {
    setSelectedValue(value);
    setOpen(false);
  };

  return (
    <>
      <Stack direction="column" alignItems="flex-start" spacing={2}>
        <Typography variant="subtitle1">
          已选择: {options.find((option) => option.value === selectedValue)?.name}
        </Typography>
        <Button variant="outlined" onClick={handleClickOpen}>
          打开确认对话框
        </Button>
      </Stack>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>选择你喜欢的水果</DialogTitle>
        <DialogContent>
          <RadioGroup value={value} onChange={handleChange}>
            {options.map((option) => (
              <FormControlLabel
                value={option.value}
                control={<Radio />}
                label={option.name}
                key={option.value}
              />
            ))}
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button onClick={handleOk}>确认</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

// Material-UI-Confirm 对话框
export const MaterialUIConfirm = () => {
  const confirm = useConfirm();
  const [result, setResult] = React.useState<string | null>(null);

  // 基本确认对话框
  const handleBasicConfirm = async () => {
    try {
      await confirm({
        title: '确认操作',
        description: '你确定要执行这个操作吗？此操作不可撤销。',
      });
      setResult('用户确认了操作');
    } catch {
      setResult('用户取消了操作');
    }
  };

  // 自定义确认对话框
  const handleCustomConfirm = async () => {
    try {
      await confirm({
        title: '删除文件',
        description: '你确定要删除这个文件吗？此操作不可撤销，文件将被永久删除。',
        confirmationText: '删除',
        cancellationText: '保留',
        confirmationButtonProps: {
          variant: 'contained',
          color: 'error',
        },
        cancellationButtonProps: {
          variant: 'outlined',
          color: 'primary',
        },
        dialogProps: {
          maxWidth: 'xs',
        },
      });
      setResult('用户选择了删除文件');
    } catch {
      setResult('用户选择了保留文件');
    }
  };

  // 含有表单的确认对话框
  const handleFormConfirm = async () => {
    let reason = '';

    try {
      await confirm({
        title: '提交反馈',
        content: (
          <TextField
            autoFocus
            margin="dense"
            id="reason"
            label="反馈内容"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            onChange={(e) => {
              reason = e.target.value;
            }}
          />
        ),
        confirmationText: '提交',
        cancellationText: '取消',
      });
      setResult(`用户提交了反馈: ${reason || '(无内容)'}`);
    } catch {
      setResult('用户取消了反馈');
    }
  };

  return (
    <Stack spacing={3}>
      <Typography variant="h6">Material-UI-Confirm 对话框</Typography>

      <Typography variant="body2">
        Material-UI-Confirm 是一个便捷的库，用于创建确认对话框，无需手动管理对话框状态。
        它通过ConfirmProvider和useConfirm hook实现，在ThemeRegistry中已经配置了ConfirmProvider。
      </Typography>

      <Stack direction="row" spacing={2}>
        <Button variant="outlined" color="primary" onClick={handleBasicConfirm}>
          基本确认
        </Button>
        <Button variant="outlined" color="error" onClick={handleCustomConfirm}>
          自定义确认
        </Button>
        <Button variant="outlined" color="info" onClick={handleFormConfirm}>
          表单确认
        </Button>
      </Stack>

      {result && (
        <Typography variant="body1" sx={{ mt: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1 }}>
          结果: {result}
        </Typography>
      )}
    </Stack>
  );
};
