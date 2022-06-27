const wordDOM = document.getElementById('word');
const popDOM = document.getElementById('popup-container');
const messageDOM = document.getElementById('successMessage');
const wrongLettersDOM = document.getElementById('wrong-letters');
const victimDOM = document.querySelectorAll('.victim');
const letterMessageDOM = document.getElementById('message');
const playAgainButton = document.getElementById('playAgain');
const popupAnimation = document.querySelector('.popup');
const footerDOM = document.querySelector("#footerId")
const successOrFailDOM = document.getElementById('successOrFail');

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
            popupAnimation.classList.add("popupAnimationSuccess")
            successOrFailDOM.innerHTML = ` <div><img src="https://c.tenor.com/LuHp6dgmbJEAAAAC/sans.gif" height="100" width="100" alt=""></div>`
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
        popupAnimation.classList.add("popupAnimationFail")
        successOrFailDOM.innerHTML = `<div><img src="https://c.tenor.com/gd3dkWF86i0AAAAC/ghost.gif" height="100" width="100" alt=""></div>`
        wordDOM.innerHTML = `
    ${selectedWord.split('').map(eachLetter => `
        <div class="letter text-primary">
            ${selectedWord.includes(eachLetter) ? eachLetter : ''}
         </div>
        `).join('')}
        `;
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
    if (e.keyCode >= 65 && e.keyCode <= 222) {
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




footerDOM.innerHTML = `${new Date().getFullYear()} Copyright: <a class="alikartalonline" href="https://github.com/alikartalonline"> alikartalonline <svg height="20" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="32" data-view-component="true" class="octicon octicon-mark-github v-align-middle">
<path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
</svg></a>`

displayWord();


