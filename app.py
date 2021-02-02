from flask import Flask, render_template, jsonify
from pymongo import MongoClient
from flask_pymongo import pymongo
import json

app = Flask(__name__)

conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)
db = client['guns_db']
collection = db['guns']

# @app.route('/')
# def index():
#   data = []
#   results = collection.find({}, {"_id":False})
#   for result in results:
#        data.append(result["state"])
# # # #       row = dict(result)
# # # #       print(row)
# # # #       if "_id" in row:
# # # #         del row["_id"]
# # # #       print(row)
#  #       data.append(row)
#   return render_template("index.html", event=data)
#     #return jsonify(event.to_json())


@app.route('/', methods=['GET'])
def query_state():
   year_data = []
   results = collection.find({
      "state": state,
      "date": date,
      "latitude": latitude,
      "longitude": longitude}, {"_id":False})
   for result in results:
      year_data.append(result)
   return render_template("index.html", event=year_data)
   #  state = request.args.get(result['state'])
   #  print(state)
   #  user = User.objects(state=state).first()
   #  print(user)
   #  if not user:
   #      return jsonify({'error': 'data not found'})
   #  else:
   #      return Response(state,minetype='application/json')

if __name__ == "__main__":
    app.run(debug=True)