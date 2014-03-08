Trie = function(){
  this.characters = {};
};

Trie.prototype.learn = function(word, index){
  // This function should add the given word,
  // starting from the given index,
  // to this Trie.

  // It will be recursive.  It will tell
  // the correct child of this Trie to learn the word
  // starting from a later index.

  // Consider what the learn function should do
  // when it reaches the end of the word?
  // A word does not necessarily end at a leaf.
  // You must mark nodes which are the ends of words,
  // so that the words can be reconstructed later.
  if (!index) {var index = 0;}
  var letter = word[index];
  if (letter === undefined){
    this.isWord = true;
  } else if ( this.characters[letter] ) {
    index ++;
    this.characters[letter].learn(word, index);
  } else {
    index ++;
    this.characters[letter] = new Trie();
    this.characters[letter].learn(word, index);
  }

};

Trie.prototype.getWords = function(words, currentWord){
 // This function will return all the words which are
 // contained in this Trie.
 // it will use currentWord as a prefix,
 // since a Trie doesn't know about its parents.

 words = words || [];
 currentWord = currentWord || "";

 if (this.isWord) {
   words.push(currentWord);
 }

 for ( var letter in this.characters ) {
   var newWord = currentWord + letter;
   this.characters[letter].getWords(words, newWord);
 }

 return words;

};

Trie.prototype.find = function(word, index){
  if (!index) { var index = 0;}
  var letter = word[index];
  if (letter === undefined){
    return this;
  } else if ( this.characters[letter] ) {
    index ++;
    return this.characters[letter].find(word, index);
  } else {
    return false;
  }

};

Trie.prototype.autoComplete = function(prefix){
  var words = [];
  if (this.find(prefix)){
    var suffixes = this.find(prefix).getWords();

    for (var i = 0; i < suffixes.length; ++i){
      words.push( prefix + suffixes[i] );
    }
    
  }

  return words;

};