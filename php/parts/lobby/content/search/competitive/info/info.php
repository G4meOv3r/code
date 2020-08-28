<?php
function lobbyContentSearchCompetitiveInfoFunc ($post) {
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
					$json["data"]["permission"] = 1;
				} else {
					//Client
					$json["data"]["permission"] = 0;
				}

				$resultArray = newQuery('code.lobbies', ["_id" => $lobbyID], ["projection" => ["_id" => 0, "search.status" => 1, "search.date" => 1]]);
				$json["data"]["status"] = $resultArray[0]->search->status;
				$json["data"]["timer"] = time() - $resultArray[0]->search->date;
				//Exit
				$json["data"]["searchers"] = 123;
				$json["data"]["duration"] = 12;
				$json["exit"] = 0;
				break;
			/*  Set Information 
				Exit Codes:
				0 - OK */
			case 1:
				$resultArray = newQuery('code.users', ["USID" => $_COOKIE['USID']], ["projection" => ["_id" => 1, "lobby" => 1]]);

				$userID = $resultArray[0]->_id;
				$lobbyID = $resultArray[0]->lobby;

				if ($userID == $lobbyID) {
					$resultArray = newQuery('code.lobbies', ["_id" => $lobbyID], ["projection" => ["search.status" => 1]]);
					if ($resultArray[0]->search->status == 1) {
						newBulkUpdate('code.lobbies', ["_id" => $lobbyID], ['$set' => ["search.status" => 0, "search.date" => null]]);
					}
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