import React from "react";
import MarkdownPreview from "@uiw/react-markdown-preview";

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
