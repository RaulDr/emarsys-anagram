import * as fs from 'fs';
import * as rd from 'readline';

export class AnagramsOfInputWordsFromFile {

    constructor() { }

    findAnagramsOfInputWordsFromFile(filePath: string): void {
        const stdin = process.openStdin();
        console.log('Insert your word in order to find the anagrams: ');
        stdin.addListener("data", (inputWord) => {
            inputWord = this.sanitizeString(inputWord.toString().trim());
            if (inputWord) {
                this.displayIfAnagramsInTheFile(inputWord, filePath);
            }
        });

    }

    displayIfAnagramsInTheFile(inputWord: string, filePath: string): void {
        const reader = rd.createInterface(fs.createReadStream(filePath));
        const anagrams: string[] = [];
        reader.on("line", (lineWord: string) => {
            if (this.isAnagram(inputWord, lineWord)) {
                anagrams.push(lineWord);
            }
        });

        reader.on("close", () => {
            this.displayTheResult(anagrams, inputWord);
        });
    }

    isAnagram(sanitizedInputWord: string, lineWord: string): boolean {
        return sanitizedInputWord === this.sanitizeString(lineWord);
    }

    sanitizeString(str: string): string {
        return str.toLowerCase().replace(/[^a-zd]/g, '').split('').sort().join('');
    }

    displayTheResult(data: string[], inputWord: string): void {
        if (data.length === 0) {
            console.log(`We could not find any anagram of word: ${inputWord} in the wordlist file`);
        } else {
            console.log(`The result: ${data.join(', ')}`);
        }
        console.log();
        console.log('Insert your next word: ');
    }
}