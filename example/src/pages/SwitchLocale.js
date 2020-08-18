import { useI18n, useTranslation } from '@tinalabs/react-tinacms-localization';
import { Title } from 'bloomer/lib/elements/Title';
import React, { useEffect, useState } from 'react';
import { useCMS, useForm, usePlugin } from 'tinacms';

import Code from '../components/Code.js';

export default function Forms() {
  const i18n = useI18n();
  // get the content
  let content = {};
  const currentLocale = i18n.locale;
  try {
    content = require(`../../content/${i18n.localeToString(currentLocale)}`);
  } catch (error) {
    console.log('no locale exists');
    console.warn(error);
  }
  // define fallback data
  const fallbackData = {
    header: 'fallback',
    text: 'fallback',
    paragraph: 'this is some fallback data',
  };

  // setup a form
  const [formData, form] = useForm({
    id: `edit-${i18n.localeToString(currentLocale)}`,
    label: `Edit form in ${i18n.getFormateLocale()}`,
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
  // register the form
  usePlugin(form);
  const [t] = useTranslation(formData, fallbackData);

  let code = `
  import { useI18n, useTranslation } from '@tinalabs/react-tinacms-localization';
  import { Title } from 'bloomer/lib/elements/Title';
  import React, { useEffect, useState } from 'react';
  import { useCMS, useForm, usePlugin } from 'tinacms';
  
  import Code from '../components/Code.js';
  
  export default function Forms() {
    const i18n = useI18n();
    // get the content
    let content = {};
    const currentLocale = i18n.locale;
    try {
      content = require(\`../../content/\${i18n.localeToString(currentLocale)}\`);
      console.log(content);
    } catch (error) {
      console.log('no locale exists');
      console.warn(error);
    }
    // define fallback data
    const fallbackData = {
      header: 'fallback',
      text: 'fallback',
      paragraph: 'this is some fallback data',
    };
  
    // setup a form
    const [formData, form] = useForm({
      id: \`edit-\${i18n.localeToString(currentLocale)}\`,
      label: \`Edit form in \${i18n.getFormateLocale()}\`,
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
    // register the form
    usePlugin(form);
    console.log({ formData });
    const [t] = useTranslation(formData, fallbackData);
  
    let code = \`\`;
  
    return (
      <>
        <h1 className="title is-1">{t('header')}</h1>
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
  `;

  return (
    <>
      <h1 className="title is-1">{t('header')}</h1>
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
