from pymongo import MongoClient
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Retrieve the MongoDB connection URL from environment variables
url = os.environ.get('MONGO')

# Set up MongoDB connection and select the database
client = MongoClient(url)
db = client['Mongo']

# Define collections
managers = db['Manager']
project = db['project']
task = db['Task']
resource = db['Resource']
user = db['user']
