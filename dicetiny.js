const dicetinyconfig = require("./config.json");
const dicetinyadmin = require("./dicetiny.json");
const images = require("./images.json");
const Discord = require("discord.js");
const message = require("./message-fr.json");
var rtnmsg = require("./rtnmsg.js");
//var logger = require("./logger.js"); Need to rmv l21 to 24

const dicetiny = new Discord.Client({disableEveryone: true});
let aleatoire = serverembed = gamestart = gamestop = gamestatus = gameDstart = gameDstop = Ssuccess = SsuccessC = Sechec = SechecC = 0;
const version = dicetinyadmin.version; //VERSION DU BUILD
const JDRName = dicetinyconfig.JDRName; //NOM DU JDR
const JDRAdmins = dicetinyconfig.adminRank;
const JDRPlayers = dicetinyconfig.playerRank;
const checkmark = images.checkmark;
const crossmark = images.crossmark;
const questmark = images.questmark;
const errormark = images.errormark;
let fichier = images.void;
let serverID = null;

function logger() {
  let date = new Date();
  let options = {
    hour: "2-digit", minute: "2-digit", second: "2-digit"
  };
  return date.toLocaleTimeString("fr-fr", options);
}

dicetiny.on("ready", async () => {
  console.log(logger() + ` [INFO]: ${dicetiny.user.username} est en ligne !`);
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
  if(message.author.bot);
  if(message.channel.type === "dm");

  const prefix = dicetinyconfig.prefix;
  let beautifulD = beautifulH() + ":" + beautifulM();
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let cmd2 = messageArray[1];
  let userBrut = message.author;
  let user = userBrut + ": ";
  let bicon = dicetiny.user.avatarURL;
  let gicon = message.guild.iconURL;
  let uicon = message.author.avatarURL;
  let getServerID = message.guild.id;
  let members = message.guild.roles.get(getServerID).members;

  if(cmd === `${prefix}yousk2`) return console.log(serverID);

  if(cmd === `${prefix}gamestart`){
    if (gamestatus == 0 && message.member.roles.find(r => r.name === JDRAdmins)) {
      gamestatus++;
      gameDstart = beautifulD;
      serverID = getServerID;
      dicetiny.user.setActivity("🎲 JDR en cours 🎲 | [ " + JDRName + " ] Stats : SC: " + SsuccessC + " S: " + Ssuccess+ " É: " + Sechec + " ÉC: " + SechecC, {type: "PLAYING"});
      dicetiny.user.setStatus('online');
      return message.channel.send(rtnmsg.info("gameStart", gicon, uicon, userBrut));//début de la partie
    }
    else if (gamestatus == 1) return message.channel.send(rtnmsg.error("started"));//en cours
    else return message.channel.send(rtnmsg.error("unknown"));//si on detecte pas l'erreur
  }

  if(cmd === `${prefix}gamestop`){
    if (gamestatus == 1 && message.member.roles.find(r => r.name === JDRAdmins) && serverID == getServerID) {
      gameDstop = beautifulD;
      gamestatus--;
      dicetiny.user.setActivity("🎲 Fin du JDR 🎲 | [ " + JDRName + " ] /gamestart pour relancer la partie. Stats : ÉC: " + SechecC + " É: " + Sechec + " S: " + Ssuccess + " SC: " + SsuccessC, {type: "PLAYING"});
      dicetiny.user.setStatus('dnd');
      return message.channel.send(rtnmsg.info("gameStop", gicon, uicon, gameDstart, gameDstop));//fin de la partie
    }
    else if(gamestatus == 0) return message.channel.send(rtnmsg.error("notStarted"));//party non démarée
    else if (serverID != getServerID) return message.channel.send(rtnmsg.error("wrongServer"));//commande lancée depuis un autre serveur
    else if (message.member.roles.find(r => r.name != JDRAdmins)) return message.channel.send(rtnmsg.error("notMJCommand"));//rdm usr lance commande interdite
    else return message.channel.send(rtnmsg.error("unknown"));
  }

  if (cmd === `${prefix}gamestats`) {
    if (SechecC == 0 && Sechec == 0 && Ssuccess == 0 && SsuccessC == 0 && gamestatus == 0) return message.channel.send(rtnmsg.error("notStarted"));//tt els stats = 0 =>game non start
    else if (SechecC == 0 && Sechec == 0 && Ssuccess == 0 && SsuccessC == 0 && gamestatus == 1) return message.channel.send(rtnmsg.error("noStats"));//tt les stats = 0 mais game start =>aucune /roll lancée
    else return message.channel.send(rtnmsg.info("summary"));//affichage du résumée
  }

  if(cmd === `${prefix}roll`){
    if (cmd2 == undefined) return message.channel.send(rtnmsg.info("help", bicon));//affichage de l'aide
    else {
      if (gamestatus == 1) {
        var infos = cmd2.split(/s/); //valeur brut ex /roll d12s45 ->  d12,45
        var faces = infos[0].substr(1); //valeur apres "d" ("d" non compris avec .substr) ex !roll d12s45 ->  12
        var stats = infos[1]; //valeur apres "s" ex !roll d12s45 ->  45

        if (stats == undefined && faces.match(/^[0-9]+$/) != null) { //LANCER D'UN DE SANS STATS = Dé Classique
          console.log("Lancer d'un dé à " + faces + " faces");
          aleatoire = Math.floor((Math.random() * faces) + 1);
          console.log("Le résultat est " + aleatoire);
          serverembed = new Discord.RichEmbed()
          .setColor("#3ae374")
          .setThumbnail(uicon)
          .setTitle("Le résultat est " + aleatoire)
          .setDescription(userBrut);
          /*return*/ message.channel.send(serverembed);
        }
        else if (faces > 0 && stats > 0 && faces.match(/^[0-9]+$/) != null && stats.match(/^[0-9]+$/) != null){
          console.log("Lancer d'un dé à " + faces + " faces avec " + stats + " de stats.");
          aleatoire = Math.floor((Math.random() * faces) + 1);//le random est ici
          console.log("Le résultat est " + aleatoire);
          if (faces == 6) {
            if (stats > 6) {
              console.log("**Erreur : Les stats sont supérieur à 6");
              serverembed = new Discord.RichEmbed()
              .setAuthor("Erreur", errormark, dicetinyadmin.githubDicetiny)
              .setColor("#e67e22")
              .setTitle("Les stats sont supérieur à 6")
              .setDescription("Tapez `/roll` pour afficher l'aide.")
              .setFooter(version);
              return message.channel.send(serverembed);
            }
            else {
              if (aleatoire == 1) {
                dicetinyadmin.githubDicetinyfichier = images.void;
                serverembed = new Discord.RichEmbed()
                .setAuthor("Succès critique", checkmark, dicetinyadmin.githubDicetiny)
                .setColor("#32ff7e")
                .setThumbnail(fichier)
                .setTitle("Le résultat est " + aleatoire)
                .setDescription(userBrut);
                SsuccessC = SsuccessC + 1;
              }
              else if (aleatoire == 6) {
                dicetinyadmin.githubDicetinyfichier = images.void;
                serverembed = new Discord.RichEmbed()
                .setAuthor("Échec critique", crossmark, dicetinyadmin.githubDicetiny)
                .setColor("#ff3838")
                .setThumbnail(fichier)
                .setTitle("Le résultat est " + aleatoire)
                .setDescription(userBrut);
                SechecC = SechecC + 1;
              }
              else if (aleatoire <= stats) {
                dicetinyadmin.githubDicetinyfichier = images.void;
                serverembed = new Discord.RichEmbed()
                .setAuthor("Succès", checkmark, dicetinyadmin.githubDicetiny)
                .setColor("#3ae374")
                .setThumbnail(fichier)
                .setTitle("Le résultat est " + aleatoire)
                .setDescription(userBrut);
                Ssuccess = Ssuccess + 1;
              }
              else if (aleatoire > stats) {
                dicetinyadmin.githubDicetinyfichier = images.void;
                serverembed = new Discord.RichEmbed()
                .setAuthor("Échec", crossmark, dicetinyadmin.githubDicetiny)
                .setColor("#ff4d4d")
                .setThumbnail(fichier)
                .setTitle("Le résultat est " + aleatoire)
                .setDescription(userBrut);
                Sechec = Sechec + 1;
              }
              else { //Impossible normalement
                console.log("erreur inconnu")
              }
            }
          }
          else if (faces == 100) {
            console.log("Le dé possède 100 faces");
            if (stats > 100) {
              console.log("Erreur : Les stats sont supérieur à 100");
              serverembed = new Discord.RichEmbed()
              .setAuthor("Erreur", errormark, dicetinyadmin.githubDicetiny)
              .setColor("#e67e22")
              .setTitle("Les stats sont supérieur à 100")
              .setDescription("Tapez `/roll` pour afficher l'aide.")
              .setFooter(version);
              return message.channel.send(serverembed);
            }
            else {
              if (aleatoire <= 5) {
                dicetinyadmin.githubDicetinyfichier = images.void;
                serverembed = new Discord.RichEmbed()
                .setAuthor("Succès critique", checkmark, dicetinyadmin.githubDicetiny)
                .setColor("#32ff7e")
                .setThumbnail(fichier)
                .setTitle("Le résultat est " + aleatoire)
                .setDescription(userBrut);
                SsuccessC = SsuccessC + 1;
              }
              else if (aleatoire >= 95) {
                dicetinyadmin.githubDicetinyfichier = images.void;
                serverembed = new Discord.RichEmbed()
                .setAuthor("Échec critique", crossmark, dicetinyadmin.githubDicetiny)
                .setColor("#ff3838")
                .setThumbnail(fichier)
                .setTitle("Le résultat est " + aleatoire)
                .setDescription(userBrut);
                SechecC = SechecC + 1;
              }
              else if (aleatoire <= stats) {
                dicetinyadmin.githubDicetinyfichier = images.void;
                serverembed = new Discord.RichEmbed()
                .setAuthor("Succès", checkmark, dicetinyadmin.githubDicetiny)
                .setColor("#3ae374")
                .setThumbnail(fichier)
                .setTitle("Le résultat est " + aleatoire)
                .setDescription(userBrut);
                Ssuccess = Ssuccess + 1;
              }
              else if (aleatoire > stats) {
                dicetinyadmin.githubDicetinyfichier = images.void;
                serverembed = new Discord.RichEmbed()
                .setAuthor("Échec", crossmark, dicetinyadmin.githubDicetiny)
                .setColor("#ff4d4d")
                .setThumbnail(fichier)
                .setTitle("Le résultat est " + aleatoire)
                .setDescription(userBrut);
                Sechec = Sechec + 1;
              }
              else { //Impossible normalement
                console.log("erreur inconnu");
              }
            }
          }
          else { //dé ni 6 ni 100 (ou pas en fait)
            serverembed = new Discord.RichEmbed()
            .setColor("#3ae374")
            .setThumbnail(fichier)
            .setTitle("Le résultat est " + aleatoire)
            .setDescription(userBrut);
            return message.channel.send(serverembed);
          }
          dicetiny.user.setActivity("JDR en cours | /roll pour afficher l'aide Stats : ÉC: " + SechecC + " É: " + Sechec + " S: " + Ssuccess + " SC: " + SsuccessC, {type: "PLAYING"});
          return message.channel.send(serverembed);
        }
        else if (faces < stats) {
          console.log("Erreur : Les stats sont supérieur aux faces du dé");
          serverembed = new Discord.RichEmbed()
          .setAuthor("Erreur", errormark, dicetinyadmin.githubDicetiny)
          .setColor("#e67e22")
          .setTitle("Les stats sont supérieur aux faces du dé")
          .setDescription("Tapez `/roll` pour afficher l'aide.")
          .setFooter(version);
          return message.channel.send(serverembed);
        }
        else if (stats > 0 && faces == 0) { //stats uniquement = LE MEC S'EST GOURE
          console.log("Erreur : Le dé ne possède pas de faces");
          serverembed = new Discord.RichEmbed()
          .setAuthor("Erreur", errormark, dicetinyadmin.githubDicetiny)
          .setColor("#e67e22")
          .setTitle("Le dé ne possède pas de faces")
          .setDescription("Tapez `/roll` pour afficher l'aide.")
          .setFooter(version);
          return message.channel.send(serverembed);
        }
        else if (faces > 0 && stats == 0) { //stats uniquement = LE MEC S'EST GOURE
          console.log("Erreur : Le dé ne possède pas de stats");
          serverembed = new Discord.RichEmbed()
          .setAuthor("Erreur", errormark, dicetinyadmin.githubDicetiny)
          .setColor("#e67e22")
          .setTitle("Le dé ne possède pas de stats")
          .setDescription("Tapez `/roll` pour afficher l'aide.")
          .setFooter(version);
          return message.channel.send(serverembed);
        }
        else if (faces == 0 && stats == undefined) {//espace au d (ex : /roll d 4269)
          console.log("Erreur : Vous avez mis un espace après le d");
          serverembed = new Discord.RichEmbed()
          .setAuthor("Erreur", errormark, dicetinyadmin.githubDicetiny)
          .setColor("#e67e22")
          .setTitle("Vous avez mis un espace après le `d`")
          .setDescription("Tapez `/roll` pour afficher l'aide.")
          .setFooter(version);
          return message.channel.send(serverembed);
        }
        else if (stats == 0 && faces == 0) {//pas de valeur ds les variables
          console.log("Erreur : Les faces et stats du dé sont égaux à zero");
          serverembed = new Discord.RichEmbed()
          .setAuthor("Erreur", errormark, dicetinyadmin.githubDicetiny)
          .setColor("#e67e22")
          .setTitle("Les faces et stats du dé sont égaux à zero")
          .setDescription("Tapez `/roll` pour afficher l'aide.")
          .setFooter(version);
          return message.channel.send(serverembed);
        }
        else {
          console.log("Erreur : Mauvaise syntaxe");
          serverembed = new Discord.RichEmbed()
          .setAuthor("Erreur", errormark, dicetinyadmin.githubDicetiny)
          .setColor("#e67e22")
          .setTitle("Mauvaise syntaxe")
          .setDescription("Tapez `/roll` pour afficher l'aide.")
          .setFooter(version);
          return message.channel.send(serverembed);
        }
      }
      else return message.channel.send(rtnmsg.error("notStarted"));
    }
  }
})

dicetiny.login(dicetinyconfig.token);
