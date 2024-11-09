<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Authorization, Content-Type');

$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

if ($data === null) {
    die('Invalid JSON data received.');
}

$fullName = htmlspecialchars($data['name'] ?? '');
$email = filter_var($data['email'] ?? '', FILTER_SANITIZE_EMAIL);
$salutation = htmlspecialchars($data['salutation'] ?? '');
$subject = htmlspecialchars($data['subject'] ?? '');
$messageContent = htmlspecialchars($data['message'] ?? '');

if (empty($fullName) || empty($email) || empty($subject) || empty($messageContent)) {
    die('Missing required fields.');
}

// Load the HTML template
$templateFile = 'storage/send.html';
$emailBody = file_get_contents($templateFile);

if ($emailBody === false) {
    die('Could not load email template.');
}

$emailBody = str_replace('{{FULLNAME}}', $fullName, $emailBody);
$emailBody = str_replace('{{EMAIL}}', $email, $emailBody);
$emailBody = str_replace('{{SUBJECT}}', $subject, $emailBody);
$emailBody = str_replace('{{MESSAGE}}', nl2br($messageContent), $emailBody);
$emailBody = str_replace('{{AANHEF}}', $salutation, $emailBody);
$emailBody = str_replace('{{DATE}}', date("d-m-y"), $emailBody);


$to = 'hallo@vqnderklein.nl'; 
$emailSubject = "New message from: $fullName";

$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: <$email>" . "\r\n";

// Send the email
if (mail($to, $emailSubject, $emailBody, $headers)) {
   echo json_encode("Success");
} else {
    echo json_encode("Fail");
}
?>
