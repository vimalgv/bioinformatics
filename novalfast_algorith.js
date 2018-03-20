function novalfast(data){
		     //alert(data);
		     data=data.split('>');
		
		data=data.slice(1,data.length);
		
		n=data.length;
		alert(data.length);
		label=[]
		N=[]
		M=[];
		D2=[];
		result=data;
		idlabeldata=""
		for(var i=0;i<n;i++)
			{
			data=result[i];

		
			N[i]=[];
			for(var j=0;j<6;j++)
				N[i][j]=0;
			
			M[i]=[]
			for(var j=0;j<6;j++)
				M[i][j]=0;
			
			D2[i]=[];
			for(var j=0;j<6;j++)
				D2[i][j]=0; 

	  		pos=data.indexOf('\n');
	  		title=data.slice(0,pos);
	  		label[i]=title.split(' ')[0]
	  		idlabeldata=idlabeldata+title.split(' ')[0]+","
	  		data=data.slice(pos,data.length);
			
			$("#page").append(data+"<br><br>");	  		
	  		//data=genes[i];
	  		
	  		
	  		//$("#page").append(data);
	  		
	  			for(var k=0;k<data.length;k++){
	  				//$("#page").append(data[k]);
	  				//alert(N[i,0]);
	  					if(data[k]=='A'|| data[k]=='G')
	  						{
	  							N[i][0]++;
	  							M[i][0]+=k;
	  						}
	  					else
	  						{
	  							N[i][1]++;
	  							M[i][1]++
	  						}

	  					if(data[k]=='A'||data[k]=='C')
	  						{
	  							N[i][2]++;
	  							M[i][2]+=k;
	  						}
	  					else
	  						{
	  							N[i][3]++;
	  							M[i][3]+=k;
	  						}

	  					if(data[k]=='G'||data[k]=='T')
	  						{
	  							N[i][4]++;
	  							M[i][4]+=k;
	  						}
	  					else
	  						{
	  							N[i][5]++;
	  							M[i][5]+=k;
	  						}

	  				}
	  		for(var j=0;j<6;j++)
	  			M[i][j]/=N[i][j]
	  		
	  			//$("#page").append("<br>");
	  		
	  			for(var k=0;k<data.length;k++)
	  			{
	  				if(data[k]=='A'|| data[k]=='G')
	  					D2[i][0]=(k-M[i][0])*(k-M[i][0])
	  				else
	  					D2[i][1]=(k-M[i][1])*(k-M[i][1])

	  				if(data[k]=='A'||data[k]=='C')
						D2[i][2]=(k-M[i][2])*(k-M[i][2])
					else
						D2[i][3]=(k-M[i][3])*(k-M[i][3])	  					     
	  					D2[i][5]=(k-M[i][5])*(k-M[i][5])
	  			}
	  	
	  		for(var j=0;j<6;j++)
	  			D2[i][j]=D2[i][j]/(N[i][j]*n);
	  				
	  		}
	  		
	  		process();
}
function process(){
	//for(a=0;a<n;a++)
	//alert("a="+a+"("+N[a][0]+" , "+M[a][0]+" , "+D2[a][0]+") "+" ("+N[a][1]+" , "+M[a][1]+" , "+D2[a][1]+" ) "+" ( "+N[a][2]+" , "+M[a][2]+" , "+D2[a][2]+" ) "+" ( "+N[a][3]+" , "+M[a][3]+" , "+D2[a][3]+" ) "+" ( "+N[a][4]+" , "+M[a][4]+" , "+D2[a][4]+" ) "+" ( "+N[a][5]+" , "+M[a][5]+" , "+D2[a][5]+" ) ")
	optimal=[];
	var loc;
	for(var a=0;a<n;a++){

		optimal[a]=[];
		for(b=0;b<a;b++){
			optimal[a][b] = Math.pow( ( Math.pow( (N[a][0]-N[b][0]) ,2)+ Math.pow( (N[a][1]-N[b][1]) ,2) + Math.pow( (N[a][2]-N[b][2]) ,2) + Math.pow( (N[a][3]-N[b][3]) ,2) + Math.pow( (N[a][4]-N[b][4]) ,2) +Math.pow( (N[a][5]-N[b][5]) ,2) + Math.pow( (M[a][0]-M[b][0]) ,2)+Math.pow( (M[a][1]-M[b][1]) ,2)+Math.pow( (M[a][2]-M[b][2]) ,2)+Math.pow( (M[a][3]-M[b][3]) ,2)+Math.pow( (M[a][4]-M[b][4]) ,2)+Math.pow( (M[a][5]-M[b][5]) ,2)+Math.pow( (D2[a][0]-D2[b][0]) ,2)+Math.pow( (D2[a][1]-D2[b][1]) ,2)+Math.pow( (D2[a][2]-D2[b][2]) ,2)+Math.pow( (D2[a][3]-D2[b][3]) ,2)+Math.pow( (D2[a][4]-D2[b][4]) ,2)+Math.pow( (D2[a][5]-D2[b][5]) ,2) ),(1/2) );
		}
	
	}

	
	function minvalueoftable(table){
		min= Number.MAX_VALUE; 
		var loc=[]
		for(var i=0;i<table.length;i++)
			for(var j=0;j<i;j++)
				if(table[i][j]<min){
					min=table[i][j];
					loc[0]=i;
					loc[1]=j;
				}
		return loc;
	}
	//alert(minvalueoftable(optimal)[1]);
	function joinlabel(a,b){
	
		if(b<a)
			[a,b] = [b,a];
		label[a]="("+label[a]+","+label[b]+")";
		label=(label.slice(0,b)).concat((label.slice(b+1,label.length)));
	}
	//joinlabel(3,2)
	//joinlabel(2,4);
	//alert(label[2]+" "+label.length);
	function jointable(a,b){
		if(b<a)
			[a,b]=[b,a];
		var row=[]
		
		for(var i=0;i<a;i++)
			row[i]=(optimal[a][i]+optimal[b][i])/2;

		optimal[a]=row

		for(var i=a+1;i<b;i++)
			optimal[i][a]=(optimal[i][a]+optimal[b][i])/2;

		for(var i=b+1;i<optimal.length;i++){
			optimal[i][a]=(optimal[i][a]+optimal[i][b])/2;
			optimal[i]=(optimal[i].slice(0,b)).concat((optimal[i].slice(b+1,optimal[i].length)))
		}

		optimal=(optimal.slice(0,b)).concat((optimal.slice(b+1,optimal.length)));
	}
	function upgma(){

		while(label.length>1){

				table="<table border=\"2px\">"
				for(a=0;a<optimal.length;a++){
				table+="<tr>";
					for(b=0;b<n;b++){
					table+="<td>"+optimal[a][b]+"</td>";
					}
				table+="</tr>"
				}
				table+="</table>"

	//$("#page").append(table+"<br><br><br>")

			var pos=minvalueoftable(optimal);
			jointable(pos[0],pos[1]);
			joinlabel(pos[0],pos[1]);
		}
		return label[0];
	}
	result=upgma();
	result=result.slice(0,result.length);
	phylogenitictree(result);
	
}
function novalfastdata(sequences){


			//alert('hi');
			$.post('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=sequences&id='+sequences+'&rettype=fasta&retmode=text',function(data){   
		     novalfast(data);
			});
		}

function phylogenitictree(treedata){
	//alert(treedata);
	var dataObject = { newick: treedata+';' };
			phylocanvas = new Smits.PhyloCanvas(
				dataObject,
				'treearea', 
				1200, 5000
			);


}