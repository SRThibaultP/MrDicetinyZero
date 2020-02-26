const dicetinyconfig = require("./config.json");
const dicetinyadmin = require("./dicetiny.json");
const images = require("./images.json");
const Discord = require("discord.js");
var rtnmsg = require("./rtnmsg.js");

const dicetiny = new Discord.Client({disableEveryone: true});
let aleatoire, serverembed;
let gamestart, gamestop, gamestatus = 0, gameDstart, gameDstop, Ssuccess = SsuccessC = Sechec = SechecC = 0;
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

dicetiny.on("ready", async () => {
  console.log(logger() + ` [INFO]: ${dicetiny.user.username} est en ligne !`);
  dicetiny.user.setActivity("Attend le démarage du JDR /gamestart pour démarrer la partie /roll pour afficher l'aide dans la partie", {type: "PLAYING"});
  dicetiny.user.setStatus('idle');
});

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

  if(cmd === `${prefix}yousk2`) {
    toReturn = new Discord.RichEmbed()
    .setAuthor("DEV", checkmark)
    .setColor("#32ff7e")
    .setThumbnail(gicon)
    .setTitle(text)
    .setDescription(text2);
    message.channel.send(toReturn);
    return console.log(logger() + " [DEV]: DEV");
  }

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

        function rolling() {
          return Math.floor((Math.random() * faces) + 1);
        }

        if (stats == undefined && faces.match(/^[0-9]+$/) != null) {
          aleatoire = rolling();
          console.log(logger() + " [INFO]: Lancer d'un dé à " + faces + " faces");
          console.log(logger() + " [INFO]: Le résultat est " + aleatoire);
          return message.channel.send(rtnmsg.roll("noStats", faces, aleatoire, uicon, userBrut));//LANCER D'UN DE SANS STATS = Dé Classique
        }
        else if (faces > 0 && stats > 0 && faces.match(/^[0-9]+$/) != null && stats.match(/^[0-9]+$/) != null){
          aleatoire = rolling();
          console.log(logger() + " [INFO]: Lancer d'un dé à " + faces + " faces avec " + stats + " de stats");
          console.log(logger() + " [INFO]: Le résultat est " + aleatoire);
          if (faces == 6) {
            if (stats > 6) return message.channel.send(rtnmsg.roll("superior", faces));
            else {
              if (aleatoire == 1) {
                SsuccessC++;
                return message.channel.send(rtnmsg.roll("succesCritique", uicon, aleatoire, userBrut));
              }
              else if (aleatoire == 6) {
                SechecC++;
                return message.channel.send(rtnmsg.roll("echecCritique", uicon, aleatoire, userBrut));
              }
              else if (aleatoire <= stats) {
                Ssuccess++;
                return message.channel.send(rtnmsg.roll("succes", uicon, aleatoire, userBrut));
              }
              else if (aleatoire > stats) {
                Sechec++;
                return message.channel.send(rtnmsg.roll("echec", uicon, aleatoire, userBrut));
              }
              else return message.channel.send(rtnmsg.error("unknown"));//aleatoire ne possede pas de valeur?
            }
          }
          else if (faces == 100) {
            if (stats > 100) return message.channel.send(rtnmsg.roll("superior", faces));
            else {
              if (aleatoire == 1) {//réussite critique
                SsuccessC++;
                return message.channel.send(rtnmsg.roll("succesCritique", uicon, aleatoire, userBrut));
              }
              else if (aleatoire == 100) {//echec creitique
                SechecC++;
                return message.channel.send(rtnmsg.roll("echecCritique", uicon, aleatoire, userBrut));
              }
              else if (aleatoire <= stats) {
                Ssuccess++;
                return message.channel.send(rtnmsg.roll("succes", uicon, aleatoire, userBrut));
              }
              else if (aleatoire > stats) {
                Sechec++;
                return message.channel.send(rtnmsg.roll("echec", uicon, aleatoire, userBrut));
              }
              else return message.channel.send(rtnmsg.error("unknown"));//aleatoire ne possede pas de valeur?
            }
          }
          else return message.channel.send(rtnmsg.roll("noStats", faces, aleatoire, uicon, userBrut));
          dicetiny.user.setActivity("JDR en cours | /roll pour afficher l'aide | STATS: ÉC: " + SechecC + " É: " + Sechec + " S: " + Ssuccess + " SC: " + SsuccessC, {type: "PLAYING"});
        }
        else if (faces < stats) return message.channel.send(rtnmsg.error("facesSupStats"));
        else if (stats > 0 && faces == 0) return message.channel.send(rtnmsg.error("noFaces"));//stats uniquement = LE MEC S'EST GOURE
        else if (faces == 0 && stats == undefined) return message.channel.send(rtnmsg.error("space"));//espace au d (ex : /roll d 4269)
        else if (stats == 0 && faces == 0) return message.channel.send(rtnmsg.error("equalZero"));//pas de valeur ds les variables
        else return message.channel.send(rtnmsg.error("syntaxe"));
      }
      else return message.channel.send(rtnmsg.error("notStarted"));
    }
  }
})

dicetiny.login(dicetinyconfig.token);
