<?php
	if($_GET['action'] == "get") {
		print file_get_contents("list.json");
	}
	else if($_GET['action'] == "save") {
		file_put_contents("list.json", file_get_contents('php://input'));
		print file_get_contents('php://input');
	}
?>
