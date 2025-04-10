import CheckIcon from '@mui/icons-material/Check';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import ScheduleIcon from '@mui/icons-material/Schedule';
import type * as React from 'react';

import type { MessageStatusIconProps as MessageStatusIconProperties } from './types';

const MessageStatusIcon: React.FC<MessageStatusIconProperties> = ({ status }) => {
  switch (status) {
    case 'sending': {
      return <ScheduleIcon fontSize="small" sx={{ opacity: 0.7 }} />;
    }
    case 'sent': {
      return <CheckIcon fontSize="small" sx={{ opacity: 0.7 }} />;
    }
    case 'read': {
      return <DoneAllIcon fontSize="small" color="primary" sx={{ opacity: 0.9 }} />;
    }
    default: {
      return null;
    }
  }
};

export default MessageStatusIcon;
