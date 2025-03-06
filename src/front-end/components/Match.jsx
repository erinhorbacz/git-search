import React from 'react';
import '../../styles.css';

const Match = ({branch, file, line, content, keyword}) => {
    const folders = file.split('/');
    if (folders[0] === 'build') {
        return 
    };

    const highlightedContent = content?.split(keyword)?.map((part, index, arr) => {
        if (index < (arr.length - 1)) {
            return (
                <span key={index}>
                    {part}
                    <span className='highlight'>keyword</span>
                </span>
            )
        }
        return <span key={index}>{part}</span>
    });

    return (
        <div className='match'>
            <p className='branch'>{branch}</p>
            <p className='file-path'>{file}</p>
            <p className='line-number'>Line number: {line}</p>
            <p className='match-content'>{highlightedContent}</p>
        </div>
    )
};

export default Match;