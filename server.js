const express = require('express');
const path = require('path');
const port = process.env.PORT || 8081;
const app = express();

// the __dirname is the current directory from where the script is running
app.use(express.static(path.resolve(__dirname, 'build')));

// send the user to index html page inspite of the url
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

app.listen(port, ()=>{
    console.log(`Example app listening at http://localhost:${port}`)
});