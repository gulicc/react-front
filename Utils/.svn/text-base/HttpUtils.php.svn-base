<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/6/23
 * Time: 17:47
 * 封装的执行Http请求的工具类
 */
require_once '../Config_front.php';

class HttpUtils {
	
	public static function IPCheck()
	{

		//IP check
		if (in_array($_SERVER['REMOTE_ADDR'], Config::$white_list)) {
			//Action for allowed IP Addresses
		}  else {
		//Action for all other IP Addresses
		echo 'You are not authorized h.';
		echo "<br />IP Address: ".$_SERVER['REMOTE_ADDR'];
		exit;
		}

	}
	
	/**
	 *
	 * 发送php的curl的POST请求的方法封装
	 * 
	 * @param
	 *        	$uri
	 * @param null $data        	
	 * @param bool|false $outcookie        	
	 * @param string $format        	
	 * @throws Exception
	 */
	public static function sendPost($uri, $data = null, $outcookie = false, $format = 'json', $sessionCheck = true) {
		
		if ($sessionCheck) {
			if(!isset($_SESSION))
				session_start();
			
			if (!isset($_SESSION['fingerprint'] ) || $_SESSION ['fingerprint'] != md5 ( $_SERVER ['HTTP_USER_AGENT'] . Config::TOKEN . $_SERVER ['REMOTE_ADDR'] )) {
				session_destroy ();
				$ret = ['status_code' => 9001, 'status_txt' => '用户未登录'];
				$res = HttpUtils::object2array ( $ret );
				$res = json_encode ( $res );
				return $res;
			}
		 
		}
		$res = HttpUtils::Query ( $uri, $data, 'POST', $outcookie, $format );
		
		if($format === 'json')
		{
			$res = HttpUtils::object2array ( $res );
			$res = json_encode ( $res );
		}
		
		return $res;
	}
	
	/**
	 * 发送php的curl的GET请求的方法封装
	 * 
	 * @param
	 *        	$uri
	 * @param null $data        	
	 * @param bool|false $outcookie        	
	 * @param string $format        	
	 * @return mixed|string
	 * @throws Exception
	 */
	public static function sendGet($uri, $data = null, $outcookie = false, $format = 'json', $sessionCheck = true) {
		if ($sessionCheck) {
			if ($_SESSION ['fingerprint'] != md5 ( $_SERVER ['HTTP_USER_AGENT'] . Config::TOKEN . $_SERVER ['REMOTE_ADDR'] )) {
				session_destroy ();
				exit ();
			}
		}
		$res = HttpUtils::Query ( $uri, $data, 'GET', $outcookie, $format );
		$res = HttpUtils::object2array ( $res );
		$res = json_encode ( $res );
		return $res;
	}
	public static function Query($uri, $data = null, $method = 'GET', $outcookie = false, $format = 'json') {
		$url = $uri;
		
		$ch = curl_init ();
		
		if (strpos ( $uri, "://" ) === false) {
			
			$url = HttpUtils::url_self () . $uri;
		}
		
		curl_setopt ( $ch, CURLOPT_RETURNTRANSFER, 1 );
		
		if ($outcookie) {
			
			curl_setopt ( $ch, CURLOPT_HEADER, 1 );
		}
		
		$cookie = '';
		
		foreach ( $_COOKIE as $key => $value ) {
			$cookie .= " {$key}=$value;";
		}
		
		curl_setopt ( $ch, CURLOPT_COOKIE, $cookie );
		curl_setopt ( $ch, CURLOPT_FOLLOWLOCATION, true );
		if ($method == 'POST') {
			
			// curl_setopt($ch, CURLOPT_POST, 1);
			curl_setopt ( $ch, CURLOPT_POSTREDIR, 3 );
			if ($data && (is_array ( $data ) || is_object ( $data ))) {
				
				$multipart = false;
				
				foreach ( $data as $key => $value ) {
					if (strpos ( $value, '@' ) === 0) {
						$multipart = true;
						break;
					}
				}
				
				if ($multipart) {
					
					$multipart = array ();
					
					foreach ( $data as $key => $value ) {
						if (strpos ( $value, '@' ) === 0) {
							
							$vs = preg_split ( "/\\;/i", $value );
							
							if (class_exists ( "\CURLFile" )) {
								
								$file = substr ( $vs [0], 1 );
								$type = null;
								$name = null;
								for($i = 1; $i < count ( $vs ); $i ++) {
									$vv = preg_split ( "/\\=/i", $vs [$i] );
									if ($vv [0] == "type") {
										$type = $vv [1];
									} else if ($vv [0] == "filename") {
										$name = $vv [1];
									}
								}
								
								$multipart [$key] = new CURLFile ( $file, $type, $name );
							} else {
								$multipart [$key] = $vs [0];
							}
						} else {
							$multipart [$key] = $value;
						}
					}
					
					// var_dump($multipart);
					
					curl_setopt ( $ch, CURLOPT_POSTFIELDS, $multipart );
				} else {
					curl_setopt ( $ch, CURLOPT_POSTFIELDS, http_build_query ( $data ) );
				}
			} else if ($data) {
				curl_setopt ( $ch, CURLOPT_POSTFIELDS, $data . '' );
			} else {
				curl_setopt ( $ch, CURLOPT_POSTFIELDS, '' );
			}
			
			curl_setopt ( $ch, CURLOPT_URL, $url );
		} else {
			if ($data && (is_array ( $data ) || is_object ( $data ))) {
				if (strpos ( $url, '?' ) === false) {
					$url .= '?' . http_build_query ( $data );
				} else {
					$url .= '&' . http_build_query ( $data );
				}
			}
			curl_setopt ( $ch, CURLOPT_URL, $url );
		}
		curl_setopt ( $ch, CURLOPT_HTTPHEADER, array (
				"Content-type: application/json" 
		) );
		curl_setopt ( $ch, CURLOPT_SSL_VERIFYPEER, FALSE );
		curl_setopt ( $ch, CURLOPT_SSL_VERIFYHOST, FALSE );
		curl_setopt ( $ch, CURLOPT_USERAGENT, $_SERVER ['HTTP_USER_AGENT'] );
		
		$rs = curl_exec ( $ch );

		//print_r($rs);
		
		if ($rs === false) {
			var_dump ( curl_error ( $ch ) );
			throw new \Exception ( curl_error ( $ch ), curl_errno ( $ch ) );
		} else {
			
			if ($outcookie) {
				
				$headerSize = curl_getinfo ( $ch, CURLINFO_HEADER_SIZE );
				$header = substr ( $rs, 0, $headerSize );
				$body = substr ( $rs, $headerSize );
				
				foreach ( preg_split ( '/[\r\n]/i', $header ) as $item ) {
					if (strpos ( $item, 'Set-Cookie' ) === 0) {
						header ( $item, false );
					}
				}
				
				if ($format == 'json') {
					$rs = json_decode ( $body );
				} else {
					$rs = $body;
				}
				if($rs == null)
				{
					$rs = $body;
				}
				
			} else {
				$body = $rs;
				if ($format == 'json') {
					$rs = json_decode ( $rs );
				}
				
				if($rs == null)
				{
					$rs = $body;
				}
			}
		}
		
		curl_close ( $ch );
		
		return $rs;
	}
	public static function V($object, $key, $defaultValue = null) {
		$v = null;
		
		if (isset ( $object->$key )) {
			$v = $object->$key;
		} else if (is_array ( $object ) && isset ( $object [$key] )) {
			$v = $object [$key];
		}
		
		if ($v === null) {
			return $defaultValue;
		}
		
		return $v;
	}
	public static function url_self($uri = false) {
		$url = '';
		
		if (isset ( $_SERVER ['HTTPS'] ) && $_SERVER ['HTTPS'] == 'on') {
			$url = 'https://' . $_SERVER ['HTTP_HOST'];
		} else {
			$url = 'http://' . $_SERVER ['HTTP_HOST'];
		}
		
		if ($uri !== false) {
			
			if ($uri === true) {
				$url .= $_SERVER ['REQUEST_URI'];
			} else {
				$url .= $uri;
			}
		}
		
		return $url;
	}
	public static function object2array($object) {
		$object = json_decode ( json_encode ( $object ), true );
		return $object;
	}
	
