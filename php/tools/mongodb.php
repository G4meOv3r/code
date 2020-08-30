<?php

function getMongoDBManager() {
	return new MongoDB\Driver\Manager('mongodb://127.0.0.1/');
}

//Query
function newQuery($document, $filter, $queryOptions = []) {
	$manager = getMongoDBManager();
	if (count($queryOptions)) {
		$query = new MongoDB\Driver\Query($filter, $queryOptions);
	} else {
		$query = new MongoDB\Driver\Query($filter);
	}
	$cursor = $manager->executeQuery($document, $query);
	return $cursor->toArray();
}

//Bulk
function newBulkDelete($document, $filter, $deleteOptions = []) {
	$manager = getMongoDBManager();
	$bulk = new MongoDB\Driver\BulkWrite();
	if (count($deleteOptions)){
		$bulk->delete($filter, $deleteOptions);
	} else {
		$bulk->delete($filter);
	}
	$manager->executeBulkWrite($document, $bulk);
} 

function newBulkInsert($document, $insertDocument) {
	$manager = getMongoDBManager();
	$bulk = new MongoDB\Driver\BulkWrite();
	$bulk->insert($insertDocument);
	$manager->executeBulkWrite($document, $bulk);
}

function newBulkUpdate($document, $filter, $newObject, $updateOptions = []) {
	$manager = getMongoDBManager();
	$bulk = new MongoDB\Driver\BulkWrite();
	if (count($updateOptions)){
		$bulk->update($filter, $newObject, $updateOptions);
	} else {
		$bulk->update($filter, $newObject);
	}
	$manager->executeBulkWrite($document, $bulk);
} 
	
?>