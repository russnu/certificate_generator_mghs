<?php
header('Access-Control-Allow-Origin: *');

include ('./certConnect.php');

// Capture POST data
$intern_first_name = $_POST['internFirstName'] ?? null;
$intern_middle_name = $_POST['internMiddleName'] ?? null;
$intern_last_name = $_POST['internLastName'] ?? null;
$intern_school = $_POST['internSchool'] ?? null;
$intern_department = $_POST['internDepartment'] ?? null;
$intern_position = $_POST['internPosition'] ?? null;
$internship_period_start = $_POST['internshipPeriodStart'] ?? null;
$internship_period_end = $_POST['internshipPeriodEnd'] ?? null;
$hours_rendered = $_POST['hoursRendered'] ?? null;
$certificate_type = $_POST['certificateType'] ?? null;
$issuance_date = $_POST['issuanceDate'] ?? null;

function generateCertificateId($prefix = "MGHS") {
    $year = date("Y"); // Current year
    $random = strtoupper(substr(bin2hex(random_bytes(4)), 0, 8)); // Generate a random hexadecimal string
    return "{$prefix}-{$year}-{$random}";
}

function isCertificateIdUnique($connect, $certificate_id) {
    $query = "SELECT COUNT(*) FROM intern_certificates WHERE certificate_id = '$certificate_id'";
    $result = mysqli_query($connect, $query);
    $count = mysqli_fetch_array($result)[0];
    return $count == 0; // Return true if the ID is unique (count is 0)
}

// Check if required fields are set
if (!$intern_first_name || !$intern_last_name || !$intern_school || !$intern_department || !$intern_position || !$internship_period_start || !$internship_period_end || !$hours_rendered || !$certificate_type || !$issuance_date) 
    {
        $response = ['success' => false, 'message' => 'All required fields must be filled out'];
    } 
else 
    {
        do {
            $certificate_id = generateCertificateId();
            } 
        while (!isCertificateIdUnique($connect, $certificate_id));

        // Prepare and execute the SQL query
        $query = "INSERT INTO intern_certificates (certificate_id, intern_first_name, intern_middle_name, intern_last_name, intern_school, intern_department, intern_position, internship_period_start, internship_period_end, hours_rendered, certificate_type, issuance_date) 
                VALUES ('$certificate_id', '$intern_first_name', '$intern_middle_name', '$intern_last_name', '$intern_school', '$intern_department', '$intern_position', '$internship_period_start', '$internship_period_end', '$hours_rendered', '$certificate_type', '$issuance_date')";

        $result = mysqli_query($connect, $query);

        if ($result) {
            $response = ['success' => true, 
                         'message' => 'Certificate added successfully', 
                         'data' => [
                                    'certificate_id' => $certificate_id
                                   ]
                        ];
        } else {
            $response = ['success' => false, 
                         'message' => 'Something went wrong while adding the certificate'];
        }
    }

echo json_encode($response); 
?>