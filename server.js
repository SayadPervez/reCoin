var app = require('express')();
var express = require('express');
var path = require('path');
const fs=require('fs');
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var coins=1009;
var resetJson={};

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
<form onsubmit="return(false)"><div class="iput" style="display:grid;grid-template-columns: 85% 15%;"><input class="input" id="pwd_uname" placeholder="Username"></input><div class="btn hvr" id='cpy-button' title="COPY text from login section" onclick="copy_uname()"><i class="far fa-copy" style="margin:2px auto;"></i></div></div></form>
<div style="display: grid;grid-template-columns: 50% 50%;margin: 2px auto;height: 9%;">
<button class="button" style="width:80%;height:100%;padding:2px 2px;margin: 2px auto;" id="get_otp_via_email" onclick="get_pwd_code()">Get OTP via Email</button>
<button class="button" style="width:80%;height:100%;padding:2px 2px;margin: 2px auto;" onclick="get_pwd_code()">Resend OTP</button></div><br><br>
<div id="s" style="display:none;color:red;font-weight: bolder;"></div><br><br>
<form onsubmit="return(false)"><div class="iput"><input class="input" id="pwd_otp_inp" type="number" min="10000" step="1" max="99999" placeholder="Enter your OTP"></input></div></form>
<button class="button" onclick="submit_otp()">Submit OTP</button><br><br>
<div id="sp" style="color:red;font-weight: bolder;"></div>`
var pc_fgpwd_code=`
document.getElementById('span').innerHTML="";
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
  /*if(output!="")
  {
      var i=0;
      var op="x";
      while(i<3 && op!="")
      {
          const execSync = require('child_process').execSync;
          op = execSync("python mailTransactions.py "+`"${sender}"`, { encoding: 'utf-8' });        
          i++;
      }
  }*/
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
    io.sockets.emit("pwd_validate",{status:"success"});
  });

  socket.on("viewT",(x)=>{
    var uname=x.uname;
    console.log(uname);
    mailTransactions(uname);
    io.sockets.emit("viewT",{status:"success"});
  })

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