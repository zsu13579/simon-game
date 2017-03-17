$(document).ready(function(){
  
  //init  state
  // 0  for  off; 1 for  on
  var v_on=0;
  var v_cnt=$('#cnt p');
  var v_xl=[];
  var counter=0;
  var v_sx=$('.sx');
  //  recursion function showStep var;
  var tmp_cnt=0;
  var click_step=0;
  var isStrict=0;
  var v_int_start;
  var v_int_stop;
  var clickFlag=0;
  var intervalFlag=0;
  var v_start=0;
    
  // click  onoff botton
  $('#onoff').on('click',function(){
    
    // change on  and  off  state  
    if(v_on==0){
      $('#onoffpoint').css('margin-left','113px');
      v_cnt.html('- -');
      v_on=1;}else{
      $('#onoffpoint').css('margin-left','89px');
      v_cnt.html('');
      v_on=0;
      v_start=0;
      //strictlight off  
       $('#strictlight').css('background-color','#32050C');
      //  set sx default
      v_sx.css('cursor','default');   
      
      clearInterval(v_int_start);   
        
      }
  });
  
  // click  strict  button
  $('#instrict').on('click',function(){
    
    if(v_on==1){
      if(isStrict==0){
      isStrict=1;
      $('#strictlight').css('background-color','red');
        }else{
          isStrict=0;
      $('#strictlight').css('background-color','#32050C');
        }
    }   
  });
  
  //  click  start  button
  $('#instart').on('click',function(){
    
    if(v_on==1){
      
      //  set to '- -',blink
      v_cnt.html('- -');
  v_cnt.fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
      
     
      initStart();
      
     }
    });
  
    //choose  color  
    v_sx.on('click',function(){
     if(v_on==1 && v_start==1){
    clickFlag=1;
    if(intervalFlag==1){clearInterval(v_int_start); intervalFlag=01;}
    var val=$(this).attr('value');  
 var src='https://s3.amazonaws.com/freecodecamp/simonSound'+val+'.mp3';
      playSound(src);
      
      val=parseInt(val);
      blockBlink(val);
      setTimeout(function(){
        
        if(val==v_xl[click_step]){
        click_step++;tmp_cnt=0;
        if(click_step==counter){
        counter++;tmp_cnt=0;
        if(counter==20){alert('You Win! Try again!');initStart();return;}
        // blockBlink(v_xl[counter-1]);
        showStep(counter,src);
        v_cnt.html('0'+counter);
        click_step=0;
      }else{
        // TODO  inform  to  choose
        tmp_cnt=0;
        if(intervalFlag==0){
        var v_int_start=setInterval(function(){
          // alert(1);
          intervalFlag=1;
          if(clickFlag==0){
          playSound(src);
          v_cnt.html('!!');
  v_cnt.fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);
          setTimeout(function(){v_cnt.html('0'+counter);tmp_cnt=0;showStep(counter,src);},1000);
          clickFlag=1;}else{
            clickFlag=0;
          }
        },6000)
        }
      }
      }else{
  //alert('counter'+counter+'val'+v_xl[counter-1]+v_xl[counter]);
        tmp_cnt=0;
        v_cnt.html('! !');
        setTimeout(function(){
          v_cnt.html('');
        },500);
        setTimeout(function(){
          v_cnt.html('! !');
        },1000);
        setTimeout(function(){
          v_cnt.html('0'+counter);
          
        },1500); 
        
        if(isStrict==0){
          showStep(counter,src);
          click_step=0;
        }else{
          alert("You should try from start!");
         initStart();
          
        }    
      }      
      },500);
      };
    });
    
    //function : showStep() show  the  order  and  show  next  step 
  
    
    function showStep(counter,src){
      // var j=0;
      //  for函数无效，使用递归解决，setTimeout是异步函数，for不会等这个函数执行完。由于setTimeout函数里面的blockBlink带有与i相关的变量，所以使用递归函数解决。如果不带i变量可以考虑后面的i*700来解决
     //  for(var i=0;i<v_counter;i++){
     //    j=v_xl[i];
     //    // blockBlink(j);
     // setTimeout(function(){blockBlink(j);},i*700);
     //   }
 
      if(tmp_cnt<counter){
        var j=v_xl[tmp_cnt];
        setTimeout(function(){blockBlink(j);playSound(src);showStep(counter,src)},700);
        tmp_cnt++;
      }
           
    };
    
    //test function
  function test(n){
    v_cnt.html(n+1);
  }
  
    //function: color block  blink
    function blockBlink(num){
      
      var m=$('.sx'+num);
      var v_color_org;
      var v_color_new;
      // alert(num);
      switch(num){
        case 1:v_color_org='#00A74A';v_color_new='#00FE71';break;
          case 2:v_color_org='#9F0F17';v_color_new='#FF0F17';break;
          case 3:v_color_org='#094A8F';v_color_new='#1181F9';break;
          case 4:v_color_org='#CCA707';v_color_new='#FACD0A';break;
                }   
      
      m.css('background-color',v_color_new);
      setTimeout(function(){m.css('background-color',v_color_org);     
},500)
    };
   
  // blockBlink(1);
  
  //  init  start  
  //  set counter  to  01
  //  blink  1st  move
  function initStart(){
     tmp_cnt=0;
    click_step=0;
     setTimeout(function(){
    
      v_cnt.html('01');      
     //  get random  v_xl
      for(i=0;i<20;i++){
        // random  1-4
        v_xl[i] = Math.floor(Math.random()*4+1);
      } 
     
      //  set  counter
      counter=1;
      blockBlink(v_xl[0]);
      
      //  set sx pointer
      v_sx.css('cursor','pointer');
      v_start=1;
                        
      //end of setTimeout function           
      },500);    
  }
  
  function playSound(src){
       
    $('.sx1').html("<audio height='0' width='0' autoplay='true' preload='true'><source src='"+src+"' type='audio/mpeg'></audio>");
    
  }
  
});