var Player, Player_parado, Player_correndo, Player_cuspindo
var Corpo, teste
var Ttime = "over"
var angle = 0
var fogoAnim, fogo, tiro, tiroAnim, fogos = [], arma = 1
var gamemode = "HomePage",GOScreen
var podeAtirarPistola = true
var enter
var zumbi, zumbis = [], zumbis_morte, Calvo_OAnim, Carequinha_humanoImg,Normal_HumanoImg, Calvo_HumanoImg,Calvo_O_ParadoImg,Calvo_MAnim,CalvoAnim, CarequinhaAnim, Normal_ParadoImg,NormalAnim, Calvo_ParadoImg, Calvo_M_ParadoImg,Calvo_M_HumanoImg,Carequinha_ParadoImg
//const ValorTF = 5
var tiro = "nada", score = 0, desZumbificados = 0, streak = 0, maxStreak = 0, streaks = [], maxscore = 0
var Ztiro, tiros = []
var alvo_player 
var Atin, CmouseAtin, FmouseAtin
var vidas = 3, aviso = true
var Zangulo, Zangulos =[]
var IndiceF, IndicesF = []
var acertou = "nop", morreu = "nop"
var moedas = [], moeda, carteira = 0, ordem_popUps = []
var database, form, Background
var usuario,userCount,allUsers
var Pausepg, homepg, lojinha,coinImg, podeAtirarSG = true
var maxStreakTxt,scoreTxt,vidasTxt,desZumbificadosTxt,moedasTxt,streakTxt
var ArmaAtual
var SGSom, PistSom, coinSom, hitSom, correrSom, acertouSom, acertouSom2, acertouSom3,musica,menuSom
var volume = 1


function preload(){


  SGSom = loadSound("sons/SG.mp3")
  coinSom = loadSound("sons/coin.mp3")
  PistSom = loadSound("sons/pistola.mp3")
  hitSom = loadSound("sons/perdeu vida.mp3")
  correrSom = loadSound("sons/running-1-6846.mp3")
  acertouSom = loadSound("sons/Zumbi levando tiro.mp3")
  acertouSom2 = loadSound("sons/Zumbi levando tiro2.mp3")
  acertouSom3 = loadSound("sons/Zumbi levando tiro3.mp3")
  musica = loadSound("sons/musica.mp3")
  menuSom = loadSound("sons/menu.mp3")
  

  Player_parado = loadImage("Assets/Player/Player_parado.png")
  Player_correndo = loadAnimation("Assets/Player/Player_correndo1.png","Assets/Player/Player_correndo2.png","Assets/Player/Player_correndo3.png","Assets/Player/Player_correndo4.png","Assets/Player/Player_correndo5.png")
  Player_cuspindo = loadAnimation("Assets/Player/Player_cuspindo1.png","Assets/Player/Player_cuspindo2.png","Assets/Player/Player_cuspindo3.png")

  fogoAnim = loadAnimation("Assets/Fogo/foguinho1.png","Assets/Fogo/foguinho2.png","Assets/Fogo/foguinho3.png")

  coinImg =loadImage("Assets/coin.png")
  SGimg = loadImage("Assets/unnamed.png")

  CarequinhaAnim = loadAnimation("Assets/Carequinha/Carequinha1.png","Assets/Carequinha/Carequinha2.png","Assets/Carequinha/Carequinha3.png","Assets/Carequinha/Carequinha4.png","Assets/Carequinha/Carequinha5.png")
  Carequinha_humanoImg = loadImage("Assets/Carequinha/Carequinha humano.png")
  Carequinha_ParadoImg = loadImage("Assets/Carequinha/Carequinha1.png")

  Normal_ParadoImg = loadImage("Assets/Normal/Normal1.png")
  Normal_HumanoImg = loadImage("Assets/Normal/Normal Humano.png")
  NormalAnim = loadAnimation("Assets/Normal/Normal1.png","Assets/Normal/Normal2.png","Assets/Normal/Normal3.png","Assets/Normal/Normal4.png","Assets/Normal/Normal5.png")
  
  Calvo_MAnim = loadAnimation("Assets/Calvo tipo M/Calvo tipo M1.png","Assets/Calvo tipo M/Calvo tipo M2.png","Assets/Calvo tipo M/Calvo tipo M3.png","Assets/Calvo tipo M/Calvo tipo M4.png","Assets/Calvo tipo M/Calvo tipo M5.png")
  Calvo_M_HumanoImg =loadImage("Assets/Calvo tipo M/Calvo tipo M humano.png")
  Calvo_M_ParadoImg = loadImage("Assets/Calvo tipo M/Calvo tipo M parado.png")
  
  Calvo_O_ParadoImg = loadImage("Assets/Calvo tipo O/Calvo tipo O1.png")
  Calvo_OAnim = loadAnimation("Assets/Calvo tipo O/Calvo tipo O1.png","Assets/Calvo tipo O/Calvo tipo O2.png","Assets/Calvo tipo O/Calvo tipo O3.png","Assets/Calvo tipo O/Calvo tipo O4.png","Assets/Calvo tipo O/Calvo tipo O5.png")
  
  Calvo_ParadoImg = loadImage("Assets/Calvo grave/Calvo parado.png")
  Calvo_HumanoImg = loadImage("Assets/Calvo grave/Calvo humano.png")
  CalvoAnim = loadAnimation("Assets/Calvo grave/Calvo1.png","Assets/Calvo grave/Calvo2.png","Assets/Calvo grave/Calvo3.png","Assets/Calvo grave/Calvo4.png","Assets/Calvo grave/Calvo5.png")
}


