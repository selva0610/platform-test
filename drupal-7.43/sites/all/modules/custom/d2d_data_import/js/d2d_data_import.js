/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$ = jQuery;
var clicked_field_name;
function build_autocomplete_data(node_obj) {
  $('a.overlaylaunch-inAbox').show();
  $.ajax({
    type: "POST",
    url: Drupal.settings.basePath + 'building/node_data/external',
    data: {node_obj: node_obj},
    success: function(data) {
      $('#external-content-overlay').html(data);
//      console.info(data);
    }
  }).fail(function(xhr, ajaxOptions, thrownError) {
    alert("Error in fetching Content.  Please contact an administrator");
  });
}
function add_field_data_to_field(data) {
  console.info(data.siblings('.external-field-value').html);
}
function openOverlay(olEl) {
  $oLay = $(olEl);

  if ($('#overlay-shade').length == 0)
    $('body').prepend('<div id="overlay-shade"></div>');

  $('#overlay-shade').fadeTo(300, 0.6, function() {
    var props = {
      oLayWidth: $oLay.width(),
      scrTop: $(window).scrollTop(),
      viewPortWidth: $(window).width()
    };

    var leftPos = (props.viewPortWidth - props.oLayWidth) / 2;

    $oLay
            .css({
              display: 'block',
              opacity: 0,
              top: '-=300',
              left: leftPos + 'px'
            })
            .animate({
              top: props.scrTop + 40,
              opacity: 1
            }, 600);
  });
}

function closeOverlay() {
  $('.overlay').animate({
    top: '-=300',
    opacity: 0
  }, 400, function() {
    $('#overlay-shade').fadeOut(300);
    $(this).css('display', 'none');
  });
}
(function($, Drupal, undefined) {
  Drupal.behaviors.ti_lsg_hlt_search_external = {
    attach: function(context, settings) {
      $(document).ready(function() {
        $('#overlay-shade, .overlay a').live('click', function(e) {
          closeOverlay();
          if ($(this).attr('href') == '#')
            e.preventDefault();
        });
// Usage
        $('.overlaylaunch-inAbox').click(function(e) {
          clicked_field_name = $(this).attr('form_field_name');
          openOverlay('#overlay-inAbox');
          e.preventDefault();
        });
        $('#external-content-display .add-content-to-field').live('click', function(e) {
          $('.external-data-insert-' + clicked_field_name).val($(this).siblings('.external-data-content-to-fill').html());

          if ($('.external-data-insert-' + clicked_field_name).is("textarea")) {
            var ckinstance = 'edit-field-' + clicked_field_name + '-und-0-value';
            ckinstance = ckinstance.replace('field_', '');
            CKEDITOR.instances[ckinstance].setData($(this).siblings('.external-data-content-to-fill').html());
          }

        });
        $('#external-content-display .add-reference-content-to-field').live('click', function(e) {
          alert(0);
          $('.external-data-insert-' + clicked_field_name).val($(this).siblings('.external-data-content-to-fill').html());
          alert(1);
        });
      });
    }
  }
})(jQuery, Drupal);