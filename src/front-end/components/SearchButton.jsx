import { click } from '@testing-library/user-event/dist/click';
import React, {useState} from 'react';

export function SearchButton({handleSearch}) {
    const [error, setError] = useState();

    return (
        <div>
            <ButtonPrimary
                onClick={async () => {
                    const clickError = await handleSearch();
                    if (clickError) {
                        setError(clickError);
                    } else {
                        setError(null);
                    }
                }}
            >
                <Label style={{color: 'white'}}>Search</Label>
            </ButtonPrimary>
            {!!error && <Alert>{error}</Alert>}
        </div>
    )
}

export default SearchButton;