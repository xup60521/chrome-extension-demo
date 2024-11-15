import React, { useEffect } from "react";
import logo from "@assets/img/logo.svg";

export default function Popup(): JSX.Element {
    const [savedText, setSavedText] = React.useState<string>("");
    useEffect(() => {
        // console.log(chrome.storage)
    
        chrome.storage.sync.get("savedText", (data) => {
            setSavedText(data.savedText || "No text saved yet.");
        });

        // Listen for changes in storage
        const handleStorageChange = (
            changes: { [key: string]: chrome.storage.StorageChange },
            areaName: string
        ) => {
            if (areaName === "sync" && changes.savedText) {
                setSavedText(changes.savedText.newValue || "");
            }
        };

        chrome.storage.onChanged.addListener(handleStorageChange);
    }, []);

    return (
        <div className="absolute top-0 left-0 right-0 bottom-0 text-center h-full p-3 bg-gray-800 text-white">
            {savedText || "no saved text yet"}
        </div>
    );
}
