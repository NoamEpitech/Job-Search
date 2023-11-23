from flask import Flask, jsonify, request, make_response
from flask_restful import Api, Resource
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
from sqlalchemy import create_engine
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
import pymysql
import datetime
import jwt

pymysql.install_as_MySQLdb()

allowed_url = '*'

# database_url = 'mysql://root:passwordroot@localhost:40001'
database_url = 'mysql://root:passwordroot@database'
database_name = 'app_database'

engine = create_engine(database_url)
connection = engine.connect()
connection.execute(f"CREATE DATABASE IF NOT EXISTS {database_name}")
connection.close()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = f'{database_url}/{database_name}'
app.config['SECRET_KEY'] = 'this_is_a_secure_secret_key_that_you_wont_guess'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = datetime.timedelta(minutes=30)

db = SQLAlchemy(app)

api = Api(app)


class Company(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    hq_location = db.Column(db.String(50), nullable=False)

class Job(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(1000), nullable=False)
    salary = db.Column(db.String(50))
    location = db.Column(db.String(50))
    company_id = db.Column(db.Integer, db.ForeignKey('company.id'))
    company = db.relationship('Company', backref='jobs')

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(150), nullable=False)
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    is_admin = db.Column(db.Boolean)

class CompanyUser(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    company_id = db.Column(db.Integer, db.ForeignKey('company.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

class JobInformation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    information_type = db.Column(db.String(50))
    information = db.Column(db.String(1000))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    job_id = db.Column(db.Integer, db.ForeignKey('job.id'))


with app.app_context():
    db.create_all()


name_to_table = {
    'user' : User,
    'users': User,
    'job': Job,
    'jobs': Job,
    'company': Company,
    'companies': Company,
    'company-user-relations': CompanyUser,
    'company_user': CompanyUser,
    'job-informations' : JobInformation,
    'job_informations' : JobInformation
}


@app.errorhandler(404)
@cross_origin(origin=allowed_url)
def url_not_found(error=404):
    return jsonify({'message': f'Please enter a valid url'}), 404
  

### Read ###

@app.route('/<table_name>', methods=['GET'])
@cross_origin(origin=allowed_url)
def search_records(table_name : str):
    if request.method == 'GET':
        
        if table_name.lower() not in name_to_table:
            return jsonify({'message': 'No table found with the given name'}), 404

        selected_table = name_to_table[table_name.lower()]
        query_params = {}

        for column in selected_table.__table__.columns:
            value = request.args.get(column.name)
            if value is not None:
                query_params[column.name] = value

        query = selected_table.query

        for column_name, value in query_params.items():
            if '%' in value or '*' in value:
                query = query.filter(getattr(selected_table, column_name).ilike(value.replace('*', '%')))
            else:
                query = query.filter(getattr(selected_table, column_name) == value)

        records = query.all()

        if not records:
            return jsonify({'message': 'No records found with the given criteria'}), 404

        result_list = [{column.name: getattr(record, column.name) for column in selected_table.__table__.columns} for record in records]

        return jsonify(result_list)
    else:
        return jsonify({'error': 'Invalid request method'}), 400



### Create ###

@app.route('/<table_name>', methods=['POST'])
@cross_origin(origin=allowed_url)
# @jwt_required
def insert_record(table_name : str):
    if request.method == 'POST':

        data = request.get_json()
        if not data:
            return jsonify({'error': 'No JSON data provided'}), 400
        
        if table_name.lower() not in name_to_table:
            return jsonify({'error': 'Table not found'}), 404
        
        selected_table = name_to_table[table_name.lower()]
        
        if "password" in data:
            data['password'] = generate_password_hash(data['password'])

        new_record = selected_table(**data)
        db.session.add(new_record)
        db.session.commit()

        return jsonify({'message': f'Record added to {table_name} successfully', 'data' : data}), 201 
    else:
        return jsonify({'error': 'Invalid request method'}), 400



### Update ###

@app.route('/<table_name>/<int:record_id>', methods=['PUT', 'PATCH'])
@cross_origin(origin=allowed_url)
def update_record(table_name : str, record_id):
    if request.method in ['PUT', 'PATCH']:
        
        if table_name.lower() not in name_to_table:
            return jsonify({'error': 'Table not found'}), 404

        selected_table = name_to_table[table_name.lower()]

        data = request.get_json()
        if not data:
            return jsonify({'error': 'No JSON data provided'}), 400
        
        if "password" in data:
            data['password'] = generate_password_hash(data['password'])

        record = selected_table.query.get(record_id)
        if not record:
            return jsonify({'error': 'Record not found'}), 404

        for key, value in data.items():
            setattr(record, key, value)

        db.session.commit()
        return jsonify({'message': f'Record in {table_name} updated successfully', 'data' : data}), 200
    else:
        return jsonify({'error': 'Invalid request method'}), 400
    


### Delete ###

@app.route('/<table_name>/<int:record_id>', methods=['DELETE'])
@cross_origin(origin=allowed_url)
def delete_record(table_name : str, record_id):
    if request.method == 'DELETE':
        if table_name.lower() not in name_to_table:
            return jsonify({'error': 'Table not found'}), 404
        
        selected_table = name_to_table[table_name.lower()]

        record = selected_table.query.get(record_id)
        if not record:
            return jsonify({'error': 'Record not found'}), 404

        db.session.delete(record)
        db.session.commit()
        return jsonify({'message': f'Record in {table_name} deleted successfully'}), 200
    else:
        return jsonify({'error': 'Invalid request method'}), 400



@app.route('/login', methods=['POST'])
@cross_origin(origin=allowed_url)
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if user and check_password_hash(user.password, password):
        token = jwt.encode({'user_id': user.id, 'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)},app.config['SECRET_KEY'], algorithm='HS256')
        return jsonify({'message': 'Login successful', 'token': token, 'decoded' : jwt.decode(token, app.config['SECRET_KEY'], algorithms='HS256')})
    else:
        return jsonify({'message': 'Invalid credentials'}), 401




if __name__ == "__main__":
    # app.run(debug=True)
    app.run(host="0.0.0.0")

    

