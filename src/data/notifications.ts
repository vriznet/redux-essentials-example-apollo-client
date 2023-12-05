import { Notification } from '../types/notification';

export const notifications: Notification[] = [
  {
    id: '1',
    date: new Date().toISOString(),
    message: 'My notification 1',
    userId: '1',
  },
  {
    id: '2',
    date: new Date().toISOString(),
    message: 'My notification 2',
    userId: '1',
  },
  {
    id: '3',
    date: new Date().toISOString(),
    message: 'My notification 3',
    userId: '2',
  },
  {
    id: '4',
    date: new Date().toISOString(),
    message: 'My notification 4',
    userId: '2',
  },
];
