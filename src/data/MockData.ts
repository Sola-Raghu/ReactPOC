import { Movie } from '../types';

export const mockMovies: Movie[] = [
  {
    id: 1,
    title: 'Inception',
    genre: 'Sci-Fi',
    rating: 8.8,
    year: 2010,
    poster: 'https://picsum.photos/seed/inception/500/750',
    plot: 'A thief who steals corporate secrets through use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.'
  },
  {
    id: 2,
    title: 'The Dark Knight',
    genre: 'Action',
    rating: 9.0,
    year: 2008,
    poster: 'https://picsum.photos/seed/darkknight/500/750',
    plot: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.'
  },
  {
    id: 3,
    title: 'Parasite',
    genre: 'Thriller',
    rating: 8.6,
    year: 2019,
    poster: 'https://picsum.photos/seed/parasite/500/750',
    plot: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.'
  },
  {
    id: 4,
    title: 'The Matrix',
    genre: 'Sci-Fi',
    rating: 8.7,
    year: 1999,
    poster: 'https://picsum.photos/seed/matrix/500/750',
    plot: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.'
  },
   {
    id: 5,
    title: 'Pulp Fiction',
    genre: 'Crime',
    rating: 8.9,
    year: 1994,
    poster: 'https://picsum.photos/seed/pulpfiction/500/750',
    plot: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.'
  },
   {
    id: 6,
    title: 'Forrest Gump',
    genre: 'Drama',
    rating: 8.8,
    year: 1994,
    poster: 'https://picsum.photos/seed/forrestgump/500/750',
    plot: 'The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.'
  },
   {
    id: 7,
    title: 'Spirited Away',
    genre: 'Animation',
    rating: 8.6,
    year: 2001,
    poster: 'https://picsum.photos/seed/spiritedaway/500/750',
    plot: 'During her family\'s move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.'
  },
  {
    id: 8,
    title: 'Gladiator',
    genre: 'Action',
    rating: 8.5,
    year: 2000,
    poster: 'https://picsum.photos/seed/gladiator/500/750',
    plot: 'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.'
  },
];

export const movieGenres: string[] = Array.from(new Set(mockMovies.map(m => m.genre || 'Unknown'))).sort();