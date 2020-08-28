<?php

function lobbyContentSearchCompetitiveStartFunc ($post) {
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
					$json["data"]["permission"] = true;
				} else {
					//Client
					$json["data"]["permission"] = false;
				}

				$resultArray = newQuery('code.lobbies', ["_id" => $lobbyID], ["projection" => ["_id" => 0, "search.status" => 1, "search.options" => 1]]);
				$json["data"]["status"] = $resultArray[0]->search->status;
				$disabled = true;
				foreach ($resultArray[0]->search->options as $option) {
					if ($option) {
						$disabled = false;
					}
				}
				$json["data"]["disabled"] = $disabled;

				//Exit
				$json["exit"] = 0;
				break;

			/*  Set Information 
				Exit Codes:
				0 - OK 
				1 - Error
				2 - Not Host*/
			case 1:
				$resultArray = newQuery('code.users', ["USID" => $_COOKIE['USID']], ["projection" => ["_id" => 1, "lobby" => 1]]);

				$userID = $resultArray[0]->_id;
				$lobbyID = $resultArray[0]->lobby;

				if ($userID == $lobbyID) {
					$resultArray = newQuery('code.lobbies', ["_id" => $lobbyID], ["projection" => ["search.status" => 1, "search.options" => 1]]);
					if ($resultArray[0]->search->status == 0 && in_array(true, $resultArray[0]->search->options)) {
						newBulkUpdate('code.lobbies', ["_id" => $lobbyID], ['$set' => ["search.status" => 1, "search.date" => time()]]);
						checkSearch($lobbyID);
						//Exit
						$json["exit"] = 0;
					} else {
						//Exit
						$json["exit"] = 1;
					}
				} else {
					//Exit
					$json["exit"] = 2;
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