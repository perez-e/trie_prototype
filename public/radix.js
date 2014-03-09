function Radix(){
  this.prefixes = {};
}

Radix.prototype.learn = function(word){
  if (word === ""){
    this.isWord = true;
    return;
  }

  for ( var prefix in this.prefixes ){
    var length = prefix.length;

    for (var index = length; index > 0; index--){
      var sliced_prefix = prefix.slice(0, index);

      if (word.indexOf(sliced_prefix) === 0){
        var value = this.prefixes[prefix];
        if (sliced_prefix !== prefix){
          this.prefixes[sliced_prefix] = new Radix();
          this.prefixes[sliced_prefix].prefixes[prefix.slice(index, length)] = value;
          delete this.prefixes[prefix];
        }

        this.prefixes[sliced_prefix].learn(word.slice(sliced_prefix.length,word.length));
        return;
      }
    }
  }

  this.prefixes[word] = new Radix();
  this.prefixes[word].isWord = true;
};

Radix.prototype.find = function(word){
  if ( word === "" ) { return this; }

  for (var prefix in this.prefixes){
      if (word.indexOf(prefix) === 0){
        return this.prefixes[prefix].find(word.slice(prefix.length, word.length));
      }
  }

  return false

};

Radix.prototype.getWords = function(words, currentWord){
 words = words || [];
 currentWord = currentWord || "";

 if (this.isWord) {
   words.push(currentWord);
 }

 for ( var prefix in this.prefixes ) {
   var newWord = currentWord + prefix;
   this.prefixes[prefix].getWords(words, newWord);
 }

 return words;

};

Radix.prototype.autoComplete = function(prefix){
  var words = [];
  if (this.find(prefix)){
    var suffixes = this.find(prefix).getWords();

    for (var i = 0; i < suffixes.length; ++i){
      words.push( prefix + suffixes[i] );
    }
    
  }

  return words;

};