window.onload = function()
{
    var canvas = document.createElement("canvas");
    canvas.width=900;
    canvas.height=600;
    //canvas.style.border="2px solid "
    //creation de l'affichage de scoore 
    var affichage = document.createElement("div");
    
    //affichage.style.border = "2px solid " ; 
    affichage.height = 80 ;
    affichage.id = "affichage"

    //creation de tige 
    var tige = document.createElement("div");
    var pied = document.createElement("div");
    tige.id="tige";
    pied.id = "pied";
    pied.innerHTML = "Game Tv"
    document.body.appendChild(affichage);
    document.body.appendChild(canvas);
    document.body.appendChild(tige);
    document.body.appendChild(pied);

    //postion
    var canvaswidth = canvas.width;
    var canvasheight = canvas.height;


    /*1  recuperer le context de canvas
    dans ce context on peut modifier le contenu de canvas    
    */ 
    //context te5ou dimension de dessin
    var ctx = canvas.getContext("2d");

   

    /*propérite de serpent*/ 
    var colorSerp ="blue";
    var tailleSerp = 15 ;
    //position
    var xSerp = canvaswidth/2;
    
    console.log(xSerp);
    
    var ySerp = canvasheight/2; 
    console.log(ySerp);

      //définir les touches   de direction on va cré des évenement
      document.addEventListener("keydown",interaction);

      //deplacement 
 
      var deplacementx =0;
      var deplacementy =0;
 
      //la taile de serpant 
      var tailleBodySerp = 5 ;
      //variable qui va contenir l'ensemble de coordoné 
      var bodySerp = [];
      //function qui dérige le serpent 

    


     
     //propriéte de la pome 
     var colorPomme = "red";
     
     var nombredeblogParwitdh = canvaswidth/tailleSerp ;
     var nombreblogParheight = canvasheight/tailleSerp ;
     //postion de pome 
     var xpomme = Math.trunc(Math.random()*nombredeblogParwitdh)*tailleSerp;
     var ypomme = Math.trunc(Math.random()*nombreblogParheight)*tailleSerp;
     console.log(xpomme);
     //royon largeur de blog est le taille serp
     var royonpomme = tailleSerp/2;

     // temp de changement de place  pomme
     var tempsPomme = 0;
     var tempsMaxPomme = 50;

     //propiéte bonus 
     var colorBonus= "green";
     var xbonus = Math.trunc(Math.random()*nombredeblogParwitdh)*tailleSerp;
     var ybonus = Math.trunc(Math.random()*nombreblogParheight)*tailleSerp;

     var tempBonus = 0 ; 

     var afficheBonus = false ; 

     //code touche pour connait la tete de serpent 
     var codeTouche = 0 ;

     //colusion pause 

     var pause = false ; 


      //trani function de serpent 
      var interalId = setInterval(game,100);
      
     function game()
     {
        affiche();
        dessineSerpant();
        dessignePomme();
        verifieMangerPomme();
        gestionVieSerpent();
        detecterColusion();
        gestionAffichageBonus();
        //dessigneBonus();
       // gestionVieSerpent();
     }
   

    /*function qui gére la position de serpent  */
    function gestionPositionSerpent()
    {
         //calcule position de serpent 
         xSerp = xSerp + deplacementx*tailleSerp;
         ySerp = ySerp + deplacementy*tailleSerp;
         // on met le calcule de serpent dans le body 
         bodySerp.push({x:xSerp,y:ySerp});
         while (bodySerp.length>tailleBodySerp) {
            //shift enlever l'elment 0 de tableau
            bodySerp.shift();
            
        }
    }
   
    /*function qui déssine le serpent 

    */ 

    function dessineSerpant() {

        //
        ctx.clearRect(0,0,canvaswidth,canvasheight);    
        gestionPositionSerpent();  
        //définir la couleur de serpent
        ctx.fillStyle = colorSerp ;

        for (let index = 0; index < bodySerp.length; index++) {
           //designe le serpent (1,2 la position de serpant, 3 4 largeur w hauteur)
           ctx.fillRect(bodySerp[index].x,bodySerp[index].y,tailleSerp-1,tailleSerp-1);
            
        }
      
        //designe le serpent (1,2 la position de serpant, 3 4 largeur w hauteur)
       // ctx.fillRect(xSerp,ySerp,tailleSerp,tailleSerp);
    }

   

     function interaction (event)
     {
        console.log(event.keyCode);

        switch (event.keyCode) {
            case 37:
                pause = false ; 
                if(codeTouche == 39 )
                {
                    break ; 
                }
                
                //button gauche 
                deplacementx = -1;
                deplacementy = 0 ; 
                codeTouche = event.keyCode ; 
                break;
        
          
                case 38:
                    pause = false ; 
                    if(codeTouche == 40 )
                    {
                        break ; 
                    }
                    //buuton haut
                    deplacementx = 0;
                    deplacementy = -1 ;

                    codeTouche = event.keyCode ; 
                     
                    break;
            
                
                    case 39:
                        pause = false ; 
                        if(codeTouche == 37 )
                {
                    break ; 
                }
                    //button droit
                    deplacementx = 1;
                    deplacementy = 0 ;
                    codeTouche = event.keyCode ; 
                        break;
                
                  
                        case 40:
                            pause = false ; 
                            if(codeTouche == 38 )
                            {
                                break ; 
                            }
                        //buttom bas 
                        deplacementx = 0;
                        deplacementy = 1 ;  
                        codeTouche = event.keyCode ;
                            break;
                    
                     
                            case 32:
                            // buutpn espase fait pause
                            pause = true ; 
                            deplacementx = 0;
                            deplacementy = 0 ; 
                            codeTouche = event.keyCode ;
                                break;
                        
                            case 13:
                            // rejouer
                            document.location.reload(true);
                           
                                break;
                        
                            default:
            
        }
     }
    


     //function de dessigne le pomme 
     function dessignePomme()
     {
         //ouvrir un flux pour cré dans le canvas 
         ctx.beginPath();

         //on prut cre l'arc dde sercl pi = 180 %
         ctx.arc(xpomme+royonpomme,ypomme+royonpomme,royonpomme,0,2*Math.PI);
         //coleur de pomme
         ctx.fillStyle = colorPomme;
         //attaché la pomme au canvas 

         ctx.fill();
        //
        ctx.font = "15px Arial"
         //tige de canvas 
         ctx.fillStyle = "green";
         ctx.fillText("v",xpomme+3,ypomme+3);
         ctx.closePath();
     }

     //function qui dessigne le bonus 

     function dessigneBonus ()
     {
         ctx.font = "18px Arial";
         //regtngle 
        // ctx.fillStyle = "green" ; 
        // ctx.fillRect(xbonus,ybonus,tailleSerp,tailleSerp);
         ctx.fillStyle = colorBonus ; 
         ctx.fillText("💝",xbonus-3,ybonus+14);
         
     }

     /* fnction qui initalise la postion de pomme  */
     function initPostionPomme()
     {
        xpomme = Math.trunc( Math.random()*nombredeblogParwitdh)*tailleSerp;
        ypomme = Math.trunc( Math.random()*nombreblogParheight)*tailleSerp;   
     }

     /* function qui initailse la postion de serpent */
     function initPostionSerpent()
     {
        xSerp = canvaswidth/2;
    

        
        ySerp = canvasheight/2; 
           
     }
     //les colusion 
     var colusin = false;
     //detection de colision 
     function detecterColusion()
     {
         //cas 1 le serpent se mort 

        // verifier la taille de sbodySerp
        if(bodySerp.length>5)
        {
            for (var index = 0; index < bodySerp.length; index++) {
              //verifier le boody serp par rapport la tete de serpent 
              if(bodySerp[index].x == bodySerp[bodySerp.length-1].x && 
                bodySerp[index].y == bodySerp[bodySerp.length-1].y )
              
                colusin = true;
                console.log(colusin);
                break;
              
                
            }
        }


         //cas ou le serpent sort de cnavas 
         if(xSerp < 0 || ySerp < 0 || xSerp+tailleSerp > canvaswidth || ySerp+tailleSerp > canvasheight)
         {
            colusin = true ; 
         }
          

 
         
     }
     /* function qui vérifie si on a mangé la pomme ou non  */
     function verifieMangerPomme()
     {
         if(xpomme== xSerp && ypomme == ySerp)
         {
            initPostionPomme();
            scoore +=10 + 3*bodySerp.length ; 
            //trrunc t5ali kan partie entier
            niveau = Math.trunc(scoore/200);
            tailleBodySerp +=5;;
            affiche();
         }else if (tempsPomme++ > tempsMaxPomme){
             initPostionPomme();
             tempsPomme = 0 ;
         }
     }
     /* fonction qui affiche le scoore */
     function affiche()
     {
         var message = "score:"+scoore+"| vie :"+vie+"niveau : "+niveau ; 
         document.getElementById("affichage").innerHTML = message ; 

     }
     /*funtion gérer la vie de serpent  */
     function gestionVieSerpent()
     {
         if(pause == true)
         {
             colusin = false ; 
             return ; 
         }
         if(colusin == true)
         {

             vie--;
             console.log(vie);
             colusin = false ;
             tailleBodySerp = 5 ;
             initPostionPomme(); 
             initPostionSerpent();
           
             affiche();
             bodySerp = [bodySerp[bodySerp.length-1]]

             if(vie == 0)
             {
                 ctx.fillStyle = "#fff";
                 ctx.font = "40px Arial";
                 ctx.fillText("game over",canvaswidth/2-130,canvasheight/2);
                 ctx.font = "15px Arial"
                 ctx.fillText("Score:"+scoore+"point(s)",canvaswidth/2-130,canvasheight*2/3);
                 ctx.fillText("Appuyer sur la touche Entré de clavier pour rejouer",canvaswidth/2-130,canvasheight*3/4);
                 clearTimeout(interalId);
             }
         }
     }
     //scoore 
     var scoore = 0 ;
     //vie 
     var vie = 1 ; 
     var niveau = 0 ; 
      
     
     //function qui initalise la position de bonnus 
     function initPostionBonnus()
     {
        xbonus = Math.trunc( Math.random()*nombredeblogParwitdh)*tailleSerp;
        ybonus = Math.trunc( Math.random()*nombreblogParheight)*tailleSerp;   
     }
     //function qui sert a gére l'affichage de bonnus 

     function gestionAffichageBonus()
     {
         if(tempBonus++ > 50 )
         {
             tempBonus = 0 ;
             //on peut affiché le bonus 
             if(Math.random() > 0.7)
             {

                 //on va aficher le bonus
                 initPostionBonnus();
                 afficheBonus = true ; 
             }else {
                 // on va pas afficher le bonnus
                    xbonus = 1000 ; 
                    ybonus = 800 ;

                    afficheBonus = false;
             }
         }
         if(afficheBonus == true)
         {
             console.log(afficheBonus);
             dessigneBonus();
         }

         //test si le serpent  manger le bonus 
         if(xSerp == xbonus && ySerp == ybonus)
         {
             vie++ ; 
             affiche();
             xbonus = 1000 ; 
             ybonus = 800 ;
             afficheBonus = false;

         }

     }

    

}