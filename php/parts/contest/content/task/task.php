<?php

function contestContentTaskFunc($post) {
	$json = array();
	
	$type = $post['type'];

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
				$resultArray = newQuery('code.contests', ["_id" => "$contestID"], ["projection" => ["tasks" => 1, "dates" => 1]]);
				$json["data"]["count"] = count($resultArray[0]->tasks);
				if (time() < $resultArray[0]->dates->end) {
					$json["data"]["progress"] = 1;
				} else {
					$json["data"]["progress"] = 0;
				}
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