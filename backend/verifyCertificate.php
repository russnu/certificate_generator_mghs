<?php
header('Access-Control-Allow-Origin: *');

include ('./certConnect.php');

$certificateId = isset($_POST['certificate_id']) ? mysqli_real_escape_string($connect, $_POST['certificate_id']) : '';


if ($certificateId == '') {
    $response = ['success' => false, 'message' => 'Certificate ID is required'];
    echo json_encode($response);
    exit;
}


$query = "SELECT * FROM intern_certificates WHERE certificate_id = '$certificateId'";
$result = mysqli_query($connect, $query);

if (mysqli_num_rows($result) > 0) {

    $certificate = mysqli_fetch_array($result, MYSQLI_ASSOC);

    $response = [
        'success' => true,
        'data' => [
            'certificate_id' => $certificate['certificate_id'],
            'intern_name' => $certificate['intern_first_name'] . ' ' . $certificate['intern_middle_name'] . ' ' . $certificate['intern_last_name'],
            'date_of_issuance' => $certificate['issuance_date']
        ]
    ];
} else {
    $response = ['success' => false, 'message' => 'Certificate not found'];
}

echo json_encode($response);