import {
  useI18n,
  useLocalePromptPlugin,
  useTranslation,
} from '@tinalabs/react-tinacms-i18n';
import React from 'react';
import { useForm, usePlugin } from 'tinacms';

import { Layout } from '../components/Layout.js';

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
    content = {
      header: `Edit a header in ${i18n.getFormateLocale()}`,
      text: `Edit a paragraph in ${i18n.getFormateLocale()}`,
      paragraph: `Edit a paragraph in ${i18n.getFormateLocale()}`,
    };
    console.log('no locale exists');
    console.warn(error);
  }

  // define fallback data
  const fallbackData = require('../content/PromptPage/en.json');

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
  const t = useTranslation(formData, fallbackData);

  useLocalePromptPlugin(!hasContent, {
    onNo: () => {
      i18n.setLocale({
        language: { code: 'en', label: 'English' },
        region: { code: 'CA', label: 'Canada' },
      });
    },
  });

  let code = `import {
    useI18n,
+   useLocalePromptPlugin,
    useTranslation,
  } from '@tinalabs/react-tinacms-i18n';
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
    const fallbackData = require('../content/PromptPage/en.json');
  
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
    const t = useTranslation(formData, fallbackData);
  
+   useLocalePromptPlugin(!hasContent, {
+     onNo: () => {
+       i18n.setLocale({
+         language: { code: 'en', label: 'English' },
+         region: { code: 'CA', label: 'Canada' },
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
    <Layout code={code} nextLink="whats-next" prevLink="switch-locale">
      <h1 className="title is-1">{t('header')}</h1>
      <p>{t('text')}</p>
      <p>{t('paragraph')}</p>
    </Layout>
  );
}
