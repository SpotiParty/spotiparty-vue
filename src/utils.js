export default {
   /*
      Generate a random string without uppercase character
   */
   generatePartyCode() {
      var randomChars = 'abcdefghijklmnopqrstuvwxyz0123456789'
      var result = ''
      for (var i = 0; i < 6; i++) {
         result += randomChars.charAt(Math.floor(Math.random() * randomChars.length))
      }
      return result
   },
   /*
      Shuffle an array in place
   */
   shuffle(array) {
      var j, x, i
      for (i = array.length - 1; i > 0; i--) {
         j = Math.floor(Math.random() * (i + 1))
         x = array[i]
         array[i] = array[j]
         array[j] = x
      }
      return array
   }
}
