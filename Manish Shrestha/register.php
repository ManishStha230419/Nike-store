<?php
$servername = "localhost";
$username = "root";
$password = ""; // Default password for MySQL root user in XAMPP is empty
$dbname = "nike_store";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get form data
$name = $_POST['name'];
$email = $_POST['email'];
$password = password_hash($_POST['password'], PASSWORD_BCRYPT); // Hash the password for security

// Insert into database
$sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $name, $email, $password);

if ($stmt->execute()) {
    $stmt->close();
    $conn->close();
    header("Location: index.html");
    exit();
} else {
    echo "Error: " . $stmt->error;
}

$conn->close();
?>