function setup() 
{
  database = firebase.database()
  createCanvas(windowWidth, windowHeight)
  //evitar bug
  angleMode(DEGREES)
  rectMode(CENTER)
  imageMode(CENTER)

  setAllGameElements()
  ArmaAtual = createElement("h2")
  ArmaAtual.class("greeting")
  ArmaAtual.position(20,height-120)
  

  //área do Player
  Player = createSprite(windowHeight/2, windowWidth/2, 60, 60)
  Player.addImage("normal", Player_parado)
  Player.addAnimation("correndo", Player_correndo)
  Player.addAnimation("cuspindo", Player_cuspindo)
  Player.visible = false
  Player.setCollider("circle", 0, 0, 25)
  Player.x = windowWidth/2
  Player.y = windowHeight/2
  //tempo do cooler do tiro

  

  
  //start sendo botão
  
  enter = new Enter()
  enter.setAll()
  enter.getstart()
  enter.hideAll()

  
}

function draw(){
  background("white")
  
  

  configurar_moedas()
  //para iniciar o jogo
  /*start.mouseClicked(
    iniciar
  )*/
  //quando jogar

  if(musica.isPlaying()){
    musica.setVolume(volume)
  }
  if(gamemode == "play"){
    
    
    if(musica.isPlaying() == false){
      musica.play()
    }
    
    if(usuario.name !== undefined){
      database.ref("Users/User"+usuario.index+"/MaxStreaks").on("value",data =>{
        usuario.MaxStreak = data.val()
      })
    }
    aparecerStatus()
    if(enter !==undefined){
      enter = undefined
    }
    //Player.debug = true
    //animação do Player
    Player.visible = true

    /*if(usuario.name !== undefined){
      database.ref("Users/User"+ usuario.index+"/MaxStreaks").on("value",data =>{
        maxStreak = data.val()
      })
    }
    }
  for(var g = streaks.length-1; g > -1; g--){
    if(streaks[g]>maxStreak){
      maxStreak = streaks[g]
      if(usuario.name !== undefined){
        let R = "Users/User" + usuario.index
        database.ref(R).update({
          MaxStreaks: maxStreak
        })
      }
    }
  }
  if(maxscore< score){
      maxscore = score
  }*/
  if(usuario.name !== undefined){
    if(usuario.MaxStreaks<maxStreak){
      let R = "Users/User" + usuario.index
      database.ref(R).update({
        MaxStreaks: maxStreak
      })
      usuario.MaxStreaks
    }

  }
  if(maxStreak< streak){
    maxStreak = streak
  }

    walk()
    CmouseAtin = atan2(mouseY - Player.y, mouseX - Player.x)
    Player.rotation = CmouseAtin +90
    //criar inimigos
    inimigos()
    //movimento
    
    //quando for levar dano



    
    TxtHtml()

    //if(vidas == 3){
    /*if(maxStreak< streak){
      maxStreak = streak
    }*/
    /*if(usuario.name !== undefined){
      if(usuario.MaxStreak < maxStreak){
        let R = "Users/User" + usuario.index
        database.ref(R).update({
          MaxStreaks: maxStreak
        })
      }
    }*/

    if(maxscore< score){
      maxscore = score
    }
    if(usuario.name !== undefined){
      if(usuario.MaxScore<maxscore){
        let R = "Users/User" + usuario.index
        database.ref(R).update({
          MaxScores: maxscore
        })
        usuario.MaxScore
      }
    }
    

    alvo_player = createVector(Player.x, Player.y)


    //trocar animações do player
    if(Player.velocity.x == 0 && Player.velocity.y == 0 && tiro == "nada"){ 
      Player.changeImage("normal")
    }else if(tiro == "atirando"){
      Player.changeAnimation("cuspindo")
    }else if(Player.velocity.x > 0 || Player.velocity.y > 0|| Player.velocity.y < 0|| Player.velocity.x < 0 && tiro == "nada"){
      Player.changeAnimation("correndo")
    }
    

    //diminuir cooler do tiro

    


    if(Player.x <= Player.width/2){
      Player.x = Player.width/2
    }
    if(Player.y <= Player.height/2){
      Player.y = Player.height/2
    }
    if(Player.x >= width - Player.width/2){
      Player.x = width - Player.width/2
    }
    if(Player.y >= height - Player.height/2){
      Player.y = height - Player.height/2
    }
      // a cada fogo colocar suas popriedades
    

      for(let a = fogos.length -1 ; a> -1; a--){
        fogos[a].show()
        fogos[a].mouse()
      }



      /*for(let contar =0; contar<chefes.length; contar++){
        let pos =chefes[contar].body.position
        let pessoa = chefes[contar]
        CAtin = atan2(Player.y - chefes[contar].body.position.y, Player.x - chefes[contar].body.position.x)
        rotacionar(Catin)
        show()
        let chefeDir = createVector(Player.x - pos.x, Player.y - pos.y)
        Player(chefeDir)


        if(pessoa.body.overlap(Player)){
    
          streaks.push(streak)
          streak = 0

          if(aviso == true){
            vidas -= 1
          }
          
          if(vidas == 0){
            zumbis[i].body.remove()
            zumbis.splice(i,1)
          }else{
            if(aviso == true){
            let Zcorpo3 = zumbis[i].body
            zumbis.splice(i, 1)
            setTimeout(function(){
              Zcorpo3.remove()
            }, 1000)
          }
            
          }
          aviso = false
          zumbis_morte = "morrer"
          setTimeout(function(){
            aviso = true
          }, 5000)
        }
      
        if(aviso == false){
          zumbis_morte = "morrer"
          setTimeout(function(){
            aviso = true
          }, 5000)
        }
      }*/





    




    //console.log(acertou)
    
    //tiro dos zumbis 
    for(var b = tiros.length -1; b >-1;   b--){

      //a cada tiro colocar suas propriedades
      if(tiros[b] !== undefined){
        tiros[b].rotation()
        tiros[b].mouse()
        tiros[b].show()
        tiros[b].lifetime = 35 
        //se bater destruir e reiniciar
        if(tiros[b].body.overlap(Player)){
          hitSom.play()
          hitSom.setVolume(volume)
          tiros[b].body.remove()
          tiros.splice(b,1)
          streaks.push(streak)
          streak = 0
          if(aviso == true){
            vidas -= 1
          }
          
  
  
          for(let contar = zumbis.length -1; contar > -1; contar--){
          if(vidas == 0){
            zumbis[contar].body.remove()
            zumbis.splice(contar,1)
            aviso = false
            zumbis_morte = "morrer"
            setTimeout(function(){
              aviso = true
            }, 5000)
          }else{
            if(aviso == true){
            let Zcorpo3 = zumbis[contar].body
            zumbis.splice(contar, 1)
            setTimeout(function(){
              Zcorpo3.remove()
            }, 1000)
            aviso = false
            zumbis_morte = "morrer"
            setTimeout(function(){
              aviso = true
            }, 5000)
          }
          }
        }
          //reiniciar
        }else{
          tiros[b].sair(b)
        }
      }
      
    
    }
    
    if(zumbis_morte == "morrer"){
      restartZ()
      if(vidas == 0){
        restartAll()
      }
    }

    //virar player


    if(vidas <= 0){
      gamemode = "over"
      //apagar todos os zumbis quando vida == 0 (segundo matar)
      for(var y = zumbis.length -1; y> -1; y--){
        zumbis[zumbis.length-1].body.remove()
        zumbis.pop()
      }
    }

    zombieConfg()

    

    ArmaAtual.show()
    if(arma == 1){
      ArmaAtual.html("Arma atual: pistola")
    }else{
      if(arma == 2){
        ArmaAtual.html("Arma atual: ShotGun")
      }
    }


    
    drawSprites()
  }else{
    //estado over, colocar tela de morte
    if(gamemode == "over"){
      hideAllElements()
      if(GOScreen == undefined){
        GOScreen = new Acabou()
        GOScreen.setAll()
        GOScreen.aparecer()
      }
      GOScreen.funcionando()
      GOScreen.aparecer()



      /*if((zumbis.length == 0 && tiros.length == 0 && fogos.length == 0 && alertas.length == 0)==true){
        Player.visible = false
        background("black")
  
        
        //texto GAMEOVER
        /*push()
        textSize(180)
        fill("red")
        text("GAME", width/2 -300, 200)
        fill("red")
        text("OVER",width/2 -300, 400)
        pop()*/
  
        //pontuação
        /*push()
        textSize(108)
        fill("red")
        text("score = " + score, width/2-300, 600)
        fill("red")
        text("desZumbificados = " + desZumbificados, width/2-300, 700)
        fill("red")
        text("MaxStreak = "+ maxStreak,width/2 -300, 800)
        pop()*/
      /*}else{
        restartAll()
        if(zumbis.length == 0 && tiros.length == 0 && fogos.length == 0 && alertas.length == 0){
          setTimeout(() => {
            return true 
          }, 10000);
        }else{
          return false
        }
      }*/
    }else{
      if(gamemode == "pause"){
        Phtml()
        paused()
      }else{
        if(gamemode == "entrando"){
          if(enter !== undefined){
            enter.funciona()
          }else{
            enter = new Enter()
            enter.getstart()
          }
        }else{
          if(gamemode == "HomePage"){

            home()
            if(homepg.State == 4){
              ArmaAtual.show()
              if(arma == 1){
                ArmaAtual.html("Arma atual: pistola")
              }else{
                if(arma == 2){
                  ArmaAtual.html("Arma atual: ShotGun")
                }
              }
            }
          }
        }
      }
    }

  }
  if(homepg.State !== 1){
    drawSprites()
  }

}

