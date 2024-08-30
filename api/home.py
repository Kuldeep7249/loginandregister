from flask_restful import Resource

class Home(Resource):
    def get(self):
        return {'hello': 'world',
                'staus':"active",
                'age':20,
                'payload':{}
                }
    