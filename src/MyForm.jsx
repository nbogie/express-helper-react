import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
export function MyForm() {
    const [formData, setFormData] = useState({ food: "", drink: "", game: "" });
    const [baseURL, setBaseURL] = useState("http://localhost:3001/faves");
    function onChange(e) {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
    function generateURL() {
        const url = new URL(baseURL);
        for (const key in formData) {
            url.searchParams.append(key, formData[key]);
        }
        return url.toString();
    }
    async function handleSubmit() {
        const url = generateURL();
        console.log("making GET request to " + url);
        try {
            const response = await axios.get(url);
            makeToastNotification(url);
            console.log("response: ", response.data);
        } catch (err) {
            toast("error - check browser console!", { type: "error" });
        }
    }

    function makeToastNotification(url) {
        toast(
            <div>
                <div style={{ fontWeight: "bold" }}>
                    Made successful GET request:
                </div>
                <div style={{ fontFamily: "monospace" }}>{url}</div>
            </div>,
            {
                style: { minWidth: "50ch" },
                position: "bottom-left",
                type: "success",
            }
        );
    }

    return (
        <div>
            <h2>HTTP GET helper form</h2>
            <div className="inputs">
                {["food", "drink", "game"].map((fieldName) => (
                    <div className="fieldRow" key={fieldName}>
                        <label htmlFor={fieldName}>{fieldName}</label>
                        <input
                            name={fieldName}
                            type="text"
                            value={formData[fieldName]}
                            placeholder={`fave ${fieldName}`}
                            onChange={onChange}
                        />
                    </div>
                ))}
                <button onClick={handleSubmit}>submit</button>
                <div className="fieldRow">
                    <label>base URL:</label>
                    <input
                        className="longInput"
                        type="text"
                        value={baseURL}
                        placeholder="base URL (e.g. http://localhost:3001/faves"
                        onChange={(e) => setBaseURL(e.target.value)}
                    />
                </div>

                <div className="fieldRow">
                    <label>generated URL:</label>
                    <input
                        readOnly
                        value={generateURL()}
                        className="longInput"
                    />
                </div>
            </div>
        </div>
    );
}
