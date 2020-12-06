import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import FormControl from "react-bootstrap/FormControl";

//Languages the app is supporting for translation
let languages = [
    { name: "English", code: "en" },
    { name: "Chinese", code: "zh-CN" },
    { name: "Hindi", code: "hi" },
    { name: "French", code: "fr" },
    { name: "Japanese", code: "ja" },
    { name: "Greek", code: "el" },
    { name: "Thai", code: "th" },
    { name: "Korean", code: "ko" },
    { name: "Spanish", code: "es" },
];

//Custom Dropdown to select languages to translate with
const LanguageDropdown = (props) => {
    const [selectedLanguage, setSelectedLanguage] = useState("");

    // CustomMenu code from react-bootstrap
    // forwardRef again here!
    // Dropdown needs access to the DOM of the Menu to measure it
    const CustomMenu = React.forwardRef(
        ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
            const [value, setValue] = useState("");

            return (
                <div
                    ref={ref}
                    style={style}
                    className={className}
                    aria-labelledby={labeledBy}
                >
                    <FormControl
                        autoFocus
                        className="mx-3 my-2 w-auto"
                        placeholder="Type to filter..."
                        onChange={(e) => setValue(e.target.value)}
                        value={value}
                    />
                    <ul className="list-unstyled">
                        {React.Children.toArray(children).filter(
                            (child) =>
                                !value ||
                                child.props.children
                                    .toLowerCase()
                                    .startsWith(value)
                        )}
                    </ul>
                </div>
            );
        }
    );

    const handleLanguageSelect = (key) => {
        setSelectedLanguage(key);
        props.onSelect(key);
    }

    return (
        <Dropdown className="mr-2" style={{ display: "inline-block" }}>
            <Dropdown.Toggle
                className="mb-2"
                variant="outline-secondary"
                id="dropdown-basic"
            >
                Translate Text
            </Dropdown.Toggle>

            <Dropdown.Menu as={CustomMenu}>
                {languages
                    .sort((a, b) =>
                        a.name > b.name ? 1 : a.name < b.name ? -1 : 0
                    )
                    .map((language) => {
                        return (
                            <Dropdown.Item
                                eventKey={language.code}
                                active={
                                    language.code === selectedLanguage
                                        ? true
                                        : false
                                }
                                onSelect={handleLanguageSelect}
                            >
                                {language.name}
                            </Dropdown.Item>
                        );
                    })}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default LanguageDropdown;
