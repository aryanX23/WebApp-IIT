import eel
import random
import math
from des import DesKey
import json
import base64
import uuid
# Initialize Eel, pointing to the 'web' directory
eel.init('web')
BUFFER_SIZE = 1024
TCP_IP = '0.0.0.0'
TCP_PORT = 2004
PUBKEY = 10
REQSERV = 20
ENCMSG = 30
REQCOM = 40
DISCONNECT = 50
MAX_ITERATION = 15
MAX_N = 1e9
MAX_SIZE = 1e6
class PubKey:
    """ 
    Class to store the public keys
    """
    def __init__(self, q = None, alpha = None):
        if q is None:
            self.q = 834733607#GeneratePrime()                     # Large prime
            self.alpha = 110622533#GeneratePrimitiveRoot(self.q)  # Primite root
        else:
            self.q = q
            self.alpha = alpha

    def gen_pub_key(self, private_key):
        self.Y = compute_exp_modulo(self.alpha, private_key, self.q)    # Public Key

    def get_pub_key(self):
        return self.Y

    def get_primitive_root(self):
        return self.alpha

    def get_prime(self):
        return self.q

    def __str__(self):
        return "Prime number: %s, Primitive root: %s, Public key: %s" % (self.q,
                self.alpha, self.Y)
class sharedKey:
    """
    Class to store the shared keys between server and client
    """
    #public_key_other,private_key,other_aplha,other_q
    def __init__(self, pub_key_other,private_key,other_aplha,other_q):
        self.pub_key_other = pub_key_other
        self.private_key = private_key
        self.alpha=other_aplha
        self.q=other_q
        self.calculate()

    def calculate(self):
        # self.alpha = self.pub_key_other.alpha
        # self.q = self.pub_key_other.q
        self.Y = compute_exp_modulo(self.pub_key_other, self.private_key, self.q)

    def __str__(self):
        return "Public key: %s" % self.Y

    def get_key(self):
        ret = str(self.Y)
        if len(ret) >= 8:
            ret = ret[0:8]
        else:
            ret = ret.ljust(8, '0')
        return ret

def GeneratePrime():
    print("Running Miller-Rabin test to find a large prime number...\n")
    # random.seed(datetime.now())
    while True:
        current_value = random.randint(1, MAX_N) % MAX_N    # modulo MAX_N is redundant here
        current_value = int(current_value)
        if((current_value&1) == 0):
            current_value += 1
        if(MillerRabinTest(current_value, MAX_ITERATION) == 1):
            return current_value
def GeneratePrimitiveRoot(p):
    # Construct sieve of primes
    sieve = [0 for i in range(int(MAX_SIZE)+1)]
    sieve[0] = sieve[1] = 1
    i = 4
    while i < MAX_SIZE:
        sieve[i] = 1
        i += 2
    i = 3
    while i < MAX_SIZE:
        if sieve[i] == 0:
            j = 2 * i
            while j < MAX_SIZE:
                sieve[j] = 1
                j += i
        i += 2
    while True:
        a = random.randint(0, MAX_N) % (p - 2) + 2
        phi = p - 1
        flag = 1
        root = int(math.sqrt(phi))
        for i in range(2, root+1):
            if sieve[i] == 0 and not (phi % i):
                mod_result = compute_exp_modulo(a, phi / i, p)
                if mod_result == 1:
                    flag = 0
                    break
                if MillerRabinTest(phi / i, MAX_ITERATION) and not (phi % int(phi/i)):
                    mod_result = compute_exp_modulo(a, phi / (phi / i), p)
                    if mod_result == 1:
                        flag = 0
                        break
        if flag != 0:
            return a
def compute_exp_modulo(a, b, p):
    a, b, p = int(a), int(b), int(p)
    x = 1
    y = a
    while b > 0:
        if(b % 2 == 1):
            x = (x * y) % p
        y = (y * y) % p
        b = int(b/2)
    return x%p
