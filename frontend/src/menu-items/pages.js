import { QuestionOutlined } from '@ant-design/icons';

const icons = {
  QuestionOutlined
};

const albums = {
  id: 'pages',
  title: 'pages',
  type: 'group',
  children: [
    {
      id: 'about',
      title: 'About',
      type: 'item',
      url: '/about',
      icon: icons.QuestionOutlined
    }
  ]
};
export default albums;
