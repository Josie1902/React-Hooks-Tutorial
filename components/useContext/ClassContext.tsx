import React, {Component} from "react";
import { ThemeContext } from "@/app/use-context/page";

export default class ClassContextComponent extends Component {
    themeStyles(dark: boolean){
        return {
            backgroundColor: dark ? '#333' : '#CCC',
            color: dark ? '#FFF' : '#333',
            padding: '2rem',
            margin: '2rem',
        }
    }

    render() {
        return (
            <ThemeContext.Consumer>
                {darkTheme => (
                    <div style={this.themeStyles(darkTheme)}>
                        <h2>Class Component using Context</h2>
                        <p>The current theme is {darkTheme ? "Dark" : "Light"}</p>
                    </div>
                )}
            </ThemeContext.Consumer>
        )
    }
}