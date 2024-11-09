<?php
header('Access-Control-Allow-Origin: *');
// header('Content-Type: application/json');

include ('./certConnect.php');
    
$query = 'SELECT * FROM intern_certificates';
$result = mysqli_query($connect, $query);

$certificates = array();

while($row = mysqli_fetch_array($result)){
    $certificates[] = array(
        'certificate_id' => $row['certificate_id'],
        'intern_first_name' => $row['intern_first_name'],
        'intern_middle_name' => $row['intern_middle_name'],
        'intern_last_name' => $row['intern_last_name'],
        'intern_school' => $row['intern_school'],
        'intern_department' => $row['intern_department'],
        'intern_position' => $row['intern_position'],
        'internship_period_start' => $row['internship_period_start'],
        'internship_period_end' => $row['internship_period_end'],
        'hours_rendered' => $row['hours_rendered'],
        'certificate_type' => $row['certificate_type'],
        'issuance_date' => $row['issuance_date']
    );
}

$response = ['success' => true, 'data' => $certificates];

echo json_encode($response);