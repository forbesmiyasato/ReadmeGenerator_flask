import React from "react";
import MarkdownPreview from "@uiw/react-markdown-preview";

//Renders the preview of the markdown code (Sample of how it'll look in Github)
const Preview = ({ markdown }) => {
    return (
        <>
            <div className="border border-light shadow-sm rounded p-2">
                <MarkdownPreview source={markdown} />
            </div>
        </>
    );
};

export default Preview;
