/*******************************************************************************
 * @author      : 程巍巍 (littocats@gmail.com)
 * @created     : Thursday Aug 18, 2022 15:03:01 CST
 *
 * @description : en
 *
 ******************************************************************************/
import Phonetic from "../index";

const Table: Phonetic.Table = {
  name: "English",
  code: "en",
  data: [
    // English Consonants 辅音
    ["p", "p"], // pen, spit, lip
    ["b", "b"], // bed, rib
    ["t", "t"], // two, sting, bet
    ["d", "d"], // do, odd
    ["4", "ɾ"], // better, matter (GenAm)
    ["tS", "tʃ"], // chair, nature, teach
    ["dZ", "dʒ"], // gin, joy, edge
    ["k", "k"], // cat, kill, skin, queen, thick
    ["g", "ɡ"], // go, get, beg
    ["f", "f"], // fool, enough, leaf
    ["v", "v"], // voice, have, of
    ["T", "θ"], // thing, breath
    ["D", "ð"], // this, breathe
    ["s", "s"], // see, city, pass
    ["z", "z"], // zoo, rose
    ["S", "ʃ"], // she, sure, emotion, leash
    ["Z", "ʒ"], // pleasure, beige
    ["h", "h"], // ham
    ["m", "m"], // man, ham
    ["n", "n"], // no, tin
    ["N", "ŋ"], // singer, ring
    ["l", "l"], // left, bell
    ["r\\", "ɹ"], // run, very
    ["w", "w"], // we
    ["j", "j"], // yes
    ["W", "ʍ"], // what (some accents, such as Scottish)
    ["x", "x"], // loch (Scottish)

    // English Vowels 元音
    ["A:", "ɑː"], // father
    ["i:", "iː"], // see
    ["I", "ɪ"], // city
    ["E", "ɛ"], // bed
    ["3:", "ɜː"], // bird
    ["{", "æ"], // lad, cat, ran
    ["V", "ʌ"], // run, enough
    ["Q", "ɒ"], // not, wasp
    ["O:", "ɔː"], // law, caught
    ["U", "ʊ"], // put
    ["u:", "uː"], // soon, through
    ["@", "ə"], // about

    // English Diphthongs 双元音
    ["eI", "eɪ"], // day
    ["aI", "aɪ"], // my
    ["OI", "ɔɪ"], // boy
    ["@U", "əʊ"], // no
    ["aU", "aʊ"], // now
    ["I@", "ɪə"], // near, here
    ["E@", "ɛə"], // hair, there
    ["U@", "ʊə"], // tour
    ["ju:", "juː"], // pupil

    // Other
    ['"', "ˈ"], // Primary stress (placed before the stressed syllable), for example "happy" /"h{pi/
    ["%", "ˌ"], // Secondary stress, for example "battleship" /"b{tl=%SIp/
    [".", "."], // Syllable separator
    ["=", "◌̩"], // Syllabic consonant, for example /"rIdn=/ for ridden
  ],
};

export default Table;
