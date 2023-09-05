from http import HTTPStatus
from flask import Flask, jsonify, make_response, request, Response
import mysql.connector

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:rootpassword@127.0.0.1:3306/database1'

@app.route('/')
def hello():
    cnx = mysql.connector.connect(
        user='root',
        password='rootpassword',
        host='192.168.30.18',
        database='mydatabase'
    )
    # id = inputs.get('id')
    # passwd = inputs.get('password')

    EXAMPLE_SQL = f'''
    select * from mydatabase.User where id='root' and password='rootpasswd'
    '''
    print(EXAMPLE_SQL)
    cursor = cnx.cursor()
    cursor.execute(EXAMPLE_SQL)
    user = cursor.fetchone()
    return user

@app.route('/menu')
def menu_test():
    cnx = mysql.connector.connect(
        user='root',
        password='rootpassword',
        host='192.168.30.18',
        database='mydatabase'
    )
    SQL = f'''
    select idMenu, idParent, title, menuType, menuLevel from mydatabase.Menu order by idMenu asc
    '''

    cursor = cnx.cursor()
    cursor.execute(SQL)
    categories = cursor.fetchall()

    result = []



    print(categories)
    return jsonify({'data':categories, 'status':HTTPStatus.OK})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')