from http import HTTPStatus
from flask import Flask, jsonify, make_response, request, Response
from flask_cors import CORS
import mysql.connector
import os
app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:rootpassword@127.0.0.1:3306/database1'

db = mysql.connector.connect(
    host=os.environ.get('MYSQL_HOST'),
    user=os.environ.get('MYSQL_USER'),
    password=os.environ.get('MYSQL_PASSWORD'),
    database=os.environ.get('MYSQL_DB')
)
CORS(app)

@app.route('/signup', methods=['POST'])
def signup():
    id = request.json['id']
    password = request.json['password']

    cursor = db.cursor()
    cursor.execute('INSERT INTO User (id, password) VALUES (%s, %s)', (id, password))
    db.commit()
    cursor.close()

    return jsonify({'message': 'success'})


@app.route('/signin', methods=['POST'])
def signin():
    id = request.json['id']
    password = request.json['password']


    cursor = db.cursor()
    cursor.execute('SELECT * FROM User WHERE id = %s AND password = %s', (id, password))
    user = cursor.fetchone()
    
    if user:
        return jsonify({'message': 'success'})
    else:
        return jsonify({'message': 'fail'}), 401
    

@app.route('/menu')
def get_menulist():
    SQL = f'''
    select * from Menu 
    '''
    cursor = db.cursor()
    cursor.execute(SQL)
    rows = cursor.fetchall()
    menu_tree = build_menu_tree(rows)
    cursor.close()

    result = []
    from pprint import pprint as print
    return jsonify(menu_tree)

def build_menu_tree(menu_data):
    menu_dict = {}
    top_level_menus = []
    for row in menu_data:
        menu_id, parent_menu_id, menu_name, menu_type, menu_level, menu_order = row
        menu_item = {
            'menu_id': menu_id,
            'menu_name': menu_name,
            'menu_type': menu_type,
            'menu_order':menu_order,
            'children':[]
        }
        if menu_id not in menu_dict:
            menu_dict[menu_id] = menu_item
        
        if parent_menu_id not in menu_dict:
            menu_dict[parent_menu_id] = {
                'menu_id': parent_menu_id,
                'children':[]
            }
        
        if menu_level == 1:
            menu_dict[menu_id] = { **menu_item, **menu_dict[menu_id]}
            top_level_menus.append(menu_dict[menu_id])

        else:
            parent_menu = menu_dict[parent_menu_id]
            parent_menu['children'].append(menu_item)

    return top_level_menus

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')