<?php
/**
 * Greymass_Mongo_Schema
 *
 * undocumented class
 * 
 * @author Aaron Cox <aaronc@fmanet.org>
 * @param undocumented class
 * @package undocumented class
 **/
class D3Up_Mongo_Schema extends Epic_Mongo_Schema {
	protected $_version = 4;
  	protected $_tag = 'd3up';
	protected $_classMap = array(
		'record' => array(
			'item' => 'D3Up_Mongo_Record_Item',
			'build' => 'D3Up_Mongo_Record_Build',
			'gearset' => 'D3Up_Mongo_Record_GearSet',
			'shop' => 'D3Up_Mongo_Record_Shop',
			'sale' => 'D3Up_Mongo_Record_Sale',
			'expense' => 'D3Up_Mongo_Record_Expense',
			'stat' => 'D3Up_Mongo_Record_Stat',
		), 
		'post' => array(
			'comment' => 'D3Up_Mongo_Record_Build_Comment',
			'update' => 'D3Up_Mongo_Post_Update',
		),
		'user' => array(
			
		)
	);
	
	/**
	* Class Instance - Singleton Pattern
	*
	* @var self
	**/
	static protected $_instance = NULL;

	/**
	* Returns (or creates) the Instance - Singleton Pattern
	*
	* @return self
	* @author Corey Frang
	**/
	static public function getInstance()
	{
	 if (static::$_instance === NULL) {
	   static::$_instance = new static();
	 }
	 return static::$_instance;
	}
	
	public function getRecordTypes() {
		return array('tag', 'resource');
	}
	
	public function updateFrom($version)
  {
    $db = self::getMongoDb();
    switch($version) {
			case 0:
			case 1:
				$db->execute('db.records.update({_type: "hero"}, {$set: {_type: "build"}}, false, true)');
				$db->execute('db.records.ensureIndex({_createdBy: 1})');
				$db->execute('db.records.ensureIndex({id: 1})');
			case 2:
				$db->execute('db.sequences.update({id: "hero"},{$set: {id: "build"}}, false, false);');
			case 3:
				$results = $db->records->find(array('_type' => 'sale'));
				foreach($results as $idx => $res) {
					$profile = $db->users->findOne(array('_id' => $res['seller']['$id']));
					$db->execute("db.records.update({_id: new ObjectId('".$res['_id']."')}, {\$set: {region: ".(int)$profile['region']."}})");
				}
				// $db->execute('db.users.insert({id: 1, name: "admin", username: "admin", password: "'.md5('admin').'", _access: "admin", _type: "user"})');
				// $db->execute('db.sequences.insert({"id" : "user", "sequence" : 1 })');
			// case 0:
      // $db->execute('db.posts.ensureIndex({uid:1}, {unique: true})');
			// case 2:
			// 	$db->execute("db.posts.ensureIndex({'tags.ref':1, 'tags.reason': 1})");
			// 	$db->execute("db.posts.ensureIndex({'votes.score':1})");
			// 	$db->execute("db.posts.ensureIndex({_created:1, touched:1})");
			// 	$db->execute("db.posts.ensureIndex({_parent:1})");
			// 	$db->execute("db.posts.ensureIndex({_parent:1, 'score.accepted':1})");
			// case 3:
			// 	$db->execute("db.posts.ensureIndex({touched:1, _created:1})");
			// case 4:
			// 	$db->execute("db.createCollection('searchlogs', {capped:true, size:1000000, max:10000});");
			// case 5:
			// 	$db->execute("db.search.ensureIndex({name:1, description:1})");
			// case 6:
			// 	$db->execute("db.search.ensureIndex({name:1, keywords:1, score: 1})");
    }
	}
}