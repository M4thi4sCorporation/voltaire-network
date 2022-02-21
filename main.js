const fs = require('fs');
const prompt = require('prompt');

const generateSentence = (data, color) => {
   
    while(data.includes('<B>')){
        let sentence, sentence2, word;
        sentence = data.split('<B>')
        word = sentence[1]
    
        sentence2 = word.split('</B>')
        word = sentence2.shift()
        sentence.slice(1, 0)

        data = sentence[0] + color + word + '\x1b[0m' + sentence2 + (sentence.length > 2 ? '<B> ' + sentence[2] : '');
    }

    console.log(data)
}

let corrects = fs.readFileSync('assets/corrects.txt').toString();
let data = fs.readFileSync('assets/metadata.txt').toString().split('\n');
    
corrects = corrects.toString().split('\n')
let correct2 = {};
for(let i=0;i<corrects.length;i++){
    correct2[corrects[i].split('|')[0]] = corrects[i].split('|')[1]
}
corrects = correct2;

const main = async () => {
    prompt.start();
    while (true){
        
        await prompt.get(['sentence']).then( async (r, e) => {
            sentence = r.sentence.toLowerCase();
            research = r.sentence.split(' ');
            let i = 0, j = 0;

            while(i < data.length){
                let percent = 0, line = data[i].split(' ')

                for ( let term of research) line.includes(term) ? percent += 100 / ((line.length + research.length) / 2): '';
                
                if(  percent > 50 && percent < 60 ){

                    generateSentence(data[i], '\x1b[31m');
                    j++;
                }
                else if( percent > 60 && percent < 70 ){

                    generateSentence(data[i], '\x1b[32m');
                    j++;
                }
                else if(  percent > 70 ){

                    generateSentence(data[i], '\x1b[32m');
                    j++;
                }
                i++
            }

            i = 0
            for (const [element, result] of Object.entries(corrects)) {
                let percent = 0, line = element

                for ( let term of research) line.includes(term) ? percent += 100 / ((line.split(' ').length + research.length) / 2) : '';
                
                if(  percent > 50 && percent < 75 ){

                    generateSentence(result, '\x1b[31m');
                    j++;
                }
                else if( percent > 75 && percent < 80 ){

                    generateSentence(result, '\x1b[32m');
                    j++;
                }
                else if(  percent > 80 ){

                    generateSentence(result, '\x1b[32m');
                    j++;
                }
                i++
            }

            if( j == 0)console.log('\x1b[32m'+'Bonne Réponse'+ '\x1b[0m');
            console.log('')
        })

    }
}
main()
