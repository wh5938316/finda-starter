import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';

interface LoadingIndicatorProperties {
  message?: string;
  fullScreen?: boolean;
  open?: boolean;
}

export default function LoadingIndicator({
  message = '加载中...',
  fullScreen = false,
  open = true,
}: LoadingIndicatorProperties) {
  // 全屏模式使用Backdrop
  if (fullScreen) {
    return (
      <Backdrop
        open={open}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          color: 'primary.main',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <CircularProgress color="inherit" size={60} thickness={4} />
        {message ? (
          <Typography
            variant="h6"
            color="white"
            sx={{
              textShadow: '0 2px 4px rgba(0,0,0,0.5)',
              mt: 2,
              fontWeight: 'medium',
            }}
          >
            {message}
          </Typography>
        ) : null}
      </Backdrop>
    );
  }

  // 内联模式居中显示
  return (
    <Fade in={open} style={{ transitionDelay: open ? '300ms' : '0ms' }}>
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          minHeight: 200,
        }}
      >
        <CircularProgress size={44} thickness={4} />
        {message ? (
          <Typography variant="body1" color="text.secondary" sx={{ mt: 2, fontWeight: 'medium' }}>
            {message}
          </Typography>
        ) : null}
      </Box>
    </Fade>
  );
}
