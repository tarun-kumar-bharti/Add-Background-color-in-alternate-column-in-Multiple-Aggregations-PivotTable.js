var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
	
	var multisplitbarcolumnList = ['amount','quantity'];
	var aggMap = {};
	var varalias = ['a','b','c','d','e','f','g','h','i','j'];  
	for(b in multisplitbarcolumnList){
		x = parseInt(b)+1;	
		aggMap['agg'+x] = {
			aggType: 'Sum',
			arguments: [multisplitbarcolumnList[b]],
			name: [multisplitbarcolumnList[b]],
			varName :varalias[b] 
		} 
	}
	
	 var pivotconfig = {}; 
	
	var customAggs = {};
	customAggs['Multifact Aggregators'] = $.pivotUtilities.multifactAggregatorGenerator(aggMap,[]);
	
	$.pivotUtilities.customAggs = customAggs;
 
						  
	pivotconfig.aggregators = $.extend($.pivotUtilities.aggregators, $.pivotUtilities.customAggs);
	pivotconfig.renderers   = $.extend($.pivotUtilities.renderers, $.pivotUtilities.gtRenderers);
	

	var rendererOptions = {
				aggregations : {
					defaultAggregations : aggMap 
				},
				
				table: {
						rowTotals: true, 
						colTotals: true,  
						
					},
				 
				rowSubtotalDisplay: {
					displayOnTop: false
				}					
		 };	 
			
	$.pivotUtilities.tipsData = data;  
	$("#output").pivotUI(
		$.pivotUtilities.tipsData, {
			rows				: ['customername'], 
			cols				: ['trnyear','trnmonth','trnweek'],  
			vals				: [], 
			aggregatorName		: "Multifact Aggregators",
			rendererName		: "GT Table",
			autoSortUnusedAttrs	: false,
			exclusions			: {},
			hiddenAttributes	: [],  
			rendererOptions		: rendererOptions,										
			colOrder			: 'key_a_to_z',	
			rowOrder			: 'key_a_to_z', 
			showUI				: false,
			onRefresh: function(config) {  
				 
				 pivotconfig = JSON.parse(JSON.stringify(config)); 
				 
				 var getcolslength = pivotconfig.cols.length;
				 
				 var totalcols 		= $("#output").find('.pvtTable').data('numcols'); 	
				 var getfirstcols 	= [];
				 var getsecondcols 	= [];
				 var getthirdcols 	= [];
				 var getfourthcols	= [];
				 
				 if(getcolslength==1){  
					$("#output").find('.pvtTable').children('thead').children('tr').eq(0).find("th.pvtColLabel").each(function (){ 
							getfirstcols.push(parseInt($(this).attr('colspan')));
					}); 
				 }

				 if(getcolslength==2){
					 
					$("#output").find('.pvtTable').children('thead').children('tr').eq(0).find("th.pvtColLabel").each(function (){ 
							getfirstcols.push(parseInt($(this).attr('colspan')));
					});
					 
					
					$("#output").find('.pvtTable').children('thead').children('tr').eq(1).find("th.pvtColLabel").each(function (){ 
							getsecondcols.push(parseInt($(this).attr('colspan')));
					});
				 }	
				 
				 if(getcolslength==3){
					 
					$("#output").find('.pvtTable').children('thead').children('tr').eq(0).find("th.pvtColLabel").each(function (){ 
							getfirstcols.push(parseInt($(this).attr('colspan')));
					}); 
					
					$("#output").find('.pvtTable').children('thead').children('tr').eq(1).find("th.pvtColLabel").each(function (){ 
							getsecondcols.push(parseInt($(this).attr('colspan')));
					}); 
					
					$("#output").find('.pvtTable').children('thead').children('tr').eq(2).find("th.pvtColLabel").each(function (){ 
							getthirdcols.push(parseInt($(this).attr('colspan')));
					}); 
					 
				 } 
			  
					   
				$("#output").find('.pvtTable').children('tbody').children('tr').eq(0).find("th").each(function (){ 
						getfourthcols.push(1);
				}); 
				
				getfourthcols.shift();
				 
					
					var temparray = [];
					
					for(var c4=0;c4<getfirstcols.length;c4++){
						
						var getindex = getfirstcols[c4];
						
						var tempar = [];
						
						var total = 0;
						
						for (var c5=0;c5<getindex;c5++){  
							tempar.push(getsecondcols[c5]);
							total = total+getsecondcols[c5];
							if(total==getindex){
								break; 
							}
						}
						
						
						var total = 0;
						for (var c6=0;c6<=c5;c6++){  
							total = total+getsecondcols[c6]; 
							getsecondcols.shift(); 
							if(total==getindex){
								break; 
							}								
						}

						temparray[c4] = tempar;	 
					
					}
					
					 
					
					var collectoddeven2 = [];
					var collectoddeven3 = [];
					var collectoddeven4	= []; 
					for(var c6=0;c6<temparray.length;c6++){
						
						var getindexval = temparray[c6]; 
						 
						for(var c1=0;c1<getindexval.length;c1++){
						
							if(c1 % 2 === 0){
								collectoddeven2.push('');
							}else{
								collectoddeven2.push('#FFFF01');
							}
						
							var tempar = [];
						
							var total = 0;
							
							for (var c5=0;c5<getindexval[c1];c5++){  
								tempar.push(getthirdcols[c5]);
								total = total+getthirdcols[c5];
								if(total==getindexval[c1]){									
									break; 
								}
							}
							
							if(c1 % 2 === 0){
								
								for (var c5=0;c5<tempar.length;c5++){  
									collectoddeven3.push('');
								}
							
							}else{
								for (var c5=0;c5<tempar.length;c5++){  
									collectoddeven3.push('#FFFF01');
								}

							}	
							
							
							var total = 0;
							var tempar2 = [];
							for (var c5=0;c5<getfourthcols.length;c5++){  
								tempar2.push(getfourthcols[c5]);
								total = total+getfourthcols[c5];
								if(total==getindexval[c1]){									
									break; 
								}
							}
							
							//console.log(tempar2);
							
							if(c1 % 2 === 0){
								
								for (var c5=0;c5<tempar2.length;c5++){  
									collectoddeven4.push('');
								}
							
							}else{
								for (var c5=0;c5<tempar2.length;c5++){  
									collectoddeven4.push('#FFFF01');
								}

							}	
							 
														
							
						} 
					}
						
					 
					 for(var c3=0;c3<collectoddeven2.length;c3++){ 
						
						if(getcolslength==2){	
							$("#output").find('.pvtTable').children('thead').children('tr').eq(1).find("th.pvtColLabel").eq(c3).css("background-color", collectoddeven2[c3]);  
						}
						
						if(getcolslength==3){	
							$("#output").find('.pvtTable').children('thead').children('tr').eq(1).find("th.pvtColLabel").eq(c3).css("background-color", collectoddeven2[c3]);  
						}
					}
					
					for(var c3=0;c3<collectoddeven3.length;c3++){ 
						
						if(getcolslength==3){	
							$("#output").find('.pvtTable').children('thead').children('tr').eq(2).find("th.pvtColLabel").eq(c3).css("background-color", collectoddeven3[c3]);  
						} 
					}
					
					
					for(var c3=0;c3<collectoddeven4.length;c3++){  
						if(getcolslength==2){	
							$("#output").find('.pvtTable').children('tbody').children('tr').eq(0).find("th").eq(c3+1).css("background-color", collectoddeven4[c3]);  
						}
						if(getcolslength==3){	
							$("#output").find('.pvtTable').children('tbody').children('tr').eq(0).find("th").eq(c3+1).css("background-color", collectoddeven4[c3]);  
						}
					}
					
					 
				
			},
			
			 
						
			 
	},true);  
	  
});	