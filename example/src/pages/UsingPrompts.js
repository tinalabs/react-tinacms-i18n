import {
  useI18n,
  useLocalePromptPlugin,
  useTranslation,
} from '@tinalabs/react-tinacms-localization';
import React from 'react';
import { useForm, usePlugin } from 'tinacms';

import Code from '../components/Diff.js';

export default function Forms() {
  const i18n = useI18n();
  let hasContent = true;

  // get the content
  let content = {};
  const currentLocale = i18n.locale;
  try {
    content = require(`../content/PromptPage/${i18n.localeToString(
      currentLocale
    )}`);
  } catch (error) {
    hasContent = false;
    console.log('no locale exists');
    console.warn(error);
  }

  // define fallback data
  const fallbackData = require('../content/PromptPage/en_ca.json');

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

  useLocalePromptPlugin(!hasContent, {
    onNo: () => {
      i18n.setLocale({
        language: 'en',
        region: 'ca',
      });
    },
  });

  let code = `import {
    useI18n,
+   useLocalePromptPlugin,
    useTranslation,
  } from '@tinalabs/react-tinacms-localization';
  import React from 'react';
  import { useForm, usePlugin } from 'tinacms';
  
  
  export default function Forms() {
    const i18n = useI18n();
+   let hasContent = true;
  
    // get the content
    let content = {};
    const currentLocale = i18n.locale;
    try {
      content = require(\`../content/PromptPage/\${i18n.localeToString(
        currentLocale
      )}\`);
    } catch (error) {
+     hasContent = false;
      console.log('no locale exists');
      console.warn(error);
    }
  
    // define fallback data
    const fallbackData = require('../content/PromptPage/en_ca.json');
  
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
    const [t] = useTranslation(formData, fallbackData);
  
+   useLocalePromptPlugin(!hasContent, {
+     onNo: () => {
+       i18n.setLocale({
+         language: 'en',
+         region: 'ca',
+       });
+     },
+   });
  
    return (
      <>
        <h1 className="title is-1">{t('header')}</h1>
        <p>{t('text')}</p>
        <p>{t('paragraph')}</p>
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
