const { Country, Activity } = require("../db");

module.exports = {
  postActivity: async function (newEntry) {
    const { name, difficulty, duration, season, country } = newEntry;
    const newActivity = await Activity.create({
      name,
      difficulty, 
      duration, 
      season
    });
    let countries = await Country.findAll({
      where: {
        name: country,
      },
    });
    return await newActivity.addCountries(countries);
  },
};