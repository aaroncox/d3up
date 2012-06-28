<?php

require_once 'Zend/Validate/Abstract.php';

require_once 'Zend/Locale/Format.php';

class D3Up_Validate_Double extends Zend_Validate_Abstract
{
    const INVALID   = 'floatInvalid';
    const NOT_FLOAT = 'notFloat';

    /**
     * @var array
     */
    protected $_messageTemplates = array(
        self::INVALID   => "Invalid type given. String, integer or float expected",
        self::NOT_FLOAT => "'%value%' does not appear to be a float",
    );

    /**
     * Defined by Zend_Validate_Interface
     *
     * Returns true if and only if $value is a floating-point value
     *
     * @param  string $value
     * @return boolean
     */
    public function isValid($value)
    {
        if (!is_string($value) && !is_int($value) && !is_float($value) && !is_numeric($value)) {
            $this->_error(self::INVALID);
            return false;
        }

        if (is_float($value) || is_numeric($value) || is_int($value)) {
            return true;
        }

        $this->_setValue($value);
        return true;
    }
}
