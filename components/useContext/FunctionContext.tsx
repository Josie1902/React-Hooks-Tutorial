"use client";
import { ThemeContext } from "@/app/use-context/page";
import React, {useContext} from "react";

export default function FunctionContextComponent() {
    const darkTheme = useContext(ThemeContext);
    const themeStyles = {
        backgroundColor: darkTheme ? '#333' : '#CCC',
        color: darkTheme ? '#FFF' : '#333',
        padding: '2rem',
        margin: '2rem',
    }
    return (
        <div style={themeStyles}>
            Function Component using Context
            <p>The current theme is {darkTheme ? "Dark" : "Light"}</p>
        </div>
    )
}