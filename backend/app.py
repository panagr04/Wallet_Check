from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient
from bson.objectid import ObjectId
from flask_cors import CORS
from flask_mail import Mail, Message
from flask_bcrypt import Bcrypt
from flask_bcrypt import Bcrypt
from cryptography.hazmat.primitives import serialization
from datetime import datetime as dt
from datetime import timedelta as td

import jwt
import math
import random
import string
import yaml

config = yaml.safe_load(open('database.yaml'))
priv = open('./.ssh/id_rsa', 'r').read()
enodingParameter = serialization.load_ssh_private_key(priv.encode(), password=b'')

pub = open('./.ssh/id_rsa.pub', 'r').read()
decodingParameter = serialization.load_ssh_public_key(pub.encode())

app = Flask(__name__)
app.config.update(
    MAIL_SERVER = 'smtp.gmail.com',
    MAIL_PORT = '465',
    MAIL_USE_SSL = True,
    MAIL_USERNAME = config['mail_user'],
    MAIL_PASSWORD=  config['mail_password']
)
bcrypt = Bcrypt()
mail = Mail(app)

client = MongoClient(config['uri'])
# db = client.lin_flask
db = client['budget-up']
CORS(app,resources={r"/*": {"origins": "http://localhost:3000"}})

@app.route('/')
def index():
    return render_template('home.html')

@app.route('/register', methods=['POST'])
def data():
    
    if request.method == 'POST':
        body = request.json

        name=body['name']
        email=body['email']
        contact=body['contact']
        gender=body['gender']
        dob=body['dob']
        username=body['username']
        password=bcrypt.generate_password_hash(body['password']).decode('UTF-8')

        existing = db['users'].find_one({'email':email})
        
        if existing :
            return jsonify({
            'status': 13,
            'message': 'User Already Exists'
            })
        
                
        # db.users.insert_one({
        db['users'].insert_one({'name':name,'email':email,'contact':contact,'gender':gender,'dob':dob,'username':username,'password':password})

        mail.send_message('Welcome to WalletCheck ' + name,
                        sender=config['mail_user'],
                        recipients = [email],
                        body = "Hi, "+name+" welcome to WalletCheck, we look forward for your interactions"
                        )

        return jsonify({
            'status': 10,
            'message': "User Created Successfully",
            'name': name,
            'email': email,
        })

@app.route('/updateUserProfile', methods=['POST'])
def updateUserdata():
    
    if request.method == 'POST':
        
        try:
            token = request.headers['Authorization'].split(" ")[1][1:-1]
            decoded = jwt.decode(jwt=token, key=decodingParameter, algorithms=['RS256',]) 
            
        except:
            return jsonify({
                'status': 13,
                'message': "Invalid Token"
                })
        
        userbyemail = db['users'].find_one({'email':decoded['email']})
        
        body = request.json
        
        email=body['email']
        contact=body['contact']
        password= body['password']
        password= bcrypt.generate_password_hash(password).decode('UTF-8') if (password != "") else userbyemail["password"] 

        # db.users.insert_one({
        existing = db['users'].find_one({'email':email})


        if userbyemail['email'] != email and existing :
            return jsonify({
            'status': 13,
            'message': "Email exists with other user",
            })

       

        db['users'].update_one({"_id": userbyemail["_id"]}, {"$set": 
            {
            'email':email if (email != "") else userbyemail["email"] ,
            'contact':contact if (contact != "") else userbyemail["contact"],
            'password':password
            }})


        mail.send_message('Hi, Your Profile Details were changed ' + userbyemail['name'],
                        sender=config['mail_user'],
                        recipients = [userbyemail["email"]],
                        body = "Hi, "+userbyemail['name']+" your profile details were changed, if it was not done by you please inform us via Support Ticket."
                        )

        return jsonify({
            'status': 10,
            'message': "User profile updaed succesfully",
        })

