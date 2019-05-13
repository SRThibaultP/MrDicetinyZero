const dicetinyconfig = require("./config.json");
const Discord = require("discord.js");

const dicetiny = new Discord.Client({disableEveryone: true});
let gamestatus = 0;
let gameDstart = 0;
let Ssucess = 0;
let SsuccessC = 0;
let Sechec = 0;
let SechecC = 0;

dicetiny.on("ready", async () => {
  console.log("********************");
  console.log(`${dicetiny.user.username} est en ligne !`);
  console.log("********************");
  dicetiny.user.setActivity("Attend le démarage du JDR /gamestart pour démarrer la partie /roll pour afficher l'aide dans la partie", {type: "PLAYING"});
  dicetiny.user.setStatus('idle');
});

function beautifulH() {
  let d = new Date();
  let n = d.getHours();
  if (n <= 9) {
    n = "0" + n;
  }
  return n;
}

function beautifulM() {
  let d = new Date();
  let n = d.getMinutes();
  if (n <= 9) {
    n = "0" + n;
  }
  return n;
}

dicetiny.on("message", async message => {
  if(message.author.bot) ;
  if(message.channel.type === "dm") ;

  const prefix = dicetinyconfig.prefix;
  const version = "MrDicetinyZero  - B1.2"; //VERSION DU BUILD
  const JDRName = "Punk Runner" //NOM DU JDR
  const checkmark = 'https://raw.githubusercontent.com/SRThibaultP/MrDicetinyZero/master/img/checkmark.png';
  const crossmark = 'https://raw.githubusercontent.com/SRThibaultP/MrDicetinyZero/master/img/crossmark.png';
  const questmark = 'https://raw.githubusercontent.com/SRThibaultP/MrDicetinyZero/master/img/questmark.png';
  const errormark = 'https://raw.githubusercontent.com/SRThibaultP/MrDicetinyZero/master/img/errormark.png';
  let fichier = 'https://raw.githubusercontent.com/SRThibaultP/MrDicetinyZero/master/img/error.png';
  let beautifulD = beautifulH() + ":" + beautifulM();
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let cmd2 = messageArray[1];
  let args = messageArray.slice(1);
  let userBrut = message.author;
  let user = userBrut + ": ";
  let gicon = message.guild.iconURL;
  let uicon = message.author.avatarURL;
  let aleatoire, serverembed, gamestart, gamestop, gameDstop;

/*  if(cmd === `${prefix}botstop`){
    process.exit();
  }

  if(cmd === `${prefix}info`){
    console.log(gamestatus);
  }*/

  if(cmd === `${prefix}gamestart`){
    if (gamestatus == 1) {
      console.log("Erreur : La partie à déja démarrer");
      console.log("********************");
      serverembed = new Discord.RichEmbed()
      .setAuthor("Erreur", errormark, "https://github.com/SRThibaultP/MrDicetinyZero")
      .setURL("https://github.com/SRThibaultP/MrDicetinyZero")
      .setColor("#e67e22")
      .setThumbnail(uicon)
      .setTitle("La partie à déja démarrer")
      .setDescription("Tapez `/gamestop` pour finir la partie.")
      .setFooter(version);
      message.channel.send(serverembed);
    }
    else {
      gamestatus = 1;
      gameDstart = beautifulD;
      console.log("JDR : Début de la partie");
      console.log("********************");
      dicetiny.user.setActivity("🎲 JDR en cours 🎲 | [ " + JDRName + " ] Stats : SC: " + SsuccessC + " S: " + Ssucess+ " É: " + Sechec + " ÉC: " + SechecC, {type: "PLAYING"});
      dicetiny.user.setStatus('online');
      Ssucess = 0;
      SsuccessC = 0;
      Sechec = 0;
      SechecC = 0;
      serverembed = new Discord.RichEmbed()
      .setAuthor("Début de la partie", gicon, "https://github.com/SRThibaultP/MrDicetinyZero")
      .setColor("#55E6C1")
      .setThumbnail(uicon)
      .setTitle("Maître de jeu :")
      .setDescription(userBrut);
      message.channel.send(serverembed);
    }
  }

  if(cmd === `${prefix}gamestop`){
    if (gamestatus == 1) {
      gameDstop = beautifulD;
      gamestatus = 0;
      console.log("JDR : Fin de la partie");
      console.log("********************");
      dicetiny.user.setActivity("🎲 Fin du JDR 🎲 | [ " + JDRName + " ] /gamestart pour relancer la partie. Stats : ÉC: " + SechecC + " É: " + Sechec + " S: " + Ssucess + " SC: " + SsuccessC, {type: "PLAYING"});
      dicetiny.user.setStatus('dnd');
      serverembed = new Discord.RichEmbed()
      .setAuthor("Fin de la partie", gicon, "https://github.com/SRThibaultP/MrDicetinyZero")
      .setColor("#FC427B")
      .setThumbnail(uicon)
      .setTitle("Durée de la partie :")
      .setDescription("En cours de développement")
      .addField("Début de la partie :", gameDstart)
      .addField("Fin de la partie :", gameDstop)
      .addField("Afficher les statistiques :", "`/gamestats`");
      message.channel.send(serverembed);
    }
    else {
      console.log("Erreur : La partie n'a pas démarrer");
      console.log("********************");
      serverembed = new Discord.RichEmbed()
      .setAuthor("Erreur", errormark, "https://github.com/SRThibaultP/MrDicetinyZero")
      .setURL("https://github.com/SRThibaultP/MrDicetinyZero")
      .setColor("#e67e22")
      .setThumbnail(uicon)
      .setTitle("La partie n'a pas démarrer")
      .setDescription("Tapez `/gamestart` pour démarrer la partie.")
      .setFooter(version);
      message.channel.send(serverembed);
    }
  }

  if (cmd === `${prefix}gamestats`) {
    if (SechecC == 0 && Sechec == 0 && Ssucess == 0 && SsuccessC == 0 && gamestatus == 0) {
      serverembed = new Discord.RichEmbed()
      .setAuthor("Erreur", errormark, "https://github.com/SRThibaultP/MrDicetinyZero")
      .setColor("#ff3838")
      .setThumbnail(uicon)
      .setTitle("La partie n'a pas démarrer")
      .setDescription("Tapez `/gamestart` pour démarrer la partie.")
      .setFooter(version);
      message.channel.send(serverembed);
    }
    else if (SechecC == 0 && Sechec == 0 && Ssucess == 0 && SsuccessC == 0 && gamestatus == 1) {
      serverembed = new Discord.RichEmbed()
      .setAuthor("Erreur", errormark, "https://github.com/SRThibaultP/MrDicetinyZero")
      .setColor("#ff3838")
      .setThumbnail(uicon)
      .setTitle("Pas de stats disponibles")
      .setDescription("Tapez `/roll` pour afficher l'aide.")
      .setFooter(version);
      message.channel.send(serverembed);
    }
    else {
      serverembed = new Discord.RichEmbed()
      .setAuthor("Résumé de la partie", questmark, "https://github.com/SRThibaultP/MrDicetinyZero")
      .setColor("#18dcff")
      .setThumbnail(gicon)
      .setTitle("Statistiques :")
      .setDescription("Échec Critique = " + SechecC + "\n Échec = " + Sechec + "\n Succès = " + Ssucess + "\n Succès Critique = " + SsuccessC)
      .setFooter(version);
      message.channel.send(serverembed);
    }
  }

  if(cmd === `${prefix}roll`){
    if (cmd2 == undefined) {
      serverembed = new Discord.RichEmbed()
      .setAuthor("Menu d'aide", questmark, "https://github.com/SRThibaultP/MrDicetinyZero")
      .setURL("https://github.com/SRThibaultP")
      .setColor("#18dcff")
      .setThumbnail(uicon)
      .setTitle("Développé par ThibaultP")
      .setDescription("Support disponible sur GitHub : https://github.com/SRThibaultP/MrDicetinyZero")
      .addField("À propos :", "Le dé utilisé par le bot est basé sur Donjons & Dragons.")
      .addField("Commandes disponibles :", "`/roll dX` -> Lancer de dé. \n `/roll dXsY` -> Lancer de dé avec des stats.")
      .addField("Syntaxe :", "Le chiffre après `d` indique le nombre de faces du dé. \n Le chiffre après `s` indique les stats du joueur.")
      .addField("Remarque :","`X` et `Y` doivent être remplacé par des valeurs supérieur à 0. \n Si vous n'avez pas de stats, ajoutez pas le `s`")
      .setFooter(version);
      return message.channel.send(serverembed);
    }
    else {
      if (gamestatus == 1) {
        var infos = cmd2.split(/s/); //valeur brut ex !roll d12s45 ->  d12,45
        var faces = infos[0].substr(1); //valeur apres "d" ("d" non compris avec .substr) ex !roll d12s45 ->  12
        var stats = infos[1]; //valeur apres "s" ex !roll d12s45 ->  45

        //console.log("Valeur brut = " + infos);
        //console.log("Nombre de faces du dé = " + faces);
        //console.log("Stats du personage = " + stats);
        //console.log("********************");

        if (stats == undefined && faces.match(/^[0-9]+$/) != null) { //LANCER D'UN DE SANS STATS = Dé Classique
          console.log("Lancer d'un dé à " + faces + " faces");
          aleatoire = Math.floor((Math.random() * faces) + 1);
          console.log("Le résultat est  " + aleatoire);
          serverembed = new Discord.RichEmbed()
          .setColor("#3ae374")
          .setThumbnail(uicon)
          .setTitle("Le résultat est " + aleatoire)
          .setDescription(userBrut);
          return message.channel.send(serverembed);
        }
        else if (faces > 0 && stats > 0 && faces.match(/^[0-9]+$/) != null && stats.match(/^[0-9]+$/) != null){
        console.log("Lancer d'un dé à " + faces + " faces avec " + stats + " de stats.");
        aleatoire = Math.floor((Math.random() * faces) + 1);
        console.log("Le résultat est " + aleatoire);
          if (faces == 6) {
            console.log("Le dé possède 6 faces");
            console.log("********************");
            if (stats > 6) {
              console.log("Erreur : Les stats sont supérieur à 6");
              console.log("********************");
              serverembed = new Discord.RichEmbed()
              .setAuthor("Erreur", errormark, "https://github.com/SRThibaultP/MrDicetinyZero")
              .setColor("#e67e22")
              .setThumbnail(uicon)
              .setTitle("Les stats sont supérieur à 6")
              .setDescription("Tapez `/roll` pour afficher l'aide.")
              .setFooter(version);
              return message.channel.send(serverembed);
            }
            else {
              if (aleatoire == 1) {
                fichier = 'https://raw.githubusercontent.com/SRThibaultP/MrDicetinyZero/master/img/error.png';
                serverembed = new Discord.RichEmbed()
                .setAuthor("Succès critique", checkmark, "https://github.com/SRThibaultP/MrDicetinyZero")
                .setColor("#32ff7e")
                .setThumbnail(fichier)
                .setTitle("Le résultat est " + aleatoire)
                .setDescription(userBrut);
                SsuccessC = SsuccessC + 1;
              }
              else if (aleatoire == 6) {
                fichier = 'https://raw.githubusercontent.com/SRThibaultP/MrDicetinyZero/master/img/error.png';
                serverembed = new Discord.RichEmbed()
                .setAuthor("Échec critique", crossmark, "https://github.com/SRThibaultP/MrDicetinyZero")
                .setColor("#ff3838")
                .setThumbnail(fichier)
                .setTitle("Le résultat est " + aleatoire)
                .setDescription(userBrut);
                SechecC = SechecC + 1;
              }
              else if (aleatoire <= stats) {
                fichier = 'https://raw.githubusercontent.com/SRThibaultP/MrDicetinyZero/master/img/error.png';
                serverembed = new Discord.RichEmbed()
                .setAuthor("Succès", checkmark, "https://github.com/SRThibaultP/MrDicetinyZero")
                .setColor("#3ae374")
                .setThumbnail(fichier)
                .setTitle("Le résultat est " + aleatoire)
                .setDescription(userBrut);
                Ssucess = Ssucess + 1;
              }
              else if (aleatoire > stats) {
                fichier = 'https://raw.githubusercontent.com/SRThibaultP/MrDicetinyZero/master/img/error.png';
                serverembed = new Discord.RichEmbed()
                .setAuthor("Échec", crossmark, "https://github.com/SRThibaultP/MrDicetinyZero")
                .setColor("#ff4d4d")
                .setThumbnail(fichier)
                .setTitle("Le résultat est " + aleatoire)
                .setDescription(userBrut);
                Sechec = Sechec + 1;
              }
              else { //Impossible normalement
                console.log("ERREUR : MERCI DE POSTER UNE ISSUE SUR GITHUB (https://github.com/SRThibaultP/MrDicetinyZero) AVEC LA COMMANDE UTILISÉE")
                console.log("********************");
              }
            }
          }
          else if (faces == 100) {
            console.log("Le dé possède 100 faces");
            console.log("********************");
            if (stats > 100) {
              console.log("Erreur : Les stats sont supérieur à 100");
              console.log("********************");
              serverembed = new Discord.RichEmbed()
              .setAuthor("Erreur", errormark, "https://github.com/SRThibaultP/MrDicetinyZero")
              .setColor("#e67e22")
              .setThumbnail(uicon)
              .setTitle("Les stats sont supérieur à 100")
              .setDescription("Tapez `/roll` pour afficher l'aide.")
              .setFooter(version);
              return message.channel.send(serverembed);
            }
            else {
              if (aleatoire <= 5) {
                fichier = 'https://raw.githubusercontent.com/SRThibaultP/MrDicetinyZero/master/img/error.png';
                serverembed = new Discord.RichEmbed()
                .setAuthor("Succès critique", checkmark, "https://github.com/SRThibaultP/MrDicetinyZero")
                .setColor("#32ff7e")
                .setThumbnail(fichier)
                .setTitle("Le résultat est " + aleatoire)
                .setDescription(userBrut);
                SsuccessC = SsuccessC + 1;
              }
              else if (aleatoire >= 95) {
                fichier = 'https://raw.githubusercontent.com/SRThibaultP/MrDicetinyZero/master/img/error.png';
                serverembed = new Discord.RichEmbed()
                .setAuthor("Échec critique", crossmark, "https://github.com/SRThibaultP/MrDicetinyZero")
                .setColor("#ff3838")
                .setThumbnail(fichier)
                .setTitle("Le résultat est " + aleatoire)
                .setDescription(userBrut);
                SechecC = SechecC + 1;
              }
              else if (aleatoire <= stats) {
                fichier = 'https://raw.githubusercontent.com/SRThibaultP/MrDicetinyZero/master/img/error.png';
                serverembed = new Discord.RichEmbed()
                .setAuthor("Succès", checkmark, "https://github.com/SRThibaultP/MrDicetinyZero")
                .setColor("#3ae374")
                .setThumbnail(fichier)
                .setTitle("Le résultat est " + aleatoire)
                .setDescription(userBrut);
                Ssucess = Ssucess + 1;
              }
              else if (aleatoire > stats) {
                fichier = 'https://raw.githubusercontent.com/SRThibaultP/MrDicetinyZero/master/img/error.png';
                serverembed = new Discord.RichEmbed()
                .setAuthor("Échec", crossmark, "https://github.com/SRThibaultP/MrDicetinyZero")
                .setColor("#ff4d4d")
                .setThumbnail(fichier)
                .setTitle("Le résultat est " + aleatoire)
                .setDescription(userBrut);
                Sechec = Sechec + 1;
              }
              else { //Impossible normalement
                console.log("ERREUR : MERCI DE POSTER UNE ISSUE SUR GITHUB (https://github.com/SRThibaultP/MrDicetinyZero) AVEC LA COMMANDE UTILISÉE");
                console.log("********************");
              }
            }
          }
          else { //dé ni 6 ni 100 (ou pas en fait)
            serverembed = new Discord.RichEmbed()
            .setColor("#3ae374")
            .setThumbnail(fichier)
            .setTitle("Le résultat est " + aleatoire)
            .setDescription(userBrut);
            message.channel.send(serverembed);
          }
          dicetiny.user.setActivity("JDR en cours | /roll pour afficher l'aide Stats : ÉC: " + SechecC + " É: " + Sechec + " S: " + Ssucess + " SC: " + SsuccessC, {type: "PLAYING"});
          return message.channel.send(serverembed);
        }
        else if (faces < stats) {
          //console.log(faces);
          //console.log(stats);
          console.log("Erreur : Les stats sont supérieur aux faces du dé");
          console.log("********************");
          serverembed = new Discord.RichEmbed()
          .setAuthor("Erreur", errormark, "https://github.com/SRThibaultP/MrDicetinyZero")
          .setColor("#e67e22")
          .setThumbnail(uicon)
          .setTitle("Les stats sont supérieur aux faces du dé")
          .setDescription("Tapez `/roll` pour afficher l'aide.")
          .setFooter(version);
          return message.channel.send(serverembed);
        }
        else if (stats > 0 && faces == 0) { //stats uniquement = LE MEC S'EST GOURE
          console.log("Erreur : Le dé ne possède pas de faces");
          console.log("********************");
          serverembed = new Discord.RichEmbed()
          .setAuthor("Erreur", errormark, "https://github.com/SRThibaultP/MrDicetinyZero")
          .setColor("#e67e22")
          .setThumbnail(uicon)
          .setTitle("Le dé ne possède pas de faces")
          .setDescription("Tapez `/roll` pour afficher l'aide.")
          .setFooter(version);
          return message.channel.send(serverembed);
        }
        else if (faces > 0 && stats == 0) { //stats uniquement = LE MEC S'EST GOURE
          console.log("Erreur : Le dé ne possède pas de stats");
          console.log("********************");
          serverembed = new Discord.RichEmbed()
          .setAuthor("Erreur", errormark, "https://github.com/SRThibaultP/MrDicetinyZero")
          .setColor("#e67e22")
          .setThumbnail(uicon)
          .setTitle("Le dé ne possède pas de stats")
          .setDescription("Tapez `/roll` pour afficher l'aide.")
          .setFooter(version);
          return message.channel.send(serverembed);
        }
        else if (faces == 0 && stats == undefined) {//espace au d (ex : /roll d 4269)
          console.log("Erreur : Vous avez mis un espace après le d");
          console.log("********************");
          serverembed = new Discord.RichEmbed()
          .setAuthor("Erreur", errormark, "https://github.com/SRThibaultP/MrDicetinyZero")
          .setColor("#e67e22")
          .setThumbnail(uicon)
          .setTitle("Vous avez mis un espace après le `d`")
          .setDescription("Tapez `/roll` pour afficher l'aide.")
          .setFooter(version);
          return message.channel.send(serverembed);
        }
        else if (stats == 0 && faces == 0) {//pas de valeur ds les variables
          console.log("Erreur : Les faces et stats du dé sont égaux à zero");
          console.log("********************");
          serverembed = new Discord.RichEmbed()
          .setAuthor("Erreur", errormark, "https://github.com/SRThibaultP/MrDicetinyZero")
          .setColor("#e67e22")
          .setThumbnail(uicon)
          .setTitle("Les faces et stats du dé sont égaux à zero")
          .setDescription("Tapez `/roll` pour afficher l'aide.")
          .setFooter(version);
          return message.channel.send(serverembed);
        }
        else {
          console.log("Erreur : Mauvaise syntaxe");
          console.log("********************");
          serverembed = new Discord.RichEmbed()
          .setAuthor("Erreur", errormark, "https://github.com/SRThibaultP/MrDicetinyZero")
          .setColor("#e67e22")
          .setThumbnail(uicon)
          .setTitle("Mauvaise syntaxe")
          .setDescription("Tapez `/roll` pour afficher l'aide.")
          .setFooter(version);
          return message.channel.send(serverembed);
        }
      }
      else {
        console.log("Erreur : La partie n'a pas démarrer");
        console.log("********************");
        serverembed = new Discord.RichEmbed()
        .setAuthor("Erreur", errormark, "https://github.com/SRThibaultP/MrDicetinyZero")
        .setColor("#ff3838")
        .setThumbnail(uicon)
        .setTitle("La partie n'a pas démarrer")
        .setDescription("Tapez `/gamestart` pour démarrer la partie.")
        .setFooter(version);
        return message.channel.send(serverembed);
      }
    }
  }
})

dicetiny.login(dicetinyconfig.token);
