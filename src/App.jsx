import { useState } from 'react'
import './App.css';
import Nav from './components/Nav.jsx'
import Cards from './components/Cards.jsx'
import Movie from './components/Movie.jsx'

const movies = [
  {
    title: "Thrash",
    image: "https://image.tmdb.org/t/p/w342/adk8weka3O5648g3de4z3y4aE7G.jpg",
    year: 2026, rating: "R", genre: "Thriller",
    description: "When a catastrophic hurricane slams a coastal town, stranded residents must survive rapidly rising waters swarming with ravenous sharks.",
    cast: ["Phoebe Dynevor", "Whitney Peak", "Djimon Hounsou"],
    background: "https://image.tmdb.org/t/p/w1280/hniERZojXCEc7Fp3yljZUigOAhm.jpg",
    logo: "https://occ-0-116-114.1.nflxso.net/dnm/api/v6/S4oi7EPZbv2UEPaukW54OORa0S8/AAAABS1xypmieL5Wm53VhMg90xtc3hxC8gWO2165UzGABARS61psTykbweStjbDZu3Xw4U3jz98SvIbii97STNCyYl8--LmuQ64Y.png?r=5ff",
    trailer: "https://occ-0-116-114.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABYznv3Vkc4asb0lrTR3TY4Q9YSwEHtUQrlOnYqkJ3TWAKSowxZa3LfPrOKyMKHKbAbze01iliX5OSyjfAy1S7DcrgE1pxb2QSbsm9kOjUjBzM3oL0chTN5zwOw.jpg?r=c2f",
    genres: ["Creature Features", "Action & Adventure Movies"],
    audio: ["English [Original]", "German", "Spanish"],
    subtitles: ["English", "Spanish", "French"],
    youMightAlsoLike: [
      { title: "Deep Fear", image: "https://image.tmdb.org/t/p/w342/ms1omYCnhnO3eDOI88tfiy6SaoX.jpg" },
      { title: "End of the Road", image: "https://image.tmdb.org/t/p/w342/tLFIMuPWJHlTJ6TN8HCOiSD6SdA.jpg" },
      { title: "Don't Move", image: "https://image.tmdb.org/t/p/w342/cRDJxdnRb7ikKd6fVJTrGeaL34v.jpg" },
      { title: "The Abyss", image: "https://image.tmdb.org/t/p/w342/2dCit3XAtv9KWCJvRKdPkJ0FAkH.jpg" },
      { title: "Blood Red Sky", image: "https://image.tmdb.org/t/p/w342/v7aOJKI5vxCHotHvN8O7SR6SpP6.jpg" }
    ]
  },
  {
    title: "Deep Fear",
    image: "https://image.tmdb.org/t/p/w342/ms1omYCnhnO3eDOI88tfiy6SaoX.jpg",
    year: 2025, rating: "R", genre: "Thriller",
    description: "A scuba diver must fight for survival when a shark attack traps her on the ocean floor.",
    cast: ["Megan Gallagher", "Aaron Glenane"],
    background: "https://occ-0-116-114.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABX7Tr1GXLcBgQ0sIVNpd5BQPGOMsRP6Aric5SNkOZ0E3WJJn-VvgRnf3I589IUbbi75-iMgDgzhFH53T-MSDOTaLAvFvzeA4x3K1.jpg?r=216",
    logo: "",
    trailer: "https://occ-0-116-114.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABb4qCC0UGf-fLlCWyvX2YxCT_iNqyA62bZ3wNY4sznJkuLpyqIBiDwHzvpsvWzCJclmjK-XdZ1O3Vf2SBAQ9gmOxR3RrljSv_nsjZeSH3TFDuxD_hWmoW7LeUw.jpg?r=df8",
    genres: ["Thriller", "Survival"],
    audio: ["English [Original]"],
    subtitles: ["English"],
    youMightAlsoLike: []
  },
  {
    title: "End of the Road",
    image: "https://image.tmdb.org/t/p/w342/tLFIMuPWJHlTJ6TN8HCOiSD6SdA.jpg",
    year: 2022, rating: "R", genre: "Action",
    description: "A cross-country road trip becomes a fight for survival when a family witnesses a murder.",
    cast: ["Queen Latifah", "Ludacris"],
    background: "https://occ-0-116-114.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABQ8gj9wdTLGqw-z77Y8KpzS2ilXVggnNdLP6Nwi1EeQco_WOGwcUxdgkHe-LpNsqdziFCYajTW9Hd2LSFKl-0mDs0urRY6Fje7Hz.jpg?r=62c",
    logo: "",
    trailer: "https://occ-0-116-114.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABXw6GJzIGqo15bA85lHcAHectF56ciSMHoF8vS8e1J_SkkBOBV75slR_LDNO2nXlLrRCIfQ4ge9xj9gAbP5-ceGnen-pOIFozG73RvQr-5WaiKh0mdMtS5qAKA.jpg?r=1d4",
    genres: ["Action", "Thriller"],
    audio: ["English [Original]"],
    subtitles: ["English"],
    youMightAlsoLike: []
  },
  {
    title: "Don't Move",
    image: "https://image.tmdb.org/t/p/w342/cRDJxdnRb7ikKd6fVJTrGeaL34v.jpg",
    year: 2024, rating: "R", genre: "Thriller",
    description: "A grieving woman in a secluded forest encounters a killer who injects her with a paralytic drug. As her body shuts down, her fight for survival begins.",
    cast: ["Kelsey Asbille", "Finn Wittrock"],
    background: "https://occ-0-116-114.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABaxDuSInGxG62nlibc8-UiytwcFhl0_EZDM8-WGbmBwXr3X3svybngimXRj1hudnNx2Oxy7MRif_5_Ml_3EB9Lu-TNmpDzIZfGIq.jpg?r=109",
    logo: "",
    trailer: "https://occ-0-116-114.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABRHR-n50hq2xxw4PF6fiYpau6IOq9b500uoXuQpdsdcVR7XhxBfk32k_4zsa09xCrZrgoQimdhl2lXIXEEYQWNCMEtTFNC7EjD8EciebGPtfqO3AeQ-6ZWJZsA.jpg?r=04e",
    genres: ["Thriller", "Drama"],
    audio: ["English [Original]"],
    subtitles: ["English"],
    youMightAlsoLike: []
  },
  {
    title: "The Abyss",
    image: "https://image.tmdb.org/t/p/w342/2dCit3XAtv9KWCJvRKdPkJ0FAkH.jpg",
    year: 2023, rating: "PG-13", genre: "Sci-Fi",
    description: "A deep-sea oil rig crew encounters a mysterious force from the depths of the ocean.",
    cast: ["Ed Harris", "Mary Elizabeth Mastrantonio"],
    background: "https://image.tmdb.org/t/p/w1280/2dCit3XAtv9KWCJvRKdPkJ0FAkH.jpg",
    logo: "",
    trailer: "https://occ-0-116-114.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABYznv3Vkc4asb0lrTR3TY4Q9YSwEHtUQrlOnYqkJ3TWAKSowxZa3LfPrOKyMKHKbAbze01iliX5OSyjfAy1S7DcrgE1pxb2QSbsm9kOjUjBzM3oL0chTN5zwOw.jpg?r=c2f",
    genres: ["Sci-Fi", "Thriller"],
    audio: ["English [Original]"],
    subtitles: ["English"],
    youMightAlsoLike: []
  },
  {
    title: "Blood Red Sky",
    image: "https://image.tmdb.org/t/p/w342/v7aOJKI5vxCHotHvN8O7SR6SpP6.jpg",
    year: 2021, rating: "R", genre: "Horror",
    description: "When a group of terrorists hijacks an overnight transatlantic flight, a mysteriously ill woman must unleash a monstrous secret to protect her young son.",
    cast: ["Peri Baumeister", "Alexander Scheer"],
    background: "https://occ-0-116-114.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABVdZ-mx9xODSo2tIZpdqBjP0Zz1F3P2eOjGC8Yj_DPGAytqnflUZfbj1ZBWJb4qSqpIC0C2kx8oqw_VrETCGXB84LQlsd5EfX8pO.jpg?r=38e",
    logo: "",
    trailer: "https://occ-0-116-114.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABerfzeUFIPTDiilsibxUCVfsG72WcgYNiCiJwYMSBFmEURpoZr3xReY9kvNc8HPPKHPSGueG9ucnUeZiGcTCdza5RX0JUgHjv4RwWB9uriEPqQx5FIujqOn8kw.jpg?r=62d",
    genres: ["Horror", "Action"],
    audio: ["English [Original]"],
    subtitles: ["English"],
    youMightAlsoLike: []
  },
  {
    title: "Extraction",
    image: "https://image.tmdb.org/t/p/w342/nygOUcBKPHFTbxsYRFZVePqgPK6.jpg",
    year: 2020, rating: "R", genre: "Action",
    description: "A black market mercenary must rescue the kidnapped son of an international crime lord.",
    cast: ["Chris Hemsworth", "Randeep Hooda"],
    background: "https://image.tmdb.org/t/p/w1280/nygOUcBKPHFTbxsYRFZVePqgPK6.jpg",
    logo: "",
    trailer: "https://occ-0-116-114.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABYznv3Vkc4asb0lrTR3TY4Q9YSwEHtUQrlOnYqkJ3TWAKSowxZa3LfPrOKyMKHKbAbze01iliX5OSyjfAy1S7DcrgE1pxb2QSbsm9kOjUjBzM3oL0chTN5zwOw.jpg?r=c2f",
    genres: ["Action", "Thriller"],
    audio: ["English [Original]"],
    subtitles: ["English"],
    youMightAlsoLike: []
  },
  {
    title: "The Gray Man",
    image: "https://image.tmdb.org/t/p/w342/8cXbitsS6dWQ5gfMTZdorpAAzEH.jpg",
    year: 2022, rating: "PG-13", genre: "Action",
    description: "A CIA operative is hunted across the globe by a former colleague.",
    cast: ["Ryan Gosling", "Chris Evans"],
    background: "https://image.tmdb.org/t/p/w1280/8cXbitsS6dWQ5gfMTZdorpAAzEH.jpg",
    logo: "",
    trailer: "https://occ-0-116-114.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABYznv3Vkc4asb0lrTR3TY4Q9YSwEHtUQrlOnYqkJ3TWAKSowxZa3LfPrOKyMKHKbAbze01iliX5OSyjfAy1S7DcrgE1pxb2QSbsm9kOjUjBzM3oL0chTN5zwOw.jpg?r=c2f",
    genres: ["Action", "Thriller"],
    audio: ["English [Original]"],
    subtitles: ["English"],
    youMightAlsoLike: []
  },
  {
    title: "Jurassic World Rebirth",
    image: "https://image.tmdb.org/t/p/w342/sGfjoazodTIvYINfQQJ42C5sIXl.jpg",
    year: 2025, rating: "PG-13", genre: "Sci-Fi",
    description: "A new team explores a dinosaur-inhabited island to secure a genetic breakthrough.",
    cast: ["Scarlett Johansson", "Jonathan Bailey"],
    background: "https://image.tmdb.org/t/p/w1280/sGfjoazodTIvYINfQQJ42C5sIXl.jpg",
    logo: "",
    trailer: "https://occ-0-116-114.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABYznv3Vkc4asb0lrTR3TY4Q9YSwEHtUQrlOnYqkJ3TWAKSowxZa3LfPrOKyMKHKbAbze01iliX5OSyjfAy1S7DcrgE1pxb2QSbsm9kOjUjBzM3oL0chTN5zwOw.jpg?r=c2f",
    genres: ["Sci-Fi", "Action"],
    audio: ["English [Original]"],
    subtitles: ["English"],
    youMightAlsoLike: []
  },
  {
    title: "The Witcher",
    image: "https://image.tmdb.org/t/p/w342/AoGsDM02UVt0npBA8OvpDcZbaMi.jpg",
    year: 2023, rating: "TV-MA", genre: "Action",
    description: "A monster hunter struggles to find his place in a world where people are more wicked than beasts.",
    cast: ["Henry Cavill", "Anya Chalotra"],
    background: "https://image.tmdb.org/t/p/w1280/AoGsDM02UVt0npBA8OvpDcZbaMi.jpg",
    logo: "",
    trailer: "https://occ-0-116-114.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABYznv3Vkc4asb0lrTR3TY4Q9YSwEHtUQrlOnYqkJ3TWAKSowxZa3LfPrOKyMKHKbAbze01iliX5OSyjfAy1S7DcrgE1pxb2QSbsm9kOjUjBzM3oL0chTN5zwOw.jpg?r=c2f",
    genres: ["Action", "Fantasy"],
    audio: ["English [Original]"],
    subtitles: ["English"],
    youMightAlsoLike: []
  },
  {
    title: "72 Hours",
    image: "https://image.tmdb.org/t/p/w342/9Bu1PW2R1XayqRqnl0aDOgMcrdS.jpg",
    year: 2026, rating: "R", genre: "Thriller",
    description: "A kidnapping victim has 72 hours to escape before it's too late.",
    cast: ["Josh Brolin", "Naomi Watts"],
    background: "https://image.tmdb.org/t/p/w1280/9Bu1PW2R1XayqRqnl0aDOgMcrdS.jpg",
    logo: "",
    trailer: "https://occ-0-116-114.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABYznv3Vkc4asb0lrTR3TY4Q9YSwEHtUQrlOnYqkJ3TWAKSowxZa3LfPrOKyMKHKbAbze01iliX5OSyjfAy1S7DcrgE1pxb2QSbsm9kOjUjBzM3oL0chTN5zwOw.jpg?r=c2f",
    genres: ["Thriller", "Drama"],
    audio: ["English [Original]"],
    subtitles: ["English"],
    youMightAlsoLike: []
  },
  {
    title: "Don't Breathe",
    image: "https://image.tmdb.org/t/p/w342/dSxHyPZ2nipSfvdft4IhQKjk5eZ.jpg",
    year: 2016, rating: "R", genre: "Horror",
    description: "A group of teens break into a blind man's home only to realize they are not alone.",
    cast: ["Stephen Lang", "Jane Levy"],
    background: "https://image.tmdb.org/t/p/w1280/dSxHyPZ2nipSfvdft4IhQKjk5eZ.jpg",
    logo: "",
    trailer: "https://occ-0-116-114.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABYznv3Vkc4asb0lrTR3TY4Q9YSwEHtUQrlOnYqkJ3TWAKSowxZa3LfPrOKyMKHKbAbze01iliX5OSyjfAy1S7DcrgE1pxb2QSbsm9kOjUjBzM3oL0chTN5zwOw.jpg?r=c2f",
    genres: ["Horror", "Thriller"],
    audio: ["English [Original]"],
    subtitles: ["English"],
    youMightAlsoLike: []
  },
  {
    title: "The Mother",
    image: "https://image.tmdb.org/t/p/w342/vnRthEZz16Q9VWcP5homkHxyHoy.jpg",
    year: 2023, rating: "R", genre: "Action",
    description: "A military-trained assassin comes out of hiding to protect the daughter she's never met from a ruthless criminal gang.",
    cast: ["Jennifer Lopez", "Joseph Fiennes"],
    background: "https://image.tmdb.org/t/p/w1280/vnRthEZz16Q9VWcP5homkHxyHoy.jpg",
    logo: "",
    trailer: "https://occ-0-116-114.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABYznv3Vkc4asb0lrTR3TY4Q9YSwEHtUQrlOnYqkJ3TWAKSowxZa3LfPrOKyMKHKbAbze01iliX5OSyjfAy1S7DcrgE1pxb2QSbsm9kOjUjBzM3oL0chTN5zwOw.jpg?r=c2f",
    genres: ["Action", "Thriller"],
    audio: ["English [Original]"],
    subtitles: ["English"],
    youMightAlsoLike: []
  },
  {
    title: "Lift",
    image: "https://image.tmdb.org/t/p/w342/h7wJI6mctrDJ9wMbFfgrBUTn1LT.jpg",
    year: 2024, rating: "PG-13", genre: "Action",
    description: "A master thief and her ex-boyfriend attempt an impossible heist aboard a passenger jet mid-flight.",
    cast: ["Kevin Hart", "Gugu Mbatha-Raw"],
    background: "https://image.tmdb.org/t/p/w1280/h7wJI6mctrDJ9wMbFfgrBUTn1LT.jpg",
    logo: "",
    trailer: "https://occ-0-116-114.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABYznv3Vkc4asb0lrTR3TY4Q9YSwEHtUQrlOnYqkJ3TWAKSowxZa3LfPrOKyMKHKbAbze01iliX5OSyjfAy1S7DcrgE1pxb2QSbsm9kOjUjBzM3oL0chTN5zwOw.jpg?r=c2f",
    genres: ["Action", "Comedy"],
    audio: ["English [Original]"],
    subtitles: ["English"],
    youMightAlsoLike: []
  },
  {
    title: "Carry-On",
    image: "https://image.tmdb.org/t/p/w342/sjMN7DRi4sGiledsmllEw5HJjPy.jpg",
    year: 2024, rating: "PG-13", genre: "Action",
    description: "A young TSA agent is blackmailed into letting a dangerous package onto a Christmas Eve flight.",
    cast: ["Taron Egerton", "Jason Bateman"],
    background: "https://image.tmdb.org/t/p/w1280/sjMN7DRi4sGiledsmllEw5HJjPy.jpg",
    logo: "",
    trailer: "https://occ-0-116-114.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABYznv3Vkc4asb0lrTR3TY4Q9YSwEHtUQrlOnYqkJ3TWAKSowxZa3LfPrOKyMKHKbAbze01iliX5OSyjfAy1S7DcrgE1pxb2QSbsm9kOjUjBzM3oL0chTN5zwOw.jpg?r=c2f",
    genres: ["Action", "Thriller"],
    audio: ["English [Original]"],
    subtitles: ["English"],
    youMightAlsoLike: []
  },
  {
    title: "Rebel Moon",
    image: "https://image.tmdb.org/t/p/w342/ui4DrH1cKk2vkHshcUcGt2lKxCm.jpg",
    year: 2023, rating: "PG-13", genre: "Sci-Fi",
    description: "A peaceful colony on the edge of the galaxy builds a army of warriors to defend against a tyrannical regent.",
    cast: ["Sofia Boutella", "Charlie Hunnam"],
    background: "https://image.tmdb.org/t/p/w1280/ui4DrH1cKk2vkHshcUcGt2lKxCm.jpg",
    logo: "",
    trailer: "https://occ-0-116-114.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABYznv3Vkc4asb0lrTR3TY4Q9YSwEHtUQrlOnYqkJ3TWAKSowxZa3LfPrOKyMKHKbAbze01iliX5OSyjfAy1S7DcrgE1pxb2QSbsm9kOjUjBzM3oL0chTN5zwOw.jpg?r=c2f",
    genres: ["Sci-Fi", "Action"],
    audio: ["English [Original]"],
    subtitles: ["English"],
    youMightAlsoLike: []
  },
  {
    title: "Leave the World Behind",
    image: "https://image.tmdb.org/t/p/w342/29rhl1xopxA7JlGVVsf1UHfYPvN.jpg",
    year: 2023, rating: "R", genre: "Thriller",
    description: "A family vacation is disrupted when two strangers arrive claiming a cyberattack has plunged the country into chaos.",
    cast: ["Julia Roberts", "Mahershala Ali"],
    background: "https://image.tmdb.org/t/p/w1280/29rhl1xopxA7JlGVVsf1UHfYPvN.jpg",
    logo: "",
    trailer: "https://occ-0-116-114.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABYznv3Vkc4asb0lrTR3TY4Q9YSwEHtUQrlOnYqkJ3TWAKSowxZa3LfPrOKyMKHKbAbze01iliX5OSyjfAy1S7DcrgE1pxb2QSbsm9kOjUjBzM3oL0chTN5zwOw.jpg?r=c2f",
    genres: ["Thriller", "Drama"],
    audio: ["English [Original]"],
    subtitles: ["English"],
    youMightAlsoLike: []
  },
  {
    title: "The Killer",
    image: "https://image.tmdb.org/t/p/w342/ipkcgvN7h3yZnbYowthloHLKsf4.jpg",
    year: 2023, rating: "R", genre: "Thriller",
    description: "A perfectionist assassin begins a relentless global manhunt after a high-stakes hit goes disastrously wrong.",
    cast: ["Michael Fassbender", "Tilda Swinton"],
    background: "https://image.tmdb.org/t/p/w1280/ipkcgvN7h3yZnbYowthloHLKsf4.jpg",
    logo: "",
    trailer: "https://occ-0-116-114.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABYznv3Vkc4asb0lrTR3TY4Q9YSwEHtUQrlOnYqkJ3TWAKSowxZa3LfPrOKyMKHKbAbze01iliX5OSyjfAy1S7DcrgE1pxb2QSbsm9kOjUjBzM3oL0chTN5zwOw.jpg?r=c2f",
    genres: ["Thriller", "Action"],
    audio: ["English [Original]"],
    subtitles: ["English"],
    youMightAlsoLike: []
  },
  {
    title: "Damsel",
    image: "https://image.tmdb.org/t/p/w342/AgHbB9DCE9aE57zkHjSmseszh6e.jpg",
    year: 2024, rating: "PG-13", genre: "Action",
    description: "A dutiful damsel agrees to marry a handsome prince only to discover the royal family intends to sacrifice her to a fire-breathing dragon.",
    cast: ["Millie Bobby Brown", "Ray Winstone"],
    background: "https://image.tmdb.org/t/p/w1280/AgHbB9DCE9aE57zkHjSmseszh6e.jpg",
    logo: "",
    trailer: "https://occ-0-116-114.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABYznv3Vkc4asb0lrTR3TY4Q9YSwEHtUQrlOnYqkJ3TWAKSowxZa3LfPrOKyMKHKbAbze01iliX5OSyjfAy1S7DcrgE1pxb2QSbsm9kOjUjBzM3oL0chTN5zwOw.jpg?r=c2f",
    genres: ["Action", "Fantasy"],
    audio: ["English [Original]"],
    subtitles: ["English"],
    youMightAlsoLike: []
  }
]

const categories = [
  { title: "Action Movies", movies: movies.slice(0, 20) },
  { title: "Thrillers", movies: movies.filter(m => m.genre === "Thriller") },
  { title: "Horror & Sci-Fi", movies: movies.filter(m => m.genre === "Horror" || m.genre === "Sci-Fi") },
  { title: "Trending Now", movies: movies.slice(0, 20) }
]

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null)

  return(
    <>
      {selectedMovie ? (
        <Movie movie={selectedMovie} onSelect={setSelectedMovie} onHome={() => setSelectedMovie(null)} />
      ) : (
        <>
          <Nav />
          <div className="home">
            {categories.map((cat, i) => (
              <Cards key={i} title={cat.title} movies={cat.movies} onSelect={setSelectedMovie} />
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default App
