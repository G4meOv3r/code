<?php
function lobbyContentSearchCompetitiveFoundFunc ($post) {
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
				$resultArray = newQuery('code.users', ["USID" => $_COOKIE["USID"]], ["projection" => ["_id" => 1, "lobby" => 1]]);
				$userID = $resultArray[0]->_id;
				$lobbyID = $resultArray[0]->lobby;

				$resultArray = newQuery('code.lobbies', ["_id" => "$lobbyID"], ["projection" => ["_id" => 0, "search.status" => 1, "search.contest" => 1]]);
				$lobbyStatus = $resultArray[0]->search->status;

				if ($lobbyStatus == 2) {
					$contestID = $resultArray[0]->search->contest;
					$resultArray = newQuery('code.contests', ["_id" => "$contestID"], ["projection" => ["_id" => 0, "status" => 1, "members" => 1, "dates.confirm" => 1]]);
					$json["data"]["contestStatus"] = $resultArray[0]->status;
					foreach ($resultArray[0]->members as $memberID => $memberValue) {
						if ($memberID == $userID) {
							$json["data"]["selfStatus"] = $memberValue->status;
						}
					}
					$json["data"]["remaining"] = $resultArray[0]->dates->confirm - time();
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