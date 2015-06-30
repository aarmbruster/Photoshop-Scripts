//The MIT License(MIT)
//Copyright(c) 2015 Andrew Armbruster
//Please read included README for LICENSE agreement

displayDialogs = DialogModes.NO;
saveOptions = new PNGSaveOptions();

var AD = activeDocument;

start();

function start()
{
	if(!AD.saved)
	{
		alert("Please save your document");	
		return;	
	}
	seperateLayers();
}
function seperateLayers()
{
	if (documents.length != 0)
	{
		var outputFolder = Folder.selectDialog("Select a folder for the output files")
		
		if(outputFolder == null){ return; }
		
		var checkArray = new Array(AD.layers.length);
		
		for(a = 0; a < AD.layers.length; a++)
		{
			var currentLayer = AD.layers[a];
			if(!((currentLayer.kind == LayerKind.TEXT)||(currentLayer.kind == LayerKind.NORMAL)||(currentLayer.kind == LayerKind.LayerSet)) && currentLayer.visible != 0)
			{
				  checkArray[a] = 0;
			} 
			else
			{
				checkArray[a] = 1;
			}
			
			if(AD.layers[a].length <= 1)
			{
				alert("You only have one layer, is this really necessary?");
			}else{
				AD.layers[a].visible = 0;	
			}
		}
		
		for(a = 0; a < AD.layers.length; a++)
		{
			if(checkArray[a] == 1)
			{
				AD.layers[a].visible = 1;
				newFile = new File(outputFolder+"/("+(a)+")_"+AD.layers[a].name+".png");
				AD.saveAs (newFile,saveOptions, true, Extension.LOWERCASE);
			}
			
			if(AD.layers[a].length <= 1)
			{
				AD.layers[a].visible = 1;
			}
		}
		
		for(a = 0; a < AD.layers.length; a++)
		{
			AD.layers[a].visible = checkArray[a];
		}
	}
}