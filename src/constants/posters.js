import img01 from '../assets/57 secondi.jpg';
import img02 from '../assets/argo.jpg';
import img03 from '../assets/dracula.jpg';
import img04 from '../assets/gladiatore.jpg';
import img05 from '../assets/inception.jpg';
import img06 from '../assets/king conqueror.jpg';
import img07 from '../assets/Oppenheimer.jpg';
import img08 from '../assets/prophecy.jpg';
import img09 from '../assets/Titanic.jpg';
import img10 from '../assets/un delitto ideale.jpg';

export const POSTERS = {
  1: img01,
  2: img02,
  3: img03,
  4: img04,
  5: img05,
  6: img06,
  7: img07,
  8: img08,
  9: img09,
  10: img10,
};

export const POSTERS_BY_TITLE = {
  'delectus aut autem': img01,
  'quis ut nam facilis et officia qui': img02,
  'fugiat veniam minus': img03,
  'et porro tempora': img04,
  'laboriosam mollitia et enim quasi adipisci quia provident illum': img05,
  'qui ullam ratione quibusdam voluptatem quia omnis': img06,
  'illo expedita consequatur quia in': img07,
  'quo adipisci enim quam ut ab': img08,
  'molestiae perspiciatis ipsa': img09,
  'illo est ratione doloremque quia maiores aut': img10,
};

export const LEFT_POSTER_IDS = [1, 2, 3, 4, 5];
export const RIGHT_POSTER_IDS = [6, 7, 8, 9, 10];
export const POSTER_SEQUENCE = [...LEFT_POSTER_IDS, ...RIGHT_POSTER_IDS];

export const HOME_POSTER_PAIRS = LEFT_POSTER_IDS.map((leftId, index) => ({
  left: POSTERS[leftId],
  right: POSTERS[RIGHT_POSTER_IDS[index]],
}));

