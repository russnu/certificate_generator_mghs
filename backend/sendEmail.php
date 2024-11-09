<?php


//=====================================================================================================================//


define('MAILHOST', "smtp.gmail.com");
define('PASSWORD', "bcqnlsxtcgpbdswq");

//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require 'vendor/autoload.php';


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $recipientEmail = $_POST['email'];
    $subject = $_POST['subject'];
    $salutation = $_POST['salutation'];
    $message = $_POST['message'];

    if (isset($_FILES['pdf']) && $_FILES['pdf']['error'] === UPLOAD_ERR_OK) {
        $pdfFile = $_FILES['pdf']['tmp_name'];

        //Create an instance; passing `true` enables exceptions
        $mail = new PHPMailer(true);

        try {

            //========================================================= Server settings

            //$mail->SMTPDebug = SMTP::DEBUG_SERVER;                //Enable verbose debug output
            $mail->isSMTP();                                        //Send using SMTP
            $mail->Host       = MAILHOST;                           //Set the SMTP server to send through
            $mail->SMTPAuth   = true;                               //Enable SMTP authentication
            $mail->Username   = 'teytesting@gmail.com';             //SMTP username
            $mail->Password   = PASSWORD;                           //SMTP password
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;     //Enable implicit TLS encryption
            $mail->Port       = 587;                                //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

            //========================================================= Recipients
            $mail->setFrom('teytesting@gmail.com', 'Tey');
            $mail->addAddress($recipientEmail);                     //Add a recipient
            // $mail->addAddress('ellen@example.com');              //Name is optional
            $mail->addReplyTo('teytesting@gmail.com', 'Tey');
            // $mail->addCC('cc@example.com');
            // $mail->addBCC('bcc@example.com');

            //========================================================= Attachments

            if (isset($pdfFile)){
                $mail->addAttachment($pdfFile, 'certificate.pdf');      //Add attachments
            }
            

            //========================================================= Content

            $mail->isHTML(true);                                    //Set email format to HTML
            $mail->Subject = $subject;
            $mail->Body    = "<b>$salutation</b><br>" . nl2br($message);
            $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

            $mail->send();
            echo json_encode(['success' => true]);
        } catch (Exception $e) {
            echo json_encode(['success' => false, 'error' => $mail->ErrorInfo]);
        }
    } else {
        echo json_encode(['success' => false, 'error' => 'No PDF file uploaded']);
    }
}
?>