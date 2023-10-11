from django.shortcuts import render
from django.http import HttpResponse
import json
from rest_framework import status
from rest_framework.response import Response 
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer
from rest_framework.decorators import api_view, authentication_classes, permission_classes, renderer_classes
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
# Create your views here.
import eel
import random
import math
from des import DesKey
import base64
from .models import MyUser
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenRefreshView
import jwt
import datetime
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
client_shared_keys = {}
class PubKey:
    """ 
    Class to store the public keys
    """
    def __init__(self, q = None, alpha = None):
        if q is None:
            self.q = 834733607#GeneratePrime()                    # Large prime
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
def encrypt(msg, shared_keys):
    a, b, c = shared_keys[0].get_key(), shared_keys[1].get_key(), shared_keys[2].get_key()
    key0 = DesKey(bytes(a, 'utf-8'))
    key1 = DesKey(bytes(b, 'utf-8'))
    key2 = DesKey(bytes(c, 'utf-8'))
    ret = key0.encrypt(msg, padding=True)
    ret = key1.decrypt(ret)
    ret = key2.encrypt(ret)
    return ret        


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
    server_primitive_root_a=a.get_primitive_root()
    server_primitive_root_b=b.get_primitive_root()
    server_primitive_root_c=c.get_primitive_root()
    server_prime_a=a.get_prime()
    server_prime_b=b.get_prime()
    server_prime_c=c.get_prime()
    return [public_key_a,public_key_b,public_key_c,server_primitive_root_a,server_primitive_root_b,server_primitive_root_c,server_prime_a,server_prime_b,server_prime_c,private_a,private_b,private_c]
    # return [a,b,c]
def sharedkeygenration(server_pub_a,private_a,server_alpha_a,server_q_a,server_pub_b,private_b,server_alpha_b,server_q_b,server_pub_c,private_c,server_alpha_c,server_q_c):
    shared_a = sharedKey(server_pub_a,private_a,server_alpha_a,server_q_a).get_key()
    shared_b = sharedKey(server_pub_b,private_b,server_alpha_b,server_q_b).get_key()
    shared_c = sharedKey(server_pub_c,private_c,server_alpha_c,server_q_c).get_key()
    return [shared_a,shared_b,shared_c]
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



