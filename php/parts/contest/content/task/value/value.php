<?php

function contestContentTaskValueFunc($post) {
	$json = array();
	
	$type = $post['type'];
	$number = $post['data']['number'];

	// -1 - Autherization Error
	if (validateAutherization()){
		switch ($type) {
		/*  Get Information 
			Exit Codes:
			0 - OK*/
		case 0:
			$resultArray = newQuery('code.users', ["USID" => $_COOKIE["USID"]], ["projection" => ["contest" => 1]]);
			$contestID = $resultArray[0]->contest;
			if ($contestID) {
				$resultArray = newQuery('code.contests', ["_id" => "$contestID"], ["projection" => ["tasks" => 1]]);
				$taskID = $resultArray[0]->tasks[$number];
				$file = fopen("/www/tasks/$taskID/$taskID", 'r');
				$fileSize = filesize("/www/tasks/$taskID/$taskID");
				$json["data"]["value"] = fread($file, $fileSize);
			}

			//Exit
			$json["exit"] = 0;

			break;
		}
	} else {
		//Exit
		$json["exit"] = -1;
	}

	return $json;
}

?>