def MillerRabinTest(value, iteration):
    value = int(value)
    if value < 2:
        return 0
    q = value - 1
    k = 0
    while((q&1) == 0):
        q = int(q/2)
        k += 1
    for i in range(0, iteration):
        a = (random.randint(0, MAX_N) % (value - 1)) + 1
        current = q
        flag = 1
        mod_result = compute_exp_modulo(a, current, value)
        for j in range(1, k + 1):
            if mod_result == 1 or (mod_result == value - 1):
                flag = 0
                break
            mod_result = (mod_result * mod_result % value)
        if flag:
            return 0
    return 1
@eel.expose
def encrypt(msg, a, b, c):
    # Serialize the message (dictionary) to JSON and encode as bytes
    msg_json = json.dumps(msg)
    msg_bytes = msg_json.encode('utf-8')

    key0 = DesKey(bytes(a, 'utf-8'))
    key1 = DesKey(bytes(b, 'utf-8'))
    key2 = DesKey(bytes(c, 'utf-8'))

    ret = key0.encrypt(msg_bytes, padding=True)
    # print(ret)
    ret = key1.decrypt(ret)
    # print(ret)
    ret = key2.encrypt(ret)
    # print(ret)
    # ret="hello"
    encrypted_msg_base64 = base64.b64encode(ret).decode('utf-8')

    return encrypted_msg_base64
    
@eel.expose
def decrypt(msg, a, b, c):
    key0 = DesKey(bytes(a, 'utf-8'))
    key1 = DesKey(bytes(b, 'utf-8'))
    key2 = DesKey(bytes(c, 'utf-8'))

    ret = key2.decrypt(msg)
    ret = key1.encrypt(ret)
    ret = key0.decrypt(ret, padding=True)

    # The result should be a JSON string, so decode it to get the original dictionary
    ret_json = ret.decode('utf-8')
    original_dict = json.loads(ret_json)
    return original_dict


# Define a Python function to be called from your React app
@eel.expose
def keygeneration():
    a, b, c = PubKey(), PubKey(), PubKey()
    private_a = random.randint(1, a.q - 1)  # Random number between 1 and a.q - 1
    private_b = random.randint(1, b.q - 1)  # Random number between 1 and b.q - 1
    private_c = random.randint(1, c.q - 1)  # Random number between 1 and c.q - 1
    a.gen_pub_key(private_a)
    b.gen_pub_key(private_b)
    c.gen_pub_key(private_c)
    public_key_a = a.get_pub_key()
    public_key_b = b.get_pub_key()
    public_key_c = c.get_pub_key()
    public_key_a = a.get_pub_key()
    public_key_b = b.get_pub_key()
    public_key_c = c.get_pub_key()
    client_primitive_root_a=a.get_primitive_root()
    client_primitive_root_b=b.get_primitive_root()
    client_primitive_root_c=c.get_primitive_root()
    client_prime_a=a.get_prime()
    client_prime_b=b.get_prime()
    client_prime_c=c.get_prime()
    return [public_key_a,public_key_b,public_key_c,client_primitive_root_a,client_primitive_root_b,client_primitive_root_c,client_prime_a,client_prime_b,client_prime_c,private_a,private_b,private_c]
    
    

    # return [public_key_a,public_key_b,public_key_c]
@eel.expose
def sharedkeygenration(server_pub_a,private_a,client_alpha_a,client_q_a,server_pub_b,private_b,client_alpha_b,client_q_b,server_pub_c,private_c,client_alpha_c,client_q_c):
    shared_a = sharedKey(server_pub_a,private_a,client_alpha_a,client_q_a).get_key()
    shared_b = sharedKey(server_pub_b,private_b,client_alpha_b,client_q_b).get_key()
    shared_c = sharedKey(server_pub_c,private_c,client_alpha_c,client_q_c).get_key()
    return [shared_a,shared_b,shared_c]

def generate_unique_code(unum):
    mac_address = uuid.UUID(int=uuid.getnode())
    # Perform some calculations on the MAC address to create a unique code
    unique_code = abs(hash(mac_address.int)) * unum # Example calculation
    return unique_code

@eel.expose
def get_mac_code(unum):
    return generate_unique_code(unum)
if __name__ == '__main__':
    # Start the Eel app, opening 'index.html' in the default web browser
    eel.start('index.html', size=(800, 600))