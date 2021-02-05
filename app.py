from flask import Flask, render_template, jsonify
from pymongo import MongoClient
from flask_pymongo import pymongo
import json

app = Flask(__name__)

conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)
db = client['guns_db']
collection = db['guns']

@app.route('/')
def index():
  data = []
  results = collection.find({}, {"_id":False})
  for result in results:
       data.append(result["state"])
  return render_template("index.html", event=data)
  #return jsonify(event.to_json())

@app.route('/year=<year>')
def return_year_data(year):
   #year = 2015
   returned_data = []
   results = collection.find({}, {"_id":False})
   for result in results:
      if (result["year"] == year):
         returned_data.append(result)
      else:
         exit
   #return render_template("index.html", event=returned_data)
   return jsonify(returned_data)

if __name__ == "__main__":
    app.run(debug=True)