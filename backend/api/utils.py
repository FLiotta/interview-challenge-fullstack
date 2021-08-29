from string import ascii_letters
from random import choice

def generate_address():
    address_length = 20

    new_address = []

    for i in range(0, address_length):
        new_address.append(choice(ascii_letters))

    return "".join(new_address)