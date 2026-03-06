// assets
import { PictureOutlined, FileImageOutlined } from '@ant-design/icons';

// icons
const icons = {
  PictureOutlined,
  FileImageOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const albums = {
  id: 'albums',
  title: 'Albums',
  type: 'group',
  children: [
    {
      id: 'Album',
      title: 'Album',
      type: 'item',
      url: '/',
      icon: icons.PictureOutlined
    },
    {
      id: 'AddAlbum',
      title: 'Add Album',
      type: 'item',
      url: '/album/add',
      icon: icons.FileImageOutlined
    }
  ]
};

export default albums;
