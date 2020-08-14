import React from "react";
import {useCMS, useLocalForm} from 'tinacms';
import ReactMarkdown from 'react-markdown';
import NextLink from "../components/NextLink";

import Code from '../components/Code.js';

export default function FormFields() {
    const cms = useCMS();
    cms.sidebar.hidden = false;

    let content = {
        title: 'We added a page title',
        text: "And turned this into *rich text*. There's even a field for colors!",
        fontcolor: '#0069B6'
    };

    const [page, form] = useLocalForm({
        id: 'edit',
        label: 'Edit',

        initialValues: {
            ...content
        },

        fields: [
            {
                name: 'title',
                label: 'Title',
                component: 'text'
            },
            {
                name: 'text',
                label: 'Text',
                component: 'markdown'
            },
            {
                name: 'fontcolor',
                component: 'color',
                label: 'Font Color',
                description: 'Edit the font color here',
                colorFormat: 'hex',
                colors: ['#EC4815', '#241748', '#B4F4E0', '#E6FAF8'],
                widget: 'sketch',
            },
            {
                name: '_custom',
                component: () => <p>This is a custom component</p>
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
    title: 'We added a page title',
    text: "And turned this into *rich text*. There's even a field for colors!",
    fontcolor: '#0069B6'
};

const [page, form] = useLocalForm({
    id: 'edit',
    label: 'Edit',

    initialValues: {
        ...content
    },

    fields: [
        {
            name: 'title',
            label: 'Title',
            component: 'text'
        },
        {
            name: 'text',
            label: 'Text',
            component: 'markdown'
        },
        {
            name: 'fontcolor',
            component: 'color',
            label: 'Font Color',
            description: 'Edit the font color here',
            colorFormat: 'hex',
            colors: ['#EC4815', '#241748', '#B4F4E0', '#E6FAF8'],
            widget: 'sketch',
         },
         {
            name: '_custom',
            component: () => <p>This is a custom component</p>
         }
    ],

    onSubmit(data, form) {
        alert('Form submitted! Check the console to see the form values.');
        console.log(data);
    }
});

return (
   <>
        <div style={{color: page.fontcolor}}>
            <h2 className="title is-3">{page.title}</h2>
            <div><ReactMarkdown source={page.text}/></div>
        </div>
   </>
);`;

    return (
        <>
            <div style={{color: page.fontcolor}}>
                <h2 className="title is-3">{page.title}</h2>
                <div><ReactMarkdown source={page.text}/></div>
            </div>

            <Code readMoreLink="https://tinacms.org/docs/fields" readMoreText="Read the docs">
                {code}
            </Code>
        </>
    );
}