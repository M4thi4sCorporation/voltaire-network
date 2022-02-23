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

const Orthographe = async () => {
    let data = fs.readFileSync('assets/orthographe.txt').toString().split('\n'), i, j;

    while(true) {

        await prompt.get(['sentence']).then( async (r, e) => {
            sentence = r.sentence.toLowerCase();
            research = r.sentence.split(' ');
            i = 0, j = 0;

            while(i < data.length){
                let percent = 0, line = data[i].split(' ')

                for ( let term of research) line.includes(term) ? percent += 100 / research.length : '';
                
                if( sentence.toLowerCase().includes(line.join(' ').toLowerCase().replace('<b>', '').replace('</b>','')) || line.join(' ').toLowerCase().replace('<b>', '').replace('</b>','').includes(sentence.toLowerCase()) ){

                } else if(  percent > 50 && percent < 60 ){

                    generateSentence(data[i], '\x1b[31m');
                    j++;
                }
                else if( percent > 60 && percent < 70 ){
                    generateSentence(data[i], '\x1b[33m');
                    j++;
                }
                else if(  percent > 70 ){
                    generateSentence(data[i], '\x1b[32m');
                    j++;
                }
                i++
            }

            if( j == 0)console.log('\x1b[32m'+'Bonne Réponse'+ '\x1b[0m');
            console.log('')
        })
    }
}

const main = async () => {
    prompt.start();

    console.log('\n\n\x1b[1m\x1b[36m'+
        ' /$$    /$$  /$$$$$$  /$$    /$$$$$$$$ /$$$$$$  /$$$$$$ /$$$$$$$  /$$$$$$$$ \n'+
        '| $$   | $$ /$$__  $$| $$   |__  $$__//$$__  $$|_  $$_/| $$__  $$| $$_____/\n'+
        '| $$   | $$| $$  \\ $$| $$      | $$  | $$  \\ $$  | $$  | $$  \\ $$| $$      \n'+
        '|  $$ / $$/| $$  | $$| $$      | $$  | $$$$$$$$  | $$  | $$$$$$$/| $$$$$   \n'+
        ' \\  $$ $$/ | $$  | $$| $$      | $$  | $$__  $$  | $$  | $$__  $$| $$__/   \n'+
        '  \\  $$$/  | $$  | $$| $$      | $$  | $$  | $$  | $$  | $$  \\ $$| $$      \n'+
        '   \\  $/   |  $$$$$$/| $$$$$$$$| $$  | $$  | $$ /$$$$$$| $$  | $$| $$$$$$$$\n'+
        '    \\_/     \\______/ |________/|__/  |__/  |__/|______/|__/  |__/|________/\n'+
        '\x1b[0m\n'+

        'Apres insertion d\'une phrase plusieurs résultats vont apparaitrent,\n'+
        'ils disposeront d\'un niveau de couleur parmis ceux ci dessous :\n'+
        '    - \x1b[1m\x1b[31mrouge\x1b[0m : \x1b[1m50% a 60%\x1b[0m de correspondance, a n\'utiliser qu\'en cas extreme, peut etre fausse\n'+
        '    - \x1b[1m\x1b[33mjaune\x1b[0m : \x1b[1m60% a 70%\x1b[0m de correspondace, des indices mais pas parfait\n'+
        '    - \x1b[1m\x1b[32mvert \x1b[0m : plus de \x1b[1m70%\x1b[0m de correspondance, sans doute la bonne réponse.\n\n'+

        'Sélectionnez votre niveau :\n'+
        '   \x1b[1m1\x1b[0m - Orthographe \n'+
        '   \x1b[1m2\x1b[0m - Vocabulaire \n'+
        '   \x1b[1m3\x1b[0m - Syntaxe & Ponctuation\n\n'
    );

    await prompt.get(['type']).then( async (r, e) => {
        if ( r.type == '1' ){
            Orthographe();
        } else if ( r.type == '2' ){
            console.log('Nothing there for now');
        } else if ( r.type == '3' ){
            console.log('Nothing there for now');
        }
    })
}
main()
