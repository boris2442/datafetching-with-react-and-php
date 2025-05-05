<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");

// Connexion à la base de données
require_once '../database/database.php';

// Récupération des données envoyées
$data = json_decode(file_get_contents("php://input"), true);

$nom = $data['nom'] ?? '';
$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

if ($nom && $email && $password) {
    $password_hash = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $pdo->prepare("INSERT INTO users (nom, email, password) VALUES (?, ?, ?)");
    if ($stmt->execute([$nom, $email, $password_hash])) {
        echo json_encode(['success' => true, 'message' => 'Inscription réussie !']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Erreur lors de l\'insertion']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Champs manquants']);
}
