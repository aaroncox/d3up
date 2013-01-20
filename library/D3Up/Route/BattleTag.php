<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class D3Up_Route_BattleTag extends Epic_Route_Record
{
	public function getRecord($params)
	{
		if(!in_array($params['type'], static::$types)) {
			return null;
		}
		// var_dump(Epic_Mongo::db($params['type'])->fetchOne(array('id'=>(int)$params['id'])), $params['id']); exit;
		$query = array(
			'_characterId' => (int) $params['id'],
			'_characterBt' => $params['bt']
		);
		var_dump($query);
		return Epic_Mongo::db($params['type'])->fetchOne();
	}
	
} // END class D3Up_Route_BattleTag extends Epic_Route_Record