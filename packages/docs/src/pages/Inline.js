import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useForm, useLocalForm } from 'tinacms';
import { InlineForm, InlineField } from 'react-tinacms-inline';
import InlineToggle from '../fields/InlineToggle.js';
import { Field, Label, Control, Input } from 'bloomer';
import NextLink from '../components/NextLink';

import Code from '../components/Code.js';

export default function Inline() {
  const [, form] = useForm({
    id: 'edit',
    label: 'Edit',

    initialValues: {
      title: 'This is the page title',
      body: 'Hello!',
    },

    fields: [
      {
        name: 'title',
        label: 'Title',
        component: 'text',
      },
      {
        name: 'body',
        label: 'Text',
        component: 'markdown',
      },
    ],

    onSubmit(data, form) {
      alert('Form submitted! Check the console to see the form values.');
      console.clear();
      console.log(data);
    },
  });

  let code = `const [, form] = useLocalForm({
    id: 'edit',
    label: 'Edit',

    initialValues: {
        title: 'This is the page title',
        body: 'Hello!'
    },

    fields: [
        {
            name: 'title',
            label: 'Title',
            component: 'text'
        },
        {
            name: 'body',
            label: 'Text',
            component: 'markdown'
        },
    ],

    onSubmit(data, form) {
        alert('Form submitted! Check the console to see the form values.');
        console.log(data);
    }
});

return (
    <>
        <InlineForm form={form}>
            <InlineField name="title">
                {
                    ({input, status}) => {
                        if (status === 'active') {
                            return (
                                <Field>
                                    <Label>Title</Label>
                                        <Control>
                                            <Input type="text" {...input} />
                                         </Control>
                                </Field>
                            )
                        }
                        return <h2 className="title is-2">{input.value}</h2>
                    }
                }
            </InlineField>
                    <InlineField name="body">
                        {
                            ({input, status}) => {
                                if (status === 'active') {
                                    return <Wysiwyg input={input} />
                                }
                                return <ReactMarkdown source={input.value} />
                            }
                        }
                    </InlineField>

                <div style={{marginTop: 40}}>
                    <InlineToggle/>
                </div>
            </InlineForm>
        </>
    );
    
`;

  return (
    <>
      {/* <InlineForm form={form}>
        <InlineField name="title">
          {({ input, status }) => {
            if (status === 'active') {
              return (
                <Field>
                  <Label>Title</Label>
                  <Control>
                    <Input type="text" {...input} />
                  </Control>
                </Field>
              );
            }
            return <h2 className="title is-2">{input.value}</h2>;
          }}
        </InlineField>
        <InlineField name="body">
          {({ input, status }) => {
            if (status === 'active') {
              return <Wysiwyg input={input} />;
            }
            return <ReactMarkdown source={input.value} />;
          }}
        </InlineField>

        <div style={{ marginTop: 40 }}>
          <InlineToggle />
        </div>
      </InlineForm>

      <Code
        readMoreLink="https://tinacms.org/docs/inline-editing"
        readMoreText="Read the docs"
      >
        {code}
      </Code> */}
    </>
  );
}
