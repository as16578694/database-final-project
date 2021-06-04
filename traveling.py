from flask import Flask, render_template, request ,Response,jsonify, session
from flask_sqlalchemy import SQLAlchemy
import json
""" Spot: 文化場館M 自然景觀N 宮廟T 老街、夜市X
    Restaurant: 小點D 中式C 日式J 西式W 泰式T 港式H 韓式K
    Hotel:民宿A 汽車旅館B 旅社C 背包客棧D 飯店/旅店E"""

app = Flask(__name__)
db = SQLAlchemy()
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://root:@127.0.0.1:3306/traveling"
# Setup the secret key and the environment 
app.config.update(SECRET_KEY='st',
                  ENV='development')

db.init_app(app)


@app.route("/", methods=['GET', 'POST'])
def test():
    
    if(request.method == 'POST'):
        session.clear()
        search_request = request.get_json()
        zone = search_request['zone']
        place = search_request['place']

        print(zone, place)

        #deal with SQL query
        select="select Name "
        frm="from"
        where="where"
        query=" "
        if zone == 'N' : where = where + " "+"zone='N'" + " and "
        elif zone == 'S' : where = where + " " + "zone='S'" + " and "
        elif zone == 'W' : where = where + " " + "zone='W'" + " and "
        elif zone == 'E' : where = where + " " + "zone='E'" + " and "
           
        if place[0] == "S" : 
            frm = frm + " " + "spot "
            if place[1] == "M" : 
                where = where + " "+"type='文化場館'" +" and "
            elif place[1] == "N" : 
                where = where + " "+"type='自然景觀'" +" and "
            elif place[1] == "T" : 
                where = where + " "+"type='宮廟'" +" and "
            elif place[1] == "X" : 
                where = where + " "+"type='老街、夜市'" +" and "
        elif place[0] == "R" : 
            frm = frm + " "+"restaurant "
            if place[1] == "D" :  
                where = where + " "+"type='小點'" +" and "
            elif place[1] == "C" : 
                where = where + " "+"type='中式'" +" and "
            elif place[1] == "J" : 
                where = where + " "+"type='日式'" +" and "
            elif place[1] == "W" : 
                where = where + " "+"type='西式'" +" and "
            elif place[1] == "T" : 
                where = where + " "+"type='泰式'" +" and "
            elif place[1] == "H" : 
                where = where + " "+"type='港式'" +" and "
            elif place[1] == "K" : 
                where = where + " "+"type='韓式'" +" and "
        else : 
            frm = frm + " "+"hotel "
            if place[1] == "A" : 
                where = where + " "+"type='民宿'" +" and "
            elif place[1] == "B" : 
                where = where + " "+"type='汽車旅館'" +" and "
            elif place[1] == "C" : 
                where = where + " "+"type='旅社'" +" and "
            elif place[1] == "D" : 
                where = where + " "+"type='背包客棧'" +" and "
            elif place[1] == "E" : 
                where = where + " "+"type='飯店/旅店'" +" and "
        query = select + frm + where
        query=query[:-5]
        sql_cmd = query
        print(sql_cmd)
        query_data = db.engine.execute(sql_cmd+';')
        myList = []
        for i,ele in enumerate(query_data.fetchall()):
            if i>50 : break
            myList.append(ele[0])

        jsonResult = {}
        jsonResult['name'] = myList
        print(myList)
        session['jsonResult'] = jsonResult

    return render_template('Home.html')

@app.route("/name", methods=['POST'])
def index_name():
    return Response(json.dumps(session['jsonResult']),mimetype='application/json')

if __name__ == "__main__":
	app.run(host="0.0.0.0",port=5000,debug=True)