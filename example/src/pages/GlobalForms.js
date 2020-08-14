import React from "react";
import {useCMS, useLocalForm, useGlobalForm } from 'tinacms';
import Code from '../components/Code.js';
import NextLink from "../components/NextLink";

export default function GlobalForms() {
    const cms = useCMS();
    cms.sidebar.hidden = false;

    const [_, globalForm] = useGlobalForm({
        id: 'site',
        label: 'Edit Site Settings',

        initialValues: {
            siteTitle: 'Hello Tina'
        },

        fields: [
            {
                name: 'siteTitle',
                label: 'Site Title',
                component: 'text'
            }
        ],

        onSubmit(data, form) {
            alert('Form submitted! Check the console to see the form values.');
            console.clear();
            console.log(data);
        }
    });

    let content = {
        text: "There's a menu in the sidebar now, we can access global forms there."
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

// This is the global form!    
const [_, globalForm] = useGlobalForm({
    id: 'site',
    label: 'Edit Site Settings',

    initialValues: {
        siteTitle: 'Hello Tina'
    },

    fields: [
        {
            name: 'siteTitle',
            label: 'Site Title',
            component: 'text'
        }
    ],

    onSubmit(data, form) {
        alert('Form submitted! Check the console to see the form values.');
        console.log(data);
    }
});

// The rest of the page specific code & form structure remains the same as our previous examples`;

    return (
        <>
            <p>{page.text}</p>

            <Code readMoreLink="https://tinacms.org/docs/forms#useglobalform" readMoreText="Read the docs">
                {code}
            </Code>
        </>
    );
}