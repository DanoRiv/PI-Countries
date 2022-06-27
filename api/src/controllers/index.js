const axios = require("axios");
const { Country, Activity } = require("../db");
const { Op } = require("sequelize");

const getCountries = async () => {
  const url = (await axios(`https://restcountries.com/v3.1/all`)).data;
  url.map(async (c) => {
    const {
      cca3,
      name,
      flags,
      continents,
      capital,
      subregion,
      area,
      population,
    } = c;
    await Country.findOrCreate({
      where: {
        id: cca3,
        name: name.common,
        flag: flags.png,
        continent: continents.toString(),
        capital: capital?.toString() || "Not defined",
        subregion: subregion || "Not defined",
        area: area,
        population: population,
      },
    });
  });
};

const countriesActivity = async () => {
  const country = await Country.findAll({
    include: {
      model: Activity,
      attributes: ["name", "difficulty", "duration", "season"],
      through: {
        attributes: [],
      },
    },
  });
  return country;
};

const getById = async (param) => {
  const idMayus = param.toUpperCase();

  const countryId = await Country.findByPk(idMayus, {
    include: {
      model: Activity,
      attributes: ["name", "difficulty", "duration", "season"],
      through: {
        attributes: [],
      },
    },
  });

  if (countryId === null) throw new Error("Id not found");

  return countryId;
};

const getByName = async (country) => {
  // const param = country.toLowerCase()
  const found = await Country.findAll({
    where: {
      name: {
        [Op.iLike]: `%${country}%`,
      },
    },
    include: {
      model: Activity,
      attributes: ["name", "difficulty", "duration", "season"],
      through: {
        attributes: [],
      },
    },
  });
  if(!found.length) throw new Error("Country doesn't exist")
  return found;
};

module.exports = {
  getCountries,
  countriesActivity,
  getById,
  getByName,
};
