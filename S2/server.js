var app = require('express')();
var express = require('express');
var path = require('path');
const fs=require('fs');
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var coins=0;
var resetJson={};
var transJson={};
var transactionsData={};

eval(fs.readFileSync('./public/functions.js')+'');


var pc_log_code=rplencode(`
    document.getElementById('span').innerHTML="";
    document.getElementById("uname").disabled=true;
    document.getElementById("uname").style.backgroundColor="#232323";
    document.getElementById("uname_i").style.backgroundColor="#232323";
    document.getElementById("pwd").disabled=true;
    document.getElementById("pwd").style.backgroundColor="#131313";
    document.getElementById("pwd_i").style.backgroundColor="#131313";
    document.getElementById("forgot-pwd").innerText="Change Password";
    document.getElementById("submit-button").innerText="Login Page";
`);
var pc_fgpwd_content=rplencode(`<h1 >Password Reset:</h1><br><br>
<form onsubmit="return(false)"><div class="iput" style="display:grid;grid-template-columns: 85% 15%;"><input class="input" id="pwd_uname" placeholder="Username"></input><div class="btn hvr" id='cpy-button' title="COPY username from login section" onclick="copy_uname()"><i class="far fa-copy" style="margin:2px auto;"></i></div></div></form>
<div style="display: grid;grid-template-columns: 50% 50%;margin: 2px auto;height: 9%;">
<button class="button" style="width:80%;height:100%;padding:2px 2px;margin: 2px auto;" id="get_otp_via_email" onclick="get_pwd_code()">Get OTP via Email</button>
<button class="button" style="width:80%;height:100%;padding:2px 2px;margin: 2px auto;" onclick="get_pwd_code()">Resend OTP</button></div><br><br>
<div id="s" style="display:none;color:red;font-weight: bolder;"></div><br><br>
<form onsubmit="return(false)"><div class="iput"><input class="input" id="pwd_otp_inp" type="number" min="10000" step="1" max="99999" placeholder="Enter your OTP"></input></div></form>
<button class="button" onclick="submit_otp()">Submit OTP</button><br><br>
<div id="sp" style="color:red;font-weight: bolder;"></div>`);
var pc_fgpwd_code=rplencode(`
document.getElementById('span').innerHTML="";
document.getElementById("uname").disabled=true;
document.getElementById("pwd").disabled=true;
document.getElementById("uname").style.backgroundColor="#131313";
document.getElementById("uname_i").style.backgroundColor="#131313";
document.getElementById("pwd").style.backgroundColor="#131313";
document.getElementById("pwd_i").style.backgroundColor="#131313";
`);
var pc_chpwd_content=rplencode(`<h1>Reset Password:</h1><br><br>
<form onsubmit="return(false)"><div id='np1_' class="iput" ><input class="input" type="password"  id='np1' placeholder="New Password"></input></div></form><br>
<form onsubmit="return(false)"><div id='np2_' class="iput" ><input class="input"  type="password" id='np2' placeholder="Re-enter New Password"></input></div></form>
<br>
<span id="pwd_no_match" style="color:red;font-weight: bolder;display:none;">
    
</span><br><br>
<button class="button" id='a99' onclick="pwd_validate()">Confirm Change</button>`);

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
  var a_=getCoins(sender);
  const output = execSync("python mailTransactions.py "+`"${sender},${a_}"`, { encoding: 'utf-8' });
}
function cMail(sender,reciever,amount){
  const execSync = require('child_process').execSync;
  const output = execSync("python cMail.py "+`"${sender},${reciever},${amount}"`, { encoding: 'utf-8' });
  return(output);
}
function pwdch(uname){
  const execSync = require('child_process').execSync;
  const output = execSync("python pwdch.py "+`"${uname}"`, { encoding: 'utf-8' });
  return(output);
}

app.use(express.static('./public'));

