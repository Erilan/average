$(document).ready(function(){

  var MAP_ROAMING = '.Map-action--roaming';
  var BOTTOM_CONTEXT = '.Bottom-context';
  var BOTTOM_TAG = '.Bottom-context--tag';
  var BOTTOM_PLAY = '.Bottom-context--play';

  var MAP_PLAY = '.Map-poi--play';
  var MAP_TAG = '.Map-poi--tag';
  var PLAYER = '.Player';

  var SEARCH_INPUT = '.Search-input';
  var SEARCH_SUBMIT = '.Search-submit';

  var SEARCH = '.Search';
  var SEARCH_FIRST = '.Search-first';
  var SEARCH_RESULTS = '.Search-results';
  var SEARCH_CHOICE = '.Search-choice';
  var SEARCH_SUBMIT_OK = '.Search-submit.active';
  var SEARCH_ITEM = '.Search-item';
  var SEARCH_CHOOSE = '.Search-choose';
  var SEARCH_OVERLAY = '.Search-overlay';
  var SEARCH_CLOSE = '.Search-close';

  // Toggle couleur roaming

  $(MAP_ROAMING).on('click', function(){
    $(this).toggleClass('active');
  });

  // Toggle bottom

  $(BOTTOM_CONTEXT).on('click', function(){
    $(BOTTOM_CONTEXT).removeClass('active');
    $(this).addClass('active');
  });

  $(BOTTOM_TAG).on('click', function(){
    $(MAP_PLAY).hide();
    $(MAP_TAG).show();
    $(PLAYER).removeClass('active');
  });

  $(BOTTOM_PLAY).on('click', function(){
    $(MAP_PLAY).show();
    $(MAP_TAG).hide();
  });

  // Toggle player

  $(MAP_PLAY).on('click', function(){
    $(PLAYER).addClass('active');
  });

  // Toggle couleur du bouton Search-submit

  $(SEARCH_INPUT).on('keypress', function(){
    if($(this).val() === null || $(this).val() === '') {
      $(SEARCH_SUBMIT).removeClass('active');
    } else {
      $(SEARCH_SUBMIT).addClass('active');
    }
  });

  // Enchainement des écrans tag
  // Premiere etape : click sur un POI de la map

  $(MAP_TAG).on('click', function(event){
    event.preventDefault();
    // on cache le player s'il est ouvert
    $(PLAYER).removeClass('active');

    // on affiche le premier écran de recherche
    $(SEARCH).addClass('visible');
    $(SEARCH_OVERLAY).addClass('visible');
    $(SEARCH_FIRST).addClass('visible');
  });

  // Deuxieme etape : click sur le bouton de recherche

  $(SEARCH).on('click', SEARCH_SUBMIT_OK , function(){
    // on cache le premier écran
    $(SEARCH_FIRST).removeClass('visible');
    $(SEARCH_RESULTS).addClass('visible');
  });

  // Troisième étape : click sur un résultat de recherche

  $(SEARCH_ITEM).on('click', function(){
    // on cache le deuxième écran
    $(SEARCH_RESULTS).removeClass('visible');
    $(SEARCH_CHOICE).addClass('visible');
  });

  // Quatrième étape : on cache tout

  $(SEARCH_CHOOSE).on('click', function(event){
    event.preventDefault();
    $(SEARCH).removeClass('visible');
    $(SEARCH_OVERLAY).removeClass('visible');
    $(SEARCH_CHOICE).removeClass('visible');
  });

  $(SEARCH_CLOSE).on('click', function(event){
    event.preventDefault();
    $(SEARCH).removeClass('visible');
    $(SEARCH_OVERLAY).removeClass('visible');
    $(SEARCH_CHOICE).removeClass('visible');
    $(SEARCH_RESULTS).removeClass('visible');
    $(SEARCH_FIRST).removeClass('visible');
  });


});
