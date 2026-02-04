import {useTheme, useToggleTheme} from "@/components/useContext/ThemeContext";

export default function FunctionContextComponent2() {
    const darkTheme = useTheme();
    const toggleTheme = useToggleTheme();
    const themeStyles = {
        backgroundColor: darkTheme ? '#333' : '#CCC',
        color: darkTheme ? '#FFF' : '#333',
        padding: '2rem',
        margin: '2rem',
    }
    return (
        <>
            <button
              onClick={toggleTheme}
              className={`btn btn-active mb-0`}
            >
                Toggle Theme
            </button>
            <div style={themeStyles}>
                Function Component using Context
                <p>The current theme is {darkTheme ? "Dark" : "Light"}</p>
            </div>
        </>
    )
}