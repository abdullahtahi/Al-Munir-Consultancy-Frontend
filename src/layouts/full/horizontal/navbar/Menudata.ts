import {
  IconAdjustmentsCog,
  IconArrowDownLeft,
  IconArrowUpRight,
  IconBinaryTree,
  IconBoxMargin,
  IconBuildingStore,
  IconBusStop,
  IconCalendarCheck,
  IconCalendarCog,
  IconCarCrane,
  IconCashBanknote,
  IconCirclePlus,
  IconContainer,
  IconCreditCardPay,
  IconDeviceAudioTape,
  IconDownload,
  IconFile,
  IconFile3d,
  IconFileAnalytics,
  IconFileDescription,
  IconFileInvoice,
  IconFlipHorizontal,
  IconGrain,
  IconGridDots,
  IconHammer,
  IconHistory,
  IconHome,
  IconLayout2,
  IconLibraryPlus,
  IconLogin2,
  IconLogs,
  IconNetworkOff,
  IconPentagonNumber1,
  IconPhotoScan,
  IconPrinter,
  IconSection,
  IconSettings,
  IconStack2,
  IconTopologyRing2,
  IconTruck,
  IconTruckDelivery,
  IconUpload,
  IconUser,
  IconUserCog,
  IconUserPlus,
  IconWallet,
  IconWindmill,
  IconBrandEtsy

} from '@tabler/icons-react';
import { uniqueId } from 'lodash';

interface MenuItemsType {
  id?: string;
  title?: string;
  icon?: any;
  href?: string;
  children?: MenuItemsType[];
}

