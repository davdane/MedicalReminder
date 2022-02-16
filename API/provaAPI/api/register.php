<?php
include_once 'config/dbh.php';
include_once 'config/cors.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    $email = $data->email;
    $pass = $data->password;

    // Hash Password
    $hashed = password_hash($pass, PASSWORD_DEFAULT);

    $query = $conn->query("SELECT * FROM user WHERE email='$email'"); //verify if the email is already registered

    if (!$query)
    {
        die('Error: ' . mysqli_error($conn));
    }

if(mysqli_num_rows($query) > 0){

    echo "email already exists";

}else{
    $sql = $conn->query("INSERT INTO user (email, password) VALUES ('$email', '$hashed')");
    if ($sql) {
        http_response_code(201);
        echo json_encode(array('message' => 'User created'));
        } else {
        http_response_code(500);
        echo json_encode(array('message' => 'Internal Server error'));
        }

    }

}


