<?php

function checkSearch($lobbyID) {
	$manager = getMongoDBManager();
	$resultArray = newQuery('code.lobbies', ['_id' => "$lobbyID"], ["projection" => ["_id" => 0, "members" => 1]]);
	$memberID = $resultArray[0]->members[0];

	$resultArray = newQuery('code.lobbies', ['_id' => ['$ne' => "$lobbyID"], 'search.status' => 1], ["projection" => ["_id" => 1, "members" => 1]]);
	if (count($resultArray)) {
		$otherLobbyID = $resultArray[0]->_id;
		$otherMemberID = $resultArray[0]->members[0];

		$contestID = bin2hex(random_bytes(8));
		newBulkInsert('code.contests', 
		["_id" => "$contestID", 
		"status" => 0, 
		"members" => 
			["$memberID" => 
				["status" => 
					0,
				"team" => 
					0,
				"packages" => [
					[]
				]],
			"$otherMemberID" => 
				["status" => 
					0,
				"team" => 
					1,
				"packages" => [
					[]
				]]],
		"chat" => 
			["global" => 
				[], 
			"team" => 
				[]], 
		"tasks" => 
			["b8502474092c8e15426ae246"], 
		"compilers" => 
			["Python 3.8", "GNU C++ 17"],
		"dates" => 
			["confirm" => 
				time() + 30, 
			"start" =>
				time() + 60, 
			"end" => 
				time() + 3660]
		]);

		newBulkUpdate('code.lobbies', ['$or' => [["_id" => "$lobbyID"], ["_id" => "$otherLobbyID"]]], ['$set' => ["search.status" => 2, "search.contest" => "$contestID"]], ["multi" => 1]);

		sleep(30);

		$resultArray = newQuery('code.contests', ['_id' => "$contestID"], ["projection" => ["_id" => 0, "status" => 1, "members" => 1]]);
		$members = $resultArray[0]->members;
		if ($resultArray[0]->status == 0) {
			foreach ($members as $memberID => $memberValue) {
				$resultArray =  newQuery('code.users', ['_id' => "$memberID"], ["projection" => ["_id" => 0, "lobby" => 1]]);
				$lobbyID = $resultArray[0]->lobby;
				newBulkUpdate('code.lobbies', ["_id" => "$lobbyID"], ['$set' => ["search.status" => 1, "search.contest" => null]]);
			}
			newBulkDelete('code.contests', ['_id' => "$contestID"]);
		} else {
			foreach ($members as $memberID => $memberValue) {
				newBulkUpdate('code.users', ["_id" => "$memberID"], ['$set' => ["contest" => $contestID]]);
			}
		}
	}
}

?>