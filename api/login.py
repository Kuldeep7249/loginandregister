from flask_restful import Resource,Api
from flask import request, Flask
from db import mdb
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager





class Login(Resource):
    def post(self):
        input=request.get_json()
        print('input',input)
        
        email=input["email"]
        print("email",email)
        password=input.get("password")
        print("password",password)

        user=mdb.users.find_one({"email":email})
        if not (user and "_id" in user):
            return{
                "status":"active",
                "msg":"email not exist"
            }
        dbpassword=user['password']
        status=user['status']

        if status !="active":
            return{
                "msg":"email exist but status is not active"
            }
        if password!=dbpassword:
            return{
                "status":0,
                "cls":"danger",
                "msg":"user and password mismathched"
            }
       
            print("user",user)
       
        return {'hello': 'world',
                'status':"active",
                'age':20,
                "msg":"login success",
                'payload':{"name":"kuldeep singh"}}