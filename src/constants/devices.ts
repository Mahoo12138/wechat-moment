export interface DeviceConfig {
  id: string;
  name: string;
  width: number;
  height: number;
  scale: number; // Default scale for preview
}

export const DEVICES: DeviceConfig[] = [
  {
    id: 'iphone-17-pro-max',
    name: 'iPhone 17 Pro Max (Predicted)',
    width: 440,
    height: 956,
    scale: 1,
  },
  {
    id: 'iphone-16-pro-max',
    name: 'iPhone 16 Pro Max',
    width: 440,
    height: 956,
    scale: 1,
  },
  {
    id: 'iphone-16-pro',
    name: 'iPhone 16 Pro',
    width: 402,
    height: 874,
    scale: 1,
  },
  {
    id: 'iphone-16-plus',
    name: 'iPhone 16 Plus',
    width: 430,
    height: 932,
    scale: 1,
  },
  {
    id: 'iphone-16',
    name: 'iPhone 16',
    width: 393,
    height: 852,
    scale: 1,
  },
  {
    id: 'iphone-15-pro-max',
    name: 'iPhone 15 Pro Max',
    width: 430,
    height: 932,
    scale: 1,
  },
  {
    id: 'iphone-15-pro',
    name: 'iPhone 15 Pro',
    width: 393,
    height: 852,
    scale: 1,
  },
  {
    id: 'iphone-14-pro-max',
    name: 'iPhone 14 Pro Max',
    width: 430,
    height: 932,
    scale: 1,
  },
  {
    id: 'iphone-14-pro',
    name: 'iPhone 14 Pro',
    width: 393,
    height: 852,
    scale: 1,
  },
  {
    id: 'iphone-14-plus',
    name: 'iPhone 14 Plus',
    width: 428,
    height: 926,
    scale: 1,
  },
  {
    id: 'iphone-14',
    name: 'iPhone 14',
    width: 390,
    height: 844,
    scale: 1,
  },
];

export const DEFAULT_DEVICE = DEVICES.find(d => d.id === 'iphone-16-pro') || DEVICES[2];
