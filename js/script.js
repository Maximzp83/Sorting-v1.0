// ---------обработка input----------

var quantityVal = function() {
	var val = document.getElementsByName('quantity')[0].value;
	return +val;
}

var rangeMin = function() {
	var val = document.getElementsByName('min-range-input')[0].value;
	return +val;
}

var rangeMax = function() {
	var val = document.getElementsByName('max-range-input')[0].value;
	return +val;
}

// ------------------Обработка Select-----------

var sortMethodVal = function() {
    var val = document.getElementsByName('method-list')[0].value;
    return val;
}

var sortProcessVal = function() {
    var val = document.getElementsByName('process-list')[0].value;
    return val;
}


// -----------------------------
var elementsArray = [];
var sortedArray = [];

// ------Массив с цифрами для сортировки-----------
// переменная "elementsArray" - заполняется при нажатии Generate
// ---------------------------------------------------


// ------------Кнопка Generate-----------------
function clickGenerateButton() {
    elementsArray = generateElementsArray ( quantityVal(), rangeMin(), rangeMax() );

    elementsClear();
    elementsCreate();
    showMethod_ElementsContainer()
    
    sortingClear();
    sortingCreate();
    showSortedContainer()
}

// ------------Кнопка Sort-----------------
function clickSortButton() {
	sortedArray = sortingElements (sortMethodVal(), sortProcessVal() );
    sortingClear();

    resultsClear();
    resultsCreate();
}


// -----------Генератор набора чисел---------
function generateElementsArray(quantityVal, rangeMin, rangeMax) {
	var resArray = [];
	if (quantityVal >= 2 && quantityVal <= 24) {
		if (rangeMin < rangeMax) {
			for (var i = 0; i < quantityVal; i++) {
				resArray[i] = rangeMin + Math.floor( Math.random() * (rangeMax + 1 - rangeMin) );
				}
			return resArray;
			} else {

				var message = document.getElementsByClassName('alert')[0];
				    message.style.cssText = "display: block;";
                    message.onclick = function() {
                        message.style.cssText = "display: none;";
                    }
				return false;
				}
		} else {

            var message = document.getElementsByClassName('alert-big')[0];
                    message.style.cssText = "display: block;";
                    message.onclick = function() {
                        message.style.cssText = "display: none;";
                    }
			return false;
			}
}

// -----------Функция сортировки---------------------------------
// ---------------------------------------------------------------
function sortingElements(sortMethodVal, sortProcessVal) {
    var resArray = [];
    
    if (sortMethodVal == 'Сортировка Выбором' && sortProcessVal == 'по убыванию') {
        resArray = decreaseSelection(elementsArray);
    };
    
    if (sortMethodVal == 'Сортировка Выбором' && sortProcessVal == 'по возрастанию') {
        resArray = increaseSelection(elementsArray);
    };

    if (sortMethodVal == 'Быстрая Сортировка' && sortProcessVal == 'по убыванию') {
        resArray = decreaseQuicksort(elementsArray);
    };

    if (sortMethodVal == 'Быстрая Сортировка' && sortProcessVal == 'по возрастанию') {
        resArray = increaseQuicksort(elementsArray);
    };

   return resArray; 
}

// -----------------Функции расчета и Анимации---------------------
// ..............выбором по убыванию.........

               // Пока нет 

// -----------------Расчетные функции------------------------
// ..............выбором по убыванию.........
function decreaseSelection(elementsArray) {
    var array = elementsArray;
    for(var i = 0; i < array.length; i++) {
        var maxElem = array[i];
        var maxIndex = i;
        for (var j = i; j < array.length; j++) {
            if (array[j] > maxElem) {
                maxElem = array[j];
                maxIndex = j;
            }
        }
        array =  array_swap(array, i, maxIndex);
    }
    return array;
}

// ...............выбором по возрастанию............
function increaseSelection(elementsArray) {
    var array = elementsArray;
    for(var i = 0; i < array.length; i++) {
        var minElem = array[i];
        var minIndex = i;
        for (var j = i; j < array.length; j++) {
            if (array[j] < minElem){
                minElem = array[j];
                minIndex = j;
            }
        }
        array = array_swap(array, i, minIndex);
    }
    return array;
}

// .................................
function array_swap(array, key, key2) {
        if (array[key] !== undefined && array[key2] !== undefined) {
            var temp = array[key];
            array[key] = array[key2];
            array[key2] = temp;
            return array;
        }
        return false;
    }


// .................Быстрая по убыванию.................
function decreaseQuicksort(elementsArray) {
    var array = elementsArray;
    var arrayCopy = array;
    var left = 0;
    var right = arrayCopy.length - 1;
    arrayCopy = funcForDecrQuicksort(arrayCopy, left, right);
    return arrayCopy;
}


function funcForDecrQuicksort(array, left, right) {

    var l = left;
    var r = right;
    var center = array[parseInt((left + right) / 2,10)];

    do {
        while (array[r] < center) {
            r--;
        }

        while (array[l] > center) {
            l++;
        }

        if (l <= r) {
            var temp = array[r];
            array[r] = array[l];
            array[l] = temp;
            l++;
            r--;
        }
    } while (l <= r);

    if (r > left) {
        funcForDecrQuicksort(array, left, r);
    }

    if (l < right) {
        funcForDecrQuicksort(array, l, right);
    }
    return array;
}

// .............Быстрая по возрастанию.........................
function increaseQuicksort(elementsArray) {
    var array = elementsArray;
    var arrayCopy = array;
    var left = 0;
    var right = arrayCopy.length - 1;
    arrayCopy = funcForIncrQuicksort(arrayCopy, left, right);
    return arrayCopy;
}

