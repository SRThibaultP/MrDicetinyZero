const Discord = require("discord.js");
const images = require("./images.json");
const dicetinyadmin = require("./dicetiny.json");

const version = dicetinyadmin.version;
const checkmark = images.checkmark;
const crossmark = images.crossmark;
const questmark = images.questmark;
const errormark = images.errormark;

function logger() {
  let date = new Date();
  let options = {
    hour: "2-digit", minute: "2-digit", second: "2-digit"
  };
  return date.toLocaleTimeString("fr-fr", options);
}

module.exports = {
  info: function(op0, op1, op2, op3, op4, op5) {
    switch (op0) {
      case "help":
      console.log(logger() + " [INFO]: Affichage du menu d'aide")
      toReturn = new Discord.RichEmbed()
      .setAuthor("Menu d'aide", questmark)
      .setURL("https://github.com/SRThibaultP")
      .setColor("#18dcff")
      .setThumbnail(op1)
      .setTitle("Développé par ThibaultP")
      .setDescription("Support disponible sur GitHub : https://github.com/SRThibaultP/MrDicetinyZero")
      .addField("À propos :", "Le dé utilisé par le bot est basé sur Donjons & Dragons.")
      .addField("Commandes disponibles :", "`/roll dX` -> Lancer de dé. \n `/roll dXsY` -> Lancer de dé avec des stats.")
      .addField("Syntaxe :", "Le chiffre après `d` indique le nombre de faces du dé. \n Le chiffre après `s` indique les stats du joueur.")
      .addField("Remarque :","`X` et `Y` doivent être remplacé par des valeurs supérieur à 0. \n Si vous n'avez pas de stats, n'ajoutez pas le `s`")
      .setFooter(version);
      return toReturn;

      case "gameStart":
      console.log(logger() + " [INFO]: Début de la partie");
      toReturn = new Discord.RichEmbed()
      .setAuthor("Début de la partie", op1)
      .setColor("#55E6C1")
      .setThumbnail(op2)
      .setTitle("Maître de jeu :")
      .setDescription(op3);
      return toReturn;

      case "gameStop":
      console.log(logger() + " [INFO]: Fin de la partie");
      toReturn = new Discord.RichEmbed()
      .setAuthor("Fin de la partie", op1)
      .setColor("#FC427B")
      .setThumbnail(op2)
      .setTitle("Durée de la partie :")
      .setDescription("En cours de développement")
      .addField("Début de la partie :", op3)
      .addField("Fin de la partie :", op4)
      .addField("Afficher les statistiques :", "`/gamestats`");
      return toReturn;

      case "summary":
      console.log(logger() + " [INFO]: Échec Critique : " + op2 + " Échec : " + op3 + " Succès : " + op4 + " Succès Critique : " + op5)
      toReturn = new Discord.RichEmbed()
      .setAuthor("Résumé de la partie", questmark)
      .setColor("#18dcff")
      .setThumbnail(op1)
      .setTitle("Statistiques :")
      .setDescription("Échec Critique : " + op2 + "\n Échec : " + op3 + "\n Succès : " + op4 + "\n Succès Critique : " + op5)
      .setFooter(version);
      return toReturn;
    }
  },

  error: function(op0) {
    switch (op0) {
      case "unknown":
      console.log(logger() + " [FATAL ERROR]: ERREUR INCONNU");
      toReturn = new Discord.RichEmbed()
      .setAuthor("Erreur fatale", errormark)
      .setURL(dicetinyadmin.githubDicetiny)
      .setColor("#e67e22")
      .setTitle("Erreur inconnu")
      .setDescription("Veuillez créer une issue sur GitHub.")
      .addField("Afficher l'aide `/roll`")
      .setFooter(version);
      return toReturn;

      case "notMJCommand":
      console.log(logger() + " [ERROR]: Vous n'êtes pas un maître de jeu");
      toReturn = new Discord.RichEmbed()
      .setAuthor("Erreur", errormark)
      .setURL(dicetinyadmin.githubDicetiny)
      .setColor("#e67e22")
      .setTitle("Vous n'êtes pas un maître de jeu")
      .setDescription("Vous n'avez pas la permission d'exécuter cette commande")
      .setFooter(version);
      return toReturn;

      case "started":
      console.log(logger() + " [ERROR]: La partie à déja démarrer");
      toReturn = new Discord.RichEmbed()
      .setAuthor("Erreur", errormark)
      .setURL(dicetinyadmin.githubDicetiny)
      .setColor("#e67e22")
      .setTitle("La partie à déja démarrer")
      .setDescription("Tapez `/gamestop` pour finir la partie.")
      .setFooter(version);
      return toReturn;

      case "notStarted":
      console.log(logger() + " [ERROR]: La partie n'a pas démarrer");
      toReturn = new Discord.RichEmbed()
      .setAuthor("Erreur", errormark)
      .setURL(dicetinyadmin.githubDicetiny)
      .setColor("#e67e22")
      .setTitle("La partie n'a pas démarrer")
      .setDescription("Tapez `/gamestart` pour démarrer la partie.")
      .setFooter(version);
      return toReturn;

      case "wrongServer":
      console.log(logger() + " [ERROR]: Commande lancée sur le mauvais serveur");
      toReturn = new Discord.RichEmbed()
      .setAuthor("Erreur", errormark)
      .setURL(dicetinyadmin.githubDicetiny)
      .setColor("#e67e22")
      .setTitle("Mauvais serveur")
      .setDescription("Une partie est déja en cours sur un autre serveur.")
      .addField("Le BOT ne permet pas de lancer plusieurs JDR.")
      .setFooter(version);
      return toReturn;

      case "noStats":
      console.log(logger() + " [ERROR]: Pas de stats disponible");
      toReturn = new Discord.RichEmbed()
      .setAuthor("Erreur", errormark)
      .setColor("#ff3838")
      .setTitle("Pas de stats disponibles")
      .setDescription("Tapez `/roll` pour afficher l'aide.")
      .setFooter(version);
      return toReturn;

      case "facesSupStats":
      console.log(logger() + " [ERROR]: Les stats sont supérieur aux faces du dé");
      toReturn = new Discord.RichEmbed()
      .setAuthor("Erreur", errormark)
      .setColor("#e67e22")
      .setTitle("Les stats sont supérieur aux faces du dé")
      .setDescription("Tapez `/roll` pour afficher l'aide.")
      .setFooter(version);
      return toReturn;

      case "noFaces":
      console.log(logger() + " [ERROR]: Le dé ne possède pas de faces");
      toReturn = new Discord.RichEmbed()
      .setAuthor("Erreur", errormark)
      .setColor("#e67e22")
      .setTitle("Le dé ne possède pas de faces")
      .setDescription("Tapez `/roll` pour afficher l'aide.")
      .setFooter(version);
      return toReturn;

      case "space":
      console.log(logger() + " [ERROR]: Vous avez mis un espace après le d");
      toReturn = new Discord.RichEmbed()
      .setAuthor("Erreur", errormark)
      .setColor("#e67e22")
      .setTitle("Vous avez mis un espace après le `d`")
      .setDescription("Tapez `/roll` pour afficher l'aide.")
      .setFooter(version);
      return toReturn;

      case "equalZero":
      console.log(logger() + " [ERROR]: Les faces et stats du dé sont égaux à zero");
      toReturn = new Discord.RichEmbed()
      .setAuthor("Erreur", errormark)
      .setColor("#e67e22")
      .setTitle("Les faces et stats du dé sont égaux à zero")
      .setDescription("Tapez `/roll` pour afficher l'aide.")
      .setFooter(version);
      return toReturn;

      case "syntaxe":
      console.log(logger() + " [ERROR]: Mauvaise syntaxe");
      toReturn = new Discord.RichEmbed()
      .setAuthor("Erreur", errormark)
      .setColor("#e67e22")
      .setTitle("Mauvaise syntaxe")
      .setDescription("Tapez `/roll` pour afficher l'aide.")
      .setFooter(version);
      return toReturn;
    }
  },

  roll: function(op0, op1, op2, op3, op4) {
    switch (op0) {
      case "noStats":
      toReturn = new Discord.RichEmbed()
      .setColor("#3ae374")
      .setThumbnail(op3)
      .setTitle("Le résultat est " + op2)
      .setDescription(op4);
      return toReturn;

      case "superior":
      console.log(logger() + " [ERROR]: Les stats sont supérieur à " + op1);
      toReturn = new Discord.RichEmbed()
      .setAuthor("Erreur", errormark)
      .setColor("#e67e22")
      .setTitle("Les stats sont supérieur à " + op1)
      .setDescription("Tapez `/roll` pour afficher l'aide.")
      .setFooter(version);
      return toReturn;

      case "succesCritique":
      toReturn = new Discord.RichEmbed()
      .setAuthor("Succès critique", checkmark)
      .setColor("#32ff7e")
      .setThumbnail(op1)
      .setTitle("Le résultat est " + op2)
      .setDescription(op3);
      return toReturn;

      case "echecCritique":
      toReturn = new Discord.RichEmbed()
      .setAuthor("Échec critique", crossmark)
      .setColor("#ff3838")
      .setThumbnail(op1)
      .setTitle("Le résultat est " + op2)
      .setDescription(op3);
      return toReturn;

      case "succes":
      toReturn = new Discord.RichEmbed()
      .setAuthor("Succès", checkmark)
      .setColor("#3ae374")
      .setThumbnail(op1)
      .setTitle("Le résultat est " + op2)
      .setDescription(op3);
      return toReturn;

      case "echec":
      toReturn = new Discord.RichEmbed()
      .setAuthor("Échec", crossmark)
      .setColor("#ff4d4d")
      .setThumbnail(op1)
      .setTitle("Le résultat est " + op2)
      .setDescription(op3);
      return toReturn;
    }
  }
}