@app.route('/updatePass', methods=['POST'])
def PassUpdatedata():
    
    if request.method == 'POST':
        body = request.json

        email=body['email']
        newpass=body['newpass']
        otp=body['otp']
        otp_ref=body['otp_ref']
            
        # db.users.insert_one({
        userbyemail = db['users'].find_one({'email':email})

        if not userbyemail :
            return jsonify({
            'status': 13,
            'message': "User does not exist with this email"
            })

        optDetails = db['otp'].find_one({'otp_ref':otp_ref})

        if optDetails:
            if otp == optDetails['otp']:
                hashpass = bcrypt.generate_password_hash(newpass).decode('UTF-8')
                db['users'].update_one({"_id": userbyemail["_id"]}, {"$set": {'password':hashpass}})

                return jsonify({
                'status': 10,
                'message': "Password updated succesfully"
                })
            else :
                return jsonify({
                'status': 14,
                'message': "Wrong OTP"
                })
            return jsonify({
                    'status': 14,
                    'message': "Invalid OTP Ref"
                    })
        return jsonify({
            'status': 13,
            'message': "Unknown Error"
        })
        
        mail.send_message('Profile Password Changed !' + name,
                        sender=config['mail_user'],
                        recipients = [email],
                        body = "Your Password has been changed, if not done by you please raise a ticked with our support as soon as possible."+name
        )

@app.route('/otp', methods=['POST'])
def OTPdata():
    
    if request.method == 'POST':
        body = request.json

        email=body['email']

        userbyemail = db['users'].find_one({'email':email})

        if not userbyemail :
            return jsonify({
            'status': 13,
            'message': "No user associated to this email"
            })

        digits = "0123456789"
        otp = ""
        
        for i in range(6) :
          otp += digits[math.floor(random.random() * 10)]
    
        otp_ref = ''.join([random.choice( string.ascii_uppercase +
                                            string.ascii_lowercase +
                                            string.digits)
                                            for n in range(15)])
        # db.users.insert_one({
        db['otp'].insert_one({
            "email":email,
            'otp':otp,
            'otp_ref':otp_ref
        })

        mail.send_message('Validation OTP from BudgetUP',
                            sender=config['mail_user'],
                            recipients = [email],
                            body = "Your OTP is  "+otp
                            )

        return jsonify({
            'status': 10,
            'message':'OTP Generated',
            "email":email,
            'otp_ref': otp_ref,
        })

@app.route('/login', methods=['POST'])
def logindata():
    
    if request.method == 'POST':
        body = request.json

        email=body['email']
        password = body['password']

        userbyemail = db['users'].find_one({'email':email})
        
        if userbyemail :
            authenticated = bcrypt.check_password_hash(userbyemail['password'],password)
        
        else : 
            return jsonify({
            'status': 13,
            'message': "Invalid User / Password"
            }) 

        if authenticated :
            jwtPayload = {"name":userbyemail['name'],"email":userbyemail['email']}
            token = jwt.encode(
                    payload=jwtPayload,
                    key=enodingParameter,
                    algorithm='RS256'
                )

            return jsonify({
            'status': 10,
            'message': "User Logged in",
            "name":userbyemail['name'],
            "email":email,
            "contact":userbyemail['contact'],
            "token":token
            })    

        return jsonify({
            'status': 13,
            'message': "Invalid User / Password"
            })   

@app.route('/addMonthlyBudget', methods=['POST'])
def montlyBudgetData():
    
    if request.method == 'POST':

        

        try:
            token = request.headers['Authorization'].split(" ")[1][1:-1]
            decoded = jwt.decode(jwt=token, key=decodingParameter, algorithms=['RS256',]) 
            
        except:
            return jsonify({
                'status': 13,
                'message': "Invalid Token"
                })

        body = request.json

        food=body['food']
        entertainment=body['entertainment']
        clothing=body['clothing']
        transportation=body['transportation']
        medical=body['medical']
        other=body['other']
        

        userbyemail = db['users'].find_one({'email':decoded['email']})

        dateStamp = dt.now().strftime("%m/%Y")
        if  'budgets' in userbyemail:
            if dateStamp not in userbyemail['budgets']:
                db['users'].update_one({"_id": userbyemail["_id"]}, {"$set": {"budgets": {**userbyemail['budgets'], **{dateStamp: body}}}})
                return jsonify({
                    'status': 10,
                    'message': "Expeses Added",
                    }) 
            else:
                return jsonify({
                    'status': 13,
                    'message': "Budget Already Exists",
                    })

        else:
            db['users'].update_one({"_id": userbyemail["_id"]}, {"$set": {"budgets": {dateStamp:body}}})
            return jsonify({
                    'status': 10,
                    'message': "Expeses Added",
                    }) 

        return jsonify({
            'status': 13,
            'message': "Invalid User / Password"
            })   