io.on('connection', (socket) => {
  console.log('a user connected',socket.id);

  socket.on("login",(x)=>{
    if("success" === vid(rpldecode(decode(x.uname))).slice(0,7))
    {
      if(getAmount(rpldecode(decode(x.uname)),hashit(x.pwd)).slice(0,7)!="failure")
      {
        var status="success";
        var e="none";
        coins=getAmount(rpldecode(decode(x.uname)),hashit(x.pwd));
        var pc_log_content=rplencode(`<h1>Logged In<br><br>Your Balance:<br>
<span class="big">${coins}  <i class="fas fa-coins"></i></span></h1><br>
<button onclick="submit()" id="rf" class="button">Refresh</button><br><br>
<button id="T" onclick="T()" class="button">Transfer</button><br><br>
<button id="viewT" onclick="viewT()" class="button">Mail My Transactions</button>
<br><br><br><div id="a24" style="font-weight:bolder;color:red;"></div>`);
      }
      else{
        var status="failure";
        var e="Check Password";
      }
    }
    else{
      var status="failure";
      var e="Invalid Username";}
      
    console.log("LOGIN");
    io.to(socket.id).emit("login",{status:status,err:e,cont:pc_log_content,code:pc_log_code});
  });

  socket.on("forgot-pwd",(x)=>{
    var u=rpldecode(decode(x.uname));
    var status="success";
    console.log("FORGOT-PWD");
    io.to(socket.id).emit("forgot-pwd",{status:status,cont:pc_fgpwd_content,code:pc_fgpwd_code});
  });

  socket.on("get_pwd_code",(x)=>{
    var uname=rpldecode(x.uname);
    console.log(uname);
    if("success"==vid(uname).slice(0,7))
      {var status="success";
      var arr="none";var x=vMail("reset password",uname);
      add_reset(uname+"\n",x);}
    else{
      var status="failure";
      var arr="Invalid Username";
    }
    
    io.to(socket.id).emit("get_pwd_code",{status:status,err:arr});
  });

  socket.on("submit_pwd_otp",(x)=>{
    var uname=rpldecode(x.uname);
    var code=decode(x.code);
    console.log(JSON.stringify(resetJson));
    if(String(code)==get_reset_code(uname))
    {
      status="success";
      cont=pc_chpwd_content;
    }
    else{
      status="failure";
      cont="none";
    }
    io.to(socket.id).emit("submit_pwd_otp",{status:status,cont:cont});
    delete resetJson[uscape(uname)];
    console.log(JSON.stringify(resetJson));
  });

  socket.on("pwd_validate",(x)=>{
    pwdch(decode(x.uname));
    //writeNewPwd(decode(x.uname),hashit(x.pwd));
    io.to(socket.id).emit("pwd_validate",{status:"success"});
    io.sockets.emit("mod",{task:"chpwd",params:JSON.stringify({uname:decode(x.uname),pwd:hashit(x.pwd)})});
  });

  socket.on("viewT",(x)=>{
    var uname=x.uname;
    mailTransactions(rpldecode(decode(uname)));
    io.to(socket.id).emit("viewT",{status:"success"});
  });

  socket.on("T",(x)=>{
    coins=getCoins(rpldecode(decode(x.uname)));
    var pc_transpage=rplencode(`<h1>Tranfers Coins<br><br>Your Balance:<br><span class="big">${coins}  <i class="fas fa-coins"></i></span></h1><br>
<form onsubmit="return(false)"><div class="iput" id="t_amt"><input class="input" id='tAmt' placeholder="Amount" type="number" min="0" step="1" max="${coins}"></input></div></form>
<form onsubmit="return(false)"><div class="iput" id="to_i"><input class="input" id='to_' placeholder="Transfer to"></input></div></form><br>
<button class="button" onclick="totp()">Send Confirmation Code</button><br><br>
<span id="tsp" class="span">
</span>`);
    io.to(socket.id).emit("T",{status:"success",cont:pc_transpage,amt:coins});
  });

  socket.on("totp",(x)=>{
    var amount=rplencode(decode(x.amt));
    var to_=rpldecode(decode(x.r_uname));
    var from_=rpldecode(x.s_uname);
    if("success"!=vid(to_).slice(0,7))
    {
      var status="failure";
      var arr="Invalid Reciever Email";
      io.to(socket.id).emit('totp',{status:status,err:arr});
    }
    else{
    var q=uscape(tMail(amount,from_,to_));
    add_trans(from_,q);
    addTransactionData(from_,to_,amount);
    var pc_trans_final=rplencode(`<h2>Confirm transfer of <br>${amount} <i class="fas fa-coins"></i> to<br>${to_} </h2><br>
<form onsubmit="return(false)"><div class="iput" id="_o_t_p_"><input class="input" type="number" id='o_t_p' placeholder="Enter OTP"></input></div></form>
<br><button class="button" id="a1" onclick="submitTOTP()">Confirm Transfer</button><br><br>
<button class="button" id="a2" onclick="resendTOTP()">Resend OTP</button><br><br>
<span id=rstotp></span>`);
    io.to(socket.id).emit('totp',{status:"success",cont:pc_trans_final});
    console.log("TDATA: "+JSON.stringify(transactionsData));}
  });

  socket.on("rstotp",(x)=>{
    var amount=rplencode(decode(x.amt));
    var to_=rpldecode(decode(x.r_uname));
    var from_=rpldecode(x.s_uname);
    var q=uscape(tMail(amount,from_,to_));
    add_trans(from_,q);
    addTransactionData(from_,to_,amount);
    io.to(socket.id).emit('rstotp',{status:"success"});
    console.log("TDATA: "+JSON.stringify(transactionsData));
  });

  socket.on("submitTOTP_",(x)=>{
    var u=rpldecode(x.uname);
    var codex=decode(x.otp);
    var w=get_trans(u);
    console.log("TDATA: "+JSON.stringify(transactionsData));
    if(codex==uscape(w))
    {
      io.to(socket.id).emit("submitTOTP_",{status:"success"});
      var v=completeTransaction(u);
      recordTransactions(v,"success");
      v=v.split(",");
      //transferCoin(v[0],v[1],v[2]);
      cMail(v[0],v[1],v[2]);
      io.sockets.emit("mod",{task:"tfc",params:JSON.stringify({uid_a:v[0],uid_b:v[1],amt:v[2]})});
    }
    else{
      io.to(socket.id).emit("submitTOTP_",{status:"failure"});
      var v=completeTransaction(u);
      recordTransactions(v,"failure");
    }
    
    delete transJson[u];
    delete transactionsData[u];
  });

});

