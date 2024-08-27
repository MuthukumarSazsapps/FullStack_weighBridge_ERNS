import { AiFillHome } from 'react-icons/ai';
import { PiTable, PiFolder, PiCaretDownBold } from 'react-icons/pi';

export const MenuItems = [
    {
      name: 'Pages',
    },
    {
      name: 'Home',
      href: '/',
      icon: <AiFillHome />,
    },
    {
      name: 'Company Master',
      href: '#',
      icon: <PiTable />,
      dropdownItems: [
        {
          name: 'Create Company',
          href: '/company/create',
          icon: <PiFolder />,
        },
        {
          name: 'Change Company',
          href: '/Company/Change',
          icon: <PiFolder />,
        },
        {
          name: 'Modify Company',
          href: '/Company/Modify',
          icon: <PiFolder />,
        },
        {
          name: 'User LogOut',
          href: '/Company/logout',
          icon: <PiFolder />,
        },
      ],
    },
    {
      name: 'Masters',
      href: '#',
      icon: <PiTable />,
      dropdownItems: [
        {
          name: 'Company Masters',
          href: '/company/master',
          icon: <PiFolder />,
        },
        {
          name: 'Vehicle No Master',
          href: '/vehicleno/master',
          icon: <PiFolder />,
        },
        {
          name: 'Vehicle Type Master',
          href: '/vehicletype/master',
          icon: <PiFolder />,
        },
        {
          name: 'Material Master',
          href: '/material/master',
          icon: <PiFolder />,
        },
        {
          name: 'Vehicle Charge Master',
          href: '/vehiclecharge/master',
          icon: <PiFolder />,
        },
        {
          name: 'Customerized Weighing Charge',
          href: '/customerizedweighingcharge/master',
          icon: <PiFolder />,
        },
      ],
    },
    {
      name: 'Weighing',
      href: '#',
      icon: <PiTable />,
      dropdownItems: [
        {
          name: 'Company Masters',
          href: '/company/master',
          icon: <PiFolder />,
        },
      ]
    },
    {
      name: 'Report',
      href: '#',
      icon: <PiTable />,
      dropdownItems: [
        {
          name: 'Ledger Report',
          href: '/ledger/report',
          icon: <PiFolder />,
        },
        {
          name: 'Day Book Report',
          href: '/daybook/report',
          icon: <PiFolder />,
        },
      ]
    },
    {
      name: 'Settings',
      href: '#',
      icon: <PiTable />,
      dropdownItems: [
        {
          name: 'User Permission',
          href: '/userpermission/setting',
          icon: <PiFolder />,
        },
        {
          name: 'Change Password',
          href: '/password/setting',
          icon: <PiFolder />,
        },
        {
          name: 'DataBase Shrink',
          href: '/shrinkdatabase/setting',
          icon: <PiFolder />,
        },
        {
          name: 'DataBase Shrink',
          href: '/shrinkdatabase/setting',
          icon: <PiFolder />,
        },
        {
          name: 'Log Out',
          href: '/settings/logout',
          icon: <PiFolder />,
        },
      ]
    }
  ];