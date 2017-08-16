<?php
/**
 * Created by PhpStorm.
 * User: Zhou
 * Date: 2016/8/22
 * Time: 16:38
 */

class Cache
{
    /**
     * The path to the cache file folder
     *
     * @var string
     */
    private $_cachepath = './tmp/';
    /**
     * The name of the default cache file
     *
     * @var string
     */
    private $_cachename = 'default';
    /**
     * The cache file extension
     *
     * @var string
     */
    private $_extension = '.cache';

    /**
     * Default constructor
     *
     * @param string|array [optional] $config
     * @return void
     */
    public function construct($config = null)
    {
        if (true === isset($config)) {
            if (is_string($config)) {
                $this->setCache($config);
            } else if (is_array($config)) {
                $this->setCache($config['name']);
                $this->setCachePath($config['path']);
                $this->setExtension($config['extension']);
            }
        }
    }

    /**
     * Check whether data accociated with a key
     *
     * @param string $key
     * @return boolean
     */
    public function isCached($key)
    {
        if (false != $this->_loadCache()) {
            $cachedData = $this->_loadCache();
            return isset($cachedData[$key]['data']);
        }
    }

    /**
     * Store data in the cache
     *
     * @param string $key
     * @param mixed $data
     * @param integer [optional] $expiration
     * @return object
     */
    public function store($key, $data, $expiration = 0,$postData = null)
    {
        $storeData = array(
            'time' => time(),
            'expire' => $expiration,
            'data' => serialize($data),
            'postData'=>$postData
        );
        $dataArray = $this->_loadCache();
        if (true === is_array($dataArray)) {
            $dataArray[$key] = $storeData;
        } else {
            $dataArray = array($key => $storeData);
        }
        $cacheData = json_encode($dataArray);
        file_put_contents($this->getCacheDir(), $cacheData);
        return $this;
    }

    /**
     * Retrieve cached data by its key
     *
     * @param string $key
     * @param boolean [optional] $timestamp
     * @return string
     */
    public function retrieve($key, $timestamp = false ,$postData = null)
    {
        $cachedData = $this->_loadCache();
        //缓存的接口返回数据的数组
        $storeData = $cachedData[$key];
        if(!isset($storeData['data'])){//表示当前的缓存文件没有存数据,应该从接口中去获取数据
            return null;
        }
        if($timestamp == false){//不需要检测缓存是否过期
            $savePost = $storeData['postData'];
            if($postData != $savePost){//表示数据需要更新
                return null;
            }
            return unserialize($storeData['data']);
        }else{//检测当前的时间是否是过期的
           //取出来存文件时候的日期
            $saveTime = $storeData['time'];
            $expireTime = $storeData['expire'];
            $isExpired  = $this->_checkExpired($saveTime,$expireTime);
            if($isExpired == false){//表示缓存的文件是在有效期内的,取出来其中的数据即可
                $savePost = $storeData['postData'];
                if($postData != $savePost){//表示数据需要更新
                     return null;
                }
                return unserialize($storeData['data']);
            }else{//当前的文件保存的数据已经过期了,需要重新获取这些数据
                return null;
            }
        }
    }
    /**
     * Retrieve all cached data
     *
     * @param boolean [optional] $meta
     * @return array
     */
    public function retrieveAll($meta = false)
    {
        if ($meta === false) {
            $results = array();
            $cachedData = $this->_loadCache();
            if ($cachedData) {
                foreach ($cachedData as $k => $v) {
                    $results[$k] = unserialize($v['data']);
                }
            }
            return $results;
        } else {
            return $this->_loadCache();
        }
    }

    /**
     * Erase cached entry by its key
     *
     * @param string $key
     * @return object
     */
    public function erase($key)
    {
        $cacheData = $this->_loadCache();
        if (true === is_array($cacheData)) {
            if (true === isset($cacheData[$key])) {
                unset($cacheData[$key]);
                $cacheData = json_encode($cacheData);
                file_put_contents($this->getCacheDir(), $cacheData);
            } else {
                throw new Exception("Error: erase() - Key '{$key}' not found.");
            }
        }
        return $this;
    }

