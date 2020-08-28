<?php

function contestContentTaskCodeCompilerFunc($post) {
	$json = array();
	
	$type = $post['type'];

	// -1 - Autherization Error
	if (validateAutherization()){
		switch ($type) {
		/*  Get Information 
			Exit Codes:
			0 - OK*/
		case 0:
			$resultArray = newQuery('code.users', ["USID" => $_COOKIE["USID"]], ["projection" => ["_id" => 0, "contest" => 1]]);
			$contestID = $resultArray[0]->contest;
			$resultArray = newQuery('code.contests', ["_id" => "$contestID"], ["projection" => ["_id" => 0, "compilers" => 1]]);

			//Exit
			$json["data"]["compilers"] = $resultArray[0]->compilers;
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