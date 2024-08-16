import { Flex } from 'antd';
import React from 'react';
import {
  PiFacebookLogoFill,
  PiInstagramLogoFill,
  PiTwitterLogoFill,
  PiYoutubeLogoFill,
} from 'react-icons/pi';

const socialData = [
  {
    title: 'Facebook',
    icon: <PiFacebookLogoFill className="h-auto w-4" />,
    link: 'https://facebook.com',
  },
  {
    title: 'Twitter',
    icon: <PiTwitterLogoFill className="h-auto w-4" />,
    link: 'https://twitter.com',
  },
  {
    title: 'Instagram',
    icon: <PiInstagramLogoFill className="h-auto w-4" />,
    link: 'https://instagram.com',
  },
  {
    title: 'Youtube',
    icon: <PiYoutubeLogoFill className="h-auto w-4" />,
    link: 'https://youtube.com',
  },
];

// className="mt-8 flex items-center justify-center gap-6 py-6 md:mt-10 lg:mt-0 xl:py-8"
// className="social-btn-shadow inline-block rounded-full bg-white p-3 text-gray-500 transition-all duration-300 hover:text-gray-1000 dark:bg-gray-100 dark:text-gray-700 dark:hover:text-gray-1000"

function SocialItems() {
  return (
    <Flex justify='center' style={{margin:40,fontSize:'20px'}} gap='large' >
      {socialData.map(item => (
        <a
          key={item.title}
          href={item.link}
          rel="norefferer noreferrer"
          target="_blank"
          >
          {item.icon}
        </a>
      ))}
    </Flex>
  );
}

export default SocialItems;