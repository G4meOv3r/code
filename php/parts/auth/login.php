<?php

function authLoginFunc ($post) {
	$json = array();
	$manager = getMongoDBManager();

	$type = $post['type'];

	switch ($type) {
		/*  Get Information
			Exit Codes:
			0 - OK */
		case 0:
			if (isset($_COOKIE["USIDs"])){
				$USIDs = unserialize($_COOKIE["USIDs"]);
				
				//Exit
				$json["data"]["rememberCount"] = count($USIDs);
			} else {

				//Exit
				$json["data"]["rememberCount"] = 0;
			}
			break;
			
		/*  Login
			Exit Codes:
			0 - OK 
			1 - Email Is Incorrect
			2 - Not Found */
		case 1:
			$userEmail = $post['data']['email'];
			$userPassword = $post['data']['password'];
			$userRemember = $post['data']['remember'];

			if (validateEmail($userEmail)) {
				$resultArray = newQuery('code.users', ['email' => $userEmail, 'password' => $userPassword],  ['_id' => 1, 'USID' => 1]);

				if (count($resultArray) != 0) {
					if ($userRemember) {
						setcookie("USID", $resultArray[0]->USID, time() + (1000 * 60 * 60 * 24 * 30), "/");

						$USIDs = array();
						if (isset($_COOKIE["USIDs"])) {
							$USIDs = unserialize($_COOKIE["USIDs"]);
						}

						$USIDs[$resultArray[0]->_id] = $resultArray[0]->USID;
						setcookie("USIDs", serialize($USIDs), time() + (1000 * 60 * 60 * 24 * 30), "/");

					} else {
						setcookie("USID", $resultArray[0]->USID, null, "/");
					}

					//Exit
					$json['exit'] = 0;
				} else {

					//Exit
					$json['exit'] = 1;
				}
			} else {

				//Exit
				$json['exit'] = 2;
			}

			break;
	}

	return $json;
}

?>