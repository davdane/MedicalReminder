<?php
include_once 'config/cors.php';
include_once 'config/dbh.php';
//include_once 'auth.php';
include_once '../vendor/autoload.php';
use \Firebase\JWT\JWT;


$authHeader = getallheaders();
if (isset($authHeader['Authorization']) && $_SERVER['REQUEST_METHOD'] === 'GET') {
    $token = $authHeader['Authorization'];
    $token = explode(" ", $token)[1];
    $tokenArray = get_object_vars(json_decode(base64_decode(str_replace('', '/', str_replace('-','+',explode('.', $token)[1])))));

    $sql = $conn->query("SELECT * FROM profiles WHERE id_user='$tokenArray[user_id] '"); // return profiles of the logged user
    while ($row = $sql->fetch_assoc()) {
        $data[] = $row;
    }
 
exit(json_encode($data));
}


if (isset($authHeader['Authorization']) && $_SERVER['REQUEST_METHOD'] === 'POST') { //insert a new profile in the DB
    $data = json_decode(file_get_contents("php://input"));
    $token = $authHeader['Authorization'];
    $token = explode(" ", $token)[1];
    $tokenArray = get_object_vars(json_decode(base64_decode(str_replace('', '/', str_replace('-','+',explode('.', $token)[1])))));

    $sql = $conn->query("INSERT INTO profiles (id_user, nome, cognome, altezza, peso, age) 
    VALUES ('$tokenArray[user_id]','".$data->nome."','".$data->cognome."','".$data->altezza."','".$data->peso."','".$data->age."')");
    if ($sql) {
        $data->id=$conn->insert_id;
        exit (json_encode($data));
    }
    else {
        exit (json_encode(array('status'=>'error')));
    }
}

if (isset($authHeader['Authorization']) && $_SERVER['REQUEST_METHOD'] === 'PUT') { //update the selected profile
    $data = json_decode(file_get_contents("php://input"));
    $token = $authHeader['Authorization'];
    $token = explode(" ", $token)[1];
    $tokenArray = get_object_vars(json_decode(base64_decode(str_replace('', '/', str_replace('-','+',explode('.', $token)[1])))));
    if (isset($_GET['id'])) {
        $id = $conn->real_escape_string($_GET['id']);

        $sql = $conn->query(
            "UPDATE profiles SET id_user = '$tokenArray[user_id]', nome = '".$data->nome."', cognome = '".$data->cognome."', 
            altezza = '".$data->altezza."', peso = '".$data->peso."', age = '".$data->age."' WHERE id_profiles = '$id'");
        if ($sql) {
            exit (json_encode(array('status' => 'success')));
        } else {
            exit (json_encode(array('status' => 'error')));
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') { // delete the selected profile and its related appointments
    
    if (isset($_GET['id'])) {
        $id = $conn->real_escape_string($_GET['id']);
        $sql = $conn->query("DELETE FROM profiles WHERE id_profiles='$id'");

        if ($sql) {
            exit (json_encode(array('status' => 'success')));
        } else {
            exit (json_encode(array('status' => 'error')));
        }
    }
}