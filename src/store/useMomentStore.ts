import { create } from 'zustand'
import { WeChatMomentState, Comment, DeviceState, LikeItem } from '@/types'
import { DEFAULT_DEVICE, DEVICES } from '@/constants/devices'

interface MomentStore extends WeChatMomentState {
  setUser: (user: Partial<WeChatMomentState['user']>) => void
  setMoment: (moment: Partial<WeChatMomentState['moment']>) => void
  setInteractions: (interactions: Partial<WeChatMomentState['interactions']>) => void
  setSystem: (system: Partial<WeChatMomentState['system']>) => void
  setDevice: (device: Partial<DeviceState>) => void
  addComment: (comment: Omit<Comment, 'id'>) => void
  removeComment: (id: string) => void
  addLike: (nickname: string, avatar?: string) => void
  removeLike: (id: string) => void
  reset: () => void
}

const generateId = () => Math.random().toString(36).substr(2, 9);

// Helper to get random avatar if none provided
const getRandomAvatar = (seed?: string) => `./avatar/${Math.floor(Math.random() * 100) + 1}.jpg`;

const initialState: WeChatMomentState = {
  user: {
    avatar: "./avatar/default.jpg",
    nickname: "冷漠的吉普赛人",
  },
  moment: {
    type: 'original',
    text: "普通小孩，热爱生活中",
    images: [],
    linkInfo: {
        title: "这是一个分享链接的标题",
        cover: "./favicon.png",
        url: "https://www.example.com"
    },
    time: "Just now",
    location: "Shanghai, China",
    source: "",
  },
  interactions: {
    likes: [
      { id: "l1", nickname: "User A", avatar: "./avatar/2.jpg" },
      { id: "l2", nickname: "User B", avatar: "./avatar/3.jpg" },
      { id: "l3", nickname: "User C", avatar: "./avatar/4.jpg" },
      { id: "l4", nickname: "User D", avatar: "./avatar/5.jpg" },
      { id: "l5", nickname: "User E", avatar: "./avatar/6.jpg" },
    ],
    comments: [
      {
        id: "1",
        user: "Friend A",
        avatar: "./avatar/7.jpg",
        content: "好久不见呐！",
      },
    ],
  },
  system: {
    time: "12:00",
    batteryLevel: 100,
    signalStrength: 4,
    wifi: true,
  },
  device: {
    modelId: DEFAULT_DEVICE.id,
    width: DEFAULT_DEVICE.width,
    height: DEFAULT_DEVICE.height,
    scale: DEFAULT_DEVICE.scale,
  }
}

export const useMomentStore = create<MomentStore>((set) => ({
  ...initialState,
  setUser: (user) => set((state) => ({ user: { ...state.user, ...user } })),
  setMoment: (moment) => set((state) => ({ moment: { ...state.moment, ...moment } })),
  setInteractions: (interactions) => set((state) => ({ interactions: { ...state.interactions, ...interactions } })),
  setSystem: (system) => set((state) => ({ system: { ...state.system, ...system } })),
  setDevice: (device) => set((state) => ({ device: { ...state.device, ...device } })),
  addComment: (comment) =>
    set((state) => ({
      interactions: {
        ...state.interactions,
        comments: [
          ...state.interactions.comments,
          { 
            ...comment, 
            id: generateId(),
            avatar: comment.avatar || getRandomAvatar()
          },
        ],
      },
    })),
  removeComment: (id) =>
    set((state) => ({
      interactions: {
        ...state.interactions,
        comments: state.interactions.comments.filter((c) => c.id !== id),
      },
    })),
  addLike: (nickname, avatar) =>
    set((state) => ({
      interactions: {
        ...state.interactions,
        likes: [
          ...state.interactions.likes,
          { 
            id: generateId(), 
            nickname, 
            avatar: avatar || getRandomAvatar() 
          },
        ],
      },
    })),
  removeLike: (id) =>
    set((state) => ({
      interactions: {
        ...state.interactions,
        likes: state.interactions.likes.filter((l) => l.id !== id),
      },
    })),
  reset: () => set(initialState),
}))
