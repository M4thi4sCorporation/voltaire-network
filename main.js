const fs = require('fs');

const replaceAll = (str, cor) => {
    while( data.includes(str)){
        this.replace(str,cor)
    }  
    return data
}

const generateSentence = (data, color) => {
    let sentence, sentence2, word;
    sentence = data.split('ϋ>')
    word = sentence[1]

    sentence2 = word.split('</B>')
    word = sentence2.shift()
    sentence.slice(1, 0)

    console.log(sentence[0] + color + word + '\x1b[0m' + sentence2[0] )

    //console.log('\x1b[33m%s\x1b[0m', data[i].split('ϋ>')[1].split('</B>')[0])
    /*let r = data[i].replace( data[i].split('ϋ>')[1].split('</B>')[0], "res")
    for ( let t of r.split(' ') ){
        if(t.includes('res')){
            console.log(r.split(' ').indexOf(t))
        }
    }*/
}

const FormatData = data => {
        // unicode transformation
        data = data.replaceAll('\\x27','\'');
        data = data.replaceAll('\\x3CB','\ϋ');
        data = data.replaceAll('\\x3E','\>');
        data = data.replaceAll('\\x3C','\<');
        data = data.replaceAll('\\x26','\&');
        data = data.replaceAll('\\xA0','\ ');
        data = data.replaceAll('\\x3D','\=');
        data = data.replaceAll('&#x2011;','\-');
    
        // remove the header of the file
        data = data.split('java.util.ArrayList')[1]
        data = data.split('","')
        while( !data[0].includes('com.woonoz.datamodel.learning.content.exercise.ClickWordsGroup') ) data.shift();
        data.shift()

        return data;
}

