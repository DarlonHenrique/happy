const Database = require('./db');

const saveOrphanage = require('./saveOrphanage');

Database.then(async (db) => {
  //inserir dados na tabela
   await saveOrphanage(db, {
    lat: "-23.9524013",
    lng: "-46.327895",
    name: "Casa vó Benedita unidade 2",
    about: " Organização sem fins lucrativos no Microrregião de Santos, São Paulo ",
    whatsapp: "18997622355",
    images: [
        "https://images.unsplash.com/photo-1594007184512-2a607d1df588?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9",

        "https://images.unsplash.com/photo-1600712243189-aaa2152723b4?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9"
    ].toString(),
    instructions: "Venha se sentir a vontade e traga muito amor e paciência pra dar. ",
    opening_hours: "Horário de visitas Das 09h até 17h ",
    open_on_weekends: "0" 
}) 
 
  // consultar dados da tabela
   const selectedOrphanages = await db.all("SELECT * FROM orphanages");
   console.log(selectedOrphanages);

  // check only 1 orphanage by id
  // const orphanage = await db.all('SELECT * FROM orphanages WHERE id = "1');
  // console.log(orphanage);
});
