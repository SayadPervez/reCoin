# Verification mailer @ python !!

import smtplib
from random import randint as ri
import email.message
import sys

def RUN(arg):
    # arg= <amount>,<sender_email>,<reciever_email>

    arg=arg.split(',')
    

    msg = email.message.Message()
    msg['Subject'] = f'reCoin Verification Code for transferring {arg[0]} coins to {arg[2]}'
    msg['From'] = 'recoin.portal@gmail.com'
    msg['To'] = str(arg[1])
    msg.add_header('Content-Type','text/html')
    rand = ri(10000,99999)
    print(rand)
    msg.set_payload(f'Your verification code for tranferring <font color="red"><b>{arg[0]} coins</b></font> to {arg[2]} is <br> <font size="28" color="red"><b>{rand}</b></font>')

    # Send the message via local SMTP server.
    s = smtplib.SMTP('smtp.gmail.com', 587)
    s.starttls()
    s.login('recoin.portal@gmail.com','vforvendetta')
    s.sendmail(msg['From'], [msg['To']], msg.as_string())
    s.quit()


if len(sys.argv)>1:
    RUN(sys.argv[1])