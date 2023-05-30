import {useState} from "react";
import {Chip, TextField} from "@mui/material";

export default function MultipleStringInput({strings, setStrings, label, placeHolder, name, formState, setFormState}) {
    const [inputValue, setInputValue] = useState('');
    // const [strings, setStrings] = useState([]);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && inputValue.trim() !== '') {
            setStrings((prevStrings) => [...prevStrings, inputValue.trim()]);
            setInputValue('');

            setFormState({
                ...formState,
                [name]: (strings)
            });
        }
    };

    const handleDelete = (index) => {
        setStrings((prevStrings) => prevStrings.filter((_, i) => i !== index));
    };

    return (
        <div>
            <TextField
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                label={label}
                variant="outlined"
                fullWidth
                size="small"
                margin="dense"
                placeholder={placeHolder}
            />
            {strings.map((str, index) => (
                <Chip
                    key={index}
                    label={str}
                    onDelete={() => handleDelete(index)}
                    style={{ margin: '4px' }}
                    size={"small"}
                />
            ))}

        </div>
    );
}