<?php
include_once 'config/dbh.php';
include_once '../vendor/autoload.php';

use \Firebase\JWT\JWT;

include_once 'config/cors.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input"));

	 $email = $data->email;
     $pass = $data->password;

    $sql = $conn->query("SELECT * FROM user WHERE Email = '$email'");
    if ($sql->num_rows > 0) {
        $user = $sql->fetch_assoc();
        if (password_verify($pass, $user['password'])) {
            $key = "YOUR_SECRET_KEY";  // JWT KEY 
            $payload = array(
			    'user_id' => $user['id'],
                'email' => $user['email']
            );

            $token = JWT::encode($payload, $key); // token assign after successful login
            http_response_code(200);
            echo json_encode(array('token' => $token));
        } else {
            http_response_code(400);
            echo json_encode(array('message' => 'Wrong email and/or password!'));
        }
    } else {
        http_response_code(400);
        echo json_encode(array('message' => 'Wrong email and/or password!'));
    }
}
