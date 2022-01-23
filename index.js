// const sendExec = require('./src/send');
const express = require('express');
const app = express();

app.use(express.json());


app.post('/api/send', async (req, res)=>{
    console.log('req', req);
    // sendExec();
    return res.json('success!');
})

app.listen(8080, ()=>{
    console.log('port 8080 running');
});
