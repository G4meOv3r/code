<?php

function contestContentTaskHistoryFunc($post) {
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
			$resultArray = newQuery('code.users', ["USID" => $_COOKIE["USID"]], ["projection" => ["_id" => 1, "contest" => 1]]);
			$userID = $resultArray[0]->_id;
			$contestID = $resultArray[0]->contest;
			$packages = array();
			if ($contestID) {
				$resultArray = newQuery('code.contests', ["_id" => "$contestID"], ["projection" => ["members" => 1]]);
				$packageIDs = $resultArray[0]->members->$userID->packages[$number];
				foreach ($packageIDs as $packageID) {
					$resultArray = newQuery('code.packages', ["_id" => "$packageID"], ["projection" => ["_id" => 1, "date" => 1, "compiler" => 1, "tests" => 1, "compiled" => 1]]);
					if ($resultArray[0]->compiled) {
						$packageResult = 0;
						foreach ($resultArray[0]->tests as $test) {
							if ($test == "OK") {
								$packageResult += 5;
							}
						}
					} else {
						$packageResult = "Ожидает компиляции";
					}
					array_push($packages, ["id" => $resultArray[0]->_id, "date" => date("Y-m-d H:i:s", $resultArray[0]->date), "compiler" => $resultArray[0]->compiler, "result" => $packageResult]);
				}
			}

			//Exit
			$json["data"]["packages"] = $packages;
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