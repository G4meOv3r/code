<?php
function lobbyContentSearchCompetitiveCardFunc ($post) {
	$json = array();
	$manager = getMongoDBManager();
	
	$type = $post['type'];
	$number = $post["data"]["number"];
	$json["data"]["number"] = $number;

	// -1 - Autherization Error
	if (validateAutherization()){
		switch ($type) {
			/*  Get Information 
				Exit Codes:
				0 - OK */
			case 0:
				$resultArray = newQuery('code.users', ["USID" => $_COOKIE["USID"]], ["projection" => ["_id" => 1, "lobby" => 1]]);
				$userID = $resultArray[0]->_id;
				$lobbyID = $resultArray[0]->lobby;

				if ($userID == $lobbyID) {
					$json["data"]["permission"] = true;
				} else {
					$json["data"]["permission"] = false;
				}

				$resultArray = newQuery('code.lobbies', ["_id" => "$lobbyID"], ["projection" => ["_id" => 0, "members" => 1, "search.options" => 1]]);
				$checked = $resultArray[0]->search->options[$number - 1];
				$disabled = false;
				if ($number < count($resultArray[0]->members)) {
					$disabled = true;
				}

				//Exit
				$json["data"]["checked"] = $checked;
				$json["data"]["disabled"] = $disabled;
				$json["data"]["duration"] = 100;
				$json["exit"] = 0;
				break;

			/*  Set Information 
				Exit Codes:
				0 - OK 
				1 - Permission Error */
			case 1:
				if ($post["data"]["value"] == "true") {
					$post["data"]["value"] = true;
				} else {
					$post["data"]["value"] = false;
				}
				$optionNumber = $number - 1;
				$optionValue = $post["data"]["value"];

				$resultArray = newQuery('code.users', ["USID" => $_COOKIE['USID']], ["projection" => ["_id" => 1, "lobby" => 1]]);

				$userID = $resultArray[0]->_id;
				$lobbyID = $resultArray[0]->lobby;
				if ($userID == $lobbyID) {
					newBulkUpdate('code.lobbies', ["_id" => "$lobbyID"], ['$set' => ["search.options.$optionNumber" => $optionValue]]);
					$resultArray = newQuery('code.lobbies', ["_id" => "$lobbyID"], ["projection" => ["_id" => 0, "search.status" => 1, "search.options" => 1]]);
					$options = $resultArray[0]->search->options;
					$status = $resultArray[0]->search->status;
					if (!in_array(true, $options)) {
						newBulkUpdate('code.lobbies', ["_id" => $lobbyID], ['$set' => ["search.status" => 0, "search.date" => null]]);
					} else {	
						if ($status == 1) {
							checkSearch($lobbyID);
						}
					}
					//Exit
					$json["exit"] = 0;
				} else {
					//exit
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