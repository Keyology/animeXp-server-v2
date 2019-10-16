const mongoose = require('mongoose')

const getTitles = attributes => {
  const titles = []
  if (attributes.canonicalTitle) {
    titles.push(attributes.canonicalTitle)
  }
  if (attributes.titles) {
    Object.keys(attributes.titles)
      .sort()
      .forEach(function (key) {
        if (attributes.titles[key]) {
          titles.push(attributes.titles[key])
        }
      })
  }
  if (attributes.abbreviatedTitles) {
    Object.keys(attributes.abbreviatedTitles)
      .sort()
      .forEach(function (key) {
        if (attributes.abbreviatedTitles[key]) {
          titles.push(attributes.abbreviatedTitles[key])
        }
      })
  }
  return titles
}

exports.parseAnimeData = async anime => {
  return {
    animeId: new mongoose.Types.ObjectId(),
    animeSlug: anime.attributes.slug,
    animeSynopsis: anime.attributes.synopsis,
    animeTitles: await getTitles(anime.attributes),
    animeCoverImg: anime.attributes.coverImage
      ? anime.attributes.coverImage.original
      : null,
    animeCoverImgs: {
      kitsu: anime.attributes.coverImage
        ? anime.attributes.coverImage.original
        : null
    },
    animePicUrl: anime.attributes.posterImage.small,
    animePicImgs: {
      kitsu: anime.attributes.posterImage.small
    },
    animeStartDate: anime.attributes.startDate,
    animeEndDate: anime.attributes.endDate,
    animeAgeRatingGuide: anime.attributes.ageRatingGuide,
    animeStatus: anime.attributes.status,
    animeNSFW: anime.attributes.nsfw,
    animeYoutubeTrailerURl: anime.attributes.youtubeVideoId,
    animeNumEpisodes: anime.attributes.episodeCount,
    animeIds: {
      kitsuId: anime.id,
      malId: null
    }
  }
}
