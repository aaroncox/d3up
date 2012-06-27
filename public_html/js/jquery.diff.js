/*
 * jQuery Diff objects Plugin
 * 
 * $.diff(obj1, obj2) returns an object containing the differences between two objects. 
 *  
 * Copyright 2010, Marc Rutkowski / Attractive Media
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Based upon the code of Michael Schøler:
 * http://www.xn--schler-dya.net/blog/2008/01/15/diffing_json_objects/
*/
;(function($){
  var _priv = {
    cyclicCheck: null,

    diff: function(obj1, obj2)
    {
      if (typeof obj1 === 'undefined')
        obj1 = {};
      if (typeof obj2 === 'undefined')
        obj2 = {};
      
      var val1, val2, mod = {}, add = {}, del = {}, ret;
      $.each(obj2, function(key, val2)
      {
        val1 = obj1[key];
        bDiff = false;
        if (typeof val1 === 'undefined')
          add[key] = val2;
        else if (typeof val1 != typeof val2)
          mod[key] = val2;
        else if (val1 !== val2)
        {
          if (typeof val2 === 'object')
          {
            if ($.inArray(_priv.cyclicCheck, val2) >= 0)
              return false; // break the $.each() loop
            ret = _priv.diff(val1, val2);
            if (!$.isEmptyObject(ret.mod))
              mod[key] = $.extend(true, {}, ret.mod);
            if (!$.isEmptyObject(ret.add))
              add[key] = $.extend(true, {}, ret.add);
            if (!$.isEmptyObject(ret.del))
              del[key] = $.extend(true, {}, ret.del);
            _priv.cyclicCheck.push(val2);
          }
          else
            mod[key] = val2;
        }
      });
      
      $.each(obj1, function(key, val1)
      {
        if (typeof obj2[key] === 'undefined')
          del[key] = true;
      });
      
      return {mod: mod, add: add, del: del};
    }
  };
  
  $.diff = function(obj1, obj2)
  {
    _priv.cyclicCheck = [];
    return _priv.diff(obj1, obj2);
  }
})(jQuery);