@app.route('/getMonthlyBudget', methods=['POST'])
def getMontlyBudgetData():
    
    if request.method == 'POST':

        try:
            token = request.headers['Authorization'].split(" ")[1][1:-1]
            decoded = jwt.decode(jwt=token, key=decodingParameter, algorithms=['RS256',]) 
            
        except:
            return jsonify({
                'status': 13,
                'message': "Invalid Token"
                })

        body = request.json

        monthYear = body['month-year']   

        userbyemail = db['users'].find_one({'email':decoded['email']})

        totalBudget =  {'food':0,'entertainment':0,'clothing':0,'transportation':0,'medical':0,'other':0}

        if  'budgets' in userbyemail:
            if monthYear in userbyemail['budgets']:

                totalBudget.update(
                    food=int(userbyemail['budgets'][monthYear]['food']),
                    entertainment=int(userbyemail['budgets'][monthYear]['entertainment']),
                    clothing=int(userbyemail['budgets'][monthYear]['clothing']),
                    transportation=int(userbyemail['budgets'][monthYear]['transportation']),
                    medical=int(userbyemail['budgets'][monthYear]['medical']),
                    other=int(userbyemail['budgets'][monthYear]['other']),
                    )
                
                return jsonify({
                'status': 10,
                'message': "Expeses Added",
                'budget': [
                    {'type':'food','value':totalBudget['food']},
                    {'type':'entertainment','value':totalBudget['entertainment']},
                    {'type':'clothing','value':totalBudget['clothing']},
                    {'type':'transportation','value':totalBudget['transportation']},
                    {'type':'medical','value':totalBudget['medical']},
                    {'type':'other','value':totalBudget['other']},
                ]
                }) 

        else:
            return jsonify({
            'status': 10,
            'message': "Expeses Added",
            'budget': {}
            }) 
 

        return jsonify({
            'status': 13,
            'message': "Error Occured"
            })   

@app.route('/updateMonthlyBudget', methods=['POST'])
def udateMontlyBudgetData():
    
    if request.method == 'POST':

        

        try:
            token = request.headers['Authorization'].split(" ")[1][1:-1]
            decoded = jwt.decode(jwt=token, key=decodingParameter, algorithms=['RS256',]) 
            
        except:
            return jsonify({
                'status': 13,
                'message': "Invalid Token"
                })

        body = request.json

        food=body['food']
        entertainment=body['entertainment']
        clothing=body['clothing']
        transportation=body['transportation']
        medical=body['medical']
        other=body['other']
        

        userbyemail = db['users'].find_one({'email':decoded['email']})

        dateStamp = dt.now().strftime("%m/%Y")
        if  'budgets' in userbyemail:
            db['users'].update_one({"_id": userbyemail["_id"]}, {"$set": {("budgets."+dateStamp): body}})
            return jsonify({
                'status': 10,
                'message': "Budget Added",
                }) 

        else:
            db['users'].update_one({"_id": userbyemail["_id"]}, {"$set": {"budgets": {dateStamp:body}}})
            return jsonify({
                    'status': 10,
                    'message': "Budget Added",
                    }) 

        return jsonify({
            'status': 13,
            'message': "Invalid User / Password"
            })   

@app.route('/updateExpenseFor', methods=['POST'])
def updateExpenseForData():
    
    if request.method == 'POST':

        try:
            token = request.headers['Authorization'].split(" ")[1][1:-1]
            decoded = jwt.decode(jwt=token, key=decodingParameter, algorithms=['RS256',]) 
            
        except:
            return jsonify({
                'status': 13,
                'message': "Invalid Token"
                })

        body = request.json

        date=body['date']
        food=body['food']
        entertainment=body['entertainment']
        clothing=body['clothing']
        transportation=body['transportation']
        medical=body['medical']
        other=body['other']

        userbyemail = db['users'].find_one({'email':decoded['email']})

        dateFor = "expenses."+date

        if  'expenses' in userbyemail:
            db['users'].update_one({"_id": userbyemail["_id"]}, {"$set": {dateFor: body}})
            return jsonify({
                'status': 10,
                'message': "Expeses Added",
                }) 

        else:
            db['users'].update_one({"_id": userbyemail["_id"]}, {"$set": {"expenses": {date:body}}})
            return jsonify({
                    'status': 10,
                    'message': "Expeses Added",
                    }) 

        return jsonify({
            'status': 13,
            'message': "Invalid User / Password"
            })   

