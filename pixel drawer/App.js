var gridColor = document.getElementById("color")
const grid = document.getElementById("table")
var btpinceau = document.getElementById('btpinceau')
var btgomme = document.getElementById("btgomme")
var btpipette = document.getElementById("btpipette")
var f_pinceau = false
var f_gomme = false
var f_pipette = false
var hclr1 = document.getElementById("hbtn1")
var hclr2 = document.getElementById("hbtn2")
var hclr3 = document.getElementById("hbtn3")
var colorgen = document.getElementById("btrand")

//Initialise les couleurs aléatoires
document.getElementById("hbtn1").style.backgroundColor = "#" + Math.floor(Math.random()*16777215).toString(16)
document.getElementById("hbtn2").style.backgroundColor = "#" + Math.floor(Math.random()*16777215).toString(16)
document.getElementById("hbtn3").style.backgroundColor = "#" + Math.floor(Math.random()*16777215).toString(16)

//"Reroll' les couleurs aléatoires
colorgen.addEventListener("click", function() {
  console.log("hello")
  document.getElementById("hbtn1").style.backgroundColor = "#" + Math.floor(Math.random()*16777215).toString(16)
  document.getElementById("hbtn2").style.backgroundColor = "#" + Math.floor(Math.random()*16777215).toString(16)
  document.getElementById("hbtn3").style.backgroundColor = "#" + Math.floor(Math.random()*16777215).toString(16)

})
//Donne le flag au pinceau a true, et false aux autres outils et Donne la class "active" au pinceau et enlève la class "active" aux autre outils
btpinceau.addEventListener("click", function() {
  f_pinceau = true, f_gomme = false, f_pipette = false
  btpinceau.classList.add("active")
  btgomme.classList.remove("active")
  btpipette.classList.remove("active")
})
//Donne le flag à la gomme a true, et false aux autres outils et Donne la class "active" à la gomme et enlève la class "active" aux autre outils
btgomme.addEventListener("click", function() {
  f_pinceau = false, f_gomme = true, f_pipette = false
  btgomme.classList.add("active")
  btpinceau.classList.remove("active")
  btpipette.classList.remove("active")
})
//Donne le flag à la pipette a true, et false aux autres outils et Donne la class "active" à la pipette et enlève la class "active" aux autre outils
btpipette.addEventListener("click", function() {
  f_pinceau = false, f_gomme = false, f_pipette = true
  btpipette.classList.add("active")
  btgomme.classList.remove("active")
  btpinceau.classList.remove("active")
})

//selectionne la couleur aléatoire 1
hclr1.addEventListener("click", function() {
  if(document.getElementById("hbtn1").style.backgroundColor == ""){
    console.log("error")}
  else{
    hclr1Arr = separate_rgb(document.getElementById("hbtn1").style.backgroundColor)
    hclr1hex = rgb2hex(Number(hclr1Arr[0]),Number(hclr1Arr[1]),Number(hclr1Arr[2]))
    gridColor.value = hclr1hex}
})
//selectionne la couleur aléatoire 2
hclr2.addEventListener("click", function() {
  if(document.getElementById("hbtn2").style.backgroundColor == ""){
    console.log("error")
  }
  else{
    hclr2Arr = separate_rgb(document.getElementById("hbtn2").style.backgroundColor)
    hclr2hex = rgb2hex(Number(hclr2Arr[0]),Number(hclr2Arr[1]),Number(hclr2Arr[2]))
    gridColor.value = hclr2hex  
  }
})
//selectionne la couleur aléatoire 3
hclr3.addEventListener("click", function() {
  if(document.getElementById("hbtn3").style.backgroundColor == ""){
    console.log("error")
  }
  else{
    hclr3Arr = separate_rgb(document.getElementById("hbtn3").style.backgroundColor)
    hclr3hex = rgb2hex(Number(hclr3Arr[0]),Number(hclr3Arr[1]),Number(hclr3Arr[2]))
    gridColor.value = hclr3hex
  }
})


grid.addEventListener("click" , function(event) {                                                       //check si le click est sur le tableau
  if(event.target.nodeName === "TD"){
    if(f_pinceau == true) {                                                                             //si le flag pinceau est a true
      event.target.style.backgroundColor = gridColor.value                                              //donne la couleur selectionnée a la cellule du tableau
      document.getElementById("back1").style.backgroundColor = gridColor.value + "BF"                   //donne la couleur selectionnée au background
      document.getElementById("back1").style.boxShadow = "0px 0px 0px 10px" + gridColor.value +"80"     //donne la couleur à l'ombre du background, 80 est pour donner 50% d'opactité
    }
    else if(f_gomme == true) {                                                                          //si le flag gomme est a true
      event.target.removeAttribute("style")                                                             //enlève le style à la cellule
    }
    else if(f_pipette == true){                                                                         //si le flag pipette est a true
      if(event.target.style.backgroundColor == ""){                                                     //si la cellule cliquée n'a rien en style
        console.log("error")}                                                                           //affiche "error" dans la console
        else {
        var rgb = event.target.style.backgroundColor                                                    //prend la valeur de la couleur de la cellule, elle est en rgb
        var pipArr = separate_rgb(rgb)                                                                  //separe les valeurs r g et b et les place dans un tableau
        var piphex = rgb2hex(Number(pipArr[0]),Number(pipArr[1]),Number(pipArr[2]))                     //converti les valeurs en hexadecimal
        document.getElementById("color").value = piphex                                                 //affecte la valeur en hexadecimal à la couleur selectionnée
        //la couleur aléatoire 2 devient la couleur aléatoire 3
        document.getElementById("hbtn3").style.backgroundColor = document.getElementById("hbtn2").style.backgroundColor
        //la couleur aléatoire 1 devient la couleur aléatoire 2
        document.getElementById("hbtn2").style.backgroundColor = document.getElementById("hbtn1").style.backgroundColor
        //la couleur aléatoire 1 est maintenant celle selectionnée avec la pipette
        document.getElementById("hbtn1").style.backgroundColor = gridColor.value
      }
    }
}})


function rgb2hex(r,g,b) {
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);

  if (r.length == 1)
    r = "0" + r;
  if (g.length == 1)
    g = "0" + g;
  if (b.length == 1)
    b = "0" + b;

  return "#" + r + g + b;
}

  function separate_rgb(x) {
    rgb = String(x)
    return rgbArr = rgb.substring(4, rgb.length-1).replace(/ /g, '').split(',')
}