<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

require '../vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

include('../certConnect.php');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header('HTTP/1.1 200 OK');
    exit();
}

// Enable Exception Mode for mysqli
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);


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

// Get the token from the Authorization header
$headers = getallheaders();
$token = isset($headers['Authorization']) ? str_replace('Bearer ', '', $headers['Authorization']) : null;

// Validate the token
$validationResponse = validateToken($token);

if (!$validationResponse['success']) {
    echo json_encode($validationResponse);
    exit();
}

//===================================================================================================//

$response = ['success' => false, 'message' => 'Invalid request.'];

try {
    if (isset($_POST['user_email']) && isset($_POST['user_password']) && isset($_POST['user_fullname'])) {
        $userEmail = $_POST['user_email'] ?? null;
        $userPassword = $_POST['user_password'] ?? null;
        $userFullname = $_POST['user_fullname'] ?? null;
        $userRole = $_POST['user_role'] ?? null;

        $hashedPassword = password_hash($userPassword, PASSWORD_DEFAULT);

        $query = "INSERT INTO users (email, password, role, user_fullname) VALUES ('$userEmail', '$hashedPassword', '$userRole', '$userFullname')";
        $result = mysqli_query($connect, $query);

        if ($result) {
            $response = ['success' => true, 'message' => 'User registered successfully!'];
        }
    }
} catch (mysqli_sql_exception $e) {

    if ($e->getCode() == 1062) {
        $response = ['success' => false, 'message' => 'This email is already registered. Please use another one.'];
    } else {
        $response = ['success' => false, 'message' => 'Error in registration.'];
    }
}

echo json_encode($response);
?>
