/*
*author:王伟。
*/
/**
*pid:需要显示导航空间的页面元素id。
*curNum:当前选择的页码；
*maxNum：总共有多少页；
*maxBut：每次要显示多少个页码；
*funcName：点击页码时触发的函数；
*/
var PPage=(function(window){
	
	return function(pid,curNum,maxNum, maxBut, funcName){	
		function getAHtml(num,txt){
			return '<a href="javascript:;" onclick="'+funcName+'('+num+');return false;">'+(typeof txt === 'string' ? txt : num)+'</a>';
		};
		
		var page=typeof pid=="string" ? document.getElementById(pid) : pid,
		
			sPrev='',
			sNext='',
			sResult='',
			sp='',
			sn='',
			sCur='<em>'+curNum+'</em>',
			gd='',
			
			prevNum,
			nextNum,
			
			i,
			
			elevatorHtml='';
		//如果当前选择页面为第一页，则往前翻页不显示。
		//否则显示往前翻页按钮，并且前一页码为当前页码-1。
		if(curNum==1){
			sPrev='';
		}else{
			prevNum=curNum-1;
			sPrev='<a href="javascript:;" onclick="'+funcName+'('+prevNum+');return false;" title="上一页">上一页</a>';
		}
		
		//如果当前页为最大页，则不显示往后翻页。
		//否则显示往后翻页，并且下一页码为当前页码+1。
		if(curNum==maxNum){
			sNext='';
		}else{
			nextNum=curNum+1;
			sNext='<a href="javascript:;" onclick="'+funcName+'('+nextNum+');return false;" title="下一页">下一页</a>';
		}
		
		//如果最大页页码数小于需要一次展示的页码按钮的数量则直接显示即可
		if(maxNum<=maxBut){
			for(i=1;i<curNum;i++){
				sp+=getAHtml(i);
			}
			
			for(i=curNum+1;i<=maxNum;i++){
				sn+=getAHtml(i);
			}
			
			sResult=sPrev+sp+sCur+sn+sNext;
		}else{
			//如果当前页码大于需要一次展示的页码按钮的数量
			//CASE1:
			//如果当前页码<=一次展示数量/2而言，还是居中的，因此
			//直接显示第一页到第maxBut页即可。
			if (curNum <= maxBut/2) {
				for (i = 1; i < curNum; i++) {
					sp += getAHtml(i);
				}

				for (i = curNum + 1; i <= maxBut; i++) {
					sn += getAHtml(i);
				}
				
				sNext=sNext+getAHtml(maxNum,'尾页');
				
				sResult=sPrev+sp+sCur+sn+gd+sNext;
			}else{
				//CASE2:
				//如果当前页码>一次展示数量/2，则需要调整当前页码为居中。
				sPrev=getAHtml(1, '首页') + sPrev;
				
				//CASE2-1:如果当前页码不在最后maxBut/2的页码时，直接对称显示即可。
				if(curNum<maxNum-maxBut/2){
					for (i = curNum-maxBut/2 + 1; i < curNum; i++) {
						sp += getAHtml(i);
					}
				
					for (i = curNum + 1; i <= curNum+maxBut/2; i++) {
						sn += getAHtml(i);
					}
					
					sNext=sNext + getAHtml(maxNum,'尾页');
					
					sResult=sPrev+gd+sp+sCur+sn+gd+sNext;
				}else{
					//CASE2-2:如果当前页码处于最后的maxBut/2的页码中，则需要居中对齐。
					for (i = maxNum-maxBut+1; i < curNum; i++) {
						sp += getAHtml(i);
					}
					
					for (i = curNum + 1; i <= maxNum; i++) {
						sn += getAHtml(i);
					}
					
					sResult=sPrev+gd+sp+sCur+sn+sNext;
				}
			}
		}
		
		page.innerHTML=sResult;
	};
})(window);
