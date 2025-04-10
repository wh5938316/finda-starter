export interface MessageGroupProperties {
  isCurrentUser: boolean;
}

export interface MessageStatusIconProperties {
  status: 'sending' | 'sent' | 'read' | string;
}

export interface StyledListItemProperties {
  isSelected?: boolean;
}

export interface Conversation {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  isGroup: boolean;
}

export interface Message {
  id: number;
  sender: {
    id: number;
    name: string;
    avatar: string;
  };
  content: string;
  time: string;
  status: 'sending' | 'sent' | 'read';
  isCurrentUser: boolean;
}
