// chamando o database do sqlite
const Database = require('./database/db');

// chamando a estrutura de salvamento do banco de dados
const saveOrphanage = require('./database/saveOrphanage');

module.exports = {
  index(req, res) {
    return res.render("index")
  },

  async orphanage(req, res) {

    const id = req.query.id

    try {
      const db = await Database
      const results = await db.all (`SELECT * FROM orphanages WHERE id = "${id}"`)
      const orphanage = results[0]

      orphanage.images = orphanage.images.split(",")
      orphanage.firstImage = orphanage.images[0]

      
      orphanage.open_on_weekends = orphanage.open_on_weekends == '0' ? true : false;

      return res.render('orphanage', { orphanage })
    } catch (error) {
      console.log(error)
      return res.send('Erro no banco de dados')
    }
  },

  async orphanages(req, res) {

    try {
      // criando constante db e atribuindo a Database a ela
      const db = await Database;

      // criando a const orphanages e selecionando todos os elementos de dentro da tabela orphanages
      const orphanages = await db.all("SELECT * FROM orphanages");
      return res.render("orphanages", { orphanages })
    } catch (error) {
      console.log(error)
      return res.send('Erro no banco de dados')
    }

    
  },

  createOrphanage(req, res) {
    return res.render("create-orphanage")
  },

  async saveOrphanage (req, res) { 
    const fields = req.body

    if(Object.values(fields).includes('')) {
        return res.send('Todos os campos devem ser preenchidos')
    }

    try {
      const db = await Database

      await saveOrphanage (db, {
        lat: fields.lat, 
        lng: fields.lng,
        name: fields.name,
        about: fields.about,
        whatsapp: fields.whatsapp,
        images: fields.images.toString(),
        instructions: fields.instructions,
        opening_hours: fields.opening_hours,
        opening_on_weekends: fields.opening_on_weekends
      })

      return res.redirect('/orphanages')
      
    } catch (error) {
      console.log(error)
      res.send('Erro no banco de dados!')
      
    }
  }
};