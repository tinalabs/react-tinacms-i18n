import {
  useI18n,
  useLocalePromptPlugin,
  useTranslation,
} from '@tinalabs/react-tinacms-localization';
import { Title } from 'bloomer/lib/elements/Title';
import React, { useEffect, useState } from 'react';
import { useCMS, useForm, usePlugin } from 'tinacms';

import Code from '../components/Code.js';

export default function Forms() {
  const i18n = useI18n();
  const cms = useCMS();
  console.log(cms.plugins.getType('prompt').all());
  // get the content
  let content = {};
  let hasContent = true;
  const currentLocale = i18n.locale;
  try {
    content = require(`../../content/${i18n.localeToString(currentLocale)}`);
  } catch (error) {
    console.log('no locale exists');
    console.warn(error);
    content = {};
    hasContent = false;
  }
  useLocalePromptPlugin(!hasContent, {
    onNo: () => {
      i18n.setLocale({
        language: 'en',
        region: 'ca',
      });
    },
  });
  console.log(cms.plugins.getType('prompt').all());

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
  console.log({ formData });
  // console.log({ keys: Object.keys(formData).length });
  console.log(hasContent);

  let code = ``;

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
