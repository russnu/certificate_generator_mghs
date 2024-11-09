<?php
header('Access-Control-Allow-Origin: *');

include ('./certConnect.php');
//=======================================================//


$query = 'SELECT * FROM settings';
$result = mysqli_query($connect, $query);

$settings = array();

while($row = mysqli_fetch_array($result)){
    $settings[] = array(
        'setting_name' => $row['setting_name'],
        'setting_value' => $row['setting_value']
    );
}

$response = ['success' => true, 'settingsData' => $settings];

echo json_encode($response);