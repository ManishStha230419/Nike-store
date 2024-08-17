<?php
session_start();
header('Content-Type: text/plain');

// Enable error reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    echo 'Payment failed: User not logged in';
    exit();
}

// Retrieve form data
$name = isset($_POST['name']) ? htmlspecialchars($_POST['name'], ENT_QUOTES, 'UTF-8') : '';
$cardNumber = isset($_POST['cardNumber']) ? htmlspecialchars($_POST['cardNumber'], ENT_QUOTES, 'UTF-8') : '';
$expiryDate = isset($_POST['expiryDate']) ? htmlspecialchars($_POST['expiryDate'], ENT_QUOTES, 'UTF-8') : '';
$cvv = isset($_POST['cvv']) ? htmlspecialchars($_POST['cvv'], ENT_QUOTES, 'UTF-8') : '';
$productId = isset($_POST['productId']) ? intval($_POST['productId']) : 0;
$productTitle = isset($_POST['productTitle']) ? htmlspecialchars($_POST['productTitle'], ENT_QUOTES, 'UTF-8') : '';
$productPrice = isset($_POST['productPrice']) ? floatval($_POST['productPrice']) : 0.0;

// Database connection
$mysqli = new mysqli('localhost', 'root', '', 'nike_store');

if ($mysqli->connect_error) {
    echo 'Database connection failed: ' . $mysqli->connect_error;
    exit();
}

// Prepare and execute the SQL statement
$stmt = $mysqli->prepare("INSERT INTO orders (
    user_id,
    name,
    card_number,
    expiry_date,
    cvv,
    product_id,
    product_title,
    product_price
) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");

if ($stmt === false) {
    echo 'Failed to prepare SQL statement: ' . $mysqli->error;
    exit();
}

$stmt->bind_param(
    'issssdds',
    $_SESSION['user_id'],
    $name,
    $cardNumber,
    $expiryDate,
    $cvv,
    $productId,
    $productTitle,
    $productPrice
);

if ($stmt->execute()) {
    echo 'Payment Successful!';
} else {
    echo 'Failed to process payment: ' . $stmt->error;
}

$stmt->close();
$mysqli->close();
?>
