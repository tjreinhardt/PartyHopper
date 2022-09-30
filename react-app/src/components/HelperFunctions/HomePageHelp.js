var _ = require('lodash')

export const stringShorten = (string) => {
  if (string.length > 30) {
    const newString = _.truncate(string, {
      'length': 30,
      'separator': /,? +/
    });
    return newString
  } else {
    return string
  }
}


export const nameShorten = (string) => {
  if (string.length > 25) {
    const newString = _.truncate(string, {
      'length': 25,
      'separator': /,? +/
    });
    return newString
  } else {
    return string
  }
}


export const images = [
  {
    imageUrl: "https://wallpaperaccess.com/full/127026.jpg"
  },
  {
    imageUrl: "https://wallpaper.dog/large/5550560.jpg"
  },
  {
    imageUrl: "https://i.pinimg.com/originals/5d/45/3a/5d453a797fa54005ec2c87108f0caab4.jpg"
  },
  {
    imageUrl: "https://i.pinimg.com/originals/0e/6d/8b/0e6d8bbaaaa958cc3de3483fc3d7ec43.jpg"
  },
  {
    imageUrl: "https://images.squarespace-cdn.com/content/v1/5c5b5ef4ab1a623eb4af6637/945a84bb-0938-405b-8a77-2f91515160d7/SponsorImage4.png"
  },
  {
    imageUrl: "https://occ-0-3211-1361.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABSRfEOw1Q6MqQ3aLcgJYIjafLUQFK5G8q4I8XKXJsUxuiqIinFVa_7COYRJpNb6bICIsbYnQF8BwlOHGUbWH7gOmtiQ0ne0p30oz.jpg?r=955"
  },
  {
    imageUrl: "https://adventure.com/wp-content/uploads/2017/07/Hero-Burning-Man-sunset-at-art-car-Photo-credit-Nicola-Bailey-2-1920x1080.jpg"
  },
  {
    imageUrl: "https://wallpaperset.com/w/full/e/5/9/475472.jpg"
  },
]
