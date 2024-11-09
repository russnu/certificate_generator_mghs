<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

require '../vendor/autoload.php';
use Firebase\JWT\JWT;

include ('../certConnect.php');

if (isset($_POST['user_email']) && ($_POST['user_password'])) {
    $userEmail = $_POST['user_email'] ?? null;
    $userPassword = $_POST['user_password'] ?? null;

    $query = "SELECT * FROM users WHERE email = '$userEmail'";

    $result = mysqli_query($connect, $query);

    if ($result && mysqli_num_rows($result) > 0) {

        $user = mysqli_fetch_assoc($result);

        if (password_verify($userPassword, $user['password'])) {

            $key = "your_secret_key";
            $payload = [
                "user_id" => $user['user_id'],
                "user_email" => $user['email'],
                "user_fullname" => $user['user_fullname'],
                "user_role" => $user['role'],
            ];

            $jwt = JWT::encode($payload, $key, 'HS256');

            $response = [
                'success' => true,
                'token' => $jwt, 
                'message' => 'Logged in successfully', 
                'data' => [
                    'user_email' => $user['email'],
                    'user_fullname' => $user['user_fullname'],
                    'user_role' => $user['role'],
                ]
            ];
        } else {
            $response = ['success' => false, 'message' => 'Incorrect password'];
        } 
    } else {
        $response = ['success' => false, 'message' => 'User not found'];
    }

}

else {
    $response = ['success' => false, 'message' => 'Logged in failed (backend)'];
}

echo json_encode($response); 

 
?>