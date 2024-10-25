function performe(data) {
    try {

        var compId = parseInt(data.compId, 10);

        var comp = app.project.itemByID(compId);


        setTextLayerValue(comp, data.layerName, data.newValue,data.font);
        return true;
    } catch (error) {
        return "Error: " + error.message;
    }
}


function setTextLayerValue(comp, layerName, newValue, font) {
    try {
        var layer = comp.layer(layerName);
        if (layer != null && layer.property("Source Text") != null) {
            var textProp = layer.property("Source Text");
            var textDocument = textProp.value; // Получаем текущий TextDocument

            // Разбиваем текст на строки по 18 символов без разрыва слов
            var maxLength = 18;
            var words = newValue.split(" ");
            var formattedText = "";
            var line = "";

            for (var i = 0; i < words.length; i++) {
                var word = words[i];
                
                // Проверяем, поместится ли слово в текущей строке
                if (line.length + word.length <= maxLength) {
                    line += (line.length > 0 ? " " : "") + word;
                } else {
                    // Если слово не помещается, добавляем текущую строку в formattedText
                    // и начинаем новую строку с текущим словом
                    formattedText += line + "\r";
                    line = word;
                }
            }

            // Добавляем оставшуюся строку в formattedText
            formattedText += line;

            textDocument.text = formattedText; // Устанавливаем отформатированный текст

            if (font != null && font !== undefined && font !== "") {
                textDocument.font = font;  
            }

            textProp.setValue(textDocument); 
        } else {
            return "Error: Layer not found or does not contain text.";
        }
    } catch (error) {
        return "Error: " + error.message;
    }
}


// function setTextLayerValue(comp, layerName, newValue,font) {
//     try {
//         var layer = comp.layer(layerName);
//         if (layer != null && layer.property("Source Text") != null) {
//             var textProp = layer.property("Source Text");
//             var textDocument = textProp.value;  // Получаем текущий TextDocument
            
//             textDocument.text = newValue;      // Устанавливаем новый текст

//             if (font != null && font !== undefined && font !== "")
//             {
//                 textDocument.font = font;  
//                // alert("set "+font)
//             }

//             textProp.setValue(textDocument); 
//         } else {
//             return "Error: Layer not found or does not contain text.";
//         }
//     } catch (error) {
//         return "Error: " + error.message;
//     }
// }


