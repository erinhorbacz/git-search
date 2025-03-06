import React from 'react';
import ReactDOM from 'react-dom/client';
import Helmet from 'react-helmet';
import './index.css';
import SearchField from './front-end/SearchField';
import reportWebVitals from './reportWebVitals';
import tabFavicon from './assets/image.ico'

ReactDOM.render(
  <React.StrictMode>
    <Helmet 
    {...{
      title: 'git-search',
      link: [{rel: 'icon', href: tabFavicon}]
    }}>
    <SearchField />
    </Helmet>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
