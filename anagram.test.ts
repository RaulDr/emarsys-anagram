import { AnagramsOfInputWordsFromFile } from './anagram';

const anagrams = new AnagramsOfInputWordsFromFile();

const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
// jest.spyOn(rd, 'createInterface').mockImplementation(() => {
//     return ['text1', 'text2'] as any
// });

// jest.spyOn(fs, 'createReadStream').mockImplementation(() => {
//     return new Readable() as any;
// });

describe("AnagramsOfInputWordsFromFile tests", () => {
    beforeEach(() => {
        consoleSpy.mockClear();
    });

    xit("displayIfAnagramsInTheFile - try to mock createReadStream and createInterface", () => {
        anagrams.displayIfAnagramsInTheFile('boot', '');
        // I'm not sure how to mock Interface.on() yet and I don't want to investigate further right now :)
    });

    it("isAnagram - shouldn't be anagram", () => {
        expect(anagrams.isAnagram('boot', 'b oo$ot',)).toBeFalsy();
    });

    it("isAnagram - should be anagram", () => {
        expect(anagrams.isAnagram('boot', 'b o$ot',)).toBeTruthy();
    });

    it("sanitizeString - string should be boot", () => {
        expect(anagrams.sanitizeString('b o$ot')).toEqual('boot');
    });

    it("sanitizeString - string should be the same", () => {
        expect(anagrams.sanitizeString('boot')).toEqual('boot');
    });

    it("displayTheResult - Verify the console.log is called when no anagrams", () => {
        anagrams.displayTheResult([], 'boot');
        expect(console.log).toBeCalledTimes(3);
        expect(console.log).nthCalledWith(1, 'We could not find any anagram of word: boot in the wordlist file');
        expect(console.log).nthCalledWith(2);
        expect(console.log).nthCalledWith(3, 'Insert your next word: ');
    });

    it("displayTheResult - Verify the console.log is called when anagrams", () => {
        const resultArray = ['obot', 'tobo', 'oobt'];
        anagrams.displayTheResult(resultArray, 'boot');
        expect(console.log).toBeCalledTimes(3);
        expect(console.log).nthCalledWith(1, `The result: ${resultArray.join(', ')}`);
        expect(console.log).nthCalledWith(2);
        expect(console.log).nthCalledWith(3, 'Insert your next word: ');
    });
});
