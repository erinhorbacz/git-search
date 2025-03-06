import React, {useState} from 'react';
import SearchBox from './components/SearchBox';
import SearchButton from './components/SearchButton';
import SearchOutput from './SearchOutput';
import {searchBranch} from '../back-end/search';
import Label from './components/Label';

const SearchField = () => {
    const [matches, setMatches] = useState([]);
    const [keyWord, setKeyWord] = useState('');
    const [pathToRepo, setPathToRepo] = useState('');
    
    const handleSearch = async () => {
        if (pathToRepo === '' || keyWord === '') {
            setMatches([]);
            return 'Input required. Please enter a value and try again.'
        };
        const returnedMatches = await searchBranch(keyWord, pathToRepo).then(data => data);
        if (returnedMatches[0]?.error) {
            const parts = returnedMatches[0]?.error?.split(':');
            setMatches([]);
            return `There is an issue with that file path. ${parts[parts.length - 1]}: ${parts[parts.length - 2]}`
        };
        if (returnedMatches.length === 0) {
            setMatches('no output');
            return;
        };
        setMatches(returnedMatches);
    };

    return (
        <div className=''>
            <div>
                <SearchBox
                    props={{
                        tooltip: 'Input the text you want to search for',
                        label: 'Text to Match',
                        id: 'textToMatch',
                        input: keyWord,
                        setInput: setKeyWord,
                    }}
                />
                <SearchBox
                    props={{
                        tooltip: 'Input the global path to the local repository you want to search',
                        label: 'Path to Local Repo',
                        id: 'pathToRepo',
                        input: pathToRepo,
                        setInput: setPathToRepo,
                    }}
                />
                <SearchButton handleSearch={handleSearch} />
            </div>
            {(matches.length > 0 && matches !== 'no output') && 
                <SearchOutput 
                    props = {{
                        matches,
                        keyWord,
                    }}
                />
            }
            {matches === 'no output' && 
                <Label>No matches found </Label>
            }
        </div>
    )
};

export default SearchField;