    /**
     * Erase all expired entries
     *
     * @return integer
     */
    public function eraseExpired()
    {
        $cacheData = $this->_loadCache();
        if (true === is_array($cacheData)) {
            $counter = 0;
            foreach ($cacheData as $key => $entry) {
                if (true === $this->_checkExpired($entry['time'], $entry['expire'])) {
                    unset($cacheData[$key]);
                    $counter++;
                }
            }
            if ($counter > 0) {
                $cacheData = json_encode($cacheData);
                file_put_contents($this->getCacheDir(), $cacheData);
            }
            return $counter;
        }
    }

    /**
     * Erase all cached entries
     *
     * @return object
     */
    public function eraseAll()
    {
        $cacheDir = $this->getCacheDir();
        if (true === file_exists($cacheDir)) {
            $cacheFile = fopen($cacheDir, 'w');
            fclose($cacheFile);
        }
        return $this;
    }

    /**
     * Load appointed cache
     *
     * @return mixed
     */
    private function _loadCache()
    {
        if (true === file_exists($this->getCacheDir())) {
            $file = file_get_contents($this->getCacheDir());
            return json_decode($file, true);
        } else {
            return false;
        }
    }

    /**
     * Get the cache directory path
     *
     * @return string
     */
    public function getCacheDir()
    {
        if (true === $this->_checkCacheDir()) {
            $filename = $this->getCache();
            $filename = preg_replace('/[^0-9a-z\.\_\-]/i', '', strtolower($filename));
            return $this->getCachePath() . $this->_getHash($filename) . $this->getExtension();
        }
    }

    /**
     * Get the filename hash
     *
     * @return string
     */
    private function _getHash($filename)
    {
        return sha1($filename);
    }

    /**
     * Check whether a timestamp is still in the duration
     *
     * @param integer $timestamp
     * @param integer $expiration
     * @return boolean
     */
    private function _checkExpired($timestamp, $expiration)
    {
        $result = false;
        if ($expiration !== 0) {
            $timeDiff = time() - $timestamp;
            ($timeDiff > $expiration) ? $result = true : $result = false;
        }
        return $result;
    }

    /**
     * Check if a writable cache directory exists and if not create a new one
     *
     * @return boolean
     */
    private function _checkCacheDir()
    {
        if (!is_dir($this->getCachePath()) && !mkdir($this->getCachePath(), 0775, true)) {
            throw new Exception('Unable to create cache directory ' . $this->getCachePath());
        } elseif (!is_readable($this->getCachePath()) || !is_writable($this->getCachePath())) {
            if (!chmod($this->getCachePath(), 0775)) {
                throw new Exception($this->getCachePath() . ' must be readable and writeable');
            }
        }
        return true;
    }

    /**
     * Cache path Setter
     *
     * @param string $path
     * @return object
     */
    public function setCachePath($path)
    {
        $this->_cachepath = $path;

    }

    /**
     * Cache path Getter
     *
     * @return string
     */
    public function getCachePath()
    {
        return $this->_cachepath;
    }

    /**
     * Cache name Setter
     *
     * @param string $name
     * @return object
     */
    public function setCache($name)
    {
        $this->_cachename = $name;
        return $this;
    }

    /**
     * Cache name Getter
     *
     * @return void
     */
    public function getCache()
    {
        return $this->_cachename;
    }

    /**
     * Cache file extension Setter
     *
     * @param string $ext
     * @return object
     */
    public function setExtension($ext)
    {
        $this->_extension = $ext;
        return $this;
    }

    /**
     * Cache file extension Getter
     *
     * @return string
     */
    public function getExtension()
    {
        return $this->_extension;
    }


}
?>