function setAllGameElements(){

  scoreTxt = createElement("h2")
  scoreTxt.class("marcadorPartida")
  scoreTxt.position(0, 60)
  
  
  desZumbificadosTxt = createElement("h2")
  desZumbificadosTxt.class("marcadorPartida")
  desZumbificadosTxt.position(444.472, 60)
  
  
  streakTxt = createElement("h2")
  streakTxt.class("marcadorPartida")
  streakTxt.position(1016.314,60)
  
  
  maxStreakTxt = createElement("h2")
  maxStreakTxt.class("marcadorPartida")
  maxStreakTxt.position(1361.385,60)
  
  
  vidasTxt = createElement("h2")
  vidasTxt.class("marcadorPartida")
  vidasTxt.position(1361,160)
  
  
  moedasTxt = createElement("h2")
  moedasTxt.class("marcadorPartida")
  moedasTxt.position(0,160)
  
}

function hideAllElements(){
  scoreTxt.hide()
  desZumbificadosTxt.hide()
  streakTxt.hide()
  maxStreakTxt.hide()
  vidasTxt.hide()
  moedasTxt.hide()
}


function TxtHtml(){
  scoreTxt.html("score = " + score)
  desZumbificadosTxt.html("desZumbificados = " + desZumbificados)
  streakTxt.html("streak = "+ streak)
  if(usuario.name !== undefined){
    maxStreakTxt.html("MaxStreak = "+ usuario.MaxStreak)
  }else{
    maxStreakTxt.html("MaxStreak = "+ maxStreak)
  }
  
  vidasTxt.html(vidas+"X vidas")
  moedasTxt.html("moedas = "+carteira)
}

function home(){
  if(homepg == undefined){
    homepg = new HomePage()
    homepg.setAll()
  }
  homepg.aparecer()
  homepg.buttonClick()
}

function Phtml(){
  if(Pausepg == undefined){
    Pausepg = new Pause()
    Pausepg.setC()
  }
  Pausepg.aparecer()
  Pausepg.buttomclick()
}

function paused(){
  pauseArray(fogos)
  pauseArray(tiros)
  //pauseArray(moedas)
  pauseArray(zumbis)
  pausePlayer()
}