const Menuitems: MenuItemsType[] = [
  {
    id: uniqueId(),
    title: 'Operations',
    icon: IconHome,
    children: [
      {
        id: uniqueId(),
        title: 'EIR-IN',
        icon: IconArrowDownLeft,
        href: '/al-munir-system/users',
      },
      {
        id: uniqueId(),
        title: 'EIR-OUT',
        icon: IconArrowUpRight,
        href: '/operations/eir-out',
      },
      {
        id: uniqueId(),
        title: 'CRO',
        icon: IconCirclePlus,
        href: '/operations/cro',
      },
      {
        id: uniqueId(),
        title: 'Pickup Slips',
        icon: IconPrinter,
        href: '/operations/pickup-slips',
      },
      {
        id: uniqueId(),
        title: 'Sale Unit',
        icon: IconWallet,
        href: '/operations/sale-unit',
      },
      {
        id: uniqueId(),
        title: 'Change Grade',
        icon: IconFlipHorizontal,
        href: '/operations/change-grade',
      },
      {
        id: uniqueId(),
        title: 'Vehicle Operation',
        icon: IconAdjustmentsCog,
        children: [
          {
            id: uniqueId(),
            title: 'Vehicle - IN',
            icon: IconBrandEtsy,
            href: '/vehicle-operation/in',
          },
          {
            id: uniqueId(),
            title: 'Vehicle - OUT',
            icon: IconArrowUpRight,
            href: '/vehicle-operation/out',
          },
          {
            id: uniqueId(),
            title: 'Vehicle Outside',
            icon: IconArrowUpRight,
            href: '/vehicle-operation/outside',
          },
          {
            id: uniqueId(),
            title: 'Vehicle PickupSlip',
            icon: IconPrinter,
            href: '/vehicle-operation/pickup-slip',
          },
        ]
      },
    ],
  },

  {
    id: uniqueId(),
    title: 'Services',
    icon: IconDeviceAudioTape,
    children: [
      {
        id: uniqueId(),
        title: 'Addition Service',
        icon: IconLibraryPlus,
        href: '/service-record/addition-service',
      },
      {
        id: uniqueId(),
        title: 'General Service',
        icon: IconGrain,
        href: '/service-record/general-service',
      },
      {
        id: uniqueId(),
        title: 'Repair Services',
        icon: IconHammer,
        href: '/service-record/repair-service',
      },
      {
        id: uniqueId(),
        title: 'Storage Services',
        icon: IconBuildingStore,
        href: '/service-record/storage-service',
      },
      {
        id: uniqueId(),
        title: 'Work Shop',
        icon: IconNetworkOff,
        children: [
          {
            id: uniqueId(),
            title: 'Repair Services',
            icon: IconHammer,
            href: '/work-shop/repair-services',
          },
          {
            id: uniqueId(),
            title: 'Service Management',
            icon: IconSettings,
            href: '/work-shop/service-management',
          },
        ]
      },
    ]
  },
  {
    id: uniqueId(),
    title: 'FASAH',
    icon: IconFileAnalytics,
    children: [
      {
        id: uniqueId(),
        title: 'IN',
        icon: IconArrowDownLeft,
        href: '/fasah/in',
      },
      {
        id: uniqueId(),
        title: 'OUT',
        icon: IconArrowUpRight,
        href: '/fasah/out',
      },
      {
        id: uniqueId(),
        title: 'Bulk',
        icon: IconFileInvoice,
        href: '/fasah/',
        children: [
          {
            id: uniqueId(),
            title: 'Appointment',
            icon: IconCalendarCheck,
            href: '/fasah/bulk-appointment',
          },
          {
            id: uniqueId(),
            title: 'Download',
            icon: IconDownload,
            href: '/fasah/bulk-download',
          },
        ],
      },
      {
        id: uniqueId(),
        title: 'Payment',
        icon: IconCreditCardPay,
        href: '/fasah/',
        children: [
          {
            id: uniqueId(),
            title: 'FASAH Payment',
            icon: IconCreditCardPay,
            href: '/fasah/payment',
          },
          {
            id: uniqueId(),
            title: 'Bulk Payment',
            icon: IconCreditCardPay,
            href: '/fasah/bulk-payment',
          },
        ],
      },
    ]
  },

  {
    id: uniqueId(),
    title: 'Reports',
    icon: IconFileAnalytics,
    children: [
      {
        id: uniqueId(),
        title: 'Summary',
        icon: IconGridDots,
        href: '/reports/summary',
      },
      {
        id: uniqueId(),
        title: 'Gate Operation',
        icon: IconSection,
        href: '/reports/',
        children: [
          {
            id: uniqueId(),
            title: 'IN',
            icon: IconArrowDownLeft,
            href: '/reports/gate-in-operation',
          },
          {
            id: uniqueId(),
            title: 'OUT',
            icon: IconArrowUpRight,
            href: '/reports/gate-out-operation',
          },
        ],
      },
      {
        id: uniqueId(),
        title: 'FASAH',
        icon: IconFile,
        href: '/reports/',
        children: [
          {
            id: uniqueId(),
            title: 'Customer FASAH',
            icon: IconUserCog,
            href: '/reports/fasah-customer',
          },
          {
            id: uniqueId(),
            title: 'Container FASAH',
            icon: IconContainer,
            href: '/reports/fasah-container',
          },
        ],
      },
      {
        id: uniqueId(),
        title: 'CRO',
        icon: IconFile3d,
        href: '/reports/',
        children: [
          {
            id: uniqueId(),
            title: 'CRO Report',
            icon: IconFileDescription,
            href: '/reports/cro',
          },
          {
            id: uniqueId(),
            title: 'Each CRO',
            icon: IconFileDescription,
            href: '/reports/each-cro',
          },
          {
            id: uniqueId(),
            title: 'All CRO',
            icon: IconFileDescription,
            href: '/reports/all-cro',
          },
        ],
      },
      {
        id: uniqueId(),
        title: 'Stock',
        icon: IconStack2,
        href: '/reports/',
        children: [
          {
            id: uniqueId(),
            title: 'Report',
            icon: IconFileAnalytics,
            href: '/reports/stock-report',
          },
          {
            id: uniqueId(),
            title: 'Report1',
            icon: IconFileAnalytics,
            href: '/reports/stock-report1',
          },
          {
            id: uniqueId(),
            title: 'Stock Unit',
            icon: IconPentagonNumber1,
            href: '/reports/stock-sale-unit',
          },
        ],
      },
      {
        id: uniqueId(),
        title: 'Depot Reports',
        icon: IconFileAnalytics,
        href: '/reports/',
        children: [
          {
            id: uniqueId(),
            title: 'Gate IN units',
            icon: IconArrowDownLeft,
            href: '/reports/depot-gate-in',
          },
          {
            id: uniqueId(),
            title: 'Gate OUT Units',
            icon: IconArrowUpRight,
            href: '/reports/depot-gate-out',
          },
          {
            id: uniqueId(),
            title: 'Truck Traffic',
            icon: IconTruckDelivery,
            href: '/reports/depot-truck-traffic',
          },
        ],
      },
      {
        id: uniqueId(),
        title: 'Vehicle Reports',
        icon: IconFileAnalytics,
        href: '/reports/',
        children: [
          {
            id: uniqueId(),
            title: 'Vehicle IN',
            icon: IconArrowDownLeft,
            href: '/reports/vehicle-in',
          },
          {
            id: uniqueId(),
            title: 'Vehicle OUT',
            icon: IconArrowUpRight,
            href: '/reports/vehicle-out',
          },
        ],
      },
      {
        id: uniqueId(),
        title: 'Container Report',
        icon: IconFileAnalytics,
        href: '/reports/',
        children: [
          {
            id: uniqueId(),
            title: 'On Ground',
            icon: IconLayout2,
            href: '/reports/container-on-ground',
          },
          {
            id: uniqueId(),
            title: 'Container History',
            icon: IconHistory,
            href: '/reports/container-history',
          },
        ],
      },
      {
        id: uniqueId(),
        title: 'Print EIR',
        icon: IconPrinter,
        href: '/reports/print-eir',
      },
    ]
  },
  {
    id: uniqueId(),
    title: 'Master Data',
    icon: IconBinaryTree,
    children: [
      {
        id: uniqueId(),
        title: 'Container',
        icon: IconContainer,
        href: '/master-data/',
        children: [
          {
            id: uniqueId(),
            title: 'Container',
            icon: IconContainer,
            href: '/master-data/container',
          },
          {
            id: uniqueId(),
            title: 'Soc Container',
            icon: IconContainer,
            href: '/master-data/soc-container',
          },
          {
            id: uniqueId(),
            title: 'Container Warnings',
            icon: IconBoxMargin,
            href: '/master-data/container-warnings',
          },
          {
            id: uniqueId(),
            title: 'Scrap',
            icon: IconTopologyRing2,
            href: '/master-data/scrap',
          },
        ],
      },
      {
        id: uniqueId(),
        title: 'Fleet Management (FLM)',
        icon: IconCarCrane,
        href: '/master-data/',
        children: [
          {
            id: uniqueId(),
            title: 'Transporter',
            icon: IconBusStop,
            href: '/master-data/transporter',
          },
          {
            id: uniqueId(),
            title: 'Truck',
            icon: IconTruck,
            href: '/master-data/truck',
          },
          {
            id: uniqueId(),
            title: 'Driver',
            icon: IconUser,
            href: '/master-data/driver',
          },
          {
            id: uniqueId(),
            title: 'Bulk Upload',
            icon: IconUpload,
            href: '/master-data/bulk-upload',
          },
        ],
      },
      {
        id: uniqueId(),
        title: 'Image',
        icon: IconPhotoScan,
        href: '/master-data/image',
      }, {
        id: uniqueId(),
        title: 'Bank',
        icon: IconCashBanknote,
        href: '/master-data/bank',
      }, {
        id: uniqueId(),
        title: 'Customers',
        icon: IconUserCog,
        href: '/master-data/customer',
      },
      {
        id: uniqueId(),
        title: 'User Management',
        icon: IconUser,
        children: [
          {
            id: uniqueId(),
            title: 'User',
            icon: IconUserPlus,
            href: '/user-management/user',
          },
          {
            id: uniqueId(),
            title: 'Roles',
            icon: IconHome,
            href: '/user-management/roles',
          },
          {
            id: uniqueId(),
            title: 'Login Details',
            icon: IconLogin2,
            href: '/user-management/login-details',
          },
        ]
      },
    ]
  },
  {
    id: uniqueId(),
    title: 'Edifact',
    icon: IconFileAnalytics,
    children: [
      {
        id: uniqueId(),
        title: 'Schedule',
        icon: IconCalendarCog,
        href: '/edifact/schedule',
      },
      {
        id: uniqueId(),
        title: 'Generate',
        icon: IconWindmill,
        href: '/edifact/generate',
      },
      {
        id: uniqueId(),
        title: 'Bulk Generate',
        icon: IconWindmill,
        href: '/edifact/bulk-generate',
      },
      {
        id: uniqueId(),
        title: 'EDI Report',
        icon: IconFileAnalytics,
        href: '/edifact/',
        children: [
          {
            id: uniqueId(),
            title: 'Container Report',
            icon: IconFileAnalytics,
            href: '/edifact/container-report',
          },
          {
            id: uniqueId(),
            title: 'EDI Report',
            icon: IconFileAnalytics,
            href: '/edifact/edi-report',
          },
          {
            id: uniqueId(),
            title: 'COPRAN Log',
            icon: IconLogs,
            href: '/edifact/copran-log',
          },
        ],
      },
    ]
  },

];
export default Menuitems;
