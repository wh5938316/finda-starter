import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { Link, useMatches } from 'react-router';

import { HomeIcon } from '@finda-co/icons';

// 定义handle属性的类型
interface RouteHandle {
  title?: string;
  icon?: React.ReactNode;
}

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  [`& .${breadcrumbsClasses.separator}`]: {
    color: (theme.vars || theme).palette.action.disabled,
    margin: 1,
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: 'center',
  },
}));

export default function NavbarBreadcrumbs() {
  // 使用useMatches获取当前匹配的路由信息
  const matches = useMatches();

  // 生成面包屑项
  const breadcrumbItems = matches
    // 过滤掉没有handle的路由
    .filter((match) => Boolean(match.handle))
    // 映射成面包屑项
    .map((match, index, array) => {
      const isLast = index === array.length - 1;
      const handle = match.handle as RouteHandle;

      // 如果是最后一个元素，则显示为当前页面（不可点击）
      if (isLast) {
        return (
          <Typography
            key={match.id}
            variant="body1"
            sx={{
              color: 'text.primary',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {handle.icon && (
              <span style={{ marginRight: 4, display: 'flex', alignItems: 'center' }}>
                {handle.icon}
              </span>
            )}
            {handle.title || match.pathname.split('/').pop() || '未知'}
          </Typography>
        );
      }

      // 否则显示为可点击的链接
      return (
        <Link
          key={match.id}
          to={match.pathname}
          style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {handle.icon && (
              <span style={{ marginRight: 4, display: 'flex', alignItems: 'center' }}>
                {handle.icon}
              </span>
            )}
            {handle.title || match.pathname.split('/').pop() || '未知'}
          </Typography>
        </Link>
      );
    });

  return (
    <StyledBreadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextRoundedIcon fontSize="small" />}
    >
      {breadcrumbItems.length > 0 ? (
        breadcrumbItems
      ) : (
        <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600 }}>
          <HomeIcon fontSize="inherit" sx={{ mr: 0.5 }} />
          首页
        </Typography>
      )}
    </StyledBreadcrumbs>
  );
}