http.listen(3000, () => {
  console.log('listening on *:3000');
});

function add_reset(uname,rcode){
  resetJson[uscape(uname)]=uscape(String(rcode));
}

function get_reset_code(uname){
  var code=uscape(String(resetJson[uscape(uname)]));
  return(code);
}

function uscape(mystring)
{
  return(mystring.replace(/(\r\n|\n|\r)/gm,""));
}

function addTransactionData(sid,rid,amt){
  transactionsData[sid]=String(`${sid},${rid},${amt}`);
}

function completeTransaction(sid){
  var ret=transactionsData[sid];
  return(ret);
}

function add_trans(uname,tcode)
{
  transJson[uname]=tcode;
}

function get_trans(uname)
{
  var q=transJson[uname];
  return(q);
}

function recordTransactions(one_Transaction,status)
{
    fs.appendFileSync("./transactiondata.csv",`${one_Transaction},${status},${now()}\n`);
}

function vid(uname){
  const execSync = require('child_process').execSync;
  const output = execSync("vid.exe "+`"${uname}"`, { encoding: 'utf-8' });
  return(uscape(output));
}

function getAmount(uname,pwd){
  const execSync = require('child_process').execSync;
  const output = execSync("getAmount.exe "+`"${uname},${pwd}"`, { encoding: 'utf-8' });
  return(uscape(output));
}

function getCoins(uname){
  const execSync = require('child_process').execSync;
  const output = execSync("getCoins.exe "+`"${uname}"`, { encoding: 'utf-8' });
  return(uscape(output));
}

function writeNewPwd(uname,pwd){
  const execSync = require('child_process').execSync;
  const output = execSync("writeNewPwd.exe "+`"${uname},${pwd}"`, { encoding: 'utf-8' });
  return(uscape(output));
}

function transferCoin(uid_a,uid_b,amt){
  const execSync = require('child_process').execSync;
  const output = execSync("transferCoin.exe "+`"${uid_a},${uid_b},${amt}"`, { encoding: 'utf-8' });
  return(uscape(output));
}

function hashit(st){
  const crypto = require('crypto');
  hash = crypto.getHashes();
  hashPwd = crypto.createHash('sha1').update(st).digest('hex');
  return(hashPwd);
}

function now(){
  let date_ob = new Date();
let date = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
let year = date_ob.getFullYear();
let hours = date_ob.getHours();
let minutes = date_ob.getMinutes();
let seconds = date_ob.getSeconds();
return(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
}