<?php

function contestStatusTimerFunc($post) {
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
				$resultArray = newQuery('code.contests', ["_id" => "$contestID"], ["projection" => ["dates" => 1]]);
				if (time() < $resultArray[0]->dates->start) {
					$timer = $resultArray[0]->dates->start - time();
				} else {
					if (time() < $resultArray[0]->dates->end) {
						$timer = $resultArray[0]->dates->end - time();
					} else {
						$timer = 0;
					}
				}
			}

			//Exit
			$json["data"]["timer"] = $timer;
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