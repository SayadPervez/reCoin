var app = require('express')();
var express = require('express');
var path = require('path');
const fs=require('fs');
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var coins=1009;
var resetJson={};
var transJson={};
var transactionsData={};

eval(fs.readFileSync('./public/functions.js')+'');

var pc_log_content=`<h1>Logged In<br><br>Your Balance:<br>
<span class="big">${coins}  <i class="fas fa-coins"></i></span></h1><br>
<button onclick="submit()" id="rf" class="button">Refresh</button><br><br>
<button id="T" onclick="T()" class="button">Transfer</button><br><br>
<button id="viewT" onclick="viewT()" class="button">Mail My Transactions</button>
<br><br><br><div id="a24" style="font-weight:bolder;color:red;"></div>`;
var pc_log_code=`
    document.getElementById('span').innerHTML="";
    document.getElementById("uname").disabled=true;
    document.getElementById("uname").style.backgroundColor="#232323";
    document.getElementById("uname_i").style.backgroundColor="#232323";
    document.getElementById("pwd").disabled=true;
    document.getElementById("pwd").style.backgroundColor="#131313";
    document.getElementById("pwd_i").style.backgroundColor="#131313";
    document.getElementById("forgot-pwd").innerText="Change Password";
    document.getElementById("submit-button").innerText="Login Page";
`;
var pc_fgpwd_content=`<h1 >Password Reset:</h1><br><br>
<form onsubmit="return(false)"><div class="iput" style="display:grid;grid-template-columns: 85% 15%;"><input class="input" id="pwd_uname" placeholder="Username"></input><div class="btn hvr" id='cpy-button' title="COPY username from login section" onclick="copy_uname()"><i class="far fa-copy" style="margin:2px auto;"></i></div></div></form>
<div style="display: grid;grid-template-columns: 50% 50%;margin: 2px auto;height: 9%;">
<button class="button" style="width:80%;height:100%;padding:2px 2px;margin: 2px auto;" id="get_otp_via_email" onclick="get_pwd_code()">Get OTP via Email</button>
<button class="button" style="width:80%;height:100%;padding:2px 2px;margin: 2px auto;" onclick="get_pwd_code()">Resend OTP</button></div><br><br>
<div id="s" style="display:none;color:red;font-weight: bolder;"></div><br><br>
<form onsubmit="return(false)"><div class="iput"><input class="input" id="pwd_otp_inp" type="number" min="10000" step="1" max="99999" placeholder="Enter your OTP"></input></div></form>
<button class="button" onclick="submit_otp()">Submit OTP</button><br><br>
<div id="sp" style="color:red;font-weight: bolder;"></div>`;
var pc_fgpwd_code=`
document.getElementById('span').innerHTML="";
document.getElementById("uname").disabled=true;
document.getElementById("pwd").disabled=true;
document.getElementById("uname").style.backgroundColor="#131313";
document.getElementById("uname_i").style.backgroundColor="#131313";
document.getElementById("pwd").style.backgroundColor="#131313";
document.getElementById("pwd_i").style.backgroundColor="#131313";
`;
var pc_chpwd_content=`<h1>Reset Password:</h1><br><br>
<form onsubmit="return(false)"><div id='np1_' class="iput" ><input class="input" type="password"  id='np1' placeholder="New Password"></input></div></form><br>
<form onsubmit="return(false)"><div id='np2_' class="iput" ><input class="input"  type="password" id='np2' placeholder="Re-enter New Password"></input></div></form>
<br>
<span id="pwd_no_match" style="color:red;font-weight: bolder;display:none;">
    
</span><br><br>
<button class="button" id='a99' onclick="pwd_validate()">Confirm Change</button>`;
var pc_transpage=`<h1>Tranfers Coins<br><br>Your Balance:<br><span class="big">${coins}  <i class="fas fa-coins"></i></span></h1><br>
<form onsubmit="return(false)"><div class="iput" id="t_amt"><input class="input" id='tAmt' placeholder="Amount" type="number" min="0" step="1" max="${coins}"></input></div></form>
<form onsubmit="return(false)"><div class="iput" id="to_i"><input class="input" id='to_' placeholder="Transfer to"></input></div></form><br>
<button class="button" onclick="totp()">Send Confirmation Code</button><br><br>
<span id="tsp" class="span">
</span>`;

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
    var status="success";
    console.log("LOGIN");
    io.sockets.emit("login",{status:status,cont:pc_log_content,code:pc_log_code});
  });

  socket.on("forgot-pwd",(x)=>{
    var status="success";
    console.log("FORGOT-PWD");
    io.sockets.emit("forgot-pwd",{status:status,cont:pc_fgpwd_content,code:pc_fgpwd_code});
  });

  socket.on("get_pwd_code",(x)=>{
    var uname=rpldecode(x.uname);
    console.log(uname);
    var status="success";
    var x=vMail("reset password",uname);
    add_reset(uname+"\n",x);
    io.sockets.emit("get_pwd_code",{status:status});
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
    io.sockets.emit("submit_pwd_otp",{status:status,cont:cont});
    delete resetJson[uscape(uname)];
    console.log(JSON.stringify(resetJson));
  });

  socket.on("pwd_validate",(x)=>{
    pwdch(decode(x.uname));
    io.sockets.emit("pwd_validate",{status:"success"});
  });

  socket.on("viewT",(x)=>{
    var uname=x.uname;
    mailTransactions(rpldecode(decode(uname)));
    io.sockets.emit("viewT",{status:"success"});
  });

  socket.on("T",(x)=>{
    io.sockets.emit("T",{status:"success",cont:pc_transpage});
  });

  socket.on("totp",(x)=>{
    var amount=rplencode(decode(x.amt));
    var to_=rpldecode(decode(x.r_uname));
    var from_=rpldecode(x.s_uname);
    var q=uscape(tMail(amount,from_,to_));
    add_trans(from_,q);
    addTransactionData(from_,to_,amount);
    var pc_trans_final=`<h2>Confirm transfer of <br>${amount} <i class="fas fa-coins"></i> to<br>${to_} </h2><br>
<form onsubmit="return(false)"><div class="iput" id="_o_t_p_"><input class="input" type="number" id='o_t_p' placeholder="Enter OTP"></input></div></form>
<br><button class="button" id="a1" onclick="submitTOTP()">Confirm Transfer</button><br><br>
<button class="button" id="a2" onclick="resendTOTP()">Resend OTP</button><br><br>
<span id=rstotp></span>`;
    io.sockets.emit('totp',{status:"success",cont:pc_trans_final});
    console.log("TDATA: "+JSON.stringify(transactionsData));
  });

  socket.on("rstotp",(x)=>{
    var amount=rplencode(decode(x.amt));
    var to_=rpldecode(decode(x.r_uname));
    var from_=rpldecode(x.s_uname);
    var q=uscape(tMail(amount,from_,to_));
    add_trans(from_,q);
    addTransactionData(from_,to_,amount);
    io.sockets.emit('rstotp',{status:"success"});
    console.log("TDATA: "+JSON.stringify(transactionsData));
  });

  socket.on("submitTOTP",(x)=>{
    var u=rpldecode(x.uname);
    var codex=decode(x.otp);
    var w=get_trans(u);
    console.log("TDATA: "+JSON.stringify(transactionsData));
    if(codex==uscape(w))
    {
      status="success";
      var v=completeTransaction(u);
      recordTransactions(v,"success");
      v=v.split(",");
      cMail(v[0],v[1],v[2]);
    }
    else{
      status="failure";
      var v=completeTransaction(u);
      recordTransactions(v,"failure");
    }
    io.sockets.emit("submitTOTP",{status:status});
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
    fs.appendFileSync("./transactiondata.csv",`${one_Transaction},${status}\n`);
}