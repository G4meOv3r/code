<?php
function lobbyContentSearchCompetitiveFoundInfoFunc ($post) {
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

				$resultArray = newQuery('code.lobbies', ["_id" => "$lobbyID"], ["projection" => ["_id" => 0, "search.contest" => 1]]);
				$contestID = $resultArray[0]->search->contest;

				$resultArray = newQuery('code.contests', ["_id" => "$contestID"], ["projection" => ["_id" => 0, "members" => 1]]);
				$confirmCount = 0;
				$membersCount = 0;
				if (count($resultArray)) {
					foreach ($resultArray[0]->members as $member) {
						if ($member->status == 1) {
							$confirmCount++;
						}
						$membersCount++;
					}
				}

				//Exit
				$json["exit"] = 0;
				$json["data"]["confirmedCount"] = $confirmCount;
				$json["data"]["membersCount"] = $membersCount;
				break;
		}
	} else {
		//Exit
		$json["exit"] = -1;
	}

	return $json;
}
?>