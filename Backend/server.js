import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});


app.use(express.static('data'));

// Routes

app.get('/api/html', (req, res) => {
    res.sendFile('htmlquestion.json', { root: 'backend/data' });
});

app.get('/api/css', (req, res) => {
    res.sendFile('cssquestion.json', { root: 'backend/data' });
});

app.get('/api/Javascript', (req, res) => {
    res.sendFile('javascriptquestion.json', { root: 'backend/data' });
});

app.get('/api/react', (req, res) => {
    res.sendFile('reactquestions.json', { root: 'backend/data' });
});

app.get('/api/wordpress', (req, res) => {
    res.sendFile('wordpressquestion.json', { root: 'backend/data' });
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
