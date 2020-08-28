<?php

function lobbyFunc($post) {
	$json = array();
	$manager = getMongoDBManager();

	$type = $post['type'];

	// -1 - Autherization Error
	if (validateAutherization()){
		switch ($type) {
		/*  Get Information 
			Exit Codes:
			0 - OK*/
		case 0:
			$resultArray = newQuery('code.users', ["USID" => $_COOKIE["USID"]], ["projection" => ["_id" => 1, "lobby" => 1]]);

			$userID = $resultArray[0]->_id;
			$lobbyID = $resultArray[0]->lobby;

			if ($userID == $lobbyID) {
				//Host
				$json["type"] = 0;
			} else {
				//Client
				$json["type"] = 1;
			}

			$resultArray = newQuery('code.lobbies', ["_id" => "$lobbyID"]);
			if (count($resultArray) == 0 && $userID == $lobbyID) {
				newBulkInsert('code.lobbies', ["_id" => "$lobbyID", "privacy" => 1, "members" => [ "$lobbyID" ], "search" => ["status" => 0, "options" => [false, false, false, false, false], "date" => null, "contest" => null]]);
			}

			$members = [];
			$resultArray = newQuery('code.lobbies', ["_id" => "$lobbyID"], ["projection" => ["_id" => 0, "members" => 1, "privacy" => 1, "search.options" => 1]]);
			foreach ($resultArray[0]->members as $memberID) {
				$userArray = newQuery('code.users', ["_id" => "$memberID"], ["projection" => ["_id" => 0, "name" => 1, "rank" => 1]]);
				array_push($members, ["strId" => $memberID, "strName" => $userArray[0]->name, "strAvatar" => "", "numRank" => $userArray[0]->rank]);
			}

			//Exit
			$json["data"]["members"] = $members;
			$json["data"]["privacy"] = $resultArray[0]->privacy;
			$json["exit"] = 0;

			break;

		/*  Change Lobby 
			Exit Codes:
			0 - OK */
		case 1: 
			$lobbyPrivacy = $post["data"]["privacy"];

			$resultArray = newQuery('code.users', ["USID" => $_COOKIE["USID"]]);
			$lobbyID = $resultArray[0]->_id;
			
			newBulkUpdate('code.lobbies', ["_id" => "$lobbyID"], ['$set' => ["privacy" => $lobbyPrivacy]]);

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