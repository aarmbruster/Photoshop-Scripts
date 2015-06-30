//The MIT License(MIT)
//Copyright(c) 2015 Andrew Armbruster
//Please read included LICENSE for license agreement
//  
//  version 1.0


#target photoshop

app.bringToFront();

var od = app.activeDocument;
//Name of our file minus the extension
var nameOrigin = od.name.substr(0, od.name.length - 4);

//The size of one individual panel. This way we can export panels relative to the size fo the output file from Vue
var size = od.width / 3;

//An array of coordinates used to define the individual panels created by Vue
var coords = new Array(
new Array(Array(size, 0), Array(size * 2, 0), Array(size * 2, size), Array(size, size)),
new Array(Array(0,size), Array(size, size), Array(size, size * 2), Array(0, size * 2)),
new Array(Array(size, size), Array(size * 2, size), Array(size * 2, size * 2), Array(size, size * 2)),
new Array(Array(size * 2, size), Array(size * 3, size), Array(size * 3, size * 2), Array(size * 2, size * 2)),
new Array(Array(size, size * 2), Array(size * 2, size * 2), Array(size * 2, size * 3), Array(size, size * 3)),
new Array(Array(size, size * 3), Array(size * 2, size * 3), Array(size * 2, size * 4), Array(size, size * 4))
);

//Names of each panel are created to match their respective role in Unity
var names = new Array(nameOrigin + "_Right", nameOrigin + "_Back", nameOrigin + "_Bottom", nameOrigin + "_Front", nameOrigin + "_Left", nameOrigin + "_Top");


//Individual panels must be rotated to match orientation in Unity
var rotation = new Array(0,90,-90,-90,180,90);

init();

function init()
{
	for(var i = 0; i < coords.length; i++)
	{
		makeSelection(i);
		createPanel(i);
	}
}

//Select coordinates and copy into the clipboard
function makeSelection(i)
{
	app.activeDocument = od;
	od.selection.select(coords[i]);
	od.selection.copy(true);
}

//Create a new document and paste the clipboard into it. Flatten the image, save it beside the master document and close.
function createPanel(i)
{
	var newDoc = app.documents.add(size, size, 72.0, names[i]);
	newDoc.paste();
	newDoc.flatten();
	newDoc.rotateCanvas(rotation[i]);
	var pso = new PhotoshopSaveOptions();
	newDoc.saveAs(new File(od.path + "/" + newDoc.name + ".psd"), pso);
	newDoc.close();
}