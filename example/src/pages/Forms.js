import React from "react";
import {useCMS, useLocalForm} from 'tinacms'
import NextLink from "../components/NextLink";

import Code from '../components/Code.js';

export default function Forms() {
    const cms = useCMS();
    cms.sidebar.hidden = false;

    let content = {
        text: 'Now that we have a form, we can edit this text in the sidebar!'
    };

    const [page, form] = useLocalForm({
        id: 'edit',
        label: 'Edit',

        initialValues: {
            ...content
        },

        fields: [
            {
                name: 'text',
                label: 'Text',
                component: 'textarea'
            }
        ],

        onSubmit(data, form) {
            alert('Form submitted! Check the console to see the form values.');
            console.clear();
            console.log(data);
        }
    });

    let code = `const cms = useCMS();
let content = {
    text: 'Now that we have a form, we can edit this text in the sidebar!'
};

const [page, form] = useLocalForm({
    id: 'edit',
    label: 'Edit',

    initialValues: {
        ...content
    },

    fields: [
        {
            name: 'text',
            label: 'Text',
            component: 'textarea'
        }
    ],

    onSubmit(data, form) {
        alert('Form submitted! Check the console to see the form values.');
        console.log(data);
    }
});

return (
    <>
        <p>{page.text}</p>
    </>
);`;

    return (
        <>
            <p>{page.text}</p>
            
            <Code readMoreLink="https://tinacms.org/docs/forms" readMoreText="Read the docs">
                {code}
            </Code>
        </>
    );
}