function funcForIncrQuicksort(array, left, right) {
    var l = left;
    var r = right;
    var center = array[parseInt((left + right) / 2,10)];

    do {
       
        while (array[r] > center) {
            r--;
        }

        while (array[l] < center) {
            l++;
        }

        if (l <= r) {
            var temp = array[r];
            array[r] = array[l];
            array[l] = temp;
            l++;
            r--;
        }

    } while (l <= r);

    if (r > left) {
        funcForIncrQuicksort(array, left, r);
    }

    if (l < right) {
        funcForIncrQuicksort(array, l, right);
    }
    return array;
}

// ..................................................
// --------------------------------------------------



// ------------Создание/удаление элементов---------

function showMethod_ElementsContainer() {
    if (elementsArray) {
    var container = document.getElementsByClassName('method-container')[0];
    container.style.cssText = "visibility: visible; \
                                opacity: 1; \ ";
    var elems_container = document.getElementsByClassName('section-elements-array')[0];
    elems_container.style.cssText = "visibility: visible; \
                                    opacity: 1; \ ";
   
    } else {
        var container = document.getElementsByClassName('method-container')[0];
            container.style.cssText = "visibility: hidden; \
                                        opacity: 0; \ ";
        var elems_container = document.getElementsByClassName('section-elements-array')[0];
            elems_container.style.cssText = "visibility: hidden; \
                                                opacity: 0; \ ";
            };
}

function elementsCreate() {
    if (elementsArray) {
        // setTimeout(function() { 
        for (var i = 0; i < elementsArray.length; i++) {
            var element = document.createElement('div');
            element.className = "sort-element";
            element.innerHTML = elementsArray[i];
            elementsContainer.appendChild(element);
        }       
        // },500); 
        setTimeout(function() {
            for (var i = 0; i < elementsArray.length; i++) {
                 var element = document.getElementsByClassName("sort-element")[i];
                     element.style.cssText = "opacity: 1; \
                                     transition: 0.7s; \ ";
                                 }
            },300);
    }
}

function elementsClear() {
    var parent = document.getElementById('elementsContainer');
     if (parent.childNodes.length > 1) {
        var lengthIndex = parent.childNodes.length;
        // setTimeout(function() { 
            for (var i = 0; i < parent.childNodes.length; i++) {
            parent.childNodes[i].style.cssText = "opacity: 0; \
                                        transition: 0.7s; \ ";
             };
        // },500);
            // setTimeout(function() {      
            for (var i = 0; i < lengthIndex; i++) {
                parent.removeChild(parent.childNodes[0]);
             }
            // },500);
    }
}


// ------------Создание/удаление результатов---------

function resultsCreate() {
    if (sortedArray) {
        // setTimeout(function() { 
        for (var i = 0; i < sortedArray.length; i++) {
            var element = document.createElement('div');
            element.className = "sort-element sorted";
            element.innerHTML = sortedArray[i];
            resultElementsContainer.appendChild(element);
            }       
        // },500); 
            setTimeout(function() {
               for (var i = 0; i < sortedArray.length; i++) {
                    var element = document.getElementsByClassName("sort-element sorted")[i];
                     element.style.cssText = "opacity: 1; \
                                     transition: 0.7s; \ ";
                                 }
                },300);
    }
}

function resultsClear() {
    var parent = document.getElementById('resultElementsContainer');
     if (parent.childNodes.length > 1) {
        var lengthIndex = parent.childNodes.length;
        // setTimeout(function() { 
            for (var i = 0; i < parent.childNodes.length; i++) {
            parent.childNodes[i].style.cssText = "opacity: 0; \
                                        transition: 0.7s; \ ";
             };
        // },500);
            // setTimeout(function() {      
            for (var i = 0; i < lengthIndex; i++) {
                parent.removeChild(parent.childNodes[0]);
             }
            // },500);
    }
}

function showSortedContainer() {
    if (elementsArray) {
        var sort_elems_container = document.getElementsByClassName('section-sorted-elements')[0];
            sort_elems_container.style.cssText = "visibility: visible; \
                                              opacity: 1; \ ";
    } else {
        var sort_elems_container = document.getElementsByClassName('section-sorted-elements')[0];
            sort_elems_container.style.cssText = "visibility: hidden; \
                                                  opacity: 0; \ ";
        }
}

function sortingCreate() {
    if (elementsArray) {
        // setTimeout(function() { 
        for (var i = 0; i < elementsArray.length; i++) {
            var element = document.createElement('div');
            element.className = "sorting-element";
            element.innerHTML = elementsArray[i];
            resultElementsContainer.appendChild(element);
            }       
        // },500); 
            setTimeout(function() {
               for (var i = 0; i < elementsArray.length; i++) {
                    var element = document.getElementsByClassName("sorting-element")[i];
                     element.style.cssText = "opacity: 1; \
                                     transition: 0.7s; \ ";
                                 }
                },300);
    }
}

function sortingClear() {
    var parent = document.getElementById('resultElementsContainer');
     if (parent.childNodes.length > 1) {
        var lengthIndex = parent.childNodes.length;
        // setTimeout(function() { 
            for (var i = 0; i < parent.childNodes.length; i++) {
            parent.childNodes[i].style.cssText = "opacity: 0; \
                                        transition: 0.7s; \ ";
             };
        // },500);
            
            // setTimeout(function() {      
            for (var i = 0; i < lengthIndex; i++) {
                parent.removeChild(parent.childNodes[0]);
             }
            // },500);
    }
}


// -----------------------------------

