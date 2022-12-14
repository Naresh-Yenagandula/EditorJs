
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS';
import SuperscriptIcon from '@mui/icons-material/Superscript';
import SubscriptIcon from '@mui/icons-material/Subscript';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import "./Editor.css"
import { useState } from 'react';


const Editor = (props: object) => {

    const [editable, setEditable] = useState(true)

    const options = [
        {
            name: <FormatBoldIcon />,
            id: "bold"
        },
        {
            name: <FormatItalicIcon />,
            id: "italic"
        },
        {
            name: <FormatUnderlinedIcon />,
            id: "underline"
        },
        {
            name: <StrikethroughSIcon />,
            id: "strikethrough"
        },
        {
            name: <SuperscriptIcon />,
            id: "superscript"
        },
        {
            name: <SubscriptIcon />,
            id: "subscript"
        },
        {
            name: <FormatListNumberedIcon />,
            id: "insertOrderedList"
        },
        {
            name: <FormatListBulletedIcon />,
            id: "insertUnorderedList"
        }
    ]

    const modifyText = (
        cmd: string,
        defaultUi: boolean = false,
        value: string | undefined = undefined
    ) => {
        document.execCommand(cmd, defaultUi, value)
    }

    const createLink = () => {
        let link = prompt("Enter url") as string
        if (/http/i.test(link)) {
            modifyText("createLink", false, link);
        } else {
            link = "http://" + link;
            modifyText("createLink", false, link);
        }
    }

    return (
        <div className="container">
            <div className="box">
                {editable ?
                    <div className="options">
                        {
                            options.map((option) => {
                                return (
                                    <button
                                        className="option-button"
                                        id={option.id}
                                        onClick={() => modifyText(option.id)}
                                    >
                                        {option.name}
                                    </button>
                                )
                            })
                        }
                        <button id="createLink" className='option-button' onClick={() => createLink()}><InsertLinkIcon /></button>
                        <select name="" id="fontName" onChange={(e) => modifyText("fontName", false, e.target.value)}>
                            <option value="Arial">Arial</option>
                            <option value="Times New Roman">Times New Roman</option>
                            <option value="Verdana">Verdana</option>
                            <option value="Georgia">Georgia</option>
                        </select>
                        <select name="" id="fontSize" onChange={(e) => modifyText("fontSize", false, e.target.value)}>
                            <option value="1">10</option>
                            <option value="2">12</option>
                            <option value="3">14</option>
                            <option value="4">16</option>
                            <option value="5">18</option>
                        </select>
                        <div className="color">
                            <label htmlFor="foreColor">Font Color: </label>
                            <input id="foreColor" type="color" onChange={(e) => modifyText("foreColor", false, e.target.value)} />
                        </div>
                        <div className='color'>
                            <label htmlFor="backColor">Highlight: </label>
                            <input id="backColor" type="color" onChange={(e) => modifyText("backColor", false, e.target.value)} />
                        </div>
                    </div>
                    : null}
                <hr />
                <div className='content'>
                    <button className='save' onClick={() => setEditable(!editable)}>{
                        editable ? <SaveIcon /> : <EditIcon />
                    }</button>
                    <div className="text-input" contentEditable={editable}></div>

                </div>
            </div>
        </div>
    )
}

export default Editor;