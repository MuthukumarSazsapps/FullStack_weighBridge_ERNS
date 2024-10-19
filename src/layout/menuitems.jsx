import { AiFillHome } from 'react-icons/ai';
import { PiTable, PiFolder, PiCaretDownBold } from 'react-icons/pi';

export const AdminMenuItems = [
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
          href: 'admin/company/create',
          icon: <PiFolder />,
        },
        {
          name: 'user Masters',
          href: 'admin/user/master',
          icon: <PiFolder />,
        },
        // {
        //   name: 'Change Company',
        //   href: '/Company/Change',
        //   icon: <PiFolder />,
        // },
        // {
        //   name: 'Modify Company',
        //   href: '/Company/Modify',
        //   icon: <PiFolder />,
        // },
        // {
        //   name: 'User LogOut',
        //   href: '/Company/logout',
        //   icon: <PiFolder />,
        // },
      ],
    },
    {
      name: 'Masters',
      href: '#',
      icon: <PiTable />,
      dropdownItems: [
        {
          name: 'customer Masters',
          href: 'admin/customer/master',
          icon: <PiFolder />,
        },
        {
          name: 'Vehicle No Master',
          href: 'admin/vehicleno/master',
          icon: <PiFolder />,
        },
        {
          name: 'Vehicle Type Master',
          href: 'admin/vehicletype/master',
          icon: <PiFolder />,
        },
        {
          name: 'Material Master',
          href: 'admin/material/master',
          icon: <PiFolder />,
        },
      ],
    },
    {
      name: 'Weighment',
      href: '#',
      icon: <PiTable />,
      dropdownItems: [
        {
          name: 'Weighment Master',
          href: 'admin/weighing/master',
          icon: <PiFolder />,
        },
      ]
    },
    // {
    //   name: 'Report',
    //   href: '#',
    //   icon: <PiTable />,
    //   dropdownItems: [
    //     {
    //       name: 'Ledger Report',
    //       href: '/ledger/report',
    //       icon: <PiFolder />,
    //     },
    //     {
    //       name: 'Day Book Report',
    //       href: '/daybook/report',
    //       icon: <PiFolder />,
    //     },
    //   ]
    // },
    // {
    //   name: 'Settings',
    //   href: '#',
    //   icon: <PiTable />,
    //   dropdownItems: [
    //     {
    //       name: 'User Permission',
    //       href: '/userpermission/setting',
    //       icon: <PiFolder />,
    //     },
    //     {
    //       name: 'DataBase Shrink',
    //       href: '/shrinkdatabase/setting',
    //       icon: <PiFolder />,
    //     },
    //     {
    //       name: 'DataBase Shrink',
    //       href: '/shrinkdatabase/setting',
    //       icon: <PiFolder />,
    //     },
    //     {
    //       name: 'Log Out',
    //       href: '/settings/logout',
    //       icon: <PiFolder />,
    //     },
    //   ]
    // }
  ];

  export const SubscriberMenuItems = [
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
          href: 'owner/company/create',
          icon: <PiFolder />,
        },
        {
          name: 'user Masters',
          href: 'owner/user/master',
          icon: <PiFolder />,
        },
        // {
        //   name: 'Change Company',
        //   href: '/Company/Change',
        //   icon: <PiFolder />,
        // },
        // {
        //   name: 'Modify Company',
        //   href: '/Company/Modify',
        //   icon: <PiFolder />,
        // },
        // {
        //   name: 'User LogOut',
        //   href: '/Company/logout',
        //   icon: <PiFolder />,
        // },
      ],
    },
    {
      name: 'Masters',
      href: '#',
      icon: <PiTable />,
      dropdownItems: [
        {
          name: 'customer Masters',
          href: 'owner/customer/master',
          icon: <PiFolder />,
        },
        {
          name: 'Vehicle No Master',
          href: 'owner/vehicleno/master',
          icon: <PiFolder />,
        },
        {
          name: 'Vehicle Type Master',
          href: 'owner/vehicletype/master',
          icon: <PiFolder />,
        },
        {
          name: 'Material Master',
          href: 'owner/material/master',
          icon: <PiFolder />,
        },
      ],
    },
    {
      name: 'Weighment',
      href: '#',
      icon: <PiTable />,
      dropdownItems: [
        {
          name: 'Weighment Master',
          href: 'owner/weighing/master',
          icon: <PiFolder />,
        },
      ]
    },
    // {
    //   name: 'Report',
    //   href: '#',
    //   icon: <PiTable />,
    //   dropdownItems: [
    //     {
    //       name: 'Ledger Report',
    //       href: '/ledger/report',
    //       icon: <PiFolder />,
    //     },
    //     {
    //       name: 'Day Book Report',
    //       href: '/daybook/report',
    //       icon: <PiFolder />,
    //     },
    //   ]
    // },
    // {
    //   name: 'Settings',
    //   href: '#',
    //   icon: <PiTable />,
    //   dropdownItems: [
    //     {
    //       name: 'User Permission',
    //       href: '/userpermission/setting',
    //       icon: <PiFolder />,
    //     },
    //     {
    //       name: 'DataBase Shrink',
    //       href: '/shrinkdatabase/setting',
    //       icon: <PiFolder />,
    //     },
    //     {
    //       name: 'DataBase Shrink',
    //       href: '/shrinkdatabase/setting',
    //       icon: <PiFolder />,
    //     },
    //     {
    //       name: 'Log Out',
    //       href: '/settings/logout',
    //       icon: <PiFolder />,
    //     },
    //   ]
    // }
  ];

  export const UserMenuItems = [
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
          name: 'user Masters',
          href: '/user/master',
          icon: <PiFolder />,
        },
        // {
        //   name: 'Change Company',
        //   href: '/Company/Change',
        //   icon: <PiFolder />,
        // },
        // {
        //   name: 'Modify Company',
        //   href: '/Company/Modify',
        //   icon: <PiFolder />,
        // },
        // {
        //   name: 'User LogOut',
        //   href: '/Company/logout',
        //   icon: <PiFolder />,
        // },
      ],
    },
    {
      name: 'Masters',
      href: '#',
      icon: <PiTable />,
      dropdownItems: [
        {
          name: 'customer Masters',
          href: 'user/customer/master',
          icon: <PiFolder />,
        },
        {
          name: 'Vehicle No Master',
          href: 'user/vehicleno/master',
          icon: <PiFolder />,
        },
        {
          name: 'Vehicle Type Master',
          href: 'user/vehicletype/master',
          icon: <PiFolder />,
        },
        {
          name: 'Material Master',
          href: 'user/material/master',
          icon: <PiFolder />,
        },
      ],
    },
    {
      name: 'Weighment',
      href: '#',
      icon: <PiTable />,
      dropdownItems: [
        {
          name: 'Weighment Master',
          href: 'user/weighing/master',
          icon: <PiFolder />,
        },
      ]
    },
    // {
    //   name: 'Report',
    //   href: '#',
    //   icon: <PiTable />,
    //   dropdownItems: [
    //     {
    //       name: 'Ledger Report',
    //       href: '/ledger/report',
    //       icon: <PiFolder />,
    //     },
    //     {
    //       name: 'Day Book Report',
    //       href: '/daybook/report',
    //       icon: <PiFolder />,
    //     },
    //   ]
    // },
    // {
    //   name: 'Settings',
    //   href: '#',
    //   icon: <PiTable />,
    //   dropdownItems: [
    //     {
    //       name: 'User Permission',
    //       href: '/userpermission/setting',
    //       icon: <PiFolder />,
    //     },
    //     {
    //       name: 'DataBase Shrink',
    //       href: '/shrinkdatabase/setting',
    //       icon: <PiFolder />,
    //     },
    //     {
    //       name: 'DataBase Shrink',
    //       href: '/shrinkdatabase/setting',
    //       icon: <PiFolder />,
    //     },
    //     {
    //       name: 'Log Out',
    //       href: '/settings/logout',
    //       icon: <PiFolder />,
    //     },
    //   ]
    // }
  ];