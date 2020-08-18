import { useTranslation } from '@tinalabs/react-tinacms-localization';
import React from 'react';
import { useCMS, useForm, usePlugin } from 'tinacms';

import Code from '../components/Code.js';

export default function Forms() {
  const cms = useCMS();

  const fallbackData = {
    header: 'The is a title',
    text: 'This is some text',
    paragraph: 'this is some fallback data',
  };
  const content = {
    header: 'The is a title',
    text: 'This is some text',
  };
  const contentFR = {
    header: "c'est une rubrique",
    text: 'Ceci est un texte',
  };
  const [formData, form] = useForm({
    id: 'edit',
    label: 'Edit',

    initialValues: {
      ...content,
    },

    fields: [
      {
        name: 'header',
        label: 'Heading',
        component: 'text',
      },
      {
        name: 'text',
        label: 'Text',
        component: 'textarea',
      },
      {
        name: 'paragraph',
        label: 'Paragraph',
        component: 'textarea',
      },
    ],

    onSubmit(data, form) {
      alert('Form submitted! Check the console to see the form values.');
      console.clear();
      console.log(data);
    },
  });

  usePlugin(form);
  const [t, i18n] = useTranslation(formData, fallbackData);

  let code = ``;

  return (
    <>
      <h1>{t('heading')}</h1>
      <p>{t('text')}</p>
      <p>{t('paragraph')}</p>

      <Code
        readMoreLink="https://tinacms.org/docs/forms"
        readMoreText="Read the docs"
      >
        {code}
      </Code>
    </>
  );
}
