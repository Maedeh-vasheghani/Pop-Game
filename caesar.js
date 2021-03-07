function maFonction() {
  var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var char = document.getElementById("clair").value.toUpperCase();
  var shift = parseInt(document.getElementById("shift").value);
  for(var i = 0; i < char.length; i++){
    var lettre = char.charAt(i);
    var index = alphabet.indexOf(lettre);
    var result = alphabet.charAt((index + shift) % 26 );
    document.getElementById("field1").value += result ;
  }
} 
function maDelete() {
  document.getElementById("field1").value = ''
  document.getElementById("clair").value = ''
}