from pymongo import MongoClient
client = MongoClient()

client = MongoClient("mongodb://localhost:27017/")
print('client',client)

mdb=client.a2
print('mdb',mdb)


