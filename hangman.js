const wordDOM = document.getElementById('word');


const correctLetters = ["j","a","v","a"];
const wrongLetters = [];



function randomWord() {
    const words = ["javascript", "python", "java", "kotlin", "php"];

    return words[Math.floor(Math.random() * words.length)];
}



function displayWord() {
    const selectedWord = randomWord();

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
            console.log("nice")
        }

    }
    


displayWord()

















