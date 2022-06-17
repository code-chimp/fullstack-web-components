import { CardComponent } from './Card';

export default {
  title: 'Components/Card',
  argTypes: {
    image: {
      control: { type: 'text' },
    },
    headline: {
      control: { type: 'text' },
    },
    content: {
      control: { type: 'text' },
    },
    link: {
      control: { type: 'text' },
    },
  },
};

const PrimaryTemplate = ({ image, headline, content, link }) => `
  <in-card>
    <img slot="header" alt="${headline}" src="${image}" />
    <h4 slot="header">${headline}</h4>
    <p slot="content">${content}</p>
    <a slot="footer" href="#">${link}</a>
  </in-card>`;

export const ImageCard = PrimaryTemplate.bind({});
ImageCard.args = {
  image:
    'https://images.unsplash.com/photo-1612392167062-8f76710986ba?ixid-mnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto-format&fit=crop&w=1350&q=80',
  headline: 'Food',
  content:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusantium consequatur culpa, cum, doloremque dolores esse exercitationem ',
  link: 'Read',
};
