export interface Comment {
  id: string;
  user: string;
  avatar?: string;
  content: string;
  replyTo?: string;
}

export interface LikeItem {
  id: string;
  nickname: string;
  avatar: string;
}

export interface DeviceState {
  modelId: string;
  width: number;
  height: number;
  scale: number;
}

export interface LinkInfo {
  title: string;
  cover: string;
  url?: string;
}

export interface WeChatMomentState {
  user: {
    avatar: string;
    nickname: string;
  };
  moment: {
    type: 'original' | 'link';
    text: string;
    images: string[];
    linkInfo?: LinkInfo;
    time: string;
    location?: string;
    source?: string; // 来源，如"部分可见"
  };
  interactions: {
    likes: LikeItem[]; // list of like items
    comments: Comment[];
  };
  system: {
    time: string;
    batteryLevel: number;
    signalStrength: number;
    wifi: boolean;
  };
  device: DeviceState;
}