@app.route('/addExpense', methods=['POST'])
def expenseData():
    
    if request.method == 'POST':

        try:
            token = request.headers['Authorization'].split(" ")[1][1:-1]
            decoded = jwt.decode(jwt=token, key=decodingParameter, algorithms=['RS256',]) 
            
        except:
            return jsonify({
                'status': 13,
                'message': "Invalid Token"
                })

        body = request.json

        food=body['food']
        entertainment=body['entertainment']
        clothing=body['clothing']
        transportation=body['transportation']
        medical=body['medical']
        other=body['other']
        date=body['date']

        userbyemail = db['users'].find_one({'email':decoded['email']})

        if  'expenses' in userbyemail:
                if date in userbyemail['expenses']:
                    
                    return jsonify({
                    'status': 13,
                    'message': "Expenses for today have already been added"
                    })
                
                db['users'].update_one({"_id": userbyemail["_id"]}, {"$set": {"expenses": {**userbyemail['expenses'], **{date: body}}}}) 
                
                return jsonify({
                    'status': 10,
                    'message': "Expeses Added",
                    })

        else:
            db['users'].update_one({"_id": userbyemail["_id"]}, {"$set": {"expenses":{date: body}}})
            return jsonify({
                'status': 10,
                'message': "Expeses Added",
                })    