# @api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def tokentest_view(request):
    if request.method=='GET':
   
        try:
            # print("Request Headers:", request.META)
            # Get the token from the request
            token = request.META.get('HTTP_AUTHORIZATION').split(' ')[1]  # Assuming it's in the "Bearer" format
            print(token)
            # Decode the token without verification
            decoded_token = jwt.decode(token, None, False)
            print("decodedtoken: ",decoded_token)

            # Check if the token is valid (e.g., check its expiration manually)
            if 'exp' in decoded_token:
                print("helooooooooo")
                # Check if the token has expired
                if datetime.datetime.now().timestamp() > decoded_token['exp']:
                    print("again heloooooooo")
                    response =Response({"error": "Token has expired"}, status=status.HTTP_401_UNAUTHORIZED)
                    response.accepted_renderer = JSONRenderer()
                    response.accepted_media_type = 'application/json'
                    response.renderer_context = {}
                    return response

            # Token is valid, continue processing
            print("hiiiiiiiiiiii")
            res = {"message":"valid token"}
            print("hiiiiiiiiiiii")
            print("Before response")
            response = Response(res, status=status.HTTP_200_OK, content_type='application/json')
            response.accepted_renderer = JSONRenderer()
            response.accepted_media_type = 'application/json'
            response.renderer_context = {}
            print("After response",response)

            return response

        except Exception as e:
            # Log the error and return an error response
            print(e)
            return Response({"error": "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def testview(request):
  if request.method=='POST':
    data = keygeneration()
    # print(data)
    private_a=data[9]
    private_b=data[10]
    private_c=data[11]

    res={"s_key1":data[0],"s_key2":data[1],"s_key3":data[2]}
    data2=request.data
    client_pub_a=data2["c_k1"]
    client_pub_b=data2["c_k2"]
    client_pub_c=data2["c_k3"]
    
    # sk=sharedkeygenration(client_pub_a, private_a, client_alpha_a, client_q_a, client_pub_b, private_b, client_alpha_b, client_q_b, client_pub_c, private_c, client_alpha_c, client_q_c)
    sk=sharedkeygenration(client_pub_a, private_a, data[3], data[6], client_pub_b, private_b, data[4], data[7], client_pub_c, private_c, data[5], data[8])
    print(sk)
    client_id = request.data["uid"]
    client_shared_keys[client_id]= {
            "shared_key1": sk[0],
            "shared_key2": sk[1],
            "shared_key3": sk[2]}
    combined_data = {
              **res
          }
    

    
    return Response(combined_data)

@api_view(['POST'])  
def register(request):
    if request.method=='POST':
        data=request.data
        print(data)
        client_id=data['cid']
        keys=list(client_shared_keys[client_id].values())
        recvdata=data["msg"]
        orgdata=decrypt(recvdata,keys[0],keys[1],keys[2])
        print(orgdata)# Extract username and password from orgdata
        try:
            orgdata_dict = json.loads(orgdata)  # Parse orgdata into a dictionary
        except json.JSONDecodeError:
            res = {"message": "Invalid orgdata format"}
            return Response(res, status=status.HTTP_400_BAD_REQUEST)

        # Extract username and password from orgdata_dict
        username = orgdata_dict.get("username")
        password = orgdata_dict.get("password")
        email = orgdata_dict.get("email")
        address=orgdata_dict.get("address")
        usercode=orgdata_dict.get("usercode")
        hashed_password = make_password(password)

        # Check if a user with the same username already exists
        existing_user = MyUser.objects.filter(email=email).first()

        if existing_user:
            if check_password(password, existing_user.password):
                print(check_password(password, existing_user.password))
                print(existing_user.password)
                res = {"message": "User with this email already exists"}
                # return Response(res, status=status.HTTP_400_BAD_REQUEST)
                return Response(res)
            else:
                res={"message":"check credentials"}
                return Response(res)

        # Create a new User object with a generated UID and save it to the database
        new_user = MyUser(username=username, password=hashed_password,email=email,address=address,usercode=usercode)
        new_user.save()
        refresh = RefreshToken.for_user(new_user)

    # Return the access token and refresh token in the response
        access_token = refresh.access_token
        access_token['name']=str(new_user.username)
        access_token['usercode'] = str(new_user.usercode)
        access_token = str(access_token)
        
        response_data = {
        'access_token': access_token,
        'refresh_token': str(refresh),
        'message': 'User registered successfully',
        }
        return Response(response_data)
       

@api_view(['POST'])  
def login(request):
    if request.method=='POST':
        data=request.data
        client_id=data['cid']
        keys=list(client_shared_keys[client_id].values())
        recvdata=data["msg"]
        orgdata=decrypt(recvdata,keys[0],keys[1],keys[2])
        print(orgdata)
        try:
            orgdata_dict = json.loads(orgdata)  # Parse orgdata into a dictionary
        except json.JSONDecodeError:
            res = {"message": "Invalid orgdata format"}
            return Response(res, status=status.HTTP_400_BAD_REQUEST)
        password = orgdata_dict.get("password")
        email = orgdata_dict.get("email")
        existing_user = MyUser.objects.filter(email=email).first()
        refresh = RefreshToken.for_user(existing_user)
        if existing_user:
            if check_password(password, existing_user.password):
                access_token = refresh.access_token
                access_token['name']=str(existing_user.username)
                access_token['usercode'] = str(existing_user.usercode)
                access_token = str(access_token)  # Convert the token back to a string
                
                response_data = {
                    'access_token': access_token,
                    'refresh_token': str(refresh),
                    'message': 'User Logged in successfully',
                    
                }
                
                return Response(response_data)
            else:
                res={"message":"check credentials"}
                
                return Response(res)
        else:
            res={"Provide valid credentials"}
            return Response(res)



@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def protected_api_view(request):
    res = {"message":"valid token"}
    print("hello")
    return Response(res)
    # Your view logic here

class RefreshTokenView(TokenRefreshView):
    pass