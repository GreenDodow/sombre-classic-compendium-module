Hooks.once("init",()=>{
 game.settings.register("sombre", "traitsCompendiumInitialized", {
    name: "Traits Compendium Initialized",
    scope: "world",
    config: false,
    type: Boolean,
    default: false
  });
   game.settings.register("sombre", "personnalitiesCompendiumInitialized", {
    name: "Personnalities Compendium Initialized",
    scope: "world",
    config: false,
    type: Boolean,
    default: false
  });
   game.settings.register("sombre", "traitsImported", {
    name: "Traits Compendium imported",
    scope: "world",
    config: false,
    type: Boolean,
    default: false
  });
    game.settings.register("sombre", "personnalitiesImported", {
    name: "Personnalities Compendium imported",
    scope: "world",
    config: false,
    type: Boolean,
    default: false
  });
})

Hooks.once("ready", async ()=>{
    
  if (!game.user.isGM) return;

  // Empêche les doublons
  const alreadyInitialized = game.settings.get(
    "sombre",
    "traitsCompendiumInitialized"
  );

  if (alreadyInitialized) {
    console.log("Sombre | Compendium déjà initialisé.");
    return;
  }
  const installedTraits = game.settings.get("sombre", "traitsImported");

  if (installedTraits) return;

  // ID complet du compendium
  const traitsCollectionId = "world.sombre-traits";

  // Vérifie si le compendium existe déjà
  let traitsPack = game.packs.get(traitsCollectionId);

  // Création du compendium si absent
  if (!traitsPack) {
    console.log("Sombre | Création du compendium des traits...");

    traitsPack = await CompendiumCollection.createCompendium({
      label: "Traits",
      type: "Item",
      name: "sombre-traits",
      package: "world"
    });

    console.log(`Sombre | Compendium créé : ${traitsPack.collection}`);
  }

    const packTraits = game.packs.get("world.sombre-traits");

    const dataTraits = await fetch("modules/sombre-compendium/packs/traits.json")
      .then(r => r.json());

    await packTraits.documentClass.createDocuments(dataTraits, {
      pack: packTraits.collection
    });

    await game.settings.set("sombre", "traitsImported", true);



    // ID complet du compendium
    const personnalitiesCollectionId = "world.sombre-personnalities";

    // Vérifie si le compendium existe déjà
    let personnalitiesPack = game.packs.get(personnalitiesCollectionId);

    // Création du compendium si absent
    if (!personnalitiesPack) {
      console.log("Sombre | Création du compendium des personnalités...");

      personnalitiesPack = await CompendiumCollection.createCompendium({
        label: "Personnalities",
        type: "Item",
        name: "sombre-personnalities",
        package: "world"
      });

      console.log(`Sombre | Compendium créé : ${personnalitiesPack.collection}`);
    }
      const installedPersonnalities = game.settings.get("sombre", "personnalitiesImported");

      if (installedPersonnalities) return;

      const packPersonnalities = game.packs.get("world.sombre-personnalities");

      const dataPersonnalities = await fetch("modules/sombre-compendium/packs/personnalities.json")
        .then(r => r.json());


      await packPersonnalities.documentClass.createDocuments(dataPersonnalities, {
        pack: packPersonnalities.collection
      });

      await game.settings.set("sombre", "personnalitiesImported", true);
})