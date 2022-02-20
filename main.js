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

fs.readFile('data.txt',async (err, data) => {
    // transformic the buffer from the file to a string
    data = data.toString()

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

    //we remove empty strings
    let i = 0;
    while(i < data.length) data[i].length <= 3 || (data[i] != undefined && data[i].includes('com.woonoz.'))? data.splice(i, 1) : i++;

    // to get user input
    const prompt = require('prompt');
    prompt.start();
    while (true){
        
        await prompt.get(['sentence']).then( async (err, research) => {
            research = err.sentence.split(' ');
            i = 0

            if (research.includes('cauchemard')){
                research[research.indexOf('cauchemard')] = '\x1b[32m'+'cauchemar'+'\x1b[0m'
                console.log(research.join(' '))

            } else {
                while(i < data.length){
                    let percent = 0, line = data[i].split(' ')
    
                    for ( let term of research) line.includes(term) ? percent += 100 / research.length : '';
                    
                    if (     percent < 50 &&
                             percent > 30 &&
                             data[i].length < 70 &&
                             data[i].includes('ϋ>') &&
                             data[i].includes('</B>') ){
    
                        generateSentence(data[i], '\x1b[31m')
                    }
                    else if( percent > 50 &&
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