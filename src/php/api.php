<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

require_once '../database/database.php';

try {
    // Requête pour récupérer les articles
    $query = "SELECT * FROM articles ORDER BY id DESC";
    $stmt = $conn->prepare($query);
    $stmt->execute();
    
    // Récupérer les résultats
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    // die;
    // Retourner les données en JSON
    echo json_encode([
        'success' => true,
        'results' => $results
    ]);
    
} catch (PDOException $e) {
    // En cas d'erreur, retourner un message d'erreur
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Erreur de base de données',
        'error' => $e->getMessage()
    ]);
}
?>