/*function pauseFire(){
  for(let f = fogos.length -1; f >-1;  f--){
    fogos[f].body.lifetime += 1
    fogos[f].body.animation.stop()
  }
}*/

function pauseArray(nome){
  for(let t = nome.length -1; t >-1;  t--){
    let body =nome[t].body
    body.animation.stop()
    if(body.lifetime >0){
      body.lifetime += 1
    }
    
  }
}


function pausePlayer(){
  let vel =Player.velocity
  Player.animation.stop()
  vel.x = 0
  vel.y = 0
}


function configurar_moedas(){
  if(moedas.length >0){
    for(let contar = moedas.length-1; contar>-1;contar--){ 
      //moedas[contar].show()
      moedas[contar].perseguir(Player)
      moedas[contar].dindin()
      for(let contar2 = ordem_popUps.length -1; contar2> -1; contar2--){
        if(moedas[contar] !== undefined){
          moedas[contar].show(contar2)
          console.log(ordem_popUps.length)
        }
      }
    }
  }
}

function acertar(i,a){
          
  if(zumbis[i].body !== undefined){
    
    //se ficar colado um em cima do outro
    if(zumbis[i].body.overlap(fogos[a].body)){
      score += 20
      streak +=1
      if(arma == 1){
        let qualSom = Math.round(random(1,11))
        if(qualSom <=5){
          acertouSom.play()
          acertouSom.setVolume(volume)
        }else{
          if(qualSom<=10&&qualSom>5){
            acertouSom2.play()
            acertouSom2.setVolume(volume)
          }else{
            acertouSom3.play()
            acertouSom3.setVolume(volume)
          }
        }
        qualSom = null
      }
      
      
      if(fogos[a].tipo ==1){
        zumbis[i].vidas -= 3
      }else{
        if(fogos[a].tipo ==2){
          zumbis[i].vidas -= 1
        }
      }
      
      if(zumbis[i].vidas <= 0 && zumbis[i].morreu == "nop" ){

        

        let Fcorpo = fogos[a].body
        zumbis[i].body.changeAnimation("feliz") 
        Zangulo = fogos[a].dir//direção do fogo
        zumbis[i].getAngle(Zangulo)//pegar a direção, angulo do nockback,que seria o angulo do fogo só q para trás
  

        Fcorpo.destroy()
        fogos.splice(a,1)//apaga fogo 

        if(arma == 2){
          let qualSom = Math.round(random(1,11))
          if(qualSom <=5){
            acertouSom.play()
            acertouSom.setVolume(volume)
          }else{
            if(qualSom<=10&&qualSom>5){
              acertouSom2.play()
              acertouSom2.setVolume(volume)
            }else{
              acertouSom3.play()
              acertouSom3.setVolume(volume)
            }
          }
          qualSom = null
        }
                 
        zumbis[i].morreu = "sim" //condição para knockback acontecer
                  
                  
                  
        //fazer ele parar de seguir, colocar uma animação de morto e dps
        //colocar um timeout para desaparecer e apagar
                  
  
      }else{
        
        //se a vida for maior q zero ele só toma nockbavk e atordoa
        if(zumbis[i].vidas > 0 && zumbis[i].morreu == "nop" ){
          let Fcorpo = fogos[a].body          
          zumbis[i].Mvel = 10
          Zangulo = fogos[a].dir
          zumbis[i].getAngle(Zangulo)
          zumbis[i].Tatordoado = 30
          zumbis[i].morreu = "sim"

                    
          Fcorpo.destroy()
          fogos.splice(a,1)//apaga fogo
        }else{
          if(zumbis[i].vidas <= 0 && zumbis[i].morreu == "sim" ){
            if(zumbis[i].classe == 3){
              zumbis[i].Mvel = 10
              Zangulo = fogos[a].dir
              zumbis[i].getAngle(Zangulo)
              zumbis[i].knockback = "já foi" 
              
            }else{
              if(zumbis[i].classe ==4){
                zumbis[i].Mvel = 10
                Zangulo = fogos[a].dir
                zumbis[i].getAngle(Zangulo)
                zumbis[i].knockback = "já foi" 
                if(zumbis[i].vidas>0){
                  zumbis[i].morreu = "nop"
                }
              }
            }
          }          
        }
                    
        if(fogos[a] !== undefined){
          let Fcorpo = fogos[a].body          
          zumbis[i].Mvel = 10
          Zangulo = fogos[a].dir
          zumbis[i].getAngle(Zangulo)
          zumbis[i].Tatordoado = 30
          zumbis[i].morreu = "sim"         
          Fcorpo.destroy()
          fogos.splice(a,1)//apaga fogo
          if(zumbis[i].vidas>0){
            zumbis[i].morreu = "nop"
          }
        }
                     

                  
      }
        
      
    }else { 
      fogos[a].sair(a) //caso n atinja um zumbi, se sair da tela ele é deletado
    }

  }    
}

function matar(){
  for(let contar = 0; contar< zumbis.length;   contar++){
    if(zumbis.length !== 0){
      //ter crtz de destruir todos os zumbis (segunda morte)
      let Zcorpo4 = zumbis[zumbis.length-1].body
      Zcorpo4.destroy()
      zumbis.pop()
    }
  }
}

function restartAll(){
  restartZ()
  restartF()
  restartT()
  restartM()
}
//desruir tiros no "over"
function restartT(){
  if(tiros.length !== undefined){
    for(let hmm = tiros.length-1; hmm> -1;   hmm--){
      tiros[tiros.length-1].body.remove()
      tiros.pop()
    }
  }
}


//desruir fogos no "over"
function restartF(){
  if(fogos.length !== undefined){
    for(let hm = fogos.length-1; hm> -1;   hm--){
      fogos[fogos.length-1].body.remove()
      fogos.pop()
    }
  }
}

