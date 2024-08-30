from db import mdb
from flask_restful import  Resource
class Users(Resource):
    def get(self):
         user=[]
         for item in mdb.users.find({}):
          user.append(item)
         return {'hello': 'world',
                'status':"active",
                'age':20,
                "msg":"login success",
                'payload':{}}
    