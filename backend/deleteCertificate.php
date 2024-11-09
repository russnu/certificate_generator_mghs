<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
include ('./certConnect.php');

$response = ['success' => false, 'message' => 'Something went wrong while deleting the certificate'];

if (!isset($_POST['certificate_id'])){
    $response = ['success' => false, 'message' => 'ID is required'];
} else {
    $certificateId = $_POST['certificate_id'];

    $certificateId = mysqli_real_escape_string($connect, $certificateId);

    $query = "DELETE FROM intern_certificates where certificate_id = '$certificateId' LIMIT 1";
    $result = mysqli_query($connect, $query);
}

if ($result) {
    $response = ['success' => true, 'message' => 'Certificate deleted successfully'];
} else {
    $response = ['success' => false, 'message' => 'Something went wrong while deleting the certificate'];
}

echo json_encode($response);

?>