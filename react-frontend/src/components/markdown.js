import React from "react";

//Renders the content of the markdown code to the screen.
const Markdown = ({ markdown }) => {
    return (
        <>
            <div className="bg-light pl-1 pr-1 border border-dark rounded">
                {markdown.split("\n").map((i, key) => {
                    return <p key={key}>{i}</p>;
                })}
            </div>
        </>
    );
};

export default Markdown;
