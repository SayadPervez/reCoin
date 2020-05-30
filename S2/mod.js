const io2 = require("socket.io-client")
// server port list 3000 -> connected to webpage hosts
const io3000 = io2.connect("http://localhost:3000");
var sleep = require('system-sleep');
const fs= require('fs');
const dbp="./dataBase.csv";

io3000.on("mod",(data)=>{
    var t = data.task;
    var p = JSON.parse(data.params);//params as a string;
    if(t=="chpwd")
    {
        writeNewPwd(p.uname,p.pwd);
        console.log(recal());
        console.log(verify());
    }
    else if(t=="tfc")
    {
        transferCoin(p.uid_a,p.uid_b,p.amt);
        console.log(recal());
        console.log(verify());
    }
    else{
        ;
    }
});

function writeNewPwd(uname,pwd){
    const execSync = require('child_process').execSync;
    const output = execSync("writeNewPwd.exe "+`"${uname},${pwd}"`, { encoding: 'utf-8' });
    return(output);
  }

function transferCoin(uid_a,uid_b,amt){
    const execSync = require('child_process').execSync;
    const output = execSync("transferCoin.exe "+`"${uid_a},${uid_b},${amt}"`, { encoding: 'utf-8' });
    return(output);
}

function recal(){
    const execSync = require('child_process').execSync;
    const output = execSync("recalculateHash.exe", { encoding: 'utf-8' });
    return(output);
}

function verify(){
    const execSync = require('child_process').execSync;
    const output = execSync("verifyHash.exe", { encoding: 'utf-8' });
    return(output);
}