function zumbiMorre(){
  for(let contar = zumbis.length-1; contar> -1;   contar--){
    zumbis[zumbis.length-1].body.remove()
    zumbis.pop()
  }
}
//desruir zumbis no "over"
function restartZ(){
  
    for(let contar = zumbis.length-1; contar> -1;   contar--){
      if(zumbis.length !== 0){
        //checar se vidas ==0 e se for ele mata tudo (primeiro matar)
        if(vidas == 0){
          let Zcorpo4 = zumbis[zumbis.length-1].body
          Zcorpo4.destroy()
          zumbis.pop()
        }else{
          //se não faz normal
          let Zcorpo4 = zumbis[zumbis.length-1].body
          zumbis.pop()
          setTimeout(function(){
            Zcorpo4.remove()
          }, 1000)
        }
    }
     //zumbis = []
    }

    
    zumbis_morte = "vivo"
    
  
}

function restartM(){
  
  for(let contar = moedas.length-1; contar> -1;   contar--){
    if(moedas.length !== 0){
      //checar se vidas ==0 e se for ele mata tudo (primeiro matar)
      if(vidas == 0){
        let MoedaCorpo = moedas[moedas.length-1].body
        moedas[moedas.length-1].granaTxt.hide()
        MoedaCorpo.destroy()
        moedas.pop()
      }
  }
   //zumbis = []
  }
}

function zSeMorreu(i){
  if(zumbis[i].morreu == "nop"){
    


    //angulo da tangente entre o Player e o zumbi

    ZClass(i)
    


    //tempo até matar
    zombieTimer(i)
    
    zombieOverlap(i)
    
      if(aviso == false){
        zumbis_morte = "morrer"
        setTimeout(function(){
          aviso = true
        }, 5000)
      }
    }else{
      if(zumbis[i].morreu == "sim"){ 
        zumbis[i].morrer(i)//fazer knockback
      }
    }
}
function zombieConfg(){
  for(var i = zumbis.length -1; i>-1;   i--){
    zumbis[i].cronometro()//cronometro
    //seguir
    Atin = atan2(Player.y - zumbis[i].body.position.y, Player.x - zumbis[i].body.position.x)//angulo
    for(var a = fogos.length-1; a>-1; a--){
        
      //zumbis[i].body.changeAnimation("perseguir")
      fogos[a].apontar()//apontar
      //checar colisão
      if(zumbis[i] !== undefined && fogos[a] !== undefined){
        acertar(i,a)//fazer ver se bateu, e ver se deu knockback
      }
    }
    zSeMorreu(i)

    
      
      
}
}
function ZClass(i){

  if(zumbis[i].Tatordoado !== 0){
    zumbis[i].body.changeImage("stun")
  }else{
    zumbis[i].body.changeAnimation("perseguir")
  }
  if(zumbis[i].classe == 5){
    if(zumbis[i].time == 0){
      let pos = zumbis[i].body.position
      let zumbiDir = createVector(Player.x-pos.x, Player.y-pos.y).normalize()
      zumbis[i].Player(zumbiDir)
      zumbis[i].show()
      zumbis[i].rotacionar(Atin)
      //zumbis[i].cronometro()
      zumbis[i].atirar(Player.x, Player.y)
    }else{
      zumbis[i].rotacionar(Atin)
      //zumbis[i].cronometro()
      zumbis[i].show()

    }
  }else{
    if(zumbis[i].classe == 3 || zumbis[i].classe == 4){
      if(zumbis[i].Tatordoado == 0){
        let pos = zumbis[i].body.position
        let zumbiDir = createVector(Player.x-pos.x, Player.y-pos.y).normalize()
        zumbis[i].Player(zumbiDir)
        zumbis[i].show()
        zumbis[i].rotacionar(Atin)
        //zumbis[i].cronometro()
      }else{
        zumbis[i].rotacionar(Atin)
        //zumbis[i].cronometro()
        zumbis[i].show()
        //zumbis[i].body.changeImage("stun")
      }

      }else{
        //zumbis[i].body.attractPoint(zumbis[i].vel, Player.x, Player.y)
        //zumbis[i].body.friction = 0.5
        if(zumbis[i].classe <3){
          let pos = zumbis[i].body.position
          let zumbiDir = createVector(Player.x-pos.x, Player.y-pos.y).normalize()
          zumbis[i].Player(zumbiDir)
          zumbis[i].show()
          zumbis[i].rotacionar(Atin)
          //zumbis[i].cronometro()
      }
    }
  } 
}
function zombieTimer(i){
  if(zumbis[i].tempo == 0){ 
    let Zcorpo2 = zumbis[i].body  
    zumbis.splice(i,1)
    setTimeout(function(){
      Zcorpo2.remove()
    }, 1000)
    if(aviso == true){
      vidas -= 1
    }
  }
}
function zombieOverlap(i){
  if(zumbis[i].body.overlap(Player)){
    hitSom.play()
    hitSom.setVolume(volume)
    streaks.push(streak)
    streak = 0

    if(aviso == true){
      vidas -= 1
    }
    
    if(vidas == 0){
      zumbis[i].body.remove()
      zumbis.splice(i,1)
    }else{
      if(aviso == true){
      let Zcorpo3 = zumbis[i].body
      zumbis.splice(i, 1)
      setTimeout(function(){
        Zcorpo3.remove()
      }, 1000)
    }
      
    }
    aviso = false
    zumbis_morte = "morrer"
    setTimeout(function(){
      aviso = true
    }, 5000)
  }
}

