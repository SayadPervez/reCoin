# Verification mailer @ python !!

import smtplib
from random import randint as ri
import email.message
import sys

def RUN(arg):
    

    msg = email.message.Message()
    msg['Subject'] = 'Your reCoin Password has been changed'
    msg['From'] = 'recoin.portal@gmail.com'
    msg['To'] = str(arg)
    msg.add_header('Content-Type','text/html')
    msg.set_payload(f'<b><font color="red">Your reCoin Password has been changed.</font>If it is not you please change your reCoin as well as Email password as reCoin doesn\'t offer password reset without email validation.</b>')

    # Send the message via local SMTP server.
    s = smtplib.SMTP('smtp.gmail.com', 587)
    s.starttls()
    s.login('recoin.portal@gmail.com','vforvendetta')
    s.sendmail(msg['From'], [msg['To']], msg.as_string())
    s.quit()


if len(sys.argv)>1:
    RUN(sys.argv[1])