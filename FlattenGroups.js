//The MIT License(MIT)
//Copyright(c) 2015 Andrew Armbruster
//Please read included README for LICENSE agreement

displayDialogs = DialogModes.NO;

var FILE_TYPE = ".psd, .pdb"; // The type of files that this script works on -- you can change
var SEARCH_MASK = ".psd, .pdb" + FILE_TYPE; // Image file filter to find only those files
var XMP_TYPE = ".xmp"; // File extension for XMP output files
var MAC_XMP_TYPE = "XMPT"; // Macintosh file type for .xmp files
var MAC_XMP_CREATOR = "8BIM"; // Macintosh file creator for .xmp files

init()

function init()
{
	var ND;
	try
	{
		var AD = activeDocument;
		var ND = app.documents.add(AD.width, AD.height, 72.0);
	
		displayDialogs = DialogModes.ALL;
		savePSD(ND, AD.path);
		flattenGroups(AD);
	
	}catch(e){
		
		ND.close(SaveOptions.DONOTSAVECHANGES);
		return;
	}
	ND.close(SaveOptions.SAVECHANGES);
}

function savePSD( doc, saveFile ) 
{
     var saveOptions = new PhotoshopSaveOptions();
     doc.saveAs( saveFile, saveOptions, false);
    
}

function flattenGroups(AD)
{
	var ND = activeDocument;
	
	displayDialogs = DialogModes.NO;
	
	for(i = AD.layerSets.length - 1; i >= 0;i--)
	{
		if(AD.layers[i].typename == "ArtLayer")
		{
			continue;
		}
		var newSet = ND.layerSets.add();
		newSet.name = AD.layerSets[i].name;
		ND.activeLayer = newSet;
		app.activeDocument = AD;
		AD.activeLayer = AD.layerSets[i];
		var tmp = AD.activeLayer.duplicate(ND.layerSets[0], ElementPlacement.PLACEBEFORE);
		app.activeDocument = ND;
		tmp = tmp.merge();
		tmp.move(newSet, ElementPlacement.INSIDE);
	}
}