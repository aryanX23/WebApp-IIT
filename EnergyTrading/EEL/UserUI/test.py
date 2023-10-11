import json
from des import DesKey
from Crypto.Cipher import DES3
import base64
def encrypt(msg, a, b, c):
    # Serialize the message (dictionary) to JSON and encode as bytes
    msg_json = json.dumps(msg)
    msg_bytes = msg_json.encode('utf-8')

    key0 = DesKey(bytes(a, 'utf-8'))
    key1 = DesKey(bytes(b, 'utf-8'))
    key2 = DesKey(bytes(c, 'utf-8'))

    ret = key0.encrypt(msg_bytes, padding=True)
    ret = key1.decrypt(ret)
    ret = key2.encrypt(ret)
    # return ret
    # ret_json = ret.decode('utf-8')
    # original_dict = json.loads(ret_json)
    # return original_dict
    encrypted_msg_base64 = base64.b64encode(ret).decode('utf-8')

    return encrypted_msg_base64

# Example usage:
# encrypted_data = encrypt({"username": "userssssssss", "passss": "heloooooo"}, "87654876", "23475734", "23456644")
# print(encrypted_data)
def decrypt(msg, a, b, c):
    encrypted_msg = base64.b64decode(msg)
    key0 = DesKey(bytes(a, 'utf-8'))
    key1 = DesKey(bytes(b, 'utf-8'))
    key2 = DesKey(bytes(c, 'utf-8'))

    ret = key2.decrypt(encrypted_msg)
    ret = key1.encrypt(ret)
    ret = key0.decrypt(ret, padding=True)

    # The result should be a JSON string, so decode it to get the original dictionary
    ret_json = ret.decode('utf-8')
    original_dict = json.loads(ret_json)
    return original_dict

# # Example usage:
# encrypted_data = encrypt({"username": "userssssssss", "passss": "heloooooo"}, "87654876", "23475734", "23456644")
# print(encrypted_data)
# decrypted_data = decrypt(encrypted_data, "87654876", "23475734", "23456644")
# print(decrypted_data)
# decrypted_data = decrypt("esvgwnzUhjL6G09l+W2NQe2JllrXMESo6WRIdqHnHG+kmXJZvz/5TIAQcD76/EvW1gxyHbVOnLSuamUw7eyYgie3efYUhEAj5tLJK5uajIcVLmZmVgjHig==", "73743571", "18674604", "17300464")
# print(decrypted_data)

import uuid
import random

print(random.randint(3, 9))
# printing the value of unique MAC
# address using uuid and getnode() function 
print (hex(uuid.getnode()))
def generate_unique_code(unum):
    mac_address = uuid.UUID(int=uuid.getnode())
    # Perform some calculations on the MAC address to
    #  create a unique code
    unique_code = abs(hash(mac_address.int)) * unum # Example calculation
    return unique_code

print(generate_unique_code(456678))