function mouseReleased(){
  //cooldown do tiro
    
    
    //se n tiver encima ele atira quando mouse clicado
    if(gamemode == "play"){
      if(arma == 1){
        if(podeAtirarPistola){
          tiro = "atirando"
          PistSom.play()
          PistSom.setVolume(volume)
          if (dist(mouseX, mouseY, Player.x, Player.y) >= 50) {
            dir_fogo = CmouseAtin
            fogo = new Fogo(mouseX,mouseY, 10, 10,Player.x,Player.y, dir_fogo,1)
            fogo.dir.normalize()
            fogo.body.addAnimation("indo",fogoAnim)
            //adicionar prpriedades q já vem com todo fogo para n bugar
            fogo.apontar()
            fogo.body.lifetime = 35 
            fogo.body.depth = Player.depth -1
            fogos.push(fogo)
          }
          podeAtirarPistola = false
          setTimeout(function(){
            podeAtirarPistola = true
          }, 300)
          setTimeout(function(){
            tiro = "nada"
          }, 400)
        }
      }else{
        if(arma == 2){
          if(podeAtirarSG){
            tiro = "atirando"
            SGSom.play()
            SGSom.setVolume(volume)
            let distancia = dist(mouseX, mouseY, Player.x, Player.y)
            if (distancia >= 70){
              if(distancia<=120){
                for(let contar = 0; contar<20; contar++){
                  /*let AposX = Math.round(random(mouseX-100, mouseX+100))
                  let AposY = Math.round(random(mouseY-100, mouseY+100))*/
                  let AposX = Math.round(random(mouseX-50, mouseX+50))
                  let AposY = Math.round(random(mouseY-50, mouseY+50))
                  /*AposX *=2
                  AposY *=2*/
    
                  let dir_fogo2 = atan2(AposY - Player.y, AposX - Player.x)
                  //let proporção = -120/(AposX-Player.x + AposY-Player.y)
                  //AposX*=proporção
                  //AposY*=proporção
                  fogo = new Fogo(AposX,AposY, 10, 10,Player.x,Player.y, dir_fogo2,2)
                  //fogo.dir.mult()
                  fogo.dir.setMag(120)
                  fogo.dir.normalize()
    
                  
                  fogo.body.addAnimation("indo",fogoAnim)
                  //adicionar prpriedades q já vem com todo fogo para n bugar
                  fogo.apontar()
                  fogo.body.lifetime = 15 
                  fogo.body.depth = Player.depth -1
                  fogos.push(fogo)
                  
              }
              }else{
                for(let contar = 0; contar<20; contar++){
                  /*let AposX = Math.round(random(mouseX-100, mouseX+100))
                  let AposY = Math.round(random(mouseY-100, mouseY+100))*/
                  let AposX = Math.round(random(mouseX-50, mouseX+50))
                  let AposY = Math.round(random(mouseY-50, mouseY+50))
                  /*AposX *=2
                  AposY *=2*/
                  let dir_fogo2 = atan2(AposY - Player.y, AposX - Player.x)
                  fogo = new Fogo(AposX,AposY, 10, 10,Player.x,Player.y, dir_fogo2,2)
                  fogo.dir.mult(distancia)
                  fogo.dir.normalize()
                  fogo.body.addAnimation("indo",fogoAnim)
                  //adicionar prpriedades q já vem com todo fogo para n bugar
                  fogo.apontar()
                  fogo.body.lifetime = 15 
                  fogo.body.depth = Player.depth -1
                  fogos.push(fogo)
              }
    
                }
                /*fogo = new Fogo(mouseX,mouseY, 10, 10,Player.x,Player.y, dir_fogo)
                fogo.body.addAnimation("indo",fogoAnim)
                //adicionar prpriedades q já vem com todo fogo para n bugar
                fogo.apontar()
                fogo.body.lifetime = 35 
                fogo.body.depth = Player.depth -1
                fogos.push(fogo)*/
            }
            podeAtirarSG = false
            setTimeout(() => {
              podeAtirarSG = true
            }, 500);
            setTimeout(function(){
              tiro = "nada"
            }, 400)
          }
  /*else{
            if(distancia > 150 && distancia <250) {
                for(let contar = 0; contar<20; contar++){
                  /*let AposX = Math.round(random(mouseX-100, mouseX+100))
                  let AposY = Math.round(random(mouseY-100, mouseY+100))
                  let AposX = Math.round(random(mouseX-50, mouseX+50))
                  let AposY = Math.round(random(mouseY-50, mouseY+50))
                  /*AposX *=2
                  AposY *=2
                  let dir_fogo2 = atan2(AposY - Player.x, AposX - Player.y)
                  fogo = new Fogo(AposX,AposY, 10, 10,Player.x,Player.y, dir_fogo2)
                  fogo.dir.mult(distancia)
                  fogo.dir.normalize()
                  //fogo.body.addAnimation("indo",fogoAnim)
                  //adicionar prpriedades q já vem com todo fogo para n bugar
                  fogo.apontar()
                  fogo.body.lifetime = 15 
                  fogo.body.depth = Player.depth -1
                  fogos.push(fogo)
                  /*let AposX = Math.round(random(mouseX-100, mouseX+100))
                  let AposY = Math.round(random(mouseY-100, mouseY+100))
                  let AposX = Math.round(random(mouseX-50, mouseX+50))
                  let AposY = Math.round(random(mouseY-50, mouseY+50))
                  AposX += 500
                  AposY += 500
                  let dir_fogo2 = atan2(AposY - Player.x, AposX - Player.y)
                  fogo = new Fogo(AposX,AposY, 10, 10,Player.x,Player.y, dir_fogo2)
                  fogo.dir.mult(50)
                  fogo.dir.normalize()
                  //fogo.body.addAnimation("indo",fogoAnim)
                  //adicionar prpriedades q já vem com todo fogo para n bugar
                  fogo.apontar()
                  fogo.body.lifetime = 35 
                  fogo.body.depth = Player.depth -1
                  fogos.push(fogo)*/
                
              
            
    
                    /*let AposX = Math.round(random(mouseX-100, mouseX+100))
                    let AposY = Math.round(random(mouseY-100, mouseY+100))
                    let AposX = Math.round(random(mouseX-20, mouseX+20))
                    let AposY = Math.round(random(mouseY-20, mouseY+20))
                    /*AposX += 
                    AposY += 
                    let dir_fogo2 = atan2(AposY - Player.x, AposX - Player.y)
                    fogo = new Fogo(AposX,AposY, 10, 10,Player.x,Player.y, dir_fogo2)
                    fogo.dir.mult(10)
                    fogo.dir.normalize()
                    //fogo.body.addAnimation("indo",fogoAnim)
                    //adicionar prpriedades q já vem com todo fogo para n bugar
                    fogo.apontar()
                    fogo.body.lifetime = 35 
                    fogo.body.depth = Player.depth -1
                    fogos.push(fogo)
                  }
                }  
          }
          }
          console.log(distancia)
        }*/
      }
      
    }
    }
    //else{
}


