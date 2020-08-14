import React from "react";
import {useCMS, useLocalForm} from 'tinacms'

import Code from '../components/Code.js';

export default function Data() {
    const cms = useCMS();
    cms.sidebar.hidden = false;

    let content = {
        text: '' // There's nothing here!
    };

    const [page, form] = useLocalForm({
        id: 'edit',
        label: 'Edit',

        loadInitialValues() {
            return getContent()
        },

        fields: [
            {
                name: 'text',
                label: 'Text',
                component: 'textarea'
            }
        ],

        onSubmit(data, form) {
            alert('Form submitted! Just like how we fetched content, we could also send it to an API from here.');
            console.clear();
            console.log(data);
        }
    });

    async function getContent() {
        try {
            let content = await fetch("https://httpbin.org/anything", {
                method: 'POST',
                redirect: 'follow',
                mode: 'cors',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({body: 'This data is coming from an API response!'}),
            });
            let json = await content.json();
            return { text: json.json.body }
        }
        catch (e) {

        }
        return content;
    }

    let code = `let content = {
    text: '' // There's nothing here!
};

const [page, form] = useLocalForm({
    id: 'edit',
    label: 'Edit',

    // We are fetching the initial state from a callback function now.
    loadInitialValues() {
        return getContent()
    },

    fields: [
        {
            name: 'text',
            label: 'Text',
            component: 'textarea'
        }
    ],

    onSubmit(data, form) {
        alert('Form submitted! Just like how we fetched content, we could also send it to an API from here.');
        console.log(data);
    }
});

async function getContent() {
    try {
        let content = await fetch("https://httpbin.org/anything", {
            method: 'POST',
            redirect: 'follow',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({body: 'This data is coming from an API response!'}),
        });
        let json = await content.json();
        return { text: json.json.body }
    }
    catch (e) {

    }
    return content;
}

return (
    <>
        <p>{page.text}</p>
    </>
);`;

    return (
        <>
            <p>{page.text}</p>
            <Code readMoreLink="https://tinacms.org/docs/cms#adding-an-api" readMoreText="Tina provides additional API functionality">
                {code}
            </Code>
        </>
    );
}
