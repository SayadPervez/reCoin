//ngrok http 3000

var http = require("http");
var path = require('path');
const fs=require('fs');
eval(fs.readFileSync('functions.js')+'');
var coins=2900;
var log_content=`<h1 class="x">Logged In<br><br>Your Balance:<br><br><span class="big">${coins}  <i class="fas fa-coins"></i></span></h1><button onclick="submit()" id="rf" class="hvr x button">Refresh</button><br><button id="T" onclick="T()" class="hvr x button">Transfer</button><br><button id="viewT" onclick="viewT()" class="hvr x button">View Transaction</button>`;
var log_code=`
    document.getElementById("pwd").disabled=true;
    document.getElementById("pwd").style.backgroundColor="#131313";
    document.getElementById("pwd_i").style.backgroundColor="#131313";
`;

function vMail(subject,reciever){
    const execSync = require('child_process').execSync;
    const output = execSync("python vMail.py "+`"${subject},${reciever}"`, { encoding: 'utf-8' });
    return(output);
}

console.log(vMail('password reset','ashwin.balaji.dav@gmail.com'));

function _post_(task,params){
    ret={task:'none',params:'none',status:'none',reply:'none',code:'none'};
    if(task=="write"){
        ret.task=task;
        ret.params=params;
        ret.status='success';
        ret.reply='written';
    }
    else if(task=="read"){
        ret.task=task;
        ret.params=params;
        ret.status='success';
        ret.reply='contents...';
    }
    else if(task=="login"){
        ret.task=task;
        ret.params=params;
        ret.status='success';
        ret.reply=encode(log_content);
        ret.code=encode(log_code);
        console.log(ret.task);
        console.log(ret.params);
    }
    else if(task=="transfer")
    {
        ret.task=task;
        ret.params=params;
        ret.status='success';
        ret.reply="content";
        ret.code=`window.location.replace(window.location.hostname+"/transfer");`;
        console.log(ret.task);
        console.log(ret.params);
    }
    else if(task=="viewTrans")
    {
        ret.task=task;
        ret.params=params;
        ret.status='success';
        ret.reply="content";
        ret.code=`window.location.replace(window.location.hostname+"/viewTransactions");`;
        console.log(ret.task);
        console.log(ret.params);
    }
    else{
        ret.task=task;
        ret.params=params;
        ret.status='failure';
        ret.reply=`No task as " ${task} "`;
    }
    return(ret);
}

var server = http.createServer(function (req, res) {
    console.log(req.url);
    if((req.url === '/mob')){
        fs.readFile('./mob_skeleton.html','UTF-8',(err,html)=>{
            res.writeHead(200,{'Content-Type':'text/html'});
            res.end(html);
        });
    }else if(req.url.match('\.css$')){
        var cssPath=path.join(__dirname,req.url);
        var fileStream= fs.createReadStream(cssPath,'UTF-8');
        res.writeHead(200,{'Content-Type':'text/css'});
        fileStream.pipe(res);
    }else if(req.url.match('\.js$')){
        var cssPath=path.join(__dirname,req.url);
        var fileStream= fs.createReadStream(cssPath,'UTF-8');
        res.writeHead(200,{'Content-Type':'text/javascript'});
        fileStream.pipe(res);
    }else{
        /*
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end('<h1>Error 404 <br> Page not found !</h1>');
        */
        console.log(req.url);
    }
    if((req.url === '/pc')){
        fs.readFile('./pc_skeleton.html','UTF-8',(err,html)=>{
            res.writeHead(200,{'Content-Type':'text/html'});
            res.end(html);
        });
    }else if(req.url.match('\.css$')){
        var cssPath=path.join(__dirname,req.url);
        var fileStream= fs.createReadStream(cssPath,'UTF-8');
        res.writeHead(200,{'Content-Type':'text/css'});
        fileStream.pipe(res);
    }else if(req.url.match('\.js$')){
        var cssPath=path.join(__dirname,req.url);
        var fileStream= fs.createReadStream(cssPath,'UTF-8');
        res.writeHead(200,{'Content-Type':'text/javascript'});
        fileStream.pipe(res);
    }else{
        /*
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end('<h1>Error 404 <br> Page not found !</h1>');
        */
        console.log(req.url);
    }
    if((req.url === '/')){
        fs.readFile('./skeleton.html','UTF-8',(err,html)=>{
            res.writeHead(200,{'Content-Type':'text/html'});
            res.end(html);
        });
    }else if(req.url.match('\.css$')){
        var cssPath=path.join(__dirname,req.url);
        var fileStream= fs.createReadStream(cssPath,'UTF-8');
        res.writeHead(200,{'Content-Type':'text/css'});
        fileStream.pipe(res);
    }else if(req.url.match('\.js$')){
        var cssPath=path.join(__dirname,req.url);
        var fileStream= fs.createReadStream(cssPath,'UTF-8');
        res.writeHead(200,{'Content-Type':'text/javascript'});
        fileStream.pipe(res);
    }else{
        /*
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end('<h1>Error 404 <br> Page not found !</h1>');
        */
        console.log(req.url);
    }
    if (req.method=="POST"){
        console.log('POST REQUEST');
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        body=JSON.parse(body);
        let t=body.task;
        let p=body.params;
        let response = _post_(t,p);
        res.end(JSON.stringify(response));
    });
}



}).listen(3000,()=>{
    console.log('Listening at 3000');
});
