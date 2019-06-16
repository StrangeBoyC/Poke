$(function () {
    let poke = [];
    let desk = $('.desk');
    let colorArr = ['s','h','d','c'];
    let flag = {};
    for (let i=0;i<52; i++){
        let index = Math.floor(Math.random()*colorArr.length);
        let color = colorArr[index];
        let number = Math.round(Math.random()*12+1);

        while (flag[color+'_'+number]){
            index = Math.floor(Math.random()*colorArr.length);
            color = colorArr[index];
            number = Math.round(Math.random()*12+1);
        }
        poke.push({color,number});
        flag[color+'_'+number]=true;
    }

    let index = -1;
    for(let i=0;i<7;i++){
        for (let j=0;j<=i;j++){
            index++;
            let obj = poke[index]
            let lefts = 350 - 50*i +100*j;
            let tops = 50 * i +20;
            $('<div>')
                .addClass('poke')
                .css({backgroundImage:`url(./imgs/${obj.number}${obj.color}.jpg)`})
                .appendTo('.desk')
                .data('number',obj.number)
                .attr('id',i+'_'+j)
                .delay(index*(200-i))
                .animate({left:lefts,top:tops,opacity:1})
        }
    }
    let start = index;
    for (;index<52;index++){
        let obj = poke[index];
        $('<div>')
            .addClass('poke')
            .addClass('left')
            .attr('id',''+(index-start+1))
            .data('number',obj.number)
            .css({backgroundImage:`url(./imgs/${obj.number}${obj.color}.jpg)`,opacity: 1,zIndex:index-start+1})
            .appendTo('.desk')

    }

    let first = null;
    let flags = true;
    desk.on('click','.poke',function () {
        if(!flags){
            return ;
        }
        flags=false;
        let _this = $(this);
        console.log(_this);
        let [i,j] = _this.attr('id').split('_');
        let id1 = i*1 + 1 +'_' +j, id2=i*1+1 +'_'+(j*1+1);
        if($('#'+id1).length || $('#'+id2).length){
            return ;
        }

        if (_this.hasClass('active')){
            _this.removeClass('active').css({border: 'none'}).animate({top:'+=20px'},function () {
                flags=true;
            })
        } else {
            _this.addClass('active').css({border:'2px solid #333333'}).animate({top: '-=20px'},function () {
                flags=true;
            })
        }

        if (!first){
            first = _this;
        }else {
            let number1 =first.data('number'), number2 = _this.data('number');
            if (number1+number2===14){
                $('.active').animate({top:0,left: '700px',opacity:0},function () {
                    $(this).remove();
                })
            }
            else {
                $('.active').animate({top:'+=20px'},function () {
                    $(this).removeClass('active').css({border: 'none'});
                })
            }
            first = null;
        }

    })

    let n=0;
    $('.rightBtn').on('click',function () {
        $('.left').last().css('zIndex',n++).animate({left:700},function () {
            $(this).removeClass('left').addClass('right')
        })
    })
    $('.leftBtn').on('click',function () {
        let num = $('.right').first().attr('id');
        $('.right').first().css('zIndex',num).animate({left:10},function () {
            $(this).removeClass('right').addClass('left')
        })
    })



})