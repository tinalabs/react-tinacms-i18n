import { LocalePickerToolbarPlugin, useI18n, useTranslation } from 'react-tinacms-i18n';
import React from 'react';
import { useForm, usePlugin } from 'tinacms';

import { Layout } from '../components/Layout.js';

export default function SwitchLocale() {
  const i18n = useI18n();

  // get the content
  let content = {};
  const currentLocale = i18n.locale;
  try {
    content = require(`../content/SwitchLocalePage/${i18n.localeToString(
      currentLocale
    )}`);
  } catch (error) {
    console.log('no locale exists');
    console.warn(error);
  }
  // define fallback data
  const fallbackData = require('../content/SwitchLocalePage/en.json');

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

  usePlugin(LocalePickerToolbarPlugin);

  // register the form
  usePlugin(form);
  const t = useTranslation(formData, fallbackData);

  let code = `
import { useI18n, useTranslation } from 'react-tinacms-i18n';
import React from 'react';
import { useForm, usePlugin } from 'tinacms';


export default function SwitchLocale() {
  const i18n = useI18n();

  // get the content
  let content = {};
  const currentLocale = i18n.locale;
  try {
    content = require(\`../content/${i18n.localeToString(currentLocale)}\`);
  } catch (error) {
    console.log('no locale exists');
    console.warn(error);
  }
  // define fallback data
  const fallbackData = require('../content/en.json');

  // setup a form
  const [formData, form] = useForm({
    id: \`edit-${i18n.localeToString(currentLocale)}\`,
    label: \`Edit form in ${i18n.getFormateLocale()}\`,
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

  return (
    <>
      <h1 className="title is-3">{t('header')}</h1>
      <p>{t('text')}</p>
      <p>{t('paragraph')}</p>
    </>
  );
}
  `;

  return (
    <Layout code={code} nextLink="/using-prompts" prevLink="/translations">
      <h1 className="title is-3">{t('header')}</h1>
      <p>{t('text')}</p>
      <p>{t('paragraph')}</p>
    </Layout>
  );
}
