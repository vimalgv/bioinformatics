function needlemandata(sequences){


			//alert('hi');
			$.post('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=sequences&id='+sequences+'&rettype=fasta&retmode=text',function(data){   
		     needleman(data);
			});
		}
function needleman(data){
		//alert(data);
	    data=data.split('>');
		data=data.slice(1,data.length);
		n=data.length;
		//alert(data.length);
		seq1=data[0];
		pos=data[0].indexOf('\n');
		seq1=data[0].slice(pos,data[0].length);
		pos=data[1].indexOf('\n');
		seq2=data[1].slice(pos,data[1].length);
		//alert(seq1);
		//alert(seq2);
		var seq1_len=seq1.length-2;
		var seq2_len=seq2.length-2;

		var score=[];
		for(var i=0;i<seq2_len;i++)
			{
				score[i]=[];
				for(var j=0;j<seq1_len;j++)
					score[i][j]=0;
			}
		//alert(seq1.substr(0,5)==seq1.substr(0,5));
		for(var i=1;i<seq2_len;i++)
			for(var j=1;j<seq1_len;j++){
				var scorediag=0;
				
				if(seq1.substr(j-1,1)==seq2.substr(i-1,1))
					scorediag=score[i-1][j-1]+2;
				else
					scorediag=score[i-1][j-1]-1;

				var scoreleft=score[i][j-1]-2;
				var scoreup=score[i-1][j]-2;

				var maxscore=Math.max(scorediag,scoreleft,scoreup);
				score[i][j]=maxscore;
			}
		
		var alignmentA="";
		var alignmentB="";
		var m = seq2_len-1;
		var n=seq1_len-1;
		while(m>0&&n>0){
			var scorediag=0;

			if(seq2[m-1]==seq1[n-1])
				scorediag=2;
			else
				scorediag=-1;

			if(m>0 && n>0 && score[m][n]==score[m-1][n-1]+scorediag){
				alignmentA=seq1[n-1]+alignmentA;
				alignmentB=seq2[m-1]+alignmentB;
				m=m-1;
				n=n-1;
			}
			else if(n>0 && score[m][n]==score[m][n-1]-2){
				alignmentA=seq1[n-1]+alignmentA;
				alignmentB='-'+alignmentB;
				n=n-1;
			}
			else{
				alignmentA='-'+alignmentA;
				alignmentB=seq2[m-1]+alignmentB;
				m=m-1;
			}
		}
		//alert(alignmentA);
		//alert(alignmentB);
		DNAGraph(alignmentA,alignmentB);
		var alignmentAlen=alignmentA.length;
		for(var i=0;i<alignmentAlen/50;i++)
			{
				$("#dnasequences").append("<br><br>");
				
				for(var j=0;j<50;j++){
					/*if(alignmentA[i*100+j]=='A')
					$("#dnasequences").append("<span style='color:red'>"+alignmentA[i*100+j]+"/<span>");

				    else if(alignmentA[i*100+j]=='T')
					$("#dnasequences").append("<span style='color:green'>"+alignmentA[i*100+j]+"/<span>");
					
					else if(alignmentA[i*100+j]=='C')
					$("#dnasequences").append("<span style='color:orange'>"+alignmentA[i*100+j]+"/<span>");

					else if(alignmentA[i*100+j]=='G')
					$("#dnasequences").append("<span style='color:blue'>"+alignmentA[i*100+j]+"/<span>");
					else*/
						$("#dnasequences").append("<b>"+alignmentA[i*100+j]+"</b>");

				}
				
				$("#dnasequences").append("<br>");
				
				for(var k=0;k<50;k++){
					/*if(alignmentB[i*100+j]=='A')
					$("#dnasequences").append("<span style='color:red'>"+alignmentB[i*100+j]+"/<span>");

				    else if(alignmentB[i*100+j]=='T')
					$("#dnasequences").append("<span style='color:green'>"+alignmentBi*100+j]+"/<span>");
					
					else if(alignmentB[i*100+j]=='C')
					$("#dnasequences").append("<span style='color:orange'>"+alignmentB[i*100+j]+"/<span>");

					else if(alignmentB[i*100+j]=='G')
					$("#dnasequences").append("<span style='color:blue'>"+alignmentB[i*100+j]+"/<span>");
					else*/
						$("#dnasequences").append("<b>"+alignmentB[i*100+k]+"</b>");

				}
			}

}

function DNAGraph(sequencedata,sequencedata2){

				var genedata=[]
				//alert(sequencedata.length)
				for(var i=0;i<sequencedata.length;i++)
				{
					if(sequencedata[i]=='A')
						genedata[i]=4;
					else if(sequencedata[i]=='C')
						genedata[i]=3;
					else if(sequencedata[i]=='G')
						genedata[i]=2;
					else if(sequencedata[i]=='T')
						genedata[i]=1;
					else genedata[i]=0;
				}
                var genedata2=[]
				for(var i=0;i<sequencedata2.length;i++)
				{
					if(sequencedata2[i]=='A')
						genedata2[i]=4;
					else if(sequencedata2[i]=='C')
						genedata2[i]=3;
					else if(sequencedata2[i]=='G')
						genedata2[i]=2;
					else if(sequencedata2[i]=='T')
						genedata2[i]=1;
					else genedata2[i]=0;
				}

				//alert(genedata[0])
				var graphseq=[]
				graphseq[0]={
				            label:"sequence 1",
				            borderColor: 'rgb(255, 99, 132)',
				            data:genedata,
				            fill:"true"
				    }
				graphseq[1]={
				            label:"sequence 2",
				            borderColor: 'rgb(0, 0, 0)',
				            data:genedata2,
				            fill:"true"
				    }
				var dnachart=$("#graphdisp");
				//dnachart.canvas.width=1200;
				//Chart.defaults.global.legend.display = false;
				var chart=new Chart(dnachart,{
					type:'line',

					data:{
					
						labels:sequencedata.split(""),
						datasets:[
						graphseq[0],graphseq[1]
						]
					}, 
				
					options:{

						scales:{
							yAxes:[{
								ticks:{

									stepSize:1,
									callback:function(value,index,values){
										if(value=='4')
											return 'A'
										else if(value=='3')
											return 'C'
										else if(value=='2')
											return 'G`'
										else if(value=='1')
											return 'T'
										else return '-'
										
									}
								}
							}]
						}

					}
				});
				}
