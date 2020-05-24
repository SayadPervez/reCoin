//ngrok http 3000

var transJson={};
var transactionsData={};
var resetJson={};

function addTransactionData(sid,rid,amt){
    transactionsData[sid]=String(`${sid},${rid},${amt}`);
}

function completeTransaction(sid){
    var ret=transactionsData[sid];
    delete transactionsData[sid];
    return(ret);
}

function add_trans(uname,tcode)
{
    transJson[uname]=tcode;
}

function get_trans(uname)
{
    var q=transJson[uname];
    delete transJson[uname];
    return(q);
}


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
var coins=1500;
var pc_log_content=`<h1 class="x">Logged In<br><br>Your Balance:<br><br><span class="big">${coins}  <i class="fas fa-coins"></i></span></h1><button onclick="submit()" id="rf" class="button">Refresh</button><br><br><button id="T" onclick="T()" class="button">Transfer</button><br><br><button id="viewT" onclick="viewT()" class="button">Mail My Transactions</button>`;
var pc_log_code=`
    document.getElementById("uname").disabled=true;
    document.getElementById("uname").style.backgroundColor="#232323";
    document.getElementById("uname_i").style.backgroundColor="#232323";
    document.getElementById("pwd").disabled=true;
    document.getElementById("pwd").style.backgroundColor="#131313";
    document.getElementById("pwd_i").style.backgroundColor="#131313";
    document.getElementById("forgot-pwd").innerText="Change Password";
`;
var pc_fgpwd_content=`<h1 >Password Reset:</h1><br><br>
<form onsubmit="return(false)"><div class="iput" style="display:grid;grid-template-columns: 85% 15%;"><input class="input" id="pwd_uname" placeholder="Username"></input><div class="btn hvr" id='cpy-button' title="COPY text from login section" onclick="copy_uname()"><i class="far fa-copy" style="margin:2px auto;"></i></div></div></form>
<div style="display: grid;grid-template-columns: 50% 50%;margin: 2px auto;height: 9%;">
<button class="button" style="width:80%;height:100%;padding:2px 2px;margin: 2px auto;" id="get_otp_via_email" onclick="get_pwd_code()">Get OTP via Email</button>
<button class="button" style="width:80%;height:100%;padding:2px 2px;margin: 2px auto;" onclick="get_pwd_code()">Resend OTP</button></div><br><br>
<div id="s" style="display:none;color:red;font-weight: bolder;"></div><br><br>
<form onsubmit="return(false)"><div class="iput"><input class="input" id="pwd_otp_inp" type="number" min="10000" step="1" max="99999" placeholder="Enter your OTP"></input></div></form>
<button class="button" onclick="submit_otp()">Submit OTP</button><br><br>
<div id="sp" style="display:none;color:red;font-weight: bolder;"></div>`
var pc_fgpwd_code=`
document.getElementById("uname").disabled=true;
document.getElementById("pwd").disabled=true;
document.getElementById("uname").style.backgroundColor="#131313";
document.getElementById("uname_i").style.backgroundColor="#131313";
document.getElementById("pwd").style.backgroundColor="#131313";
document.getElementById("pwd_i").style.backgroundColor="#131313";
`
var pc_chpwd_content=`<h1>Reset Password:</h1><br><br>
<form onsubmit="return(false)"><div class="iput" ><input class="input" type="password"  id='np1' placeholder="New Password"></input></div></form><br>
<form onsubmit="return(false)"><div class="iput" ><input class="input"  type="password" id='np2' placeholder="Re-enter New Password"></input></div></form>
<br>
<span id="pwd_no_match" style="color:red;font-weight: bolder;display:none;">
    
</span><br><br>
<button class="button" onclick="pwd_validate()">Confirm Change</button>`
var pc_transpage=`<h1>Tranfers Coins<br><br>Your Balance:<br><span class="big">${coins}  <i class="fas fa-coins"></i></span></h1><br>
<form onsubmit="return(false)"><div class="iput" id="to_i"><input class="input" id='to_' placeholder="Transfer to"></input></div></form>
<form onsubmit="return(false)"><div class="iput" id="t_amt"><input class="input" id='tAmt' placeholder="Amount" type="number" min="0" step="1" max="${coins}"></input></div></form><br>
<button class="button" onclick="totp()">Send Confirmation Code</button><br><br>
<span id="tsp" class="span">

</span>`

function recordTransactions(one_Transaction,status)
{
    fs.appendFileSync("./transactiondata.csv",`${one_Transaction},${status}\n`);
}

