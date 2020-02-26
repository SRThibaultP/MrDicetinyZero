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
  info: function(msg, op1, op2, op3, op4) {
    switch (msg) {
      case "help":
      console.log(logger() + " [INFO]: Affichage du menu d'aide")
      serverembed = new Discord.RichEmbed()
      .setAuthor("Menu d'aide", questmark, dicetinyadmin.githubDicetiny)
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
      return serverembed;

      case "gameStart":
      console.log(logger() + " [INFO]: Début de la partie");
      toReturn = new Discord.RichEmbed()
      .setAuthor("Début de la partie", op1, dicetinyadmin.githubDicetiny)
      .setColor("#55E6C1")
      .setThumbnail(op2)
      .setTitle("Maître de jeu :")
      .setDescription(op3);
      return toReturn;

      case "gameStop":
      console.log(logger() + " [INFO]: Fin de la partie");
      serverembed = new Discord.RichEmbed()
      .setAuthor("Fin de la partie", op1, dicetinyadmin.githubDicetiny)
      .setColor("#FC427B")
      .setThumbnail(op2)
      .setTitle("Durée de la partie :")
      .setDescription("En cours de développement")
      .addField("Début de la partie :", op3)
      .addField("Fin de la partie :", op4)
      .addField("Afficher les statistiques :", "`/gamestats`");
      return serverembed;

      case "summary":
      console.log(logger() + "[INFO]: Échec Critique = " + SechecC + "\n Échec = " + Sechec + "\n Succès = " + Ssuccess + "\n Succès Critique = " + SsuccessC)
      serverembed = new Discord.RichEmbed()
      .setAuthor("Résumé de la partie", questmark, dicetinyadmin.githubDicetiny)
      .setColor("#18dcff")
      .setThumbnail(gicon)
      .setTitle("Statistiques :")
      .setDescription(" Échec Critique = " + SechecC + "\n Échec = " + Sechec + "\n Succès = " + Ssuccess + "\n Succès Critique = " + SsuccessC)
      .setFooter(version);
      return serverembed;

    }
  },

  error: function(msg) {
    switch (msg) {
      case "notMJCommand":
      console.log(logger() + " [ERROR]: Vous n'êtes pas un maître de jeu");
      toReturn = new Discord.RichEmbed()
      .setAuthor("Erreur", errormark, dicetinyadmin.githubDicetiny)
      .setURL(dicetinyadmin.githubDicetiny)
      .setColor("#e67e22")
      .setTitle("Vous n'êtes pas un maître de jeu")
      .setDescription("Vous n'avez pas la permission d'exécuter cette commande")
      .setFooter(version);
      return toReturn;

      case "unknown":
      console.log(logger() + " [ERROR]: Erreur inconue. Utilisation de notMJCommand");
      toReturn = new Discord.RichEmbed()
      .setAuthor("Erreur", errormark, dicetinyadmin.githubDicetiny)
      .setURL(dicetinyadmin.githubDicetiny)
      .setColor("#e67e22")
      .setTitle("Vous n'êtes pas un maître de jeu")
      .setDescription("Veuillez patienter le temps que le maître de jeu lance la partie.")
      .setFooter(version);
      return toReturn;

      case "started":
      console.log(logger() + " [ERROR]: La partie à déja démarrer");
      toReturn = new Discord.RichEmbed()
      .setAuthor("Erreur", errormark, dicetinyadmin.githubDicetiny)
      .setURL(dicetinyadmin.githubDicetiny)
      .setColor("#e67e22")
      .setTitle("La partie à déja démarrer")
      .setDescription("Tapez `/gamestop` pour finir la partie.")
      .setFooter(version);
      return toReturn;

      case "notStarted":
      console.log(logger() + "[ERROR]: La partie n'a pas démarrer");
      serverembed = new Discord.RichEmbed()
      .setAuthor("Erreur", errormark, dicetinyadmin.githubDicetiny)
      .setURL(dicetinyadmin.githubDicetiny)
      .setColor("#e67e22")
      .setTitle("La partie n'a pas démarrer")
      .setDescription("Tapez `/gamestart` pour démarrer la partie.")
      .setFooter(version);
      return serverembed;

      case "wrongServer":
      console.log(logger() + "[ERROR]: Commande lancée sur le mauvais serveur");
      serverembed = new Discord.RichEmbed()
      .setAuthor("Erreur", errormark, dicetinyadmin.githubDicetiny)
      .setURL(dicetinyadmin.githubDicetiny)
      .setColor("#e67e22")
      .setTitle("Mauvais serveur")
      .setDescription("Une partie est déja en cours sur un autre serveur.")
      .addField("Le BOT ne permet pas de lancer plusieurs JDR.")
      .setFooter(version);
      return serverembed;

      case "noStats":
      console.log(logger() + "[ERROR]: Pas de stats disponible");
      serverembed = new Discord.RichEmbed()
      .setAuthor("Erreur", errormark, dicetinyadmin.githubDicetiny)
      .setColor("#ff3838")
      .setTitle("Pas de stats disponibles")
      .setDescription("Tapez `/roll` pour afficher l'aide.")
      .setFooter(version);
      return serverembed;
    }
  }
}
