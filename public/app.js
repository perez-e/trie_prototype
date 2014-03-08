window.App = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},  
  initialize: function() {
    this.router = new this.Routers.Main();
    Backbone.history.start({pushState: true});

    App.autocompleter = new Autocompleter();
    var ws = new WebSocket('ws://' + window.location.host + window.location.pathname);
    ws.onmessage = function(m) { 
      App.autocompleter.add(m.data); 
    };
  }
};

App.Routers.Main = Backbone.Router.extend({
  router: {
    "" : 'index'
  }, 

  initialize: function(){
    this.view = new App.Views.AutoComplete();
    this.view.render();
    $('body').html(this.view.$el);
  },

  index: function(){
  }

});

App.Views.AutoComplete = Backbone.View.extend({
  events: {
    'keyup #word': 'autoComplete'
  },

  render: function(){
    this.$el.html("<input type='text' name='word' id='word'><div id='container'></div>");
  },

  autoComplete: function(event){
    var input = $('#word').val();
    if (input === ""){
      $('#container').empty();
    }else {
      $('#container').empty();
      var words = App.autocompleter.complete(input);
      _.each(words, function(word){
        $('#container').append('<h3>'+ word +'</h3>');
      });
    }
  }

});

$(document).ready(function(){
  App.initialize();
});