@app.route('/getExpenses/<string:range>', methods=['POST'])
def getRangeExpenseData(range):
            
    if request.method == 'POST':

        try:
            token = request.headers['Authorization'].split(" ")[1][1:-1]
            decoded = jwt.decode(jwt=token, key=decodingParameter, algorithms=['RS256',]) 
            
        except:
            return jsonify({
                'status': 13,
                'message': "Invalid Token"
                })

        body = request.json
        userbyemail = db['users'].find_one({'email':decoded['email']})

        if  'expenses' in userbyemail:

            if range == "year":
                year =  body['year'] 
                totalExpense =  {'food':0,'entertainment':0,'clothing':0,'transportation':0,'medical':0,'other':0}
                
                for expense in userbyemail['expenses']:
                    dateSplit = expense.split('/')

                    if dateSplit[2] == year:
                        
                        totalExpense.update(
                        food=totalExpense['food']+int(userbyemail['expenses'][expense]['food']),
                        entertainment=totalExpense['entertainment']+int(userbyemail['expenses'][expense]['entertainment']),
                        clothing=totalExpense['clothing']+int(userbyemail['expenses'][expense]['clothing']),
                        transportation=totalExpense['transportation']+int(userbyemail['expenses'][expense]['transportation']),
                        medical=totalExpense['medical']+int(userbyemail['expenses'][expense]['medical']),
                        other=totalExpense['other']+int(userbyemail['expenses'][expense]['other']),
                        )

                return jsonify({
                'status': 10,
                'message': "Expense Analysis for Year :"+year,
                'expenses': [
                    {'type':'food','value':totalExpense['food']},
                    {'type':'entertainment','value':totalExpense['entertainment']},
                    {'type':'clothing','value':totalExpense['clothing']},
                    {'type':'transportation','value':totalExpense['transportation']},
                    {'type':'medical','value':totalExpense['medical']},
                    {'type':'other','value':totalExpense['other']},
                ]
                })         

            if range == "month":  
                monthYear =  body['monthYear']
                totalExpense =  {'food':0,'entertainment':0,'clothing':0,'transportation':0,'medical':0,'other':0}
                    
                for expense in userbyemail['expenses']:
                    dateSplit = expense.split('/')

                    if dateSplit[1]+'/'+dateSplit[2] == monthYear:
                        
                        totalExpense.update(
                        food=totalExpense['food']+int(userbyemail['expenses'][expense]['food']),
                        entertainment=totalExpense['entertainment']+int(userbyemail['expenses'][expense]['entertainment']),
                        clothing=totalExpense['clothing']+int(userbyemail['expenses'][expense]['clothing']),
                        transportation=totalExpense['transportation']+int(userbyemail['expenses'][expense]['transportation']),
                        medical=totalExpense['medical']+int(userbyemail['expenses'][expense]['medical']),
                        other=totalExpense['other']+int(userbyemail['expenses'][expense]['other']),
                        )

                return jsonify({
                'status': 10,
                'message': "Expense Analysis for Month "+dt.strptime(monthYear,"%m/%Y").strftime("%b, %Y"),
                'expenses': [
                    {'type':'food','value':totalExpense['food']},
                    {'type':'entertainment','value':totalExpense['entertainment']},
                    {'type':'clothing','value':totalExpense['clothing']},
                    {'type':'transportation','value':totalExpense['transportation']},
                    {'type':'medical','value':totalExpense['medical']},
                    {'type':'other','value':totalExpense['other']},
                ]
                })
            if range == "week": 
                day =  body['dayMonthYear']
                monthYear = day.split('/')[1]+"/"+day.split('/')[2]
                totalExpense =  {'food':0,'entertainment':0,'clothing':0,'transportation':0,'medical':0,'other':0}
                
                parsedDate = dt.strptime(day, '%d/%m/%Y')
                weekStart = parsedDate - td(days=parsedDate.weekday())
                weekEnd = weekStart + td(days=6)    

                for expense in userbyemail['expenses']:
                    dateSplit = expense.split('/')
                    if dateSplit[1]+"/"+dateSplit[2] == monthYear and (int(dateSplit[0]) >= int(weekStart.strftime('%d')) and int(dateSplit[0]) <= int(weekEnd.strftime('%d'))):
                        
                        totalExpense.update(
                        food=totalExpense['food']+int(userbyemail['expenses'][expense]['food']),
                        entertainment=totalExpense['entertainment']+int(userbyemail['expenses'][expense]['entertainment']),
                        clothing=totalExpense['clothing']+int(userbyemail['expenses'][expense]['clothing']),
                        transportation=totalExpense['transportation']+int(userbyemail['expenses'][expense]['transportation']),
                        medical=totalExpense['medical']+int(userbyemail['expenses'][expense]['medical']),
                        other=totalExpense['other']+int(userbyemail['expenses'][expense]['other']),
                        )

                return jsonify({
                'status': 10,
                'message': "Expense Analysis for Week "+parsedDate.strftime("%U, %Y"),
                'expenses': [
                    {'type':'food','value':totalExpense['food']},
                    {'type':'entertainment','value':totalExpense['entertainment']},
                    {'type':'clothing','value':totalExpense['clothing']},
                    {'type':'transportation','value':totalExpense['transportation']},
                    {'type':'medical','value':totalExpense['medical']},
                    {'type':'other','value':totalExpense['other']},
                ]
                })

            if range == "day": 
                day =  body['dayMonthYear']
                if day in userbyemail['expenses']: 
                    return jsonify({
                    'status': 10,
                    'message': "Expenses for "+day,
                    'expenses': userbyemail['expenses'][day] 
                    })
                else:
                    return jsonify({
                    'status': 10,
                    'message': "No expenses till now",
                    'expenses': ""
                    })
                        
            else :
                return jsonify({
                'status': 13,
                'message': "Invalid API input",
                'expenses': []
                }) 

        else: 
            return jsonify({
                'status': 10,
                'message': "No expenses till now",
                'expenses': []
                })

        if  'expenses' in userbyemail:
            
            totalExpense =  {'food':0,'entertainment':0,'clothing':0,'transportation':0,'medical':0,'other':0}
            
            for expense in userbyemail['expenses']:
                dateSplit = expense.split('/')
                
                if dateSplit[1]+'/'+dateSplit[2] == monthYear:
                    
                    totalExpense.update(
                    food=totalExpense['food']+int(userbyemail['expenses'][expense]['food']),
                    entertainment=totalExpense['entertainment']+int(userbyemail['expenses'][expense]['entertainment']),
                    clothing=totalExpense['clothing']+int(userbyemail['expenses'][expense]['clothing']),
                    transportation=totalExpense['transportation']+int(userbyemail['expenses'][expense]['transportation']),
                    medical=totalExpense['medical']+int(userbyemail['expenses'][expense]['medical']),
                    other=totalExpense['other']+int(userbyemail['expenses'][expense]['other']),
                    )
            return jsonify({
            'status': 10,
            'message': "Total Expenses",
            'expenses': totalExpense
            }) 

        else:
            return jsonify({
            'status': 10,
            'message': "No Expenses till now",
            'expenses': []
            })   

@app.route('/getLatestExpenses/<string:range>', methods=['POST'])
def getLatestRangeExpenseData(range):
            
    if request.method == 'POST':

        try:
            token = request.headers['Authorization'].split(" ")[1][1:-1]
            decoded = jwt.decode(jwt=token, key=decodingParameter, algorithms=['RS256',]) 
            
        except:
            return jsonify({
                'status': 13,
                'message': "Invalid Token"
                })

        userbyemail = db['users'].find_one({'email':decoded['email']})
        latestRecords = []
        if  'expenses' in userbyemail:
                for i in list(reversed(list(userbyemail['expenses'])))[0:min(len(userbyemail['expenses']),int(range))]:
                    
                    latestRecords.append({**userbyemail['expenses'][i],**{'date':i}})

                return jsonify({
                'status': 10,
                'message': "Recent Transactions",
                'expenses': latestRecords
                })

        else: 
            return jsonify({
                'status': 10,
                'message': "No expenses till now",
                'expenses': []
                })
  


if __name__ == '__main__':

    app.run()