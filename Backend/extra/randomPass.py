import random
import string

def generate_random_string(length=6):
    # Define the characters to choose from
    characters = string.ascii_letters + string.digits

    # Generate the random string
    random_string = ''.join(random.choice(characters) for _ in range(length))

    return random_string