fs.readFile('data.txt',async (err, data) => {
    // transformic the buffer from the file to a string
    data = data.toString()

    data = FormatData(data);

    //we remove empty strings
    let i = 0;
    while(i < data.length) data[i].length <= 3 || (data[i] != undefined && data[i].includes('com.woonoz.'))? data.splice(i, 1) : i++;

    // to get user input
    const prompt = require('prompt');
    prompt.start();

    let dictionnary = {
        'cauchemard' : 'cauchemar',
        'cauchemards' : 'cauchemars',
        'connection' : 'connexion',
        'déconnection' : 'déconnection',
        'dilemne' : 'dilemme',
        'dilemnes' : 'dilemmes',
        'méchament' : 'méchamment',
        'languages' : 'langages',
        'language' : 'langage',
        'certe' : 'certes', // « certes »
        'hormi' : 'hormis', // « hormis »
        'parmis' : 'parmi', // « parmi »
        'conjuguable' : 'conjugable', // « -gable » ou « -guable » ?
        'inclu' : 'inclus', // « inclus », « incluse »

        // magasin et magazine
        'magasine' : 'magazine',
        'magasines' : 'magazines',
        'magazin' : 'magasin',
        'magazins' : 'magasins',

        // « -amment » ou « -emment » ?
        'apparement' : 'apparemment',
        'évidamment' : 'évidemment',
        'évidament' : 'évidemment',
        'évidement' : 'évidemment',
        'pertinamment' : 'pertinemment',
        'pertinament' : 'pertinemment',
        'pertinement' : 'pertinemment',
        
        // « personnel », mais « national »
        'nationnale' : 'nationale',
        'nationnales' : 'nationales',
        'régionnale' : 'régionale',
        'régionnales' : 'régionales',
        'personels' : 'personnels',
        'personel' : 'personnel',
        'professionelle' : 'professionnelle',
        'professionelles' : 'professionnelles',
        'professionel' : 'professionnel', 
        'professionels' : 'professionnels',

        // « intéresser »
        'intérresser' : 'intéresser',
        'intérressé' : 'intéressé',
        'intérressés' : 'intéressés',
        'désintéreesser' : 'désintéresser',
        'désintéreessé' : 'désintéressé',
        'désintéreessés' : 'désintéressés',
        'intérressement' : 'intéressement',
        'intérressements' : 'intéressements',
        'intérrêt' : 'intérêt',
        'intérrêts' : 'intérêts',
        'intérresse' : 'intéresse',
        'intérresses' : 'intéresses',
        'intérressent' : 'intéressent',
        'inintérressant' : 'inintéressant',
        'inintérressants' : 'inintéressants',
        
    }
    
    while (true){
        
        await prompt.get(['sentence']).then( async (r, e) => {

            if(r.sentence.toLowerCase() == 'change data'){
                fs.readFile('data.txt',async (err, data) => {
                    data = data.toString()
                    data = FormatData(data);
                })
                return;
            }

            sentence = r.sentence.toLowerCase()
            research = r.sentence.split(' ');
            i = 0
            
            let regex = /[^a-zA-ZÁÀÂÄǍĂĀÃÅǺĄĆĊĈČÇÉÈĖÊËĚĔĒáàâäǎăāãçéèėêëěĕēIÍÌİÎÏǏĬĪĨĮỊÓÒÔÖǑŎŌÕŐỌØǾƠŒíìiîïǐĭīĩįịóòôöǒŏōõőọøǿơœÚÙÛÜǓŬŪŨŰŮŲỤƯ]+/g;
            if (research.some(i => dictionnary[i.replace(regex, '')] != undefined)){ // look into the dictionnary
                for(let i=0; i<research.length; i++){
                    (dictionnary[research[i].replace(regex, '').toLowerCase()] != undefined) ? research[i] = '\x1b[32m'+ dictionnary[research[i].replace(regex, '').toLowerCase()] +'\x1b[0m' : '';
                }
                console.log(research.join(' '))
            } else if (sentence.includes('ç') && sentence.at(sentence.indexOf('ç') + 1).match(/[eiy]/g)){
                let word = research.filter(i => i.includes('ç'))
                console.log(sentence.replace(word, '\x1b[32m'+ word[0].replace('ç','c') +'\x1b[0m'))
            } else if (sentence.includes('est‑ce que')&& (sentence.includes('il') ||sentence.includes('elle'))){console.log(sentence.replace('est‑ce que', '\x1b[32m'+'est‑ce que'+'\x1b[0m'))} else if (sentence.includes('espèce') && sentence.at(sentence.indexOf('espèce') - 2) != 'e')console.log(sentence.replace('un espèce', '\x1b[32m'+'une'+'\x1b[0m' + ' espèce'))
            else if(sentence.includes('sans dessus dessous'))console.log(sentence.replace('sans dessus dessous', '\x1b[32m'+'sens dessus dessous'+'\x1b[0m'))
            else if(sentence.includes('rénum')) console.log(sentence.replace('rénum', '\x1b[32m'+'rémun'+'\x1b[0m'))
            else if(sentence.includes('chiffre d\'affaire')) console.log(sentence.replace('chiffre d\'affaire', '\x1b[32m'+'chiffre d\'affaires'+'\x1b[0m'))
            else if(sentence.includes('ï') && sentence.at(sentence.indexOf('ï') - 1) == 'é') console.log(sentence.replace('éï', '\x1b[32m'+'éi'+'\x1b[0m'))
            else { // Look into the data file
                while(i < data.length){
                    let percent = 0, line = data[i].split(' ')
    
                    for ( let term of research) line.includes(term) ? percent += 100 / research.length : '';
                    
                    /*if (     percent < 50 &&
                             percent > 30 &&
                             data[i].length < 70 &&
                             data[i].includes('ϋ>') &&
                             data[i].includes('</B>') ){
    
                        generateSentence(data[i], '\x1b[31m')
                    }
                    else*/ if( percent > 50 &&
                             percent < 70 && 
                             data[i].length < 70  && 
                             data[i].includes('ϋ>') && 
                             data[i].includes('</B>') ){
    
                        generateSentence(data[i], '\x1b[33m')
                    }
                    else if( 
                             percent > 70 && 
                             data[i].length < 70 && 
                             data[i].includes('ϋ>') && 
                             data[i].includes('</B>') ){
    
                        generateSentence(data[i], '\x1b[32m')
                    }
                    i++
                }
            }
          })

    }
})