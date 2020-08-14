import React from "react";
import { useInlineForm } from 'react-tinacms-inline';
import { Button } from 'bloomer';

export default function InlineToggle() {
    const { status, deactivate, activate } = useInlineForm();

    return (
        <Button
            onClick={() => {
                status === 'active' ? deactivate() : activate()
            }}
            isColor="primary"
        >
            {status === 'active' ? 'Preview' : 'Edit This Page'}
        </Button>
    )
}