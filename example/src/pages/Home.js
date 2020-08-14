import React from "react";
import {useCMS} from "tinacms";
import NextLink from "../components/NextLink";

import Code from '../components/Code.js';


export default function Home() {
    const cms = useCMS();
    cms.sidebar.hidden = true;

    let code = `export default function Home() {                
return (
  <>
    <p>Hi! This is a simple page created with React.</p>
    <p>Wouldn't it be neat if we could edit pages like this in real time?</p>
  </>
)};`;

    return (
        <>
            <p>Hi! This is a simple page created with React.</p>
            <p>Wouldn't it be neat if we could edit pages like this in real time?</p>

            <Code>
                {code}
            </Code>
        </>
    );
}