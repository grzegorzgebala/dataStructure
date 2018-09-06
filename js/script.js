'use strict';

var data = [
	{
		id: 'box1',
		title: 'First box',
		content: '<p>Lorem ipsum dolor sit amet!</p>',
		categories: ['highlighted', 'special-header', 'important']
	},
	{
		id: 'box2',
		title: 'Second box',
		content: '<p>Lorem ipsum dolor sit amet!</p>',
		categories: ['special-header', 'important']
	},
	{
		id: 'box3',
		title: 'Third box',
		content: '<p>Lorem ipsum dolor sit amet!</p>',
		categories: ['highlighted', 'important']
	},
	{
		id: 'box4',
		title: 'Fourth box',
		content: '<p>Lorem ipsum dolor sit amet!</p>',
		categories: ['highlighted']
	},
	{
		id: 'box5',
		title: 'Fifth box',
		content: '<p>Lorem ipsum dolor sit amet!</p>',
		categories: []
	},
];

(function(){ 
	/* W tym przykładzie mamy kilka boksów i chcemy aby każdy z nich: 
	- w nagłówku miał swoje id,
	- po kliknięciu w nagłówek cały boks zmieniał kolor tła.
	
	Zacznijmy od napisania funkcji, która zmienia kolor tła boksa. Funkcja ta będzie przypięta do zdarzenia click na nagłówku boksa, więc słowo this w tej funkcji będzie oznaczało "kliknięty nagłówek". 
	*/
	
	var headerClickCallback = function(event){
		this.parentElement.classList.toggle('box-bg');
	};
// Teraz musimy znaleźć wszystkie boksy - użyjemy do tego ich klasy. Pamiętaj, że querySelector zwraca pierwszy element pasujący do selektora, a querySelectorAll zwraca tablicę ze wszystkimi pasującymi elementami. 

	var boxes = document.querySelectorAll('.box');

	for( var i = 0; i < boxes.length; i++ ){
		
		// Najpierw zapiszemy sobie nagłówek bieżącego boksa do zmiennej, aby nie wyszukiwać go ponownie:
		
		var boxHeader = boxes[i].querySelector('header');
		
		// Następnie w treści nagłówka wpiszemy id boksa (nie nagłówka!)
		
		boxHeader.innerHTML = 'Box id:' + data[i].id;
		
		// I jeszcze pozostaje nam przypisać funkcję headerClickCallback do eventu click na tym boksie:
		
		boxHeader.addEventListener('click', headerClickCallback);
	}
	})(); 
/*
// Zacznijmy od kodu, który po kliknięciu w nagłówek zmienia jego styl (tylko styl nagłówka). 

var headerClickCallback = function(event){
	this.classList.toggle('header-special');
};

var box1Header = document.querySelector('#box1 header');
var box2Header = document.querySelector('#box2 header');
var box3Header = document.querySelector('#box3 header');

box1Header.addEventListener('click', headerClickCallback);
box2Header.addEventListener('click', headerClickCallback);
box3Header.addEventListener('click', headerClickCallback);

// I dodajmy analogiczny kod, zmieniający tło boksa, kiedy boks zostanie kliknięty. 

var boxClickCallback = function(event){
	this.classList.toggle('box-bg');
};

var box1 = document.querySelector('#box1');
var box2 = document.querySelector('#box2');
var box3 = document.querySelector('#box3');

box1.addEventListener('click', boxClickCallback);
box2.addEventListener('click', boxClickCallback);
box3.addEventListener('click', boxClickCallback);

/* Zwróć uwagę, że kiedy klikasz w nagłówek, zadziałają obie akcje. Tzn. został kliknięty zarówno nagłówek, jak i boks w którym jest ten nagłówek. 

Konkretniej rzecz biorąc, najpierw został kliknięty nagłówek, a następnie event kliknięcia został przekazany jego rodzicowi (czyli boksowi), który też ma przypisany eventListener na kliknięcie. 

Możemy jednak to przekazanie - czyli propagację - zatrzymać. Zróbmy to dla nagłówka w trzecim boksie: 


box3Header.addEventListener('click', function(event){
	event.stopPropagation();
});

/* Tu musimy wyjaśnić kilka aspektów powyższego kodu: 

1. Argument funkcji która jest callbackiem, jak już wspominaliśmy, reprezentuje zdarzenie (w naszym przypadku kliknięcie). W nim zawarta jest m.in. funkcja stopPropagation, która powstrzymuje przekazywanie eventu w górę drzewa DOM. 

2. Jeden element może mieć wiele eventListenerów! Wykonane zostaną w takiej kolejności, w jakiej były zadeklarowane. Funkcja stopPropagation może być użyta w dowolnym z nich i zadziała tak samo. 

W ten sposób zablokowaliśmy propagację tylko dla headera w trzeci, boksie. Możesz porównać różnice w jego działaniu z pozostałymi boksami. 

Napiszemy teraz skrypt do obsługi linka "Change header style" - on również będzie miał zablokowaną propagację, jednak dla linka dodatkowo chcemy zablokować domyślną akcję. Link domyślnie zmienia adres strony, a w naszym przypadku chcemy, żeby jego kliknięcie powodowało tylko uruchomienie naszego kodu. Wykorzystamy do tego funkcję preventDeafult, która również znajduje się w argumencie evenet. 


var box3Link = box3.querySelector('.toggle-special-header');

box3Link.addEventListener('click', function(event){
	event.stopPropagation();
	event.preventDefault();
	
	this.parentElement.querySelector('header').classList.toggle('header-special');
});
*/