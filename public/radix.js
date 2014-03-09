function Radix(){
  this.children = {};
}

Radix.prototype.learn = function(word){
  if (word === ""){
    this.isWord = true;
    return;
  }

  for ( var prefix in this.children ){
    var length = prefix.length;

    for (var index = length; index > 0; index--){
      var sliced_prefix = prefix.slice(0, index);

      if (word.indexOf(sliced_prefix) === 0){
        var value = this.children[prefix];
        if (sliced_prefix !== prefix){
          this.children[sliced_prefix] = new Radix();
          this.children[sliced_prefix].children[prefix.slice(index, length)] = value;
          delete this.children[prefix];
        }

        this.children[sliced_prefix].learn(word.slice(sliced_prefix.length,word.length));
        return;
      }
    }
  }

  this.children[word] = new Radix();
  this.children[word].isWord = true;
};

Radix.prototype.find = function(word, path){
  path = path || "";
  if ( word === "" ) { return {node: this, path: path}; }

  for (var prefix in this.children){
      if (word.indexOf(prefix) === 0){
        path += prefix;
        return this.children[prefix].find(word.slice(prefix.length, word.length), path);
      }

      for (var index = prefix.length; index > 0; index--){
        if ( word.indexOf(prefix.slice(0,index)) === 0 ){
          path += prefix;
          return this.children[prefix].find("" ,path);
        }
      }
  }

  return null;

};

Radix.prototype.getWords = function(words, currentWord){
 words = words || [];
 currentWord = currentWord || "";

 if (this.isWord) {
   words.push(currentWord);
 }

 for ( var prefix in this.children ) {
   var newWord = currentWord + prefix;
   this.children[prefix].getWords(words, newWord);
 }

 return words;

};

Radix.prototype.autoComplete = function(prefix){
  var words = [];
  var result = this.find(prefix)
  if (result){
    var suffixes = result.node.getWords();
    var path = result.path
    for (var i = 0; i < suffixes.length; ++i){
      words.push( path + suffixes[i] );
    }
    
  }

  return words;

};