var mob_log_content=`<h1 class="x">Logged In<br><br>Your Balance:<br><span class="big">${coins}  <i class="fas fa-coins"></i></span></h1>
<button onclick="submit()" id="rf" class="button">Refresh</button><br><br>
<button id="T" onclick="T()" class="button">Transfer</button><br><br>
<button id="viewT" onclick="viewT()" class="button">View Transactions</button>`;
var mob_log_code=`
var arr=document.getElementsByClassName("pg1");
var i=0;
while(i<arr.length)
{
    arr[i].style.display="none";
    i++;
}
var arr2=document.getElementsByClassName("pg2");
var j=0;
while(j<arr2.length)
{
    arr2[j].style.display="block";
    j++;
}

`;
var mob_fgpwd_content=`<h2 >Password Reset:</h2>
<form onsubmit="return(false)"><div class="iput"><input class="input" id="pwd_uname" placeholder="Username"></input></div></form>
<button class="button" style="width:80%;padding:2px 2px;margin: 2px auto;" id="get_otp_via_email" onclick="get_pwd_code()">Get OTP via Email</button><br><br>
<button class="button" style="width:80%;padding:2px 2px;margin: 2px auto;" onclick="get_pwd_code()">Resend OTP</button><br><br>
<div id="s" style="display:none;color:red;font-weight: bolder;"></div><br><br>
<form onsubmit="return(false)"><div class="iput"><input class="input" id="pwd_otp_inp" type="number" step="1" min="10000" max="99999" placeholder="Enter your OTP"></input></div></form>
<button class="button" onclick="submit_otp()">Submit OTP</button><br><br>
<div id="sp" style="display:none;color:red;font-weight: bolder;"></div>`
var mob_fgpwd_code=`var arr=document.getElementsByClassName("pg1");
var i=0;
while(i<arr.length)
{
    arr[i].style.display="none";
    i++;
}
var arr2=document.getElementsByClassName("pg2");
var j=0;
while(j<arr2.length)
{
    arr2[j].style.display="block";
    j++;
}
`
var mob_chpwd_content=`<h1>Reset Password:</h1><br><br>
<form onsubmit="return(false)"><div class="iput" ><input class="input" type="password" id='np1' placeholder="New Password"></input></div></form><br>
<form onsubmit="return(false)"><div class="iput" ><input class="input"  type="password" id='np2' placeholder="Re-enter New Password"></input></div></form>
<br>
<span id="pwd_no_match" style="color:red;font-weight: bolder;display:none;">
    
</span><br><br>
<button class="button" onclick="pwd_validate()">Confirm Change</button>`

function vMail(subject,reciever){
    const execSync = require('child_process').execSync;
    const output = execSync("python vMail.py "+`"${subject},${reciever}"`, { encoding: 'utf-8' });
    return(output);
}

function tMail(amount,sender,reciever){
    const execSync = require('child_process').execSync;
    const output = execSync("python tMail.py "+`"${amount},${sender},${reciever}"`, { encoding: 'utf-8' });
    return(output);
}

function mailTransactions(sender){
    const execSync = require('child_process').execSync;
    const output = execSync("python mailTransactions.py "+`"${sender}"`, { encoding: 'utf-8' });
    if(output!="")
    {
        var i=0;
        var op="x";
        while(i<3 && op!="")
        {
            const execSync = require('child_process').execSync;
            op = execSync("python mailTransactions.py "+`"${sender}"`, { encoding: 'utf-8' });        
            i++;
        }
    }
}

function cMail(sender,reciever,amount){
    const execSync = require('child_process').execSync;
    const output = execSync("python cMail.py "+`"${sender},${reciever},${amount}"`, { encoding: 'utf-8' });
    return(output);
}

function _post_(device,task,params){
    console.log(device);
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
        if(device=="pc"){
        ret.reply=encode(pc_log_content);
        ret.code=encode(pc_log_code);}
        else{
            ret.reply=encode(mob_log_content);
            ret.code=encode(mob_log_code);
        }
        console.log(ret.task);
        console.log(ret.params);
    }
    else if(task=="forgot_pwd"){
        ret.task=task;
        ret.params=params;
        ret.status='success';
        if(device=="pc"){
        ret.reply=encode(pc_fgpwd_content);
        ret.code=encode(pc_fgpwd_code);}
        else{
        ret.reply=encode(mob_fgpwd_content);
        ret.code=encode(mob_fgpwd_code);
        }
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
    else if(task=="reqTransOTP"){
        ret.task=task;
        ret.params=JSON.parse(params);
        var pc_trans_final=`<h2>Confirm transfer of <br>${ret.params.amount} <i class="fas fa-coins"></i> to<br>${ret.params.receiver} </h2><br>
<form onsubmit="return(false)"><div class="iput" id="_o_t_p_"><input class="input" type="number" id='o_t_p' placeholder="Enter OTP"></input></div></form>
<br><button class="button" onclick="submitTOTP()">Confirm Transfer</button><br><br>
<button class="button" onclick="resendTOTP()">Resend OTP</button><br><br>
<span id=rstotp></span>`;
        ret.status="success";
        if(device=="pc"){
            var q=tMail(ret.params.amount,ret.params.sender,ret.params.receiver);
            add_trans(ret.params.sender,q);
            addTransactionData(ret.params.sender,ret.params.receiver,ret.params.amount);
            ret.reply=encode(pc_trans_final);
            ret.code=encode("none");
        }
    }
    else if(task=="confirmTransfer"){
        ret.task=task;
        console.log("params  :  "+params);
        ret.params=JSON.parse(params);
        var a_=ret.params.uname;
        var c_=decode(ret.params.code_);
        var v=get_trans(a_);
        console.log(JSON.stringify(transactionsData));
        
        if((c_)+"\r\n"==(v))
        {
            ret.status="success";
            var u=completeTransaction(a_);
            recordTransactions(u,"success");
            u=u.split(",");
            cMail(u[0],u[1],u[2]);
        }
        else{
            ret.status="failure";
            var u=completeTransaction(a_);
            recordTransactions(u,"failure");
        }
        ret.code="none";
    }
    else if(task=="transfer")
    {
        ret.task=task;
        ret.params=params;
        ret.status='success';
        if(device=="pc")
            {ret.reply=encode(pc_transpage);
            ret.code=encode(`${String(coins)}`);}
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
            {
                if(device=="pc")
                    {ret.status='success';ret.reply=pc_chpwd_content;}
                else
                {ret.status='success';ret.reply=mob_chpwd_content;}
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
        ret.params=JSON.parse(params);
        mailTransactions(rpldecode(decode(ret.params.username)));
        ret.status='success';
        ret.reply="content";
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
        let d=body.device;
        let t=body.task;
        let p=body.params;
        let response = _post_(d,t,p);
        res.end(JSON.stringify(response));
    });
}



}).listen(3000,()=>{
    console.log('Listening at 3000');
});
