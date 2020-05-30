var dev="pc";
var myUserName="";
var rec_ver="";
var amount_=0;

var socket = io("localhost:3000");

window.onload=()=>{
    var isMobile = false;
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
    isMobile = true;
}
if(isMobile==true)
    dev="mobile";
else
    dev="pc";

}

//login button and refresh button
document.getElementById("submit-button").addEventListener('click',()=>{
    myUserName=document.getElementById("uname").value;
    if(document.getElementById('pwd').value.length>6)
    {
        document.getElementById('span').innerHTML="Please Wait...";
        var u=document.getElementById("uname").value;
        sha256(encode(rplencode(document.getElementById('pwd').value))).then((p)=>{
            socket.emit("login",{uname:encode(rplencode(u)),pwd:p});
        }); 
    }
    else
    {
        document.getElementById('span').innerHTML="Password should have more<br>than 6 characters";
    }
});
function submit(){
    if(document.getElementById('pwd').value.length>6)
    {
        document.getElementById('span').innerHTML="Please Wait...";
        var u=document.getElementById("uname").value;
        sha256(encode(rplencode(document.getElementById('pwd').value))).then((p)=>{
            socket.emit("login",{uname:encode(rplencode(u)),pwd:p});
        });
    }
    else
    {
        document.getElementById('span').innerHTML="Password should have more<br>than 6 characters";
    }
}
///////////////////////////////////////////////////////////////////////////////////
//forgot-pwd 
document.getElementById("forgot-pwd").addEventListener('click',()=>{
    document.getElementById('span').innerHTML="Please Wait...";
    socket.emit("forgot-pwd",{uname:encode(rplencode(document.getElementById("uname").value))});
});
function get_pwd_code(){
    document.getElementById('sp').innerHTML="Please wait...";
    var i=document.getElementById('pwd_uname').value;
    myUserName=i;
    socket.emit('get_pwd_code',{uname:rplencode(i)});
}
function submit_otp(){
    document.getElementById('sp').innerHTML="Please wait...";
    var i=document.getElementById('pwd_otp_inp').value;
    socket.emit('submit_pwd_otp',{uname:rplencode(myUserName),code:encode(i)});
}
function pwd_validate()
{   
    document.getElementById('pwd_no_match').style.display="none";
    if((document.getElementById('np1').value==document.getElementById('np2').value) && (document.getElementById('np1').value.length>6))
    {
        document.getElementById('pwd_no_match').innerHTML="Please wait...";
        document.getElementById('pwd_no_match').style.display="block";
        sha256(encode(rplencode(document.getElementById('np1').value))).then((j)=>{
            socket.emit('pwd_validate',{uname:encode(myUserName),pwd:j});
        });
    }
    else if(document.getElementById('np1').value!=document.getElementById('np2').value)
    {
        document.getElementById('pwd_no_match').innerHTML="PASSWORDS DO NOT MATCH <i class='far fa-frownfar fa-frown'></i>";
        document.getElementById('pwd_no_match').style.display="block";
    }
    else if(document.getElementById('np1').value.length<=6)
    {
        document.getElementById('pwd_no_match').innerHTML="PASSWORD length must be greater<br>than 6 characters <i class='far fa-frown'></i>";
        document.getElementById('pwd_no_match').style.display="block";
    }
    else{
        document.getElementById('pwd_no_match').innerHTML="Password size must be greater<br>than 6 characters <i class='far fa-frown'></i>";
        document.getElementById('pwd_no_match').style.display="block";
    }

}
//////////////////////////////////////////////////////////////////////////////////
//Transactions:
function viewT(){
    myUserName=document.getElementById("uname").value;
    document.getElementById("a24").innerHTML="Please wait..";
    socket.emit("viewT",{uname:encode(rplencode(myUserName))});
}
function T(){
    myUserName=document.getElementById("uname").value;
    document.getElementById("a24").innerHTML="Please wait..";
    socket.emit("T",{uname:encode(rplencode(myUserName))});
}
function totp(){
    if(Number(document.getElementById("tAmt").value)<=amount_)
    {
    document.getElementById("tsp").innerHTML="Please wait...";
    amount_=document.getElementById("tAmt").value;
    rec_ver=document.getElementById("to_").value;
    x=encode(rpldecode(document.getElementById("tAmt").value));
    y=encode(rplencode(document.getElementById("to_").value));
    socket.emit("totp",{r_uname:y,s_uname:rplencode(myUserName),amt:x});
    }
    else{
        document.getElementById("tsp").innerHTML="Insufficient Balance";
    }
}
function resendTOTP(){
    document.getElementById("rstotp").innerHTML="Please wait...";
    x=encode(rpldecode(amount_));
    y=encode(rplencode(rec_ver));
    socket.emit("rstotp",{r_uname:y,s_uname:rplencode(myUserName),amt:x});
}
function submitTOTP(){
    document.getElementById("rstotp").innerHTML="Please wait...<br>If you get Email verification<br>transfer but page is still loading<br>Click Login Page button to continue";
    var x=document.getElementById("o_t_p").value;
    socket.emit("submitTOTP_",{uname:rplencode(myUserName),otp:encode(x)});
}
//////////////////////////////////////////////////////////////////////////////////
//              recieve events
socket.on("login",(data)=>{
    if(data.status=="success")
    {
        document.getElementById('contents-cont').innerHTML=rpldecode(data.cont);
        eval(rpldecode(data.code));
        myUserName=document.getElementById('uname');
    }
    else
        document.getElementById('span').innerHTML=data.err;
});

