import csv
import sys
import smtplib
import email.message

def sendMail(user,data):
    msg = email.message.Message()
    msg['Subject'] = 'Your Transaction Data'
    msg['From'] = 'recoin.portal@gmail.com'
    msg['To'] = str(user)
    msg.add_header('Content-Type','text/html')
    msg.set_payload(f'''{data}''')

    # Send the message via local SMTP server.
    s = smtplib.SMTP('smtp.gmail.com', 587)
    s.starttls()
    s.login('recoin.portal@gmail.com','vforvendetta')
    s.sendmail(msg['From'], [msg['To']], msg.as_string())
    s.quit()

def RUN(arg):
    arg=arg.split(',')
    amt=arg[1]
    arg=arg[0]
    rows=[]
    with open('transactiondata.csv','rt')as f:
        data = csv.reader(f)
        for _ in data:
            rows.append(_)
    l=[]
    rows=rows[::-1]
    i=0
    while(i<30 and i<len(rows)):
        if(arg in rows[i]):
            l.append(rows[i])
        i+=1
    d=f"If your transaction data is not visible, Click 'Show quoted text' to view your Transactions data:<br><br><h2>Acc Balance:{amt}<br>Your transaction data:</h2><div style='border:3px solid red;border-radius:6px;padding:2px 2px;margin:1px auto;border-top:0px;border-bottom:0px;'>"
    for _ in l:
        d+=f"""<b><div style='border:2px solid black;border-radius:6px;padding:4px 4px;margin:6px auto;'>
        <span style='color:{"#8E44AD" if _[0]==arg else "blue"}'>{"YOU" if _[0]==arg else _[0]}</span> sent <span style='color:orange'>{_[2]} coins</span> to <span style='color:{"#8E44AD" if _[1]==arg else "blue"}'>{"YOU" if _[1]==arg else _[1]}</span><br><hr><span style="color:"red"">{_[4]}</span><hr>STATUS : <span style='color:{"green" if "success" == _[3] else "red"}'>{_[3]}</span></div></b>"""
    sendMail(arg,d+"</div>")


if len(sys.argv)>1:
    RUN(sys.argv[1])