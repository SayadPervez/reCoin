//ngrok http 3000


var resetJson={};

function add_reset(uname,rcode){
    resetJson[uname]=rcode;
}

function get_reset_code(uname){
    var code=resetJson[uname];
    delete resetJson[uname];
    return(code);
}

var http = require("http");
var path = require('path');
const fs=require('fs');
eval(fs.readFileSync('functions.js')+'');
var coins=700;
var log_content=`<h1 class="x">Logged In<br><br>Your Balance:<br><br><span class="big">${coins}  <i class="fas fa-coins"></i></span></h1><button onclick="submit()" id="rf" class="button">Refresh</button><br><br><button id="T" onclick="T()" class="button">Transfer</button><br><br><button id="viewT" onclick="viewT()" class="button">View Transaction</button>`;
var log_code=`
    document.getElementById("uname").disabled=true;
    document.getElementById("uname").style.backgroundColor="#232323";
    document.getElementById("uname_i").style.backgroundColor="#232323";
    document.getElementById("pwd").disabled=true;
    document.getElementById("pwd").style.backgroundColor="#131313";
    document.getElementById("pwd_i").style.backgroundColor="#131313";
`;
var fgpwd_content=`<h1 >Password Reset:</h1><br><br>
<form onsubmit="return(false)"><div class="iput" style="display:grid;grid-template-columns: 85% 15%;"><input class="input" id="pwd_uname" placeholder="Username"></input><div class="btn hvr" id='cpy-button' title="COPY text from login section" onclick="copy_uname()"><i class="far fa-copy" style="margin:2px auto;"></i></div></div></form>
<div style="display: grid;grid-template-columns: 50% 50%;margin: 2px auto;height: 9%;">
<button class="button" style="width:80%;height:100%;padding:2px 2px;margin: 2px auto;" id="get_otp_via_email" onclick="get_pwd_code()">Get OTP via Email</button>
<button class="button" style="width:80%;height:100%;padding:2px 2px;margin: 2px auto;" onclick="get_pwd_code()">Resend OTP</button></div><br><br>
<div id="s" style="display:none;color:red;font-weight: bolder;"></div><br><br>
<form onsubmit="return(false)"><div class="iput"><input class="input" id="pwd_otp_inp" placeholder="Enter your OTP"></input></div></form>
<button class="button" onclick="submit_otp()">Submit OTP</button><br><br>
<div id="sp" style="display:none;color:red;font-weight: bolder;"></div>`
var fgpwd_code=`
document.getElementById("uname").disabled=true;
document.getElementById("pwd").disabled=true;
document.getElementById("uname").style.backgroundColor="#131313";
document.getElementById("uname_i").style.backgroundColor="#131313";
document.getElementById("pwd").style.backgroundColor="#131313";
document.getElementById("pwd_i").style.backgroundColor="#131313";
`
var chpwd_content=`<h1>Reset Password:</h1><br><br>
<form onsubmit="return(false)"><div class="iput" ><input class="input" id='np1' placeholder="New Password"></input></div></form><br>
<form onsubmit="return(false)"><div class="iput" ><input class="input" id='np2' placeholder="Re-enter New Password"></input></div></form>
<br>
<span id="pwd_no_match" style="color:red;font-weight: bolder;display:none;">
    
</span><br><br>
<button class="button" onclick="pwd_validate()">Confirm Change</button>`


function vMail(subject,reciever){
    const execSync = require('child_process').execSync;
    const output = execSync("python vMail.py "+`"${subject},${reciever}"`, { encoding: 'utf-8' });
    return(output);
}

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
    else if(task=="forgot_pwd"){
        ret.task=task;
        ret.params=params;
        ret.status='success';
        ret.reply=encode(fgpwd_content);
        ret.code=encode(fgpwd_code);
        console.log(ret.task);
        console.log(ret.params);
    }
    else if(task=="new_pwd"){
        ret.task=task;
        ret.params=params;
        ret.status='success';
        ret.reply='none';
        ret.code='none';
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
    else if(task=="reset_pwd")
    {
        ret.task=task;
        ret.params=JSON.parse(params);
        ret.status='success';
        x=vMail('reset password',rpldecode(decode(ret.params.username)));
        console.log("code:"+String(x));
        add_reset(rpldecode(decode(ret.params.username)),x);
        ret.reply="content";
        console.log(ret.task);
        console.log(ret.params);
        console.log("(1)==>"+JSON.stringify(resetJson));
    }
    else if(task=="submit_pwd_otp")
    {
        ret.task=task;
        ret.params=JSON.parse(params);
        var u = ret.params.username;
        var c = ret.params.code;
        console.log(resetJson[rpldecode(decode(u))]);
        console.log(rpldecode(decode(c)));
        if(resetJson[rpldecode(decode(u))]==rpldecode(decode(c))+"\r\n")
            {ret.status='success';ret.reply=chpwd_content;
            }
        else
            {ret.status="falied";
            ret.reply=ret.status;}
        console.log(ret.task);
        console.log(ret.params);
        console.log("(1)==>"+JSON.stringify(resetJson));
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
