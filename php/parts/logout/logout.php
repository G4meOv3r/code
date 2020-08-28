<?php

function logoutFunc ($post) {
	$json = array();
	$type = $post["type"];

	switch ($type) {
	/*  Get Information
		Exit Codes:
	    -1 - Authorization Error
		0 - OK */
	case 0:
		if (validateAutherization()) {
			$manager = getMongoDBManager();

			newQuery('code.users', ['USID' => $_COOKIE["USID"]], ['projection' => ['_id' => 0, 'email' => 1]]);

			$resultArray = newQuery('code.users', ['USID' => $_COOKIE["USID"]], ['projection' => ['_id' => 0, 'email' => 1]]);

			if (isset($_COOKIE["USIDs"])){
				$USIDs = unserialize($_COOKIE["USIDs"]);
				$json["data"]["rememberCount"] = count($USIDs);
			} else {
				$json["data"]["rememberCount"] = 0;
			}

			//Exit
			$json["data"]["email"] = $resultArray[0]->email;
			$json["exit"] = 0;
		} else {

			//Exit
			$json["exit"] = -1;
		}
		break;

	/*  Logout
		Exit Codes:
		0 - OK */
	case 1:
		if (isset($_COOKIE["USIDs"])) {
			$USID = $_COOKIE["USID"];
			$USIDs = unserialize($_COOKIE["USIDs"]);
			foreach ($USIDs as $_id => $_idUSID) {
				if ($USID == $_idUSID) {
					$USIDs[$_id] = null;
				}
			}
			setcookie("USIDs", serialize($USIDs), time() + (1000 * 60 * 60 * 24 * 30), "/");
		}

		unset($_COOKIE["USID"]);
		setcookie("USID", null, -1, '/');

		//Exit
		$json["exit"] = 0;
		break;
	}

	return ($json);
}

?>