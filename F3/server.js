//ngrok http 3000

var http = require("http");
var path = require('path');
const fs=require('fs');


function _post_(task,params){
    ret={task:'none',params:'none',status:'none',reply:'none'};
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
        ret.reply='contents...';
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
