<?php

function contestContentTaskCodeFunc($post) {
	$json = array();
	
	$type = $post['type'];
	$number = $post['data']['number'];

	// -1 - Autherization Error
	if (validateAutherization()){
		switch ($type) {
		/*  Set Information 
			Exit Codes:
			0 - OK
			1 - contest Was Over */
		case 1:
			$resultArray = newQuery('code.users', ["USID" => $_COOKIE["USID"]], ["projection" => ["_id" => 1, "contest" => 1]]);
			$contestID = $resultArray[0]->contest;
			$userID = $resultArray[0]->_id;
			$resultArray = newQuery('code.contests', ["_id" => "$contestID"], ["projection" => ["_id" => 0, "tasks" => 1, "dates" => 1]]);
			$taskID = $resultArray[0]->tasks[$number];
			$packageID = bin2hex(random_bytes(10));
			$compiler = $post['data']['compiler'];

			if (time() < $resultArray[0]->dates->end) {
				$file = fopen("/www/packages/$packageID.py", "w");
				fwrite($file, $post['data']['solution']);
				newBulkInsert('code.packages', ["_id" => $packageID, "task" => $taskID, "user" => $userID, "contest" => $contestID, "date" => time(), "compiler" => "$compiler", "tests" => [], "compiled" => false]);
				newBulkUpdate('code.contests', ["_id" => $contestID], ['$push' => ["members.$userID.packages.$number" => "$packageID"]]);
			
				//Exit
				$json["exit"] = 0;
			} else {
				//Exit
				$json["exit"] = 1;
			}

			break;
		}
	} else {
		//Exit
		$json["exit"] = -1;
	}

	return $json;
}

?>