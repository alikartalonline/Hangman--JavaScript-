const wordDOM = document.getElementById('word');
const popDOM = document.getElementById('popup-container');
const messageDOM = document.getElementById('successMessage');
const wrongLettersDOM = document.getElementById('wrong-letters');
const victimDOM = document.querySelectorAll('.victim');
const letterMessageDOM = document.getElementById('message');
const playAgainButton = document.getElementById('playAgain');

const correctLetters = [];
const wrongLetters = [];
let selectedWord = randomWord();

function randomWord() {
    const words = ["javascript", "python", "java", "kotlin", "php"];

    return words[Math.floor(Math.random() * words.length)];
}

function displayWord() {

    wordDOM.innerHTML = `
    ${selectedWord.split('').map(eachLetter => `
        <div class="letter">
            ${correctLetters.includes(eachLetter) ? eachLetter : ''}
         </div>
        `).join('')}
        `;

    const realWord = wordDOM.innerText.replace(/\n/g, '')
// buradaki komut ile karakteri yan yana getirmek istiyorum. 
// Yani console.log'da bakınca karakterler alt alta geliyor. 
// Bu istediğimiz şey değil, çünkü karakterler bir bütün oluşturmuyor
// 
        if (realWord == selectedWord) {
            popDOM.style.display = "flex";
            messageDOM.innerText = "Tebrikler, Kazandınız!"
        }

    }


function updateWrongLetters() {
    wrongLettersDOM.innerHTML = `
    ${wrongLetters.length > 0 ? `<h3> Wrong Letters </h3>` : ""}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `

    victimDOM.forEach((item, index) => {
        // hatalı harf sayısını bulmak için değişkene atadım
        const errorCount = wrongLetters.length

        // index hatalı harf sayısından az ise display: block yapacağız.
        if(index < errorCount) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    })

    if (wrongLetters.length == victimDOM.length) {
        popDOM.style.display = "flex";
        messageDOM.innerText = "Unfortunately you were hanged :)"
    }

}


/*
Google: keycode event 
https://www.toptal.com/developers/keycode/for/a
*/

function displayMessage() {
    letterMessageDOM.classList.add("show")

    setTimeout(() => {
        letterMessageDOM.classList.remove("show")
    }, 2000)
}

playAgainButton.addEventListener("click", () => {
    // listeleri sıfırlayalım
    correctLetters.splice(0);
    wrongLetters.splice(0);

    // yeni bir kelime hazırlamamız gerekiyor, o yüzden randomWord() fonksiyonunu kullanıyoruz.
    selectedWord = randomWord();

    // Dom'u tekrardan çağırıp hazırlamamız gerekiyor, çünkü yeni üretilen kelimenin ekrana yansıması için
    displayWord();
    updateWrongLetters();

    //ekranda gözüken uyarıyı da buradan gizleyelim
    popDOM.style.display = "none";
});


window.addEventListener('keydown', e => {
    // console.log(e.key); // a
    // console.log(e.keyCode); // 65
    
    // ben "ctrl","alt" gibi tuşların koda eklenmesini istemiyorum, o yüzden 65 ile 90 arasını alacağım.
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key

        // letter yani klavyeden sallayarak oluşturduğumuz harf, selectedWord içerisinde var mı?
        if(selectedWord.includes(letter)){
            //correctLetters listesi üzerinde gelen harfin daha önce olup olmadığını da kontrol edelim
            // Eğer yoksa bu durumda eklemiş olalım.
            if(!correctLetters.includes(letter)){   
                correctLetters.push(letter);

                // displayWord'u çağırıyoruz ki update edilsin!
                displayWord();
            } else {
               displayMessage();
            }
        }
        else {
            // eklediğimiz yanlış kelime, daha önceki yanlış kelimelerde yoksa, wrongLetters'a ekleyelim. 
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);

                // updateWrongLetters'ı tekrar çağırmazsak, hatalı harfleri ekranda göremeyiz, çünkü update etmez!
                updateWrongLetters()
            } else {
                displayMessage();
            }
        }
    }
})






displayWord();


