import React from 'react';
import { Input, Label } from '@mui/icons-material';

const closeIcon = {
    right: '2%',
    top: '15%',
    // svg: 
};

const tooltipIcon = {
    marginLeft: -5,
};

const tooltipButton = {
    padding: 0,
};

const SearchBox = ({props}) => {
    const {tooltip, label, id, input, setInput} = props;

    const onChange = (event) => {
        setInput(event?.target?.value);
    };

    const clearText = () => {
        setInput('')
    };

    return (
        <div>
            <div>
                <Label>{label}</Label>
                <Tooltip>
                    {tooltip}
                </Tooltip>
            </div>
            <form>
                <div className='position-relative'>
                    <Input  
                        id={id}
                        onChange={onChange}
                        value={input}
                        required={true}
                    >
                        {input && (
                            <IconButton 
                                className='position-absolute'
                                styleType='tertiary'
                                theme={closeIcon}
                                onClick={clearText}
                                icon={<GlyphClose/>}
                            />
                        )}
                    </Input>
                </div>
            </form>
        </div>
    )
}

export default SearchBox;