const express = require('express');
const path = require('path');
const port = process.env.PORT || 8081;
const app = express();

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { MOVIE_LIST } from './src/consts';
import { filterMoviesByQuery } from './src/redux/selectors';
import rootReducer from './src/redux/reducers';

// the __dirname is the current directory from where the script is running
app.use(express.static(path.resolve(__dirname, 'build')));

// send the user to index html page inspite of the url
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

// ssr
app.get('/search/:query', async (req, res) => {
  // Read the counter from the request, if provided
  const { query = '' } = req.query;
  const movies = await getMoviesByQuery(query);

  // Compile an initial state
  const preloadedState = { movies };

  // Create a new Redux store instance
  const store = createStore(rootReducer, preloadedState);
  const initialHTMLContent = getInitialHTMLContent(req, store);
  sendResponse(res, initialHTMLContent);
});

function getInitialHTMLContent(req, store) {
  return ReactDOMServer.renderToString(
    <StaticRouter location={req.url}>
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>
    </StaticRouter>
  );
}

function sendResponse(res, initialHTMLContent) {
  const indexFile = path.resolve(__dirname, 'build', 'index.html');
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Oops, better luck next time!');
    }

    return res.send(
      data.replace(
        '<div id="root"></div>',
        `<div id="root">${initialHTMLContent}</div>`
      )
    );
  });
}

function getMoviesByQuery(query) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const movies = filterMoviesByQuery(MOVIE_LIST, query);
      resolve(movies);
    }, 1000);
  });
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
