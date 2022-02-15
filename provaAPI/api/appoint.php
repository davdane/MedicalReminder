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

    $sql = $conn->query("SELECT * FROM profiles WHERE id_user='$tokenArray[user_id] ' "); // get the profiles of the logged user
    while ($row = $sql->fetch_assoc()) {
        $data[] = $row;
    }
    for ($i=0; $i<sizeof($data); $i++){ //cicle to get each appointment of each profile
        
        $simple_array = array();

        foreach($data as $d)
            {
            $simple_array[]=$d['id_profiles'];
        }
        $sql = $conn->query("SELECT * FROM appointments WHERE id_profiles='$simple_array[$i]' ORDER BY date ASC"); // get the appointments of the selected profile
        
        while ($row = $sql->fetch_assoc()) {
            $appog[] = $row;
        }
        
    }
 
exit(json_encode($appog));
}


if ($_SERVER['REQUEST_METHOD'] === 'POST') { //add a new appointment
    $data = json_decode(file_get_contents("php://input"));
    
    $sql = $conn->query("INSERT INTO appointments (titolo, descrizione, luogo, date, id_profiles) 
    VALUES ('".$data->title."','".$data->desc."','".$data->place."','".$data->date."','".$data->id_profiles."')");
    if ($sql) {
        $data->id=$conn->insert_id;
        exit (json_encode($data));
    }
    else {
        exit (json_encode(array('status'=>'error')));
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'PUT') { //update the selected appointment
    $data = json_decode(file_get_contents("php://input"));
    
    if (isset($_GET['id'])) {
        $id = $conn->real_escape_string($_GET['id']);

        $sql = $conn->query(
            "UPDATE appointments SET titolo = '".$data->title."', descrizione = '".$data->desc."', 
            luogo = '".$data->place."', date = '".$data->date."', id_profiles = '".$data->id_profiles."' WHERE id_appoint = '$id'");
        if ($sql) {
            exit (json_encode(array('status' => 'success')));
        } else {
            exit (json_encode(array('status' => 'error')));
        }
    }
}


if ($_SERVER['REQUEST_METHOD'] === 'DELETE') { //delete the selected appointment
    if (isset($_GET['id'])) {
        $id = $conn->real_escape_string($_GET['id']);
        $sql = $conn->query("DELETE FROM appointments WHERE id_appoint='$id'");

        if ($sql) {
            exit (json_encode(array('status' => 'success')));
        } else {
            exit (json_encode(array('status' => 'error')));
        }
    }
}