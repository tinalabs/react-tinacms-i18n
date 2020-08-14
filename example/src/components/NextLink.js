import React from "react";
import { Link } from "react-router-dom";

export default function NextLink(props) {
    return (
        <Link to={props.to} className="is-size-5 has-text-right" style={{display: 'block', marginTop: 60, marginRight: 60}}>{props.children}</Link>
    );
}