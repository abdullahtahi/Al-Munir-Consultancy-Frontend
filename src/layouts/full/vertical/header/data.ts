import img1 from '@assets/images/profile/user-1.jpg';
import img2 from '@assets/images/profile/user-2.jpg';
import img3 from '@assets/images/profile/user-3.jpg';
import img4 from '@assets/images/profile/user-4.jpg';
import { IconContainer, IconFile3d, IconFileFilled, IconHome, IconLogin2, IconTruckDelivery, IconUserPlus } from '@tabler/icons-react';
import { ElementType } from 'react';




// Notifications dropdown

interface notificationType {
  avatar: string;
  title: string;
  subtitle: string;
}

const notifications: notificationType[] = [
  {
    avatar: img1,
    title: 'Roman Joined the Team!',
    subtitle: 'Congratulate him',
  },
  {
    avatar: img2,
    title: 'New message received',
    subtitle: 'Salma sent you new message',
  },
  {
    avatar: img3,
    title: 'New Payment received',
    subtitle: 'Check your earnings',
  },
  {
    avatar: img4,
    title: 'Jolly completed tasks',
    subtitle: 'Assign her new tasks',
  },
  {
    avatar: img1,
    title: 'Roman Joined the Team!',
    subtitle: 'Congratulate him',
  },
  {
    avatar: img2,
    title: 'New message received',
    subtitle: 'Salma sent you new message',
  },
  {
    avatar: img3,
    title: 'New Payment received',
    subtitle: 'Check your earnings',
  },
  {
    avatar: img4,
    title: 'Jolly completed tasks',
    subtitle: 'Assign her new tasks',
  },
];

//
// Messages dropdown
//
interface messageType {
  avatar: string;
  title: string;
  subtitle: string;
  time: string;
  status: string;
}
const messages: messageType[] = [
  {
    avatar: img1,
    title: 'Roman Joined the Team!',
    subtitle: 'Congratulate him',
    time: '1 hours ago',
    status: 'success',
  },
  {
    avatar: img2,
    title: 'New message received',
    subtitle: 'Salma sent you new message',
    time: '1 day ago',
    status: 'warning',
  },
  {
    avatar: img3,
    title: 'New Payment received',
    subtitle: 'Check your earnings',
    time: '2 days ago',
    status: 'success',
  },
  {
    avatar: img4,
    title: 'Jolly completed tasks',
    subtitle: 'Assign her new tasks',
    time: '1 week ago',
    status: 'danger',
  },
];

// apps dropdown

interface appsLinkType {
  href: string;
  title: string;
  subtext: string;
  avatar: ElementType;
}

const appsLink: appsLinkType[] = [
  {
    href: '/apps/iso-code',
    title: 'ISO Code',
    subtext: 'New iso code',
    avatar: IconFileFilled,
  },
  {
    href: '/apps/shipping-line',
    title: 'Shipping Line',
    subtext: 'New shipping line',
    avatar: IconTruckDelivery,
  },
  {
    href: '/apps/container-grade',
    title: 'Container Grade',
    subtext: 'New container grade',
    avatar: IconContainer,
  },
  {
    href: '/apps/report-schedule',
    title: 'Report Schedule',
    subtext: 'New report schedule',
    avatar: IconFile3d,
  },
  {
    href: '/user-management/user',
    title: 'User',
    subtext: 'New user',
    avatar: IconUserPlus,
  },
  {
    href: '/user-management/roles',
    title: 'Roles',
    subtext: 'New roles',
    avatar: IconHome,
  },
  {
    href: '/user-management/login-details',
    title: 'Login Details',
    subtext: 'New login details',
    avatar: IconLogin2,
  },
];

interface LinkType {
  href: string;
  title: string;
}

const pageLinks: LinkType[] = [

  {
    href: '/404',
    title: '404 Error Page',
  },
  {
    href: '/auth/login',
    title: 'Login Page',
  },
];

export { appsLink, messages, notifications, pageLinks };

