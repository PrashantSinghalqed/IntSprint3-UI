  //ttvmswxjzdgzqxotby_lslonwqaipchgqdo_yz_fqdagixyrobdjtnl_jqzpptzfcdcjjcpjjnnvopmh
  var a = new Array();

  function unique(str) {
      var flag = 0;
      var index;
      var k = 0;
      var newstr;
      for (var i = 0; i < str.length; i++) {
          a[k] = str.lastIndexOf(str[i]);
          if (a[k] == i) {
              a[k] = 0;
          }
          k++;

      }

      for (i = 0; i <= k; i++) {
          if (a[i] != 0) {
              flag++;
              break;
          }
      }

      if (flag == 1) {
          var maxindex = Math.max.apply(Math, a);
          for (i = 0; i < str.length; i++) {
              if (a[i] == maxindex) {
                  index = i;

              }

          }
          var x = str.slice(0, index);

          var y = str.slice(index + 1, maxindex);
          var z = str.slice(maxindex + 1, str.length);
          str = x + y + z + str[index];

          unique(str);
      } else {
          {
              for (i = 0; i < str.length; i++) {
                  if (str[i] == '_') {
                      newstr = i;
                      break;
                  } else {
                      newstr = str.length;
                  }

              }
          }
          document.getElementById("answer").innerHTML = "<h3>Output:</h3>" + str.slice(0, newstr);
      }

  }