	// 增加passwordEncrypt函数，用于对密码加密。相对于单纯的md5,可以有效防止彩虹攻击，暴力破解。
	public static function passwordEncrypt($passcode) {
		// 上线后salt值就不能修改，否则会出现数据不一致的问题。
		$salt = 'rongkuai20170501';
		
		$value = hash_hmac ( 'md5', $passcode, $salt );
		return $value;
	}
	
	// 推荐传入的salt是用户的ID，以防止冲突。length默认是8位。
	public static function generateInviationCode($salt, $length = 8) {
		$str = sha1 ( time () . $salt );
		return substr ( $str, 0, $length );
	}

	//检查用户权限
	public static function checkUserPermissions($permissions) {

		if (!isset($_SESSION)) {
			session_start();
		}
		if (!isset($_SESSION['plat_id'])) {
			//当前用户未登录
			echo json_encode(['status_code' => 9011, 'status_txt' => '用户未登录', 'data' => '']);
			die();
		} else {
			$permission_count = count($permissions);
			$num = 0;
			$user = $_SESSION['user'];
			foreach($permissions as $p){
			    $befind=false;
                foreach($user['roles'] as $rl)
                {
                    foreach($rl['powers'] as $pw)
                    {
                        if ($pw == $p) {
                            $befind=true;
                            break;
                        }
                    }
                    if($befind)break;
                }
                if($befind)
                {
                    $num++;
                }
			}
			if($num !=$permission_count){
				//当前用户没有后续操作的权限
				echo json_encode(['status_code' => 9020, 'status_txt' => '用户无权限', 'data' => '']);
				die();
			}

		}
	}

	//检查指定的POST参数
	public static function verifyPostParams() {

		if (empty($_POST)) {
			return false;
		}
		$list = func_get_args();
		foreach ($list as $param) {
			if (!isset($_POST[$param]) || empty($_POST[$param])) {
				return false;
			}
		}
		return true;
	}

	//检查指定的SESSION参数
	public static function verifySessionParams() {

		if (!session_id()){
			session_start();
		}
		if (empty($_SESSION)) {
			return false;
		}
		$list = func_get_args();
		foreach ($list as $param) {
			if (!isset($_SESSION[$param])) {
				return false;
			}
		}
		return true;
	}

	//获取POST参数
	public static function getPostParam($key, $defaultVal=NULL) {

		if (!isset($_POST[$key]) || empty($_POST[$key])) {
			return $defaultVal;
		}
		return $_POST[$key];
	}
}