socket.on("forgot-pwd",(data)=>{
    if(data.status=="success")
    {
        document.getElementById('contents-cont').innerHTML=rpldecode(data.cont);
        eval(rpldecode(data.code));
    }
    else
        document.getElementById('span').innerHTML="Some Error Occured.<br>Please retry !";
});

socket.on("get_pwd_code",(data)=>{
    if(data.status=="success")
    {
        document.getElementById('sp').innerHTML="Password Reset Email Sent";
    }
    else
        document.getElementById('sp').innerHTML="Invalid Username !";
});

socket.on("submit_pwd_otp",(data)=>{
    if(data.status=="success")
    {
        document.getElementById('contents-cont').innerHTML=rpldecode(data.cont);
    }
    else
        document.getElementById('sp').innerHTML="Wrong OTP<br>Choose resend OTP and<br>Try again... !";
});

socket.on('pwd_validate',(data)=>{
    if(data.status=="success")
        {
            document.getElementById('pwd_no_match').innerHTML="Password Changed ! <br> Refresh to continue <i class='far fa-smile-wink'></i>";
            document.getElementById('pwd_no_match').style.display="block";
            document.getElementById('np1').disabled=true;
            document.getElementById('np2').disabled=true;
            document.getElementById('a99').disabled=true;
            document.getElementById('np1').style.backgroundColor("#131313");
            document.getElementById('np2').style.backgroundColor("#131313");
            document.getElementById('np1_').style.backgroundColor("#131313");
            document.getElementById('np2_').style.backgroundColor("#131313");
            document.getElementById('a99').title="Button Disabled on Password validation";
        }
        else{
            document.getElementById('pwd_no_match').innerHTML="Some error occured<br>Try again";
            document.getElementById('pwd_no_match').style.display="block";
        }
});

socket.on("viewT",(data)=>{
    if(data.status=="success"){
        document.getElementById("a24").innerHTML="Transaction Details<br>Mailed";
    }
    else{
        document.getElementById("a24").innerHTML="Unknown Error<br>Try Again";
    }
});

socket.on("T",(data)=>{
    if(data.status=="success"){
        document.getElementById("contents-cont").innerHTML=rpldecode(data.cont);
        amount_=data.amt;
    }
    else{
        document.getElementById("a24").innerHTML="Unknown Error<br>Try Again";
    }
});

socket.on("totp",(data)=>{
    if(data.status=="success")
    {
        document.getElementById("contents-cont").innerHTML=rpldecode(data.cont);
    }
    else
    {
        document.getElementById("tsp").innerHTML=data.err;
    }
});

socket.on("rstotp",(data)=>{
    if(data.status=="success")
    {
        document.getElementById("rstotp").innerHTML="OTP Mail Resent";
    }
    else
    {
        document.getElementById("rstotp").innerHTML="Unkown Error<br>Please try again";
    }
});

socket.on("submitTOTP_",(data)=>{
    console.log(">>>> "+data.status);
    if(data.status=="success")
    {
        document.getElementById("o_t_p").disabled=true;
        document.getElementById("o_t_p").style.backgroundColor="#131313";
        document.getElementById("_o_t_p_").style.backgroundColor="#131313";
        document.getElementById("a2").disabled=true;
        document.getElementById("a1").disabled=true;
        document.getElementById("a1").title="Button Disabled";
        document.getElementById("a2").title="Button Disabled";
        document.getElementById("rstotp").innerHTML="Transaction Successful !!<br>Click Login Page to continue<br><i id='arrow' class='fas fa-long-arrow-alt-left'></i>"
    }
    else{
        document.getElementById("rstotp").innerHTML="Wrong OTP<br>Click resend OTP and<br>try again !!";
    }
});
//              Auxillary Functions
function copy_uname(){
    var uname=document.getElementById('uname').value;
    document.getElementById("pwd_uname").placeholder=uname;
    document.getElementById("pwd_uname").value=uname;
}
function metaData(){
    htmlRender=`<h1>Developer's Info</h1><br>
    <div class="metaData">
     <span class="name__">Sayad Pervez . B</span><br><br>
     Full Stack Web Developer,<br>
     BlockChain Engineer,<br>
     REC ECE (2019 TO 2023)<br>
     <span style="color:darkblue;">pervez2504@gmail.com</span><br><br></div>
     <br><div class="metaData"><span class="name__">Sriraman . S</span><br><br>
     DataBase Analyst,<br>
     BlockChain Engineer,<br>
     REC ECE (2019 TO 2023)<br>
     <span style="color:darkblue;">srisethu7@gmail.com</span><br><br></div>`;
     document.getElementById('contents-cont').innerHTML=htmlRender;
}
async function sha256(message) {
    const msgBuffer = new TextEncoder('utf-8').encode(message); 
    const hashBuffer =await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));                
    const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
    return hashHex;
}