function keyPressed(){
  if(gamemode == "pause"){
    if(keyCode === 86){
      Pausepg.esconder()
      gamemode = "play"
      aparecerStatus()
    }
  }
  if(gamemode == "play"){
    if(keyCode === 67){
      gamemode = "pause" 
      esconderStatus()
    }
  }
}
function esconderStatus(){
  vidasTxt.hide()
  scoreTxt.hide()
  desZumbificadosTxt.hide()
  maxStreakTxt.hide()
  streakTxt.hide()
  moedasTxt.hide()
}

function aparecerStatus(){
  vidasTxt.show()
  scoreTxt.show()
  desZumbificadosTxt.show()
  maxStreakTxt.show()
  streakTxt.show()
  moedasTxt.show()
}

function walk(){


  //comandos para facilitar a escrita
  let vel = Player.velocity
  let medida1 = false
  let medida2 = false
  let medida3 = false
  let medida4 = false
  let k = keyDown
  let VV = 20


  
  //comandos para facilitar a escrita
  if(k("w")|| k("up"))
  {
    medida1 = true
  }else medida1 = false

 if(k("s")|| k("down"))
  {
    medida2 = true
  }else medida2 = false

  if(k("a")|| k("left"))
  {
    medida3 = true
  }else medida3 = false
  if(k("d")|| k("right") )
  {
    medida4 = true
  }else medida4 = false






  /*responder caso apenas uma for ligada e confirmar o oposto
  ex: w, ele confirma ir para cima e confirma ir para baixo por preucação
  */
  if (medida1 && !medida2 && !medida3 && !medida4) {
    vel.y = -VV;
    
    angle = 0
    
  }else{
    if(!medida1 && medida2 && !medida3 && !medida4){
      vel.y = VV;
      angle = 4
      }else{
        if(!medida1 && !medida2){
          vel.y = 0
          
        }
      }
  }

  


  if (medida2 && !medida1 && !medida3 && !medida4) {
    vel.y = VV;
    
    angle = 4
    
  }else{
    if(medida1 && !medida2 && !medida3 && !medida4){
      vel.y = -VV;
      angle = 0

      }else{
        if(!medida1 && !medida2){
          vel.y = 0
          
        }
      }
  }




  if (medida3 && !medida1 && !medida2 && !medida4) {
    vel.x = -VV;
    
    angle = 6
    
    
  }else{
    if(!medida3 && medida4 && !medida1 && !medida2){
      vel.x = VV;
      angle = 2
      
      }else{
        if(!medida3 && !medida4){
          vel.x = 0
        }
          
        
      }
    
  }
  



  if (medida4 && !medida1 && !medida2 && !medida3)  {
    vel.x = VV;
    

      angle = 2
     
  }else{
    if(medida3 && !medida4&& !medida2 && !medida1){
      vel.x = -VV;
      angle = 6
      
      }else{
        if(!medida3 && !medida4){
          vel.x = 0
        }
      }
  }
  

  /*responder caso apenas duas estejam ligado(diagonal)
  ex: w d, vai em diagonal
  */
  if(medida2 && medida3 && !medida1 && !medida4){
    vel.x = -Math.sqrt(Math.pow(VV,2)*2) /2
    vel.y = Math.sqrt(Math.pow(VV,2)*2) /2
    angle = 5
  }else{
    if(medida2 && medida4 && !medida1 && !medida3){
      vel.x = Math.sqrt(Math.pow(VV,2)*2) /2
      vel.y = Math.sqrt(Math.pow(VV,2)*2) /2
      angle = 3
    }
  }

  if(medida1 && medida3&& !medida2 && !medida4){
    vel.x = -Math.sqrt(Math.pow(VV,2)*2) /2
    vel.y = -Math.sqrt(Math.pow(VV,2)*2) /2
    angle = 7
  }else{
    if(medida1 && medida4&& !medida2 && !medida3){
      vel.x = Math.sqrt(Math.pow(VV,2)*2) /2
      vel.y = -Math.sqrt(Math.pow(VV,2)*2) /2
      angle = 1
    }
  }


  /*responder caso 2 estejam ligado(anular direções opostas)
  ex: w s, ele anula a velocidade y
  */
  if(medida1 && medida2 && !medida3 && !medida4){
    vel.y = 0
     
  }
    
  if(!medida1 && !medida2 && medida3 && medida4){
    vel.x = 0
    
  }
    
  if(medida1 && medida2 && medida3 && medida4){
    vel.x = 0
    
  }
      
    
  
  

  /* responder caso 3 estão ligado(anular direções opostas e continuar reto o único)
  ex: w s d, ele anula a velocidade y e continua a velocidade x
  */
  if(medida1 && !medida2 && medida3 && medida4){
    vel.x = 0
    vel.y = -VV
    angle = 0
  }

  if(!medida1 && medida2 && medida3 && medida4){
    vel.x = 0
    angle = 4
    vel.y = VV
  }
  if(medida1 && medida2 && medida3 && !medida4){
    vel.y = 0
    angle = 6
    vel.x = -VV
  }
  if(medida1 && medida2 && !medida3 && medida4){
    vel.y = 0
    angle = 2
    vel.x =  VV
  }

  if(vel.y !== 0||vel.x !==0){
    if(correrSom.isPlaying() == false){
      correrSom.play()
      correrSom.setVolume(volume)
    }
  }else{
    correrSom.pause()
  }

}

