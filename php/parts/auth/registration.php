<?php

function authRegistrationFunc ($post) {
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

		/*  Registration
			Exit Codes:
			0 - OK 
			1 - Email Is Incorrect
			2 - Password Mismatch 
			3 - Easy Password 
			4 - Email Is Already Exist */
		case 1:
			$userID = bin2hex(random_bytes(8));
			$userUSID = bin2hex(random_bytes(16));
			$userEmail = strtolower($post['data']['email']);
			$userPassword = $post['data']['password'];
			$userRemember = $post['data']['remember'];

			if (validateEmail($userEmail)){
				if ($post['data']['password'] == $post['data']['confirmpassword']) {
					if (validatePassword($userPassword)) {
						$resultArray = newQuery('code.users', ['email' => $userEmail]);

						if (count($resultArray) == 0) {
							newBulkInsert('code.users', ['_id' => "$userID", 'USID' => "$userUSID", 'email' => "$userEmail", 'name' => "$userEmail", 'password' => "$userPassword", 'date' => date('Y-m-d H:m:s'), 'rank' => 100, 'lobby' => "$userID"]);
							if ($userRemember) {
								setcookie("USID", $userUSID, time() + (1000 * 60 * 60 * 24 * 30), "/");
							} else {
								setcookie("USID", $userUSID, null, "/");
							}
					
							// Exit
							$json['exit'] = 0;
						} else {

							// Exit
							$json['exit'] = 1;
						}
					} else {

						// Exit
						$json['exit'] = 2;
					}
				} else {

					// Exit
					$json['exit'] = 3;
				}
			} else {

				// Exit
				$json['exit'] = 4;
			}

			break;
	}

	return $json;

}

?>