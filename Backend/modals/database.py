from pymongo import MongoClient
from pymongo.errors import OperationFailure
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Retrieve the MongoDB connection URL from environment variables
# url = os.environ.get('MONGO')
url = 'mongodb+srv://murlikhaire28:MurliMongo846285@cluster0.d1h0861.mongodb.net/?retryWrites=true&w=majority'
# Set up MongoDB connection and select the database
client = MongoClient(url)
db = client['Mongo']

# Define collections
managers = db['Manager']
projects = db['Project']
tasks = db['Task']
resources = db['Resource']
Authtable = db['Authtable']
user = db['user']

try:
    managers.create_index([('email', 1)], unique=True)
    managers.create_index([('username', 1)], unique=True)
except OperationFailure as e:
    # Handle the case when the indexes already exist or any other error occurs
    error_msg = str(e)



try:
    projects.create_index([('project_name', 1)], unique=True)
except OperationFailure as e:
    # Handle the case when the indexes already exist or any other error occurs
    error_msg = str(e)