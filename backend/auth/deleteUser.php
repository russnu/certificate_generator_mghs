<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

require '../vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

include ('../certConnect.php');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header('HTTP/1.1 200 OK');
    exit();
}

//===============================================================================================//
function validateToken($token) {
    $response = ['success' => false, 'message' => 'Unauthorized access'];

    if ($token) {
        try {
            $key = "your_secret_key";
            // Decode the JWT
            $decoded = JWT::decode($token, new Key($key, 'HS256'));
            $decodedArray = (array) $decoded;

            // Validate token claims
            if ($decodedArray['user_role'] !== 'admin') {
                http_response_code(403); // Forbidden
                $response['message'] = 'Access Denied';
                exit();
            } else {
                $response = ['success' => true, 'user_data' => $decodedArray];
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
//===================================================================================================//

$headers = getallheaders();
$token = isset($headers['Authorization']) ? str_replace('Bearer ', '', $headers['Authorization']) : null;

// Validate the token
$validationResponse = validateToken($token);

if (!$validationResponse['success']) {
    echo json_encode($validationResponse);
    exit();
}

//===================================================================================================//







$response = ['success' => false, 'message' => 'Something went wrong while deleting the user.'];

if (!isset($_POST['user_id'])){
    $response = ['success' => false, 'message' => 'User ID is required'];
} else {

    $userId = $_POST['user_id'];

    $userId = mysqli_real_escape_string($connect, $userId);

    $query = "DELETE FROM users where user_id = '$userId' LIMIT 1";
    $result = mysqli_query($connect, $query);
}

if ($result) {
    $response = ['success' => true, 'message' => 'User deleted successfully'];
} else {
    $response = ['success' => false, 'message' => 'Something went wrong while deleting the User'];
}

echo json_encode($response);

?>