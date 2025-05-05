
<?php
$host = 'localhost';
$dbname = 'blogphp-2025.sql';
$username = 'aubin';
$password = 'aubin';

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $conn->exec("SET NAMES 'utf8'");
} catch(PDOException $e) {
    die("Erreur de connexion : " . $e->getMessage());
}
?>