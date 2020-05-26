# Transaction Confirmation mailer @ python !!

import smtplib
from random import randint as ri
import email.message
import sys

def RUN(arg):
    # arg= <sender_email>,<reciever_email>,<amount>

    arg=arg.split(',')
    

    msg = email.message.Message()
    msg['Subject'] = 'reCoin Transaction Successful'
    msg['From'] = 'recoin.portal@gmail.com'
    msg['To'] = str(arg[0])
    msg.add_header('Content-Type','text/html')
    msg.set_payload(f'We hereby notify you that your transaction of <font color="red">{arg[2]} reCoins</font> to <font color="blue">{arg[1]}</font> was successful. Thank you for choosing our service and Enjoy your day.')

    # Send the message via local SMTP server.
    s = smtplib.SMTP('smtp.gmail.com', 587)
    s.starttls()
    s.login('recoin.portal@gmail.com','vforvendetta')
    s.sendmail(msg['From'], [msg['To']], msg.as_string())
    s.quit()
    #####################################################################################
    msg = email.message.Message()
    msg['Subject'] = f"{arg[2]} reCoins added to your account"
    msg['From'] = 'recoin.portal@gmail.com'
    msg['To'] = str(arg[1])
    msg.add_header('Content-Type','text/html')
    msg.set_payload(f'We here by notify you that <font color="blue">{arg[0]}</font> has transfered you <font color="red">{arg[2]}</font> reCoins.')

    # Send the message via local SMTP server.
    s = smtplib.SMTP('smtp.gmail.com', 587)
    s.starttls()
    s.login('recoin.portal@gmail.com','vforvendetta')
    s.sendmail(msg['From'], [msg['To']], msg.as_string())
    s.quit()


if len(sys.argv)>1:
    RUN(sys.argv[1])