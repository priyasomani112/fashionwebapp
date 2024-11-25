<?php
// Database credentials
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "fashionwebsite";

// Create a new MySQLi instance
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Function to validate the password
function validatePassword($password) {
    return strlen($password) == 8 && preg_match('/^[A-Z]/', $password) && preg_match('/[!@#$%^&*(),.?":{}|<>]/', $password);
}

// Check if the registration form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $username = $_POST["name"];
    $password = $_POST["password"];
    $email = $_POST["email"];

    // Validate the password
    if (validatePassword($password)) {
        // Password is valid, prepare the SQL statement
        $stmt = $conn->prepare("INSERT INTO login (username, password, email) VALUES (?, ?, ?)");

        // Bind parameters and execute the statement
        $stmt->bind_param("sss", $username, $password, $email);

        if ($stmt->execute()) {
            // Registration completed
            echo "<script>alert('Login Successful!'); window.location.href='login.php';</script>";
            exit;
        } else {
            // An error occurred while storing credentials
            echo "<script>alert('Error: " . $stmt->error . "');</script>";
        }

        // Close the statement
        $stmt->close();
    } else {
        // Password is not valid
        echo "<script>
            document.getElementById('errorMessage').innerText = 'Password must be exactly 8 characters long, start with an uppercase letter, and contain at least one special character.';
            </script>";
    }
}

// Close the database connection
$conn->close();
?>