//zumbis
function inimigos(){
  if(frameCount % 30 === 0 && zumbis.length < 40 && aviso == true){
    let x
    let y
    let número = Math.round(random(1,4))
    let valor = Math.round(random(1,5))
    let Zvel
    if(valor == 1){
      Zvel = 5
      if(número == 1){
        x = -50
        y = Math.round(random(-30,windowHeight + 30))
      }else if(número == 2){
        x = Math.round(random(-30,windowWidth + 30))
        y = -50
      }else if(número == 3){
        x = width +50
        y = Math.round(random(-30,windowHeight + 30))
      }else if(número == 4){
        x = Math.round(random(-30,windowWidth + 30))
        y = height + 50
      }
      setTimeout(() => {
        zumbi = new Zumbi(x, y, 60,60, 900, Zvel,valor)
        zumbis.push(zumbi)
        zumbi.body.addAnimation("perseguir", NormalAnim)
        zumbi.body.addAnimation("feliz", Normal_HumanoImg)
        zumbi.body.addImage("stun", Normal_ParadoImg)
        zumbi.body.setCollider("circle", 0, 0, 40)
      }, 1000);


    }else if(valor == 2){
      Zvel = 10
      if(número == 1){
        x = -50
        y = Math.round(random(-30,windowHeight + 30))
      }else if(número == 2){
        x = Math.round(random(-30,windowWidth + 30))
        y = -50
      }else if(número == 3){
        x = width +50
        y = Math.round(random(-30,windowHeight + 30))
      }else if(número == 4){
        x = Math.round(random(-30,windowWidth + 30))
        y = height + 50
      }
      setTimeout(() => {
        zumbi = new Zumbi(x, y, 60,60, 900, Zvel,valor)
        zumbis.push(zumbi)
        zumbi.body.addAnimation("perseguir", CarequinhaAnim)
        zumbi.body.addAnimation("feliz", Carequinha_humanoImg)
        zumbi.body.addImage("stun", Carequinha_ParadoImg)
        zumbi.body.setCollider("circle", 0, 0, 40)
      }, 1000);

      
    }else if(valor == 3){
      Zvel = 5
      if(número == 1){
        x = -50
        y = Math.round(random(-30,windowHeight + 30))
      }else if(número == 2){
        x = Math.round(random(-30,windowWidth + 30))
        y = -50
      }else if(número == 3){
        x = width +50
        y = Math.round(random(-30,windowHeight + 30))
      }else if(número == 4){
        x = Math.round(random(-30,windowWidth + 30))
        y = height + 50
      }
      setTimeout(() => {
        zumbi = new Zumbi(x, y, 60,60, 900, Zvel,valor)
        zumbis.push(zumbi)
        zumbi.body.addAnimation("perseguir", CalvoAnim)
        zumbi.body.addAnimation("feliz", Calvo_HumanoImg)
        zumbi.body.addImage("stun",Calvo_ParadoImg)
        zumbi.body.setCollider("circle", 0, 0, 40)
        
      }, 1000);

    }else if(valor == 4){
      Zvel = 10
      if(número == 1){
        x = -50
        y = Math.round(random(-30,windowHeight + 30))
      }else if(número == 2){
        x = Math.round(random(-30,windowWidth + 30))
        y = -50
      }else if(número == 3){
        x = width +50
        y = Math.round(random(-30,windowHeight + 30))
      }else if(número == 4){
        x = Math.round(random(-30,windowWidth + 30))
        y = height + 50
      }
      setTimeout(() => {
        zumbi = new Zumbi(x, y, 60,60, 900, Zvel,valor)
        zumbis.push(zumbi)
        zumbi.body.addAnimation("perseguir", Calvo_MAnim)
        zumbi.body.addAnimation("feliz", Calvo_M_HumanoImg)
        zumbi.body.addImage("stun", Calvo_M_ParadoImg)
        zumbi.body.setCollider("circle", 0, 0, 40)
        
      }, 1000);
    }else if(valor == 5){
      Zvel = 10
      if(número == 1){
        x = -50
        y = Math.round(random(-30,windowHeight + 30))
      }else if(número == 2){
        x = Math.round(random(-30,windowWidth + 30))
        y = -50
      }else if(número == 3){
        x = width +50
        y = Math.round(random(-30,windowHeight + 30))
      }else if(número == 4){
        x = Math.round(random(-30,windowWidth + 30))
        y = height + 50
      }
      setTimeout(() => {
        zumbi = new Zumbi(x, y, 60,60, 900, Zvel,valor)
        zumbis.push(zumbi)
        zumbi.body.addAnimation("perseguir", Calvo_OAnim)
        zumbi.body.addAnimation("feliz", Calvo_HumanoImg)
        zumbi.body.addImage("stun", Calvo_O_ParadoImg)
        zumbi.body.setCollider("circle", 0, 0, 40)
        
      }, 1000);
    }

  }

}



/*function boss(){
  if(desZumbificados % 0 == 0 && desZumbificados !==0 && !luta_de_chefe){
    let N = Math.round(random(1,5))
    chefe = new Bosses(width/2,height/2,100,100,N)
    chefe.setCollider("circle", 0,0,50)
    chefes.push(chefe)
    luta_de_chefe = true
  }
}*/

