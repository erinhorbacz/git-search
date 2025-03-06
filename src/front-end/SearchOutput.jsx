import React, {useState} from 'react';
import Match from './components/Match';
import Filter from './components/Filter';
import Label from './components/Label';

const SearchOutput = ({props}) => {
    const {keyWord, matches} = props;
    const [filteredMatches, setFilteredMatches] = useState(matches);

    return (
        <div> 
            <Label>{`Search Results for "${keyWord}"`}</Label>
            <Filter props={{matches, setFilteredMatches}}/>
            {(filteredMatches?.length === 0 || filteredMatches === 'no output') ? (
                <Label>No filter selected... please reset filters</Label>
            ) : (
                <>
                    <div className='match-list'>
                        {filteredMatches?.map((match, index) => {
                            if (match) {
                                return (
                                    <Match
                                        key={index}
                                        branch={match?.branch}
                                        file={match?.file}
                                        line={match?.line}
                                        content={match?.content}
                                        keyword={keyWord}
                                    />
                                )
                            } else return null
                        })}
                    </div>
                </>
            )}
        </div>
    )
}

export default SearchOutput;