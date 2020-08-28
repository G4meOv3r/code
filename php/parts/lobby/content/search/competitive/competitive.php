<?php

function lobbyContentSearchCompetitiveFunc ($post) {
	$json = array();
	$manager = getMongoDBManager();

	$type = $post['type'];

	// -1 - Autherization Error
	if (validateAutherization()){
		switch ($type) {
		/*  Get Information 
			Exit Codes:
			0 - OK */
		case 0:
			$resultArray = newQuery('code.users', ["USID" => $_COOKIE['USID']], ["projection" => ["_id" => 1, "lobby" => 1]]);

			$userID = $resultArray[0]->_id;
			$lobbyID = $resultArray[0]->lobby;

			if ($userID == $lobbyID) {
				//Host
				$json["type"] = 1;
			} else {
				//Client
				$json["type"] = 0;
			}

			$resultArray = newQuery('code.lobbies', ["_id" => $lobbyID], ["projection" => ["_id" => 0, "members" => 1, "search.status" => 1, "search.options" => 1, "search.date" => 1]]);
			if ($resultArray[0]->search->status) {
				$json["data"]["timer"] = time() - $resultArray[0]->search->date;
			}

			$json["data"]["disabled"] = [false, false, false, false, false];
			for ($i = 0; $i < count($resultArray[0]->members) - 1; $i++) {
				$json["data"]["disabled"][$i] = true;
			}

			//Exit
			$json["data"]["searchers"] = 123;
			$json["data"]["duration"] = 12;
			$json["data"]["durations"] = [12, 564, 76, 235, 33];
			$json["data"]["status"] = $resultArray[0]->search->status;
			$json["data"]["options"] = $resultArray[0]->search->options;
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