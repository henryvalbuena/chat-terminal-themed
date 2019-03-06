$(function () {
    var counter = 0;
    var flag;
    var nickname;
    var socket = io();
  
    $('#name').on('submit', () => {
      nickname = $('.name').val();
      console.log(nickname);
      flag = true;
      $('.intro').fadeToggle(() => {
        $('.container').fadeToggle(() => {
          $('.intro').remove();
        });
      });
      return false;
    });
    
    window.setInterval(() => {
      $('#caret').toggleClass('isNot');
    }, 500);
  
    $(document).keydown(e => {
      // console.log(e);
      $('#dummy').val("");
      if (flag) {
        if (String(e.originalEvent.key).match(/enter/i)) {
          whenEnter();
        } else if (String(e.originalEvent.key).match(/backspace/i)) {
          whenBackspace(e.originalEvent.key);
        } else {
          addingText(e.originalEvent.key);
        }
      }
    });
  
    //hand made wordbreak for the caret to follow the letters
    function addingText(ch) {
      if (checkOverflow()) {
        addBox();
        appendText(ch);
      } else {
        appendText(ch);
      }
      // appendText(ch);
    }
  
    function appendText(ch) {
      var str = $('#tempDiv span:last-child').html();
      //append text into .text
      if (isEmpty(ch)) {
        $('#tempDiv span:last-child').html(str + "&nbsp;");
      } else if (!isNotChar(ch)) {
        $('#tempDiv span:last-child').html(str + ch);
      }
    }
  
    function isNotChar(ch) {
      return String(ch).match(/escape|arrow(up|down|left|right)|shift|ctlr|alt|meta|tab/i);
    }
  
    function isEmpty(str) {
      if (String(str) === " " || String(str) === "") {
        return true;
      } else {
        return false;
      }
    }
  
    function whenBackspace(ch) {
      //take the current value of .temp
      var str = $('#tempDiv span:last-child').text();
      //check if the span is empty and counter is greater than 0
      //remove the last span
      //else just remove text
      if (str.length == 1 && counter > 0) {
        removeBox();
        counter--;
      } else {
        //remove the last char and update the value of .temp
        $('#tempDiv span:last-child').text(str.slice(0,-1));
      }
    }
    
    function whenEnter() {
      var str = $('.temp').text();
      var user = "~" + nickname + "$ ";
      //broadcasting the message
      if (isEmpty(str)) {
        socket.emit('message', user + "&nbsp;");
      } else {
        socket.emit('message', user + str);
      }
      for (var i = 0; i < counter; i++) {
        removeBox();
      }
      $('.temp').text("");
    }
    //appending the broadcast locally
    socket.on('message', msg => {
      $('<li>').html(msg).appendTo('ol');
    });
  
    //check if there is an overflow
    function checkOverflow() {
      if ($('#tempDiv span:last-child').width() >= ($('.container').width() - 10)) {
        return true;
      } else {
        return false;
      }
    }
  
    //add another box
    function addBox() {
      counter++;
      $('<span class="temp">').appendTo('#tempDiv');
    }
  
    function removeBox() {
      counter--;
      $('#tempDiv span:last-child').remove();
    }
  
    //copyAndPaste
    
  });