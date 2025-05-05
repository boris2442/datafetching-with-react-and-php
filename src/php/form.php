<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

// Connexion à la base de données
require_once '../database/database.php';

// Récupération des données envoyées
$data = json_decode(file_get_contents("php://input"), true);

// echo json_encode($data);
$nom = $data['nom'] ?? '';
$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

if ($nom && $email && $password) {

    $password_hash = password_hash($password, PASSWORD_DEFAULT);
    $stmt =   $conn->prepare("INSERT INTO users2react (nom, email, password) VALUES (?, ?, ?)");
   
    if ($stmt->execute([$nom, $email, $password_hash])) {
        echo json_encode(['success' => true, 'message' => 'Inscription réussie !']);
    } else {
     
        echo json_encode(['success' => false, 'message' => 'Erreur lors de l\'insertion']);

    }
} else {
 
    echo json_encode([
        'success' => true,
        'results' => 't'
    ]);
}

