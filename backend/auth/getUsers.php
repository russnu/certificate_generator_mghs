<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');

require '../vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

include ('../certConnect.php');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header('HTTP/1.1 200 OK');
    exit();
}
//=======================================================//
$headers = getallheaders();
//=======================================================//
$token = isset($headers['Authorization']) ? str_replace('Bearer ', '', $headers['Authorization']) : null;
//=======================================================//

function validateToken($token) {

    $response = ['success' => false, 'message' => 'Unauthorized access'];

    if ($token) {
        try {
            $key = "your_secret_key";
            // Decode the JWT
            $decoded = JWT::decode($token, new Key($key, 'HS256'));

            $decodedArray = (array) $decoded;

            if ($decodedArray['user_role'] !== 'admin' ) {
                http_response_code(403); // Forbidden
                $response['message'] = 'Access Denied';
                exit();
            } else {
                $response = ['success' => true, 'message' => 'Token is valid', 'user_data' => $decodedArray];
            }
            
        } catch (Exception $e) {
            
            http_response_code(401);
            $response['message'] = 'Invalid token';
            $response['error'] = $e->getMessage();
        }
    } else {
        http_response_code(400);
        $response['message'] = 'No token provided';
    }

    return $response;
}

$validationResponse = validateToken($token);

if (!$validationResponse['success']) {
    echo json_encode($validationResponse);
    exit();
}

//=======================================================//
    
$query = 'SELECT * FROM users';
$result = mysqli_query($connect, $query);

$users = array();

while($row = mysqli_fetch_array($result)){
    $users[] = array(
        'user_id' => $row['user_id'],
        'user_fullname' => $row['user_fullname'],
        'user_email' => $row['email'],
        'role' => $row['role'],
        'created_at' => $row['created_at']
    );
}

$response = ['success' => true, 'data' => $users];

echo json_encode($response);