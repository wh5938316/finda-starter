import DescriptionIcon from '@mui/icons-material/Description';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import EventIcon from '@mui/icons-material/Event';
import FeedbackIcon from '@mui/icons-material/Feedback';
import ForumIcon from '@mui/icons-material/Forum';
import HomeIcon from '@mui/icons-material/Home';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import MessageIcon from '@mui/icons-material/Message';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PhotoIcon from '@mui/icons-material/Photo';
import ShareIcon from '@mui/icons-material/Share';
import StarIcon from '@mui/icons-material/Star';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import SpacesIcon from '@mui/icons-material/ViewModule';
import * as React from 'react';

export interface StepItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
}

// 入门步骤
export const gettingStartedSteps: StepItem[] = [
  {
    id: 'create-community',
    icon: <HomeIcon />,
    title: '创建您的社区',
    description: '开始行动是最好的入门方式',
    buttonText: '创建',
  },
  {
    id: 'watch-video',
    icon: <OndemandVideoIcon />,
    title: '了解平台功能',
    description: '观看视频了解平台的功能和特点',
    buttonText: '播放视频',
  },
  {
    id: 'upload-logo',
    icon: <PhotoIcon />,
    title: '上传您的标志',
    description: '选择并上传您的社区标志',
    buttonText: '上传标志',
  },
  {
    id: 'create-space',
    icon: <SpacesIcon />,
    title: '创建空间',
    description: '为您的用例创建多个空间',
    buttonText: '创建空间',
  },
  {
    id: 'invite-teammates',
    icon: <PersonAddIcon />,
    title: '邀请团队成员',
    description: '邀请其他管理员和版主',
    buttonText: '邀请',
  },
];

// 加入运动步骤
export const joinMovementSteps: StepItem[] = [
  {
    id: 'join-discussion',
    icon: <MessageIcon />,
    title: '参与社区讨论',
    description: '加入我们的社区交流组，分享您的见解和建议',
    buttonText: '加入讨论',
  },
  {
    id: 'share-social',
    icon: <ShareIcon />,
    title: '分享到社交媒体',
    description: '让更多人了解您的社区，获取更多的关注和参与',
    buttonText: '分享',
  },
  {
    id: 'give-feedback',
    icon: <FeedbackIcon />,
    title: '提供反馈',
    description: '您的意见对我们至关重要，帮助我们不断改进',
    buttonText: '反馈',
  },
  {
    id: 'rate-us',
    icon: <StarIcon />,
    title: '参与评价',
    description: '给我们的产品评分，让更多人了解我们',
    buttonText: '评价',
  },
];

// 准备发布步骤
export const prepareLaunchSteps: StepItem[] = [
  {
    id: 'create-rules',
    icon: <DescriptionIcon />,
    title: '创建社区规则',
    description: '制定清晰的社区规则，确保成员良好互动',
    buttonText: '创建规则',
  },
  {
    id: 'plan-event',
    icon: <EventIcon />,
    title: '计划首次活动',
    description: '组织一个引人入胜的首发活动，吸引成员参与',
    buttonText: '计划活动',
  },
  {
    id: 'add-topics',
    icon: <ForumIcon />,
    title: '准备讨论话题',
    description: '创建一些有趣的讨论话题，激发成员间的互动',
    buttonText: '添加话题',
  },
  {
    id: 'create-tags',
    icon: <LocalOfferIcon />,
    title: '设置标签体系',
    description: '创建有组织的标签系统，方便内容分类和查找',
    buttonText: '创建标签',
  },
  {
    id: 'set-permissions',
    icon: <VerifiedUserIcon />,
    title: '设置权限',
    description: '设置各种角色的权限，确保社区有序管理',
    buttonText: '设置权限',
  },
  {
    id: 'set-rewards',
    icon: <EmojiEventsIcon />,
    title: '设置奖励机制',
    description: '创建一个奖励系统，鼓励成员积极参与',
    buttonText: '设置奖励',
  },
];

// 获取所有步骤ID数组
export const getAllStepIds = () => {
  return [
    ...gettingStartedSteps.map((step) => step.id),
    ...joinMovementSteps.map((step) => step.id),
    ...prepareLaunchSteps.map((step) => step.id),
  ];
};
