from flask import Flask
from flask_restful import Resource,request

from db import mdb
class Register(Resource):
    def post(self):
        input = request.get_json()
        print("input",input)

        email = input["email"]
        print("email",email)
        password = input["password"]
        print("password",password)

        dbUser = mdb.users.find_one({"email":email})

        import random
        random_number = random.randint(1000,9999)
        newUser = {
            "_id":random_number,
            "email":email,
            "password":password,
            "status":"active"
        }
        mdb.users.insert_one(newUser)
        return{
            "status":1,
            "cls":"success",
            "msg":"Registration successful ",
            "payload":{"input":input, "newUser":newUser}
        }