<?php

include "tools/mongodb.php";
include "tools/validateEmail.php";
include "tools/validatePassword.php";
include "tools/validateAutherization.php";
include "tools/checkSearch.php";

include "parts/auth/login.php";
include "parts/auth/registration.php";

include "parts/logout/logout.php";

include "parts/lobby/lobby.php";
include "parts/lobby/content/search/competitive/competitive.php";
include "parts/lobby/content/search/competitive/card/card.php";
include "parts/lobby/content/search/competitive/found/found.php";
include "parts/lobby/content/search/competitive/found/confirm/confirm.php";
include "parts/lobby/content/search/competitive/found/info/info.php";
include "parts/lobby/content/search/competitive/info/info.php";
include "parts/lobby/content/search/competitive/start/start.php";

include "parts/contest/status/timer/timer.php";
include "parts/contest/status/status.php";
include "parts/contest/content/task/value/value.php";
include "parts/contest/content/task/code/code.php";
include "parts/contest/content/task/code/compiler/compiler.php";
include "parts/contest/content/task/history/history.php";
include "parts/contest/content/task/task.php";

include "parts/contest/contest.php";

if (!$_POST["component"]) {
	print_r($_POST);
}
switch ($_POST["component"]) {

	case "authLogin":
		$json = authLoginFunc($_POST);
		break;

	case "authRegistration":
		$json = authRegistrationFunc($_POST);
		break;

	case "logout":
		$json = logoutFunc($_POST);
		break;

	case "lobby":
		$json = lobbyFunc($_POST);
		break;

	case "lobbyContentSearchCompetitive":
		$json = lobbyContentSearchCompetitiveFunc($_POST);
		break;

	case "lobbyContentSearchCompetitiveCard":
		$json = lobbyContentSearchCompetitiveCardFunc($_POST);
		break;

	case "lobbyContentSearchCompetitiveFound":
		$json = lobbyContentSearchCompetitiveFoundFunc($_POST);
		break;

	case "lobbyContentSearchCompetitiveFoundConfirm":
		$json = lobbyContentSearchCompetitiveFoundConfirmFunc($_POST);
		break;

	case "lobbyContentSearchCompetitiveFoundInfo":
		$json = lobbyContentSearchCompetitiveFoundInfoFunc($_POST);
		break;

	case "lobbyContentSearchCompetitiveInfo":
		$json = lobbyContentSearchCompetitiveInfoFunc($_POST);
		break;

	case "lobbyContentSearchCompetitiveStart":
		$json = lobbyContentSearchCompetitiveStartFunc($_POST);
		break;

	case "contest":
		$json = contestFunc($_POST);
		break; 

	case "contestStatus":
		$json = contestStatusFunc($_POST);
		break; 

	case "contestStatusTimer":
		$json = contestStatusTimerFunc($_POST);
		break; 

	case "contestContentTask":
		$json = contestContentTaskFunc($_POST);
		break;

	case "contestContentTaskValue":
		$json = contestContentTaskValueFunc($_POST);
		break;

	case "contestContentTaskCode":
		$json = contestContentTaskCodeFunc($_POST);
		break;

	case "contestContentTaskCodeCompiler":
		$json = contestContentTaskCodeCompilerFunc($_POST);
		break;

	case "contestContentTaskHistory":
		$json = contestContentTaskHistoryFunc($_POST);
		break;
}

echo json_encode($json);

?>