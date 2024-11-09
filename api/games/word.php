<?php

include('config.php');

header('Content-Type: application/json');
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Authorization, Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}


// Authorization check
$headers = apache_request_headers();
if (!isset($headers['Authorization'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Authorization header missing']);
    exit;
}

$authHeader = $headers['Authorization'];
list($type, $token) = explode(' ', $authHeader);

if (strcasecmp($type, 'Bearer') !== 0 || $token !== Config::getApiKey()) {
    http_response_code(403);
    echo json_encode(['error' => 'Invalid token']);
    exit;
}

// Parse JSON input data
$inputData = json_decode(file_get_contents('php://input'), true);
if (!$inputData || !isset($inputData['word']) || !isset($inputData['row']) || !isset($inputData['modus']) || !isset($inputData['id'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid data format', 'receivedData' => $inputData]);
    exit;
}

$userGuess = $inputData['word'];
$row = $inputData['row'];
$modus = $inputData['modus'];
$uniqueId = $inputData['id'];
$conn = Config::get();

if ($row == 1) {
    $word = generateNewWord($modus);

    $stmt = $conn->prepare("INSERT INTO GameSessions (unique_id, generated_word, created_at) VALUES (?, ?, NOW())");
    $stmt->bind_param("ss", $uniqueId, $word);
    $stmt->execute();
    $stmt->close();

    $wordToGuess = $word;
} else {
    $stmt = $conn->prepare("SELECT generated_word FROM GameSessions WHERE unique_id = ?");
    $stmt->bind_param("s", $uniqueId);
    $stmt->execute();
    $stmt->bind_result($wordToGuess);
    $stmt->fetch();
    $stmt->close();

    if (!$wordToGuess) {
        http_response_code(404);
        echo json_encode(['error' => 'Game session not found or expired']);
        exit;
    }
}

function generateNewWord($modus) {
  $conn = Config::get();
    $stmt = $conn->prepare("SELECT word FROM GuessTheWord WHERE CHAR_LENGTH(word) BETWEEN ? AND ? ORDER BY RAND() LIMIT 1");
    $stmt->bind_param("ii", $modus, $modus);
    $stmt->execute();
    $stmt->bind_result($randomWord);
    $stmt->fetch();
    $stmt->close();
    return strtolower($randomWord);
}

function checkWordExists($word) {
    $url = "https://www.woorden.org/woord/" . urlencode($word);
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    return ($httpCode === 200);
}

function compareStrings($str1, $str2) {
    $arr1 = str_split($str1);
    $arr2 = str_split($str2);
    $results = array_fill(0, count($arr2), '#ef9a9a');
    $freqMap1 = array_count_values($arr1);
    for ($i = 0; $i < count($arr2); $i++) {
        $char = $arr2[$i];
        if ($char === $arr1[$i]) {
            $results[$i] = '#a5d6a7';
            $freqMap1[$char]--;
        }
    }
    for ($i = 0; $i < count($arr2); $i++) {
        $char = $arr2[$i];
        if ($results[$i] !== '#a5d6a7' && isset($freqMap1[$char]) && $freqMap1[$char] > 0) {
            $results[$i] = '#ffcc80';
            $freqMap1[$char]--;
        }
    }
    $formattedResults = [];
    foreach ($arr2 as $i => $char) {
        $formattedResults[] = "$char = " . $results[$i];
    }
    return $formattedResults;
}

// Game logic
if (!checkWordExists($userGuess)) {
    $responseData = ['status' => 'FAIL'];
} else {
    if ($wordToGuess == $userGuess) {
        $responseData = [
            'status' => 'OK',
            'guessedCorrectly' => "Y",
            'wordToGuess' => $wordToGuess
        ];

        $stmt = $conn->prepare("DELETE FROM GameSessions WHERE unique_id = ?");
        $stmt->bind_param("i", $uniqueId);
        $stmt->execute();

    } else if ($row - 1 < $modus) {
        $result = compareStrings($wordToGuess, $userGuess);
        $responseData = [
            'status' => 'OK',
            'guessedCorrectly' => "N",
            'information' => $result
        ];
    } else {
        $responseData = [
            'status' => 'OK',
            'guessedCorrectly' => "O",
            'correctWord' => $wordToGuess
        ];

        $stmt = $conn->prepare("DELETE FROM GameSessions WHERE unique_id = ?");
        $stmt->bind_param("i", $uniqueId);
        $stmt->execute();
      
    }
}

http_response_code(200);
echo json_encode($responseData);
