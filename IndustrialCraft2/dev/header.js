/*
  ___               _                 _            _           _      ____                    __   _   
 |_ _║  _ __     __| ║  _   _   ___  | ║_   _ __  |_║   __ _  | ║    / ___║  _ __    __ _   _/ _║ | ║_ 
  | ║  | '_ \   / _` ║ | ║ | ║ / __║ | __║ | '__║ ,─╗  / _` ║ | ║   | ║     | '__║  / _` ║ [  _]  | __║
  | ║  | ║ | ║ | (_| ║ | ║_| ║ \__ \ | ║_  | ║    | ║ | (_║ ║ | ║   | ║___  | ║    | (_| ║  | ║   | ║_ 
 |___║ |_║ |_║  \__,_║  \__,_║ |___/  \__║ |_║    |_║  \__,_║ |_║    \____║ |_║     \__,_║  |_║    \__║
 
 by MineExplorer (vk.com/vlad.gr2027) and NikolaySavenko (vk.com/savenkons)
 based on Industrial Core by zheka_smirnov (vk.com/zheka_smirnov)

 This code is a copyright, do not distribute.
*/

// libraries
IMPORT("flags");
IMPORT("Vector");
IMPORT("ToolLib");
IMPORT("EnergyNet");
IMPORT("ChargeItem");
IMPORT("TileRender");
IMPORT("StorageInterface");
IMPORT("LiquidLib");
IMPORT("BackpackAPI");

// constants
var GUI_SCALE = 3.2;
const fallVelocity = -0.0784;

// import functions
var nativeDropItem = ModAPI.requireGlobal("Level.dropItem");
var Color = android.graphics.Color;

// energy (Eu)
var EU = EnergyTypeRegistry.assureEnergyType("Eu", 1);

// API
function random(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function addShapelessRecipe(result, source){
	var ingredients = [];
	for(var i in source){
		var item = source[i];
		for(var n = 0; n < item.count; n++){
			ingredients.push(item);
		}
	}
	Recipes.addShapeless(result, ingredients);
}

// vanilla items
Recipes.addFurnaceFuel(325, 10, 2000); // lava bucket
ChargeItemRegistry.registerFlashItem(331, "Eu", 800, 0); // redstone

// debug
var lasttime = -1
var frame = 0

Callback.addCallback("tick", function(){
	if(Config.debugMode){
		var t = Debug.sysTime();
		if(frame++ % 20 == 0){
			if(lasttime != -1){
				tps = 1000 / (t - lasttime) * 20
				Game.tipMessage(Math.round(tps * 10) / 10 + "tps")
			}
			lasttime = t
		}
	}
});
