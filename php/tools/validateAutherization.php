<?php

function validateAutherization() {
	if (isset($_COOKIE["USID"])) {
		$USID = $_COOKIE["USID"];
		$manager = getMongoDBManager();

		$resultArray = newQuery('code.users', ['USID' => $USID]);

		if (count($resultArray) > 0) {
			return true;
		} else {
			return false;
		}

	} else {
		return false;
	}
}

?>