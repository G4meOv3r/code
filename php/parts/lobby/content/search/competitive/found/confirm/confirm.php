<?php
function lobbyContentSearchCompetitiveFoundConfirmFunc ($post) {
	$json = array();
	$manager = getMongoDBManager();

	$type = $post['type'];

	// -1 - Autherization Error
	if (validateAutherization()){
		switch ($type) {
			/*  Set Information 
				Exit Codes:
				0 - OK */
			case 1:
				$resultArray = newQuery('code.users', ["USID" => $_COOKIE["USID"]], ["projection" => ["_id" => 1, "lobby" => 1]]);
				$userID = $resultArray[0]->_id;
				$lobbyID = $resultArray[0]->lobby;

				$resultArray = newQuery('code.lobbies', ["_id" => "$lobbyID"], ["projection" => ["_id" => 0, "search.contest" => 1]]);
				$contestID = $resultArray[0]->search->contest;

				$resultArray = newQuery('code.contests', ["_id" => "$contestID"], ["projection" => ["_id" => 0, "members" => 1]]);
				$contestReady = true;
				foreach ($resultArray[0]->members as $memberID => $memberValue) {
					if ($memberID == $userID) {
						if ($memberValue->status == 0) {
							newBulkUpdate('code.contests', ["_id" => "$contestID"], ['$set' => ["members.$userID.status" => 1]]);
						}
					} else {
						if ($memberValue->status == 0) {
							$contestReady = false;
						}
					}
				}

				if ($contestReady) {
					newBulkUpdate('code.contests', ["_id" => "$contestID"], ['$set' => ["status" => 1, "dates.start" => time() + 30, "dates.end" => time() + 3630]]);
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