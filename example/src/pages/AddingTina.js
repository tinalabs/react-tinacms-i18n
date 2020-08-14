import React from "react";
import { useCMS } from "tinacms";
import NextLink from "../components/NextLink.js";

import Code from '../components/Code.js';

export default function AddingTina() {
    const cms = useCMS();
    cms.sidebar.hidden = false;

    let code = `
import { Tina, TinaCMS } from 'tinacms';
const cms = new TinaCMS();
return (
    <Tina cms={cms}>
        <MyApp />
    </Tina>
);
 `;

    return (
        <>
            <p>See the icon on the left?</p>
            <p>Tina is an open-source content editing toolkit. And we've added it to this page.</p>

            <Code readMoreLink="https://tinacms.org/docs/cms" readMoreText="Read the docs">
                {code}
            </Code>
        </>
    );
}