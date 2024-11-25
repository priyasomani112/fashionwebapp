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

// Check if the registration form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $username = $_POST["username"];
    $password = $_POST["password"];
    $email = $_POST["email"];
    $city = $_POST["city"];
    $number = $_POST["number"];
    

    // Validate phone number server-side
    if (!preg_match('/^\d{10}$/', $number)) {
        echo "<script>alert('Invalid phone number. Please enter a 10-digit phone number.'); window.location.href = 'registration.php';</script>";
    } else {
        // Prepare the SQL statement
        $stmt = $conn->prepare("INSERT INTO registration1 (username, password, email, city, number) VALUES (?, ?, ?, ?, ?)");

        // Bind parameters and execute the statement
        $stmt->bind_param("sssss", $username, $password, $email, $city, $number);

        if ($stmt->execute()) {
            // Registration completed
            echo "<script>alert('Registration Successful!'); window.location.href = 'registration.php';</script>";
            exit;
        } else {
            // An error occurred while storing credentials
            echo "Error: " . $stmt->error;
        }

        // Close the statement
        $stmt->close();
    }
}

// Close the database connection
$